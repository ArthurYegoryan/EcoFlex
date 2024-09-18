import "./AddUser.css";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBox from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
// import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import { emailValidation } from "../../../../utils/fieldsValidations/emailValidation";
import { addData } from "../../../../api/addData";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { colors } from "../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../assets/styles/fieldsWidths";
import { fieldsMargins } from "../../../../assets/styles/fieldsMargins";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState } from "react";
// import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddUser = ({ 
    stationsGroups,
    stations,
    isUserAdded,
    setIsUserAdded,
    onCloseHandler 
}) => {
    const [ newUserData, setNewUserData ] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        roleType: "Admin",
        stationGroupId: 0,
        stations: []
    });
    const [ userAvailableStations, setUserAvailableStations ] = useState([]);
    const [ searchedUserAvailableStations, setSearchedUserAvailableStations ] = useState([]);
    const [ isStationsSearched, setIsStationsSearched ] = useState(false);
    const [ showDataNotFound, setShowDataNotFound ] = useState(false);
    const [ isStationsGroupSelected, setIsStationsGroupSelected ] = useState(false);
    const [ emptyFirstNameError, setEmptyFirstNameError ] = useState(false);
    const [ emptyLastNameError, setEmptyLastNameError ] = useState(false);
    const [ emptyEmailError, setEmptyEmailError ] = useState(false);
    const [ invalidEmailError, setInvalidEmailError ] = useState(false);
    const [ emptyStationsGroupError, setEmptyStationsGroupError ] = useState(false);
    const [ emptyStationsError, setEmptyStationsError ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    // const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    // const [ goToBottom, setGoToBottom ] = useState(false);
    // const bottomOfModalRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // useEffect(() => {
    //     if (goToBottom) {
    //         bottomOfModalRef.current.scrollIntoView();
    //     }
    // }, [goToBottom]);

    const stationsGroupsList = [];
    stationsGroups.map((stationsGroup) => stationsGroupsList.push(stationsGroup.name));
        
    const getGroupIdSetStations = (stationGroupName) => {
        let groupId = 0;
        stationsGroups.map((group) => {
            if (group.name === stationGroupName) {
                groupId = group.id;
            }
        });
        setNewUserData({
            ...newUserData,
            stationGroupId: groupId,
            stations: []
        });

        const availableStations = [];
        stations.map((station) => {
            if (station.stationGroup.id === groupId) {
                availableStations.push({
                    id: station.id,
                    name: station.name
                });
            }
        });

        setUserAvailableStations(availableStations);
        setIsStationsGroupSelected(true);

        return availableStations;
    };

    const userStationDetector = (stationId) => {
        return newUserData.stations.includes(stationId);
    };

    const searchAvailableStations = (value) => {
        setShowDataNotFound(false);

        if (value) {
            const searchedStations = [];

            userAvailableStations.map((station) => {
                if (station.name.toLowerCase().includes(value)) {
                    searchedStations.push(station);
                }
            });

            if (searchedStations.length) {
                setSearchedUserAvailableStations(searchedStations);
            } else {
                setSearchedUserAvailableStations([]);
                setShowDataNotFound(true);
            }            
        } else {
            setIsStationsSearched(false);
        }        
    };

    const checkBoxHandler = (evt, item) => {
        let itemId = 0;
        stations.map((station) => {
            if (station.name === item) itemId = station.id;
        });

        if (evt.target.checked) {
            if (!newUserData.stations.includes(itemId)) {
                setNewUserData({
                    ...newUserData,
                    stations: [...newUserData.stations, itemId] 
                });
            }
        } else {
            setNewUserData({
                ...newUserData,
                stations: [...newUserData.stations.slice(0, newUserData.stations.indexOf(itemId)), 
                           ...newUserData.stations.slice(newUserData.stations.indexOf(itemId) + 1) ]
            });
        }
    };

    const resetPrevValidations = () => {
        setEmptyFirstNameError(false);
        setEmptyLastNameError(false);
        setEmptyEmailError(false);
        setInvalidEmailError(false);
        setEmptyStationsGroupError(false);
        setEmptyStationsError(false);
    };

    const checkFieldsValidations = ({ firstName, lastName, email, roleType, stationGroupId, stations }) => {
        let existsError = false;

        if (!firstName.length) {
            existsError = true;
            setEmptyFirstNameError(true);
        }
        if (!lastName.length) {
            existsError = true;
            setEmptyLastNameError(true);
        }
        if (!email.length) {
            existsError = true;
            setEmptyEmailError(true);
        } else {
            if (!emailValidation(email)) {
                existsError = true;
                setInvalidEmailError(true);
            }
        }
        if (roleType === "FuelSupervisor") {
            if (!stationGroupId) {
                existsError = true;
                setEmptyStationsGroupError(true);
            }
            if (!stations.length) {
                existsError = true;
                setEmptyStationsError(true);
            }
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();

        if (!checkFieldsValidations(newUserData)) {
            try {
                setShowLoading(true);
                const response = await addData(urls.ADD_USER_URL, newUserData);
                setShowLoading(false);

                if (response.status === 200) {
                    setIsUserAdded(!isUserAdded);
                    onCloseHandler();
                    // setGoToBottom(true);
                    // setShowSuccessAnimation(true);
                    // setTimeout(() => {
                    //     onCloseHandler();
                    // }, 2500);
                } else if (response.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));

                    navigate(paths.LOGIN);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="change-user-page">
            <TextInput label={t("users.addChangeUser.name")}
                        existsError={emptyFirstNameError}
                        errorText={t("errors.emptyFieldError")}
                        width={fieldsWidths.modalFields}
                        onChangeHandler={(evt) => setNewUserData({
                            ...newUserData,
                            firstName: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.surname")}
                        existsError={emptyLastNameError}
                        errorText={t("errors.emptyFieldError")}
                        width={fieldsWidths.modalFields}
                        marginTop={fieldsMargins.modalFieldMarginTop}
                        onChangeHandler={(evt) => setNewUserData({
                            ...newUserData,
                            lastName: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.phone")}
                        width={fieldsWidths.modalFields}
                        marginTop={fieldsMargins.modalFieldMarginTop}
                        onChangeHandler={(evt) => setNewUserData({
                            ...newUserData,
                            phoneNumber: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.email")}
                        existsError={emptyEmailError || invalidEmailError}
                        errorText={
                            emptyEmailError ? t("errors.emptyFieldError") :
                            invalidEmailError ? t("errors.invalidEmailError") : null
                        }
                        width={fieldsWidths.modalFields}
                        marginTop={fieldsMargins.modalFieldMarginTop}
                        onChangeHandler={(evt) => setNewUserData({
                            ...newUserData,
                            email: evt.target.value
                        })} />
            <SelectComponent label={t("users.addChangeUser.role")}
                            defaultValue={"Admin"}
                            chooseData={["Admin", "Fuel Supervisor"]}
                            width={fieldsWidths.modalFields}
                            marginTop={fieldsMargins.modalFieldMarginTop}
                            onChooseHandler={(evt) => setNewUserData({
                                ...newUserData,
                                roleType: evt.target.value === "Fuel Supervisor" ? "FuelSupervisor" : "Admin"
                            })} />
            {newUserData.roleType === "FuelSupervisor" &&
                <>
                    <SelectComponent label={t("users.addChangeUser.chooseStationsGroup")}
                                     chooseData={stationsGroupsList}
                                     existsError={emptyStationsGroupError}
                                     errorText={t("errors.emptyFieldError")}
                                     width={fieldsWidths.modalFields}
                                     marginTop={fieldsMargins.modalFieldMarginTop}
                                     onChooseHandler={(evt) => getGroupIdSetStations(evt.target.value)} />
                    {isStationsGroupSelected &&
                        <>
                            <TextInput label={t("users.addChangeUser.searchStations")}
                                width={fieldsWidths.modalFields}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                onChangeHandler={(evt) => {
                                    setIsStationsSearched(true);
                                    searchAvailableStations(evt.target.value);
                                }} />
                            <div 
                                style={{ 
                                    width: fieldsWidths.modalFields,
                                    marginTop: "10px",
                                    border: emptyStationsError ? `1px solid ${colors.errorLabelColor}` : "none",
                                    borderRadius: "5px"
                                }} 
                                className="change-user-page-checkbox-area"
                            >
                                {isStationsSearched ?
                                    searchedUserAvailableStations.map((station) => {
                                        return <CheckBox label={station.name}
                                                        defaultChecked={userStationDetector(station.id)}
                                                        onChangeHandler={(evt, item) => checkBoxHandler(evt, item)} />
                                    }) :
                                    userAvailableStations.map((station) => {
                                        return <CheckBox label={station.name}
                                                        defaultChecked={userStationDetector(station.id)}
                                                        onChangeHandler={(evt, item) => checkBoxHandler(evt, item)} />
                                    })
                                }
                                {showDataNotFound &&
                                    <div style={{
                                             width: fieldsWidths.modalFields,
                                             textAlign: "center"
                                         }} 
                                         className="add-user-data-not-found-area"
                                    >
                                        <img src={process.env.PUBLIC_URL + 'img/noData.svg'} 
                                             alt="No data"
                                             style={{
                                                 width: "10%"
                                             }} />
                                        <p style={{ marginTop: "0px", color: "gray" }}>{t("generalQuestionsTexts.dataNotFound")}</p>
                                    </div>
                                }
                            </div>
                            {emptyStationsError &&
                                <p style={{ 
                                        marginTop: "3px",
                                        marginLeft: "14px",
                                        fontSize: "12px",
                                        color: colors.errorLabelColor
                                    }}
                                >
                                    {t("errors.emptyFieldError")}
                                </p>
                            }
                        </>
                    }
                </>
            }
            {/* {showSuccessAnimation &&
                <SuccessAnimation />
            } */}
            <div 
                style={{ display: "flex", marginTop: "25px" }} 
                className="add-user-buttons"
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
            {/* <div ref={bottomOfModalRef}></div> */}
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default AddUser;