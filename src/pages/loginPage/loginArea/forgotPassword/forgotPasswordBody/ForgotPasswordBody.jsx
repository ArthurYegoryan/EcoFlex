import "./ForgotPasswordBody.css";
import TextInput from "../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../../../generalComponents/buttons/Button";
import ModalComponent from "../../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessAnimation from "../../../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../../../generalComponents/loaders/Loader";
import { forgotPassword } from "../../../../../api/forgotPassword";
import { colors } from "../../../../../assets/styles/colors";
import { urls } from "../../../../../constants/urls/urls";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const ForgotPasswordBody = ({ onCloseHandler }) => {
    const [ forgotPasswordParams, setForgotPasswordParams ] = useState({
        login: "",
    });
    const [ wrongUsername, setWrongUsername ] = useState(false);
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ showSuccessLabel, setShowSuccessLabel ] = useState(false); 
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ disableBtn, setDisableBtn ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const { t } = useTranslation();

    const makeCallForSendEmail = () => {
        try {
            const changeUserPass = async () => {
                setShowLoading(true);
                const response = await forgotPassword(
                    urls.POST_FORGOT_PASSWORD_URL, 
                    forgotPasswordParams
                );
                setShowLoading(false);

                if (response.status === 200) {
                    setShowSuccessLabel(true);
                    setDisableBtn(true);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
                } else if (response.message === "Network Error") {
                    setWrongUsername(true);
                } else {
                    throw new Error("Connection error!");
                }                
            }
            changeUserPass();
        } catch(err) {
            setOpenCloseErrorModal(true);
        }
    }

    const onSaveBtnHandler = (login) => {
        setEmptyUsernameError(false);
        setWrongUsername(false);

        if (!login.length) setEmptyUsernameError(true);
        else makeCallForSendEmail();
    }

    return (
        <div className="change-pass-body">
            <TextInput label={t("loginSection.username")}
                       width="35ch"
                       existsError={emptyUsernameError}
                       errorText={t("errors.emptyUsernameError")}
                       onChangeHandler={(evt) => setForgotPasswordParams({
                           ...forgotPasswordParams,
                           login: evt.target.value
                       })} />
            {showSuccessLabel &&
                <p className="forgot-password-success-send-email">{t("generalQuestionsTexts.newPassSendSuccess")}</p>
            }
            {wrongUsername &&
                <p className="forgot-password-error-send-email">{t("errors.wrongUsername")}</p>
            }
            <div className="change-pass-body-btns">
                <Button label={t("operations.recover")}
                        isDisabled={disableBtn}
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"10px"}
                        onClickHandler={() => 
                            onSaveBtnHandler(forgotPasswordParams.login)} 
                        />
                <Button label={t("addNewTerminal.cancelBtn")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={() => onCloseHandler()} />
            </div>
            {showLoading &&
                <Loader />
            }
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {openCloseErrorModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseErrorModal(false)} 
                                isOpen={openCloseErrorModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
        </div>
    );
};

export default ForgotPasswordBody;