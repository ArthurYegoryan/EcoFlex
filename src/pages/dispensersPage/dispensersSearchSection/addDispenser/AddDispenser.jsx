import "./AddDispenser.css";
import TextInputComponent from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import MultipleSelect from "../../../../generalComponents/inputFields/multiSelectComponent/MultiSelectComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import { makeFuelTypesList } from "../../../../utils/helpers/makeFuelTypesList";
import { makeFuelTypesListWithIds } from "../../../../utils/helpers/makeFuelTypesListWithIds";
import { onlyNumbersValidation } from "../../../../utils/fieldsValidations/onlyNumbersValidation";
import { addData } from "../../../../api/addData";
import { getData } from "../../../../api/getData";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { colors } from "../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../assets/styles/fieldsWidths";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStation = ({ 
    stationsGroups,
    stations,
    allFuelTypes,
    isDispenserAdded,
    setIsDispenserAdded,
    onCloseHandler 
}) => {
    const [ currentGroupStations, setCurrentGroupStations ] = useState([]);
    const [ currentStationFuelTypes, setCurrentStationFuelTypes ] = useState([]);
    const [ makeCallForGroupStations, setMakeCallForGroupStations ] = useState(false);
    const [ getStationFuelTypes, setGetStationFuelTypes ] = useState(false);
    const [ resetMultiSelectValues, setResetMultiSelectValues ] = useState (false);
    const [ showFuelTypes, setShowFuelTypes ] = useState(false);
    const [ newDispenserData, setNewDispenserData ] = useState({
        yandexDispenserId: "",
        serialNumber: "",
        stationGroupName: "",
        stationName: "",
        fuelTypes: []
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showDispenserIdErrorLabel, setShowDispenserIdErrorLabel ] = useState(false);
    const [ showSerialNumberErrorLabel, setShowSerialNumberErrorLabel ] = useState(false);

    const [ emptyDispenserIdError, setEmptyDispenserIdError ] = useState(false);
    const [ invalidDispenserIdError, setInvalidDispenserIdError ] = useState(false);
    const [ emptySerialNumberError, setEmptySerialNumberError ] = useState(false);
    const [ emptyStationGroupNameError, setEmptyStationGroupNameError ] = useState(false);
    const [ emptyStationNameError, setEmptyStationNameError ] = useState(false);
    const [ emptyFuelTypesError, setEmptyFuelTypesError ] = useState(false);

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
            if (stationGroup.name === newDispenserData.stationGroupName) {
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

    useEffect(() => {
        let currentStationId = 0;

        stations.map((station) => {
            if (station.name === newDispenserData.stationName) {
                currentStationId = station.id;
            }
        });

        const currentStation = stations.filter(station => station.id === currentStationId);
        currentStation.length && setCurrentStationFuelTypes(makeFuelTypesList(currentStation[0].fuelTypes, true));
    }, [getStationFuelTypes]);

    const resetPrevValidations = () => {
        setShowDispenserIdErrorLabel(false);
        setShowSerialNumberErrorLabel(false);

        setEmptyDispenserIdError(false);
        setInvalidDispenserIdError(false);
        setEmptySerialNumberError(false);
        setEmptyStationGroupNameError(false);
        setEmptyStationNameError(false);
        setEmptyFuelTypesError(false);
    };

    const checkFieldsValidations = ({ yandexDispenserId, serialNumber, stationGroupName, stationName, fuelTypes }) => {
        let existsError = false;

        if (!yandexDispenserId.length) {
            existsError = true;
            setEmptyDispenserIdError(true);
        } else {
            if (!onlyNumbersValidation(yandexDispenserId)) {
                existsError = true;
                setInvalidDispenserIdError(true);
            }
        }
        if (!serialNumber.length) {
            existsError = true;
            setEmptySerialNumberError(true);
        }
        if (!stationGroupName.length) {
            existsError = true;
            setEmptyStationGroupNameError(true);
        }
        if (!stationName.length) {
            existsError = true;
            setEmptyStationNameError(true);
        }
        if (!fuelTypes.length) {
            existsError = true;
            setEmptyFuelTypesError(true);
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();

        if (!checkFieldsValidations(newDispenserData)) {
            const bodyForAddDispenser = {
                id: newDispenserData.id,
                serialNumber: newDispenserData.serialNumber,
                yandexDispenserId: newDispenserData.yandexDispenserId,
                stationId: 0,
                fuelTypes: makeFuelTypesListWithIds(newDispenserData.fuelTypes, allFuelTypes)
            };
    
            for (let i = 0; i < stations.length; i++) {
                if (stations[i].name === newDispenserData.stationName) {
                    bodyForAddDispenser.stationId = stations[i].id;
                    break;
                }
            }

            try {
                setIsLoading(true);
                const response = await addData(urls.DISPENSERS_URL, bodyForAddDispenser);
                setIsLoading(false);
    
                if (response.statusCode === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.statusCode === 400) {
                    response.errors.map((err) => {
                        if (err.param === "Name") showDispenserIdErrorLabel(true);
                    });
                } else if (response.status === 200) {
                    setIsDispenserAdded(!isDispenserAdded);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
                }
            } catch (err) {
                console.log(err);
            }
        }        
    }

    return (
        <div className="add-dispenser-fields">
            <TextInputComponent label={t("dispensers.dispenserId")}
                                existsError={emptyDispenserIdError || invalidDispenserIdError}
                                errorText={
                                    emptyDispenserIdError ? t("errors.emptyFieldError") :
                                    invalidDispenserIdError ? t("errors.onlyNumbersError") : null
                                }
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewDispenserData({
                                    ...newDispenserData,
                                    yandexDispenserId: evt.target.value
                                })}} />
            <TextInputComponent label={t("dispensers.serialNumber")}
                                existsError={emptySerialNumberError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={"25px"}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewDispenserData({
                                    ...newDispenserData,
                                    serialNumber: evt.target.value
                                })}} />
            <SelectComponent label={t("dispensers.addChangeDispenser.chooseStationGroup")}
                                chooseData={stationsGroupsNamesList}
                                existsError={emptyStationGroupNameError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={"25px"}
                                width={fieldsWidths.modalFields}
                                onChooseHandler={(evt) => {
                                    setNewDispenserData({
                                        ...newDispenserData,
                                        stationGroupName: evt.target.value
                                    });
                                    setMakeCallForGroupStations(!makeCallForGroupStations);
                                    setShowFuelTypes(false);
                                }} />
            <SelectComponent label={t("dispensers.addChangeDispenser.chooseStation")}
                                chooseData={currentGroupStations}
                                existsError={emptyStationNameError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={"25px"}
                                width={fieldsWidths.modalFields}
                                onChooseHandler={(evt) => {
                                    setNewDispenserData({
                                        ...newDispenserData,
                                        stationName: evt.target.value,
                                        fuelTypes: []
                                    });
                                    setGetStationFuelTypes(!getStationFuelTypes);
                                    setResetMultiSelectValues(!resetMultiSelectValues);
                                    setShowFuelTypes(true);
                                }} />
            {showFuelTypes && 
                <MultipleSelect label={t("dispensers.addChangeDispenser.chooseFuelTypes")}
                                marginTop={"25px"}
                                width={fieldsWidths.modalFields}
                                dataForMultiSelecting={currentStationFuelTypes}
                                resetValue={resetMultiSelectValues}
                                existsError={emptyFuelTypesError}
                                errorText={t("errors.emptyFieldError")}
                                onChangeHandler={(value) => {setNewDispenserData({
                                    ...newDispenserData,
                                    fuelTypes: value
                                })}} />
            }
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {showDispenserIdErrorLabel &&
                <p className="add-dispenser-error-text">{t("errors.stationsGroupExistsError")}</p>
            }
            <div className="add-dispenser-buttons">
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

export default AddStation;