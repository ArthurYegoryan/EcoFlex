import "./AddStation.css";
import TextInputComponent from "../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import MultipleSelect from "../../../../../generalComponents/inputFields/multiSelectComponent/MultiSelectComponent";
import Button from "../../../../../generalComponents/buttons/Button";
import Loader from "../../../../../generalComponents/loaders/Loader";
import SuccessAnimation from "../../../../../generalComponents/successAnimation/SuccessAnimation";
import { addData } from "../../../../../api/addData";
import { makeFuelTypesList } from "../../../../../utils/helpers/makeFuelTypesList";
import { makeFuelTypesListWithIds } from "../../../../../utils/helpers/makeFuelTypesListWithIds";
import { urls } from "../../../../../constants/urls/urls";
import { paths } from "../../../../../constants/paths/paths";
import { colors } from "../../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../../assets/styles/fieldsWidths";
import { fieldsMargins } from "../../../../../assets/styles/fieldsMargins";
import { tinValidation } from "../../../../../utils/fieldsValidations/tinValidation";
import { editToken } from "../../../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStation = ({ 
    stationGroupId,
    isStationAdded,
    setIsStationAdded,
    allFuelTypes,
    onCloseHandler 
}) => {
    const [ newStationData, setNewStationData ] = useState({
        name: "",
        yandexStationId: "",
        address: "",
        tin: "",
        phoneNumber: "",
        lat: "",
        long: "",
        fuelTypes: [],
        stationGroupId: stationGroupId
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showStationNameErrorLabel, setShowStationNameErrorLabel ] = useState(false);
    const [ showYandexStationIdErrorLabel, setShowYandexStationIdErrorLabel ] = useState(false);

    const [ emptyStationNameError, setEmptyStationNameError ] = useState(false);
    const [ emptyYandexStationIdError, setEmptyYandexStationIdError ] = useState(false);
    const [ emptyStationAddressError, setEmptyStationAddressError ] = useState(false);
    const [ emptyStationTinError, setEmptyStationTinError ] = useState(false);
    const [ invalidStationTinError, setInvalidStationTinError ] = useState(false);
    const [ emptyFuelTypesError, setEmptyFuelTypesError ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setShowStationNameErrorLabel(false);
        setShowYandexStationIdErrorLabel(false);

        setEmptyStationNameError(false);
        setEmptyYandexStationIdError(false);
        setEmptyStationAddressError(false);
        setEmptyStationTinError(false);
        setInvalidStationTinError(false);
        setEmptyFuelTypesError(false);
    };

    const checkFieldsValidations = ({ name, yandexStationId, address, tin, fuelTypes }) => {
        let existsError = false;

        if (!name.length) {
            existsError = true;
            setEmptyStationNameError(true);
        }
        if (!yandexStationId.length) {
            existsError = true;
            setEmptyYandexStationIdError(true);
        }
        if (!address.length) {
            existsError = true;
            setEmptyStationAddressError(true);
        }
        if (!tin.length) {
            existsError = true;
            setEmptyStationTinError(true);
        } else {
            if (!tinValidation(tin)) {
                existsError = true;
                setInvalidStationTinError(true);
            }
        }       
        if (!fuelTypes.length) {
            existsError = true;
            setEmptyFuelTypesError(true);
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();

        if (!checkFieldsValidations(newStationData)) {
            const newStationDataForCall = {
                ...newStationData,
                fuelTypes: makeFuelTypesListWithIds(newStationData.fuelTypes, allFuelTypes)
            };

            try {
                setIsLoading(true);
                const response = await addData(urls.STATIONS_URL, newStationDataForCall);
                setIsLoading(false);
    
                if (response.statusCode === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.statusCode === 400) {
                    response.errors.map((err) => {
                        if (err.param === "Name") setShowStationNameErrorLabel(true);
                        if (err.param === "YandexStationId") setShowYandexStationIdErrorLabel(true);
                    });
                } else if (response.status === 200) {
                    setIsStationAdded(!isStationAdded);
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
        <div className="change-station-fields">
            <TextInputComponent label={t("stations.addChangeStation.name")}
                                existsError={emptyStationNameError}
                                errorText={t("errors.emptyFieldError")}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.yandexId")}
                                existsError={emptyYandexStationIdError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    yandexStationId: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.stationAddress")}
                                existsError={emptyStationAddressError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    address: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.stationTin")}
                                existsError={emptyStationTinError || invalidStationTinError}
                                errorText={
                                    emptyStationTinError ? t("errors.emptyFieldError") :
                                    invalidStationTinError ? t("errors.onlyNumbersLengthEightError") : null
                                }
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    tin: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.stationPhone")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    phoneNumber: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.addChangeStation.coordinateWidth")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    lat: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.addChangeStation.coordinateLength")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationData({
                                    ...newStationData,
                                    long: evt.target.value
                                })}} />
            <MultipleSelect label={t("stations.fuelTypes")}
                            existsError={emptyFuelTypesError}
                            errorText={t("errors.emptyFieldError")}
                            dataForMultiSelecting={makeFuelTypesList(allFuelTypes, true)}
                            width={fieldsWidths.modalFields}
                            marginTop={fieldsMargins.modalFieldMarginTop}
                            onChangeHandler={(value) => setNewStationData({
                                ...newStationData,
                                fuelTypes: value
                            })} />
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {showStationNameErrorLabel &&
                <p className="change-station-error-text">{t("errors.stationExistsError")}</p>
            }
            {showYandexStationIdErrorLabel &&
                <p className="change-station-error-text">{t("errors.yandexIdExistsError")}</p>
            }
            <div className="change-station-buttons">
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