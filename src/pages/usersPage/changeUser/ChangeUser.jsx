import "./ChangeUser.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBox from "../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeUser = ({
    userData,
    stationsGroups,
    stations,
    isUserChanged,
    setIsUserChanged,
    onCloseHandler
}) => {
    // console.log("Stations: ", stations);
    // console.log("User data: ", userData);

    const availableStations = [];
    stations.map((station) => {
        if (station.stationGroup.id === userData.stations[0]?.stationGroup.id) {
            availableStations.push(station.name);
        }
    });

    const [ changedUserData, setChangedUserData ] = useState({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        roleType: userData.role,
        stationGroupId: userData.stations[0]?.stationGroup.id,
        stations: userData.stations
    });
    const [ userAvailableStations, setUserAvailableStations ] = useState(availableStations);

    const { t } = useTranslation();

    const stationsGroupsList = [];
    stationsGroups.map((stationsGroup) => stationsGroupsList.push(stationsGroup.name));

    const userStationDetector = (station) => {
        let isIncludes = false;

        userData.stations.map((userStation) => {
            if (userStation.name === station) {
                isIncludes = true;
            }
        });

        return isIncludes;
    };

    const searchAvailableStations = (value) => {
        const searchedStations = [];

        availableStations.map((station) => {
            if (station.toLowerCase().includes(value)) {
                searchedStations.push(station);
            }
        });

        setUserAvailableStations(searchedStations);
    };

    return (
        <div className="change-user-page">
            <TextInput label={t("users.addChangeUser.name")}
                        defaultValue={userData.firstName}
                        width="473px"
                        onChangeHandler={(evt) => setChangedUserData({
                            ...changedUserData,
                            firstName: evt.target.value
                        })} />
            <TextInput label={t("users.addChangeUser.surname")}
                        defaultValue={userData.lastName}
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
                                     marginTop={"25px"} />
                    <TextInput label={t("users.addChangeUser.searchStations")}
                               width="473px"
                               marginTop={"25px"}
                               onChangeHandler={(evt) => {
                                   searchAvailableStations(evt.target.value);
                               }} />
                    <div style={{ width: "473px" }} className="change-user-page-checkbox-area">
                        {
                            userAvailableStations.map((station) => {
                                return <CheckBox label={station}
                                                defaultChecked={userStationDetector(station)} />
                            })
                        }
                    </div>                    
                </>
            }
        </div>
    );
};

export default ChangeUser;