import "./ChangeFuelType.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../generalComponents/buttons/Button";
import Loader from "../../../generalComponents/loaders/Loader";
// import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import { changeData } from "../../../api/changeData";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { fieldsWidths } from "../../../assets/styles/fieldsWidths";
import { fieldsMargins } from "../../../assets/styles/fieldsMargins";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { autoFillWithDefaultData } from "../../../utils/helpers/autoFillWithDefaultData";
import { onlyNumbersValidation } from "../../../utils/fieldsValidations/onlyNumbersValidation";
import { editToken } from "../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeFueltype = ({ 
    fuelTypeData,
    isFuelTypeChanged,
    setIsFuelTypeChanged,
    onCloseHandler 
}) => {
    const [ changedFuelTypeData, setChangedFuelTypeData ] = useState({
        id: fuelTypeData.id,
        name: fuelTypeData.name,
        yandexFuelTypeId: fuelTypeData.yandexFuelTypeId,
        countType: fuelTypeData.countType,
        adgCode: fuelTypeData.adgCode,
        departmentId: fuelTypeData.departmentId
    });
    const [ isLoading, setIsLoading ] = useState(false);
    // const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showFuelNameErrorLabel, setShowFuelNameErrorLabel ] = useState(false);
    const [ showYandexFuelTypeIdErrorLabel, setShowYandexFuelTypeIdErrorLabel ] = useState(false);
    const [ invalidAdgCodeError, setInvalidAdgCodeError ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setInvalidAdgCodeError(false);
        setShowFuelNameErrorLabel(false);
        setShowYandexFuelTypeIdErrorLabel(false);
    };

    const checkFieldsValidations = ({ adgCode }) => {
        let existsError = false;

        if (!onlyNumbersValidation(adgCode)) {
            existsError = true;
            setInvalidAdgCodeError(true);
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();
        const autoFilledChangedFuelTypeData = autoFillWithDefaultData(fuelTypeData, changedFuelTypeData);

        if (!checkFieldsValidations(autoFilledChangedFuelTypeData)) {
            if (isChangedAnyData(fuelTypeData, autoFilledChangedFuelTypeData)) {
                try {
                    setIsLoading(true);
                    const response = await changeData(urls.FUEL_TYPES_URL, autoFilledChangedFuelTypeData);
                    setIsLoading(false);

                    if (response.status === 401) {
                        dispatch(editToken(""));
                        localStorage.clear();
    
                        navigate(paths.LOGIN);
                    } else if (response.status === 400) {
                        response.data.errors.map((err) => {
                            if (err.param === "Name") setShowFuelNameErrorLabel(true);
                            if (err.param === "YandexFuelTypeId") setShowYandexFuelTypeIdErrorLabel(true);
                        });                    
                    } else if (response.data.message === "Success") {
                        setIsFuelTypeChanged(!isFuelTypeChanged);
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
        <div className="change-fuel-type-fields">
            <TextInputComponent label={t("fuelTypes.fuelName")}
                                defaultValue={fuelTypeData.name}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypes.adgCode")}
                                defaultValue={fuelTypeData.adgCode}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                existsError={invalidAdgCodeError}
                                errorText={t("errors.onlyNumbersError")}
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    adgCode: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypes.departmentId")}
                                defaultValue={fuelTypeData.departmentId}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    departmentId: Number(evt.target.value)
                                })}} />
            <TextInputComponent label={t("fuelTypes.yandexId")}
                                defaultValue={fuelTypeData.yandexFuelTypeId}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    yandexFuelTypeId: evt.target.value
                                })}} />
            <SelectComponent label={t("fuelTypes.addChangeFuelType.chooseCountType")}
                             chooseData={["Kg", "Ltr"]}
                             defaultValue={fuelTypeData.countType === "L" ? "Ltr" : fuelTypeData.countType}
                             width={fieldsWidths.modalFields}
                             marginTop={fieldsMargins.modalFieldMarginTop}
                             onChooseHandler={(evt) => {setChangedFuelTypeData({
                                ...changedFuelTypeData,
                                countType: evt.target.value === "Ltr" ? "L" : evt.target.value
                            })}} />
            {/* {showSuccessAnimation &&
                <SuccessAnimation />
            } */}
            {showFuelNameErrorLabel &&
                <p className="change-fuel-type-error-text">{t("errors.fuelTypeExistsError")}</p>
            }
            {showYandexFuelTypeIdErrorLabel &&
                <p className="change-fuel-type-error-text">{t("errors.yandexIdExistsError")}</p>
            }
            <div className="change-fuel-type-buttons">
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

export default ChangeFueltype;