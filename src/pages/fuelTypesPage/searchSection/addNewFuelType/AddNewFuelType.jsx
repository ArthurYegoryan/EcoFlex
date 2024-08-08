import "./AddNewFuelType.css";
import TextInputComponent from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import { addData } from "../../../../api/addData";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { colors } from "../../../../assets/styles/colors";
import { onlyNumbersValidation } from "../../../../utils/fieldsValidations/onlyNumbersValidation";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddNewFueltype = ({ 
    isFuelTypeChanged,
    setIsFuelTypeChanged,
    onCloseHandler 
}) => {
    const [ newFuelTypeData, setNewFuelTypeData ] = useState({
        name: "",
        yandexFuelTypeId: "",
        countType: "",
        adgCode: "",
        departmentId: ""
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showFuelNameErrorLabel, setShowFuelNameErrorLabel ] = useState(false);
    const [ showYandexFuelTypeIdErrorLabel, setShowYandexFuelTypeIdErrorLabel ] = useState(false);
    const [ emptyFuelNameError, setEmptyFuelNameError ] = useState(false);
    const [ emptyYandexFuelTypeIdError, setEmptyYandexFuelTypeIdError ] = useState(false);
    const [ emptyCountTypeError, setEmptyCountTypeError ] = useState(false);
    const [ emptyAdgCodeError, setEmptyAdgCodeError ] = useState(false);
    const [ invalidAdgCodeError, setInvalidAdgCodeError ] = useState(false);
    const [ emptyDepartmentIdError, setEmptyDepartmentIdError ] = useState(false);
    const [ invalidDepartmentIdError, setInvalidDepartmentIdError ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setShowFuelNameErrorLabel(false);
        setShowYandexFuelTypeIdErrorLabel(false);
        setEmptyFuelNameError(false);
        setEmptyYandexFuelTypeIdError(false);
        setEmptyCountTypeError(false);
        setEmptyAdgCodeError(false);
        setInvalidAdgCodeError(false);
        setEmptyDepartmentIdError(false);
        setInvalidDepartmentIdError(false);
    };

    const checkFieldsValidations = ({ name, yandexFuelTypeId, countType, adgCode, departmentId }) => {
        let existsError = false;

        if (!name.length) {
            existsError = true;
            setEmptyFuelNameError(true);
        }
        if (!yandexFuelTypeId.length) {
            existsError = true;
            setEmptyYandexFuelTypeIdError(true);
        }
        if (!countType.length) {
            existsError = true;
            setEmptyCountTypeError(true);
        }
        if (!adgCode.length) {
            existsError = true;
            setEmptyAdgCodeError(true);
        } else {
            if (!onlyNumbersValidation(adgCode)) {
                existsError = true;
                setInvalidAdgCodeError(true);
            }
        }
        if (!departmentId.length) {
            existsError = true;
            setEmptyDepartmentIdError(true);
        } else {
            if (!onlyNumbersValidation(departmentId)) {
                existsError = true;
                setInvalidDepartmentIdError(true);
            }
        }

        return existsError;
    };

    const onSaveHandler = async () => {
        resetPrevValidations();

        if (!checkFieldsValidations(newFuelTypeData)) {
            try {
                setIsLoading(true);
                const response = await addData(urls.FUEL_TYPES_URL, {...newFuelTypeData, departmentId: Number(newFuelTypeData.departmentId)});
                setIsLoading(false);

                if (response.statusCode === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.statusCode === 400) {
                    response.errors.map((err) => {
                        if (err.param === "Name") setShowFuelNameErrorLabel(true);
                        if (err.param === "YandexFuelTypeId") setShowYandexFuelTypeIdErrorLabel(true);
                    });                    
                } else if (response.data.message === "Success") {
                    setIsFuelTypeChanged(!isFuelTypeChanged);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="add-new-fuel-type-fields">
            <TextInputComponent label={t("fuelTypesTable.fuelName")}
                                width="473px"
                                existsError={emptyFuelNameError}
                                errorText={t("errors.emptyFieldError")}
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.adgCode")}
                                marginTop={"25px"}
                                width="473px"
                                existsError={emptyAdgCodeError || invalidAdgCodeError}
                                errorText={
                                    emptyAdgCodeError ? t("errors.emptyFieldError") :
                                    invalidAdgCodeError ? t("errors.onlyNumbersError") : null
                                }
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    adgCode: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.departmentId")}
                                marginTop={"25px"}
                                width="473px"
                                existsError={emptyDepartmentIdError || invalidDepartmentIdError}
                                errorText={
                                    emptyDepartmentIdError ? t("errors.emptyFieldError") :
                                    invalidDepartmentIdError ? t("errors.onlyNumbersError") : null
                                }
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    departmentId: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.yandexId")}
                                marginTop={"25px"}
                                width="473px"
                                existsError={emptyYandexFuelTypeIdError}
                                errorText={t("errors.emptyFieldError")}
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    yandexFuelTypeId: evt.target.value
                                })}} />
            <SelectComponent label={t("fuelTypesTable.addChangeFuelType.chooseCountType")}
                             chooseData={["Kg", "Ltr"]}
                             marginTop={"25px"}
                             existsError={emptyCountTypeError}
                             errorText={t("errors.emptyFieldError")}
                             onChooseHandler={(evt) => {setNewFuelTypeData({
                                ...newFuelTypeData,
                                countType: evt.target.value === "Ltr" ? "L" : evt.target.value
                            })}} />
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {showFuelNameErrorLabel &&
                <p className="add-new-fuel-type-error-text">{t("errors.fuelTypeExistsError")}</p>
            }
            {showYandexFuelTypeIdErrorLabel &&
                <p className="add-new-fuel-type-error-text">{t("errors.yandexFuelTypeIdExistsError")}</p>
            }
            <div className="add-new-fuel-type-buttons">
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

export default AddNewFueltype;