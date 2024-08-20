import "./ChangeDispenser.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import MultipleSelect from "../../../generalComponents/inputFields/multiSelectComponent/MultiSelectComponent";
import Button from "../../../generalComponents/buttons/Button";
import Loader from "../../../generalComponents/loaders/Loader";
import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import { changeData } from "../../../api/changeData";
import { getData } from "../../../api/getData";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { autoFillWithDefaultData } from "../../../utils/helpers/autoFillWithDefaultData";
import { editToken } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeDispenser = ({ 
    dispenserData,
    stationsGroups,
    isDispenserChanged,
    setIsDispenserChanged,
    onCloseHandler 
}) => {
    const [ currentGroupStations, setCurrentGroupStations ] = useState([]);
    const [ makeCallForGroupStations, setMakeCallForGroupStations ] = useState(false);
    const [ changedDispenserData, setChangedDispenserData ] = useState({
        id: dispenserData.id,
        serialNumber: dispenserData.serialNumber,
        yandexDispenserId: dispenserData.yandexDispenserId,
        stationGroupName: dispenserData.stationGroupName,
        stationName: dispenserData.stationName
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const stationsGroupsNamesList = [];
    stationsGroups.map((stationsGroup) => {
        stationsGroupsNamesList.push(stationsGroup.name);
    });

    useEffect(() => {
        let currentStationGroupId = 0;

        stationsGroups.map((stationGroup) => {
            if (stationGroup.name === changedDispenserData.stationGroupName) {
                currentStationGroupId = stationGroup.id;
            }
        })

        const getGroupStations = async () => {
            setIsLoading(true);
            const response = await getData(urls.STATIONS_URL + `?PageSize=1000&StationGroupId=${currentStationGroupId}`);
            setIsLoading(false);

            if (response.status === 200) {
                const { list } = response.data.data;

                const stationsList = [];
                list.map((station) => stationsList.push(station.name));
                setCurrentGroupStations(stationsList);
            }
        };
        getGroupStations();
    }, [makeCallForGroupStations]);

   const onSaveHandler = async () => {
        const autoFilledChangedStationsGroupData = autoFillWithDefaultData(dispenserData, changedDispenserData);

        if (isChangedAnyData(dispenserData, autoFilledChangedStationsGroupData)) {
            try {
                setIsLoading(true);
                const response = await changeData(urls.STATION_GROUPS_URL, autoFilledChangedStationsGroupData);
                setIsLoading(false);
    
                if (response.status === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.status === 200) {
                    setIsDispenserChanged(!isDispenserChanged);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            onCloseHandler();
        }
    }

    return (
        <div className="change-dispenser-fields">
            <TextInputComponent label={t("dispensers.serialNumber")}
                                defaultValue={dispenserData.serialNumber}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedDispenserData({
                                    ...changedDispenserData,
                                    serialNumber: evt.target.value
                                })}} />
            <TextInputComponent label={t("dispensers.dispenserId")}
                                defaultValue={dispenserData.yandexDispenserId}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedDispenserData({
                                    ...changedDispenserData,
                                    yandexDispenserId: evt.target.value
                                })}} />
            <SelectComponent label={t("dispensers.addChangeDispenser.chooseStationGroup")}
                                defaultValue={dispenserData.stationGroupName}
                                chooseData={stationsGroupsNamesList}
                                marginTop={"25px"}
                                width="473px"
                                onChooseHandler={(evt) => {
                                    setChangedDispenserData({
                                        ...changedDispenserData,
                                        stationGroupName: evt.target.value
                                    });
                                    setMakeCallForGroupStations(!makeCallForGroupStations);
                                }} />
            <SelectComponent label={t("dispensers.addChangeDispenser.chooseStation")}
                                defaultValue={dispenserData.stationName}
                                chooseData={currentGroupStations}
                                marginTop={"25px"}
                                width="473px"
                                onChooseHandler={(evt) => {setChangedDispenserData({
                                    ...changedDispenserData,
                                    stationName: evt.target.value
                                })}} />
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            <div className="change-dispenser-buttons">
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
            {isLoading &&
                <Loader />
            }
        </div>
    );
};

export default ChangeDispenser;