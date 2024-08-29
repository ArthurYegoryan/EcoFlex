import "./AddStationGroup.css";
import TextInputComponent from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
// import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import { addData } from "../../../../api/addData";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { colors } from "../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../assets/styles/fieldsWidths";
import { fieldsMargins } from "../../../../assets/styles/fieldsMargins";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStation = ({ 
    isStationsGroupAdded,
    setIsStationsGroupAdded,
    onCloseHandler 
}) => {
    const [ newStationsGroupData, setNewStationsGroupData ] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });
    const [ isLoading, setIsLoading ] = useState(false);
    // const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showStationsGroupNameErrorLabel, setShowStationsGroupNameErrorLabel ] = useState(false);

    const [ emptyStationsGroupNameError, setEmptyStationsGroupNameError ] = useState(false);
    const [ emptyStationsGroupAddressError, setEmptyStationsGroupAddressError ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setShowStationsGroupNameErrorLabel(false);

        setEmptyStationsGroupNameError(false);
        setEmptyStationsGroupAddressError(false);
    };

    const checkFieldsValidations = ({ name, address }) => {
        let existsError = false;

        if (!name.length) {
            existsError = true;
            setEmptyStationsGroupNameError(true);
        }
        if (!address.length) {
            existsError = true;
            setEmptyStationsGroupAddressError(true);
        }

        return existsError;
    }

    const onSaveHandler = async () => {
        resetPrevValidations();

        if (!checkFieldsValidations(newStationsGroupData)) {
            try {
                setIsLoading(true);
                const response = await addData(urls.STATION_GROUPS_URL, newStationsGroupData);
                setIsLoading(false);
    
                if (response.statusCode === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.statusCode === 400) {
                    response.errors.map((err) => {
                        if (err.param === "Name") setShowStationsGroupNameErrorLabel(true);
                    });
                } else if (response.status === 200) {
                    setIsStationsGroupAdded(!isStationsGroupAdded);
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
    }

    return (
        <div className="add-stations-group-fields">
            <TextInputComponent label={t("stationsGroup.addChangeStationsGroup.name")}
                                existsError={emptyStationsGroupNameError}
                                errorText={t("errors.emptyFieldError")}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationsGroupData({
                                    ...newStationsGroupData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("stationsGroup.stationsGroupAddress")}
                                existsError={emptyStationsGroupAddressError}
                                errorText={t("errors.emptyFieldError")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationsGroupData({
                                    ...newStationsGroupData,
                                    address: evt.target.value
                                })}} />
            <TextInputComponent label={t("stationsGroup.stationsGroupPhoneNumber")}
                                marginTop={fieldsMargins.modalFieldMarginTop}
                                width={fieldsWidths.modalFields}
                                onChangeHandler={(evt) => {setNewStationsGroupData({
                                    ...newStationsGroupData,
                                    phoneNumber: evt.target.value
                                })}} />
            {/* {showSuccessAnimation &&
                <SuccessAnimation />
            } */}
            {showStationsGroupNameErrorLabel &&
                <p className="add-stations-group-error-text">{t("errors.stationsGroupExistsError")}</p>
            }
            <div className="add-stations-group-buttons">
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