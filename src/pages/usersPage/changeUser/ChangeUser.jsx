import "./ChangeUser.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBox from "../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import Button from "../../../generalComponents/buttons/Button";
import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../generalComponents/loaders/Loader";
import { changeData } from "../../../api/changeData";
import { colors } from "../../../assets/styles/colors";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { editToken } from "../../../redux/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeUser = ({
    userData,
    stationsGroups,
    stations,
    isUserChanged,
    setIsUserChanged,
    onCloseHandler
}) => {
    const userOriginalStationsIds = [];
    userData.stations.map(station => userOriginalStationsIds.push(station.id));
    const userOriginalStationGroupId = userData.stations[0]?.stationGroup.id;

    const availableStations = [];
    stations.map((station) => {
        if (station.stationGroup.id === userData.stations[0]?.stationGroup.id) {
            availableStations.push({
                id: station.id,
                name: station.name
            });
        }
    });

    const [ changedUserData, setChangedUserData ] = useState({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        roleType: userData.role,
        stationGroupId: userOriginalStationGroupId,
        stations: userOriginalStationsIds
    });
    const [ userAvailableStations, setUserAvailableStations ] = useState(availableStations);
    const [ emptyFirstNameError, setEmptyFirstNameError ] = useState(false);
    const [ emptyLastNameError, setEmptyLastNameError ] = useState(false);
    const [ emptyStationsError, setEmptyStationsError ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ goToBottom, setGoToBottom ] = useState(false);
    const bottomOfModalRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (goToBottom) {
            bottomOfModalRef.current.scrollIntoView();
        }
    }, [goToBottom]);

    const stationsGroupsList = [];
    stationsGroups.map((stationsGroup) => stationsGroupsList.push(stationsGroup.name));
        
    const getGroupIdSetStations = (stationGroupName) => {
        let groupId = 0;
        stationsGroups.map((group) => {
            if (group.name === stationGroupName) {
                groupId = group.id;
            }
        });
        setChangedUserData({
            ...changedUserData,
            stationGroupId: groupId,
            stations: []
        });

        const availableStations = [];
        stations.map((station) => {
            if (station.stationGroup.id === groupId) {
                // availableStations.push(station.name);
                availableStations.push({
                    id: station.id,
                    name: station.name
                });
            }
        });

        setUserAvailableStations(availableStations);

        return availableStations;
    };

    const userStationDetector = (stationId) => {
        return changedUserData.stations.includes(stationId);
    };

    const searchAvailableStations = (value) => {
        const searchedStations = [];

        availableStations.map((station) => {
            if (station.name.toLowerCase().includes(value)) {
                searchedStations.push(station);
            }
        });

        setUserAvailableStations(searchedStations);
    };

    const checkBoxHandler = (evt, item) => {
        console.log("Item: ", item);
        console.log("Checked: ", evt.target.checked);

        let itemId = 0;
        stations.map((station) => {
            if (station.name === item) itemId = station.id;
        });

        console.log("Stations: ", stations);
        console.log("Item ID: ", itemId);

        if (evt.target.checked) {
            if (!changedUserData.stations.includes(itemId)) {
                setChangedUserData({
                    ...changedUserData,
                    stations: [...changedUserData.stations, itemId] 
                });
            }
        } else {
            setChangedUserData({
                ...changedUserData,
                stations: [...changedUserData.stations.slice(0, changedUserData.stations.indexOf(itemId)), 
                           ...changedUserData.stations.slice(changedUserData.stations.indexOf(itemId) + 1) ]
            });
        }
    };

    const checkFieldsValidations = ({ firstName, lastName, stations }) => {
        let existsError = false;

        if (!firstName.length) {
            existsError = true;
            setEmptyFirstNameError(true);
        }
        if (!lastName.length) {
            existsError = true;
            setEmptyLastNameError(true);
        }
        if (!stations.length) {
            existsError = true;
            setEmptyStationsError(true);
        }

        return existsError;
    }

    const isChangedAnyData = (oldData, newData) => {
        let isFound = false;

        for (const field in newData) {
            if (field !== "roleType" && field !== "stations") {
                if (newData[field] !== oldData[field]) isFound = true;
            } else if (field === "stations") {
                if (newData[field].length !== oldData[field].length) {
                    isFound = true;
                } else {
                    newData[field].map((stationId) => {
                        if (!oldData[field].includes(stationId)) isFound = true;
                    });
                }                
            }
        }
    
        return isFound;
    };

    const onSaveHandler = async () => {
        setEmptyFirstNameError(false);
        setEmptyLastNameError(false);
        setEmptyStationsError(false);

        if (!checkFieldsValidations(changedUserData)) {
            if (isChangedAnyData({
                ...userData, 
                stations: userOriginalStationsIds, 
                stationGroupId: userOriginalStationGroupId
            }, changedUserData)) {
                try {
                    setShowLoading(true);
                    const response = await changeData(urls.USERS_URL, changedUserData);
                    setShowLoading(false);

                    if (response.status === 200) {
                        setIsUserChanged(!isUserChanged);
                        setGoToBottom(true);
                        setShowSuccessAnimation(true);
                        setTimeout(() => {
                            onCloseHandler();
                        }, 2500);
                    } else if (response.status === 401) {
                        localStorage.clear();
                        dispatch(editToken(""));

                        navigate(paths.LOGIN);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                onCloseHandler();
            }
        }
    }

    return (
        <div className="change-user-page">
            <TextInput label={t("users.addChangeUser.name")}
                        defaultValue={userData.firstName}
                        existsError={emptyFirstNameError}
                        errorText={t("errors.emptyFieldError")}
                        width="473px"
                        onChangeHandler={(evt) => setChangedUserData({
                            ...changedUserData,
                            firstName: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.surname")}
                        defaultValue={userData.lastName}
                        existsError={emptyLastNameError}
                        errorText={t("errors.emptyFieldError")}
                        width="473px"
                        marginTop={"25px"}
                        onChangeHandler={(evt) => setChangedUserData({
                            ...changedUserData,
                            lastName: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.phone")}
                        defaultValue={userData.phoneNumber}
                        width="473px"
                        marginTop={"25px"}
                        onChangeHandler={(evt) => setChangedUserData({
                            ...changedUserData,
                            phoneNumber: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.email")}
                        defaultValue={userData.email}
                        width="473px"
                        marginTop={"25px"}
                        onChangeHandler={(evt) => setChangedUserData({
                            ...changedUserData,
                            email: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.role")}
                        defaultValue={userData.role === "FuelSupervisor" ? "Fuel Supervisor" : userData.role}
                        disabled={true}
                        width="473px"
                        marginTop={"25px"} />
            {userData.role === "FuelSupervisor" &&
                <>
                    <SelectComponent label={t("users.addChangeUser.chooseStationsGroup")}
                                     defaultValue={userData.stations[0]?.stationGroup.name}
                                     chooseData={stationsGroupsList}
                                     width={"473px"}
                                     marginTop={"25px"}
                                     onChooseHandler={(evt) => getGroupIdSetStations(evt.target.value)} />
                    <TextInput label={t("users.addChangeUser.searchStations")}
                               width="473px"
                               marginTop={"25px"}
                               onChangeHandler={(evt) => {
                                   searchAvailableStations(evt.target.value);
                               }} />
                    <div 
                        style={{ 
                            width: "473px",
                            marginTop: "10px",
                            border: emptyStationsError ? "1px solid #d32f2f" : "none",
                            borderRadius: "5px"
                        }} 
                        className="change-user-page-checkbox-area"
                    >
                        {
                            userAvailableStations.map((station) => {
                                return <CheckBox label={station.name}
                                                defaultChecked={userStationDetector(station.id)}
                                                onChangeHandler={(evt, item) => checkBoxHandler(evt, item)} />
                            })
                        }
                    </div>
                    {emptyStationsError &&
                        <p style={{ 
                                marginTop: "3px",
                                marginLeft: "14px",
                                fontSize: "12px",
                                color: "#d32f2f"
                            }}
                        >
                            {t("errors.emptyFieldError")}
                        </p>
                    }
                </>
            }
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            <div 
                style={{ display: "flex", marginTop: "25px" }} 
                className="change-user-buttons"
            >
                <Button label={t("operations.save")}
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"10px"}
                        onClickHandler={onSaveHandler} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={onCloseHandler} />
            </div>
            <div ref={bottomOfModalRef}></div>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default ChangeUser;