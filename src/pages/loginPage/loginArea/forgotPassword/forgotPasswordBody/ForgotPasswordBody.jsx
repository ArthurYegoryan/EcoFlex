import "./ForgotPasswordBody.css";
import TextInput from "../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../../../generalComponents/buttons/Button";
import ModalComponent from "../../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import { forgotPassword } from "../../../../../api/forgotPassword";
import { urls } from "../../../../../constants/urls/urls";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ForgotPasswordBody = ({ onCloseHandler }) => {
    const [ forgotPasswordParams, setForgotPasswordParams ] = useState({
        login: "",
    });
    const [ wrongUsername, setWrongUsername ] = useState(false);
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ showSuccessLabel, setShowSuccessLabel ] = useState(false); 
    const [ disableBtn, setDisableBtn ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const { t } = useTranslation();

    const makeCallForSendEmail = () => {
        try {
            const changeUserPass = async () => {
                const response = await forgotPassword(
                    urls.POST_FORGOT_PASSWORD_URL, 
                    forgotPasswordParams
                );

                if (response.data.message === "Success") {
                    setShowSuccessLabel(true);
                    setDisableBtn(true);
                    setTimeout(() => onCloseHandler(), 3000);
                } else if (response.data.message === "wrong username or email") {
                    setWrongUsername(true);
                } else if (response.data.message === "expired token") {
                    localStorage.clear();
            
                    <Navigate to="/login" />;
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
                <p className="forgot-password-success-send-email">{t("userSection.newPassSendSuccess")}</p>
            }
            {wrongUsername &&
                <p className="forgot-password-error-send-email">{t("userSection.wrongUsernameEmail")}</p>
            }
            <div className="change-pass-body-btns">
                <Button label={t("loginSection.recover")}
                        isDisabled={disableBtn}
                        backgroundColor="green"
                        marginRight={"10px"}
                        onClickHandler={() => 
                            onSaveBtnHandler(forgotPasswordParams.login)} 
                        />
                <Button label={t("addNewTerminal.cancelBtn")}
                        backgroundColor="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>
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