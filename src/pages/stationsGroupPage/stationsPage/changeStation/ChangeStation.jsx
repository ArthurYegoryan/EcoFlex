import "./ChangeStation.css";
import TextInputComponent from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import MultipleSelect from "../../../../generalComponents/inputFields/multiSelectComponent/MultiSelectComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
// import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import { changeData } from "../../../../api/changeData";
import { makeFuelTypesList } from "../../../../utils/helpers/makeFuelTypesList";
import { makeFuelTypesListWithIds } from "../../../../utils/helpers/makeFuelTypesListWithIds";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { colors } from "../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../assets/styles/fieldsWidths";
import { fieldsMargins } from "../../../../assets/styles/fieldsMargins";
import { isChangedAnyData } from "../../../../utils/helpers/isChangedAnyData";
import { autoFillWithDefaultData } from "../../../../utils/helpers/autoFillWithDefaultData";
import { onlyNumbersValidation } from "../../../../utils/fieldsValidations/onlyNumbersValidation";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeStation = ({ 
    stationGroupId,
    stationData,
    isStationChanged,
    setIsStationChanged,
    allFuelTypes,
    onCloseHandler 
}) => {
    const [ changedStationData, setChangedStationData ] = useState({
        id: stationData.id,
        name: stationData.name,
        yandexStationId: stationData.yandexStationId,
        address: stationData.address,
        tin: stationData.tin,
        phoneNumber: stationData.phoneNumber,
        lat: stationData.lat,
        long: stationData.long,
        fuelTypes: stationData.fuelTypes,
        stationGroupId: stationGroupId
    });
    const [ isLoading, setIsLoading ] = useState(false);
    // const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showStationNameErrorLabel, setShowStationNameErrorLabel ] = useState(false);
    const [ showYandexStationIdErrorLabel, setShowYandexStationIdErrorLabel ] = useState(false);
    const [ invalidTinError, setInvalidTinError ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setInvalidTinError(false);
        setShowStationNameErrorLabel(false);
        setShowYandexStationIdErrorLabel(false);
    };

    const checkFieldsValidations = ({ tin }) => {
        let existsError = false;

        if (!onlyNumbersValidation(tin)) {
            existsError = true;
            setInvalidTinError(true);
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();
        const autoFilledChangedStationData = autoFillWithDefaultData(stationData, changedStationData);

        if (!checkFieldsValidations(autoFilledChangedStationData)) {
            if (isChangedAnyData(stationData, autoFilledChangedStationData)) {
                autoFilledChangedStationData.fuelTypes = makeFuelTypesListWithIds(autoFilledChangedStationData.fuelTypes, allFuelTypes);

                try {
                    setIsLoading(true);
                    const response = await changeData(urls.STATIONS_URL, autoFilledChangedStationData);
                    setIsLoading(false);
        
                    if (response.status === 401) {
                        dispatch(editToken(""));
                        localStorage.clear();
    
                        navigate(paths.LOGIN);
                    } else if (response.status === 400) {
                        response.errors.map((err) => {
                            if (err.param === "Name") setShowStationNameErrorLabel(true);
                            if (err.param === "YandexStationId") setShowYandexStationIdErrorLabel(true);
                        });                    
                    } else if (response.status === 200) {
                        setIsStationChanged(!isStationChanged);
                        onCloseHandler();
                        // setShowSuccessAnimation(true);
                        // setTimeout(() => {
                        //     onCloseHandler();
                        // }, 2500);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                onCloseHandler();
            }
        }        
    }

    return (
        <div className="change-station-fields">
            <TextInputComponent label={t("stations.addChangeStation.name")}
                                defaultValue={stationData.name}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.yandexId")}
                                defaultValue={stationData.yandexStationId}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    yandexStationId: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.stationAddress")}
                                defaultValue={stationData.address}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    address: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.stationTin")}
                                defaultValue={stationData.tin}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                existsError={invalidTinError}
                                errorText={t("errors.onlyNumbersError")}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    tin: Number(evt.target.value)
                                })}} />
            <TextInputComponent label={t("stations.stationPhone")}
                                defaultValue={stationData.phoneNumber}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    phoneNumber: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.addChangeStation.coordinateWidth")}
                                defaultValue={stationData.lat}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    lat: evt.target.value
                                })}} />
            <TextInputComponent label={t("stations.addChangeStation.coordinateLength")}
                                defaultValue={stationData.long}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedStationData({
                                    ...changedStationData,
                                    long: evt.target.value
                                })}} />
            <MultipleSelect label={t("stations.fuelTypes")}
                            dataForMultiSelecting={makeFuelTypesList(allFuelTypes, true)}
                            defaultValue={stationData.fuelTypes}
                            width={fieldsWidths.modalFields}
                            marginTop={fieldsMargins.modalFieldMarginTop}
                            onChangeHandler={(value) => setChangedStationData({
                                ...changedStationData,
                                fuelTypes: value
                            })} />
            {/* {showSuccessAnimation &&
                <SuccessAnimation />
            } */}
            {showStationNameErrorLabel &&
                <p className="change-station-error-text">{t("errors.fuelTypeExistsError")}</p>
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

export default ChangeStation;