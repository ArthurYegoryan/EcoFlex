import "./ForgotPasswordBody.css";
import TextInput from "../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../../../generalComponents/buttons/Button";
import forgotPassword from "../../../../../api/forgotPassword";
import { urls } from "../../../../../constants/urls/urls";
import { emailValidation } from "../../../../../utils/fieldsValidations/emailValidation";
import { useState } from "react";
import { useDispatch } from "react-redux"
// import { editToken } from "../../../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ForgotPasswordBody = ({ onCloseHandler }) => {
    const [ forgotPasswordParams, setForgotPasswordParams ] = useState({
        username: "",
        email: "",
    });
    const [ invalidEmailError, setInvalidEmailError ] = useState(false);
    const [ emptyEmailError, setEmptyEmailError ] = useState(false);
    const [ wrongUsernameOrEmail, setWrongUsernameOrEmail ] = useState(false);
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ showSuccessLabel, setShowSuccessLabel ] = useState(false); 
    const [ disableBtn, setDisableBtn ] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const makeCallForSendEmail = () => {
        try {
            const changeUserPass = async () => {
                const response = await forgotPassword(
                    urls.POST_FORGOT_PASSWORD_URL, 
                    forgotPasswordParams
                );

                if (response.message === "success") {
                    setShowSuccessLabel(true);
                    setDisableBtn(true);
                    setTimeout(() => onCloseHandler(), 3000);
                } else if (response.message === "wrong username or email") {
                    setWrongUsernameOrEmail(true);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    // dispatch(editToken(""));
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            changeUserPass();
        } catch(err) {
            // setOpenCloseModal(true);
        }
    }

    const onSaveBtnHandler = (username, email) => {
        setInvalidEmailError(false);
        setEmptyEmailError(false);
        setEmptyUsernameError(false);
        setWrongUsernameOrEmail(false);

        if (!username.length) setEmptyUsernameError(true);
        if (!email.length) setEmptyEmailError(true);
        else {
            emailValidation(email) ? makeCallForSendEmail() : setInvalidEmailError(true);
        }
    }

    return (
        <div className="change-pass-body">
            <TextInput label={t("userSection.username")}
                       width="35ch"
                       existsError={emptyUsernameError}
                       errorText={t("userSection.emptyUsernameError")}
                       onChangeHandler={(evt) => setForgotPasswordParams({
                           ...forgotPasswordParams,
                           username: evt.target.value
                       })} />
            <TextInput label={t("userSection.email")}
                       width="35ch"
                       marginTop="10px"
                       existsError={emptyEmailError || invalidEmailError}
                       errorText={emptyEmailError ? t("userSection.emptyEmailError") : t("userSection.invalidEmail")}
                       onChangeHandler={(evt) => setForgotPasswordParams({
                           ...forgotPasswordParams,
                           email: evt.target.value
                       })} />
            {showSuccessLabel &&
                <p className="forgot-password-success-send-email">{t("userSection.newPassSendSuccess")}</p>
            }
            {wrongUsernameOrEmail &&
                <p className="forgot-password-error-send-email">{t("userSection.wrongUsernameEmail")}</p>
            }
            <div className="change-pass-body-btns">
                <Button label={t("userSection.sendBtn")}
                        isDisabled={disableBtn}
                        backgroundColor="green"
                        marginRight={"10px"}
                        onClickHandler={() => 
                            onSaveBtnHandler(forgotPasswordParams.username, forgotPasswordParams.email)} 
                        />
                <Button label={t("addNewTerminal.cancelBtn")}
                        backgroundColor="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>
        </div>
    );
};

export default ForgotPasswordBody;