import "./ChangePasswordBody.css";
import TextInput from "../../../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../../../../../generalComponents/buttons/Button";
import SuccessModalBody from "../../../../../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import changePassword from "../../../../../../../api/changePassword";
import { passwordValidation } from "../../../../../../../utils/fieldsValidations/passwordValidation";
import { urls } from "../../../../../../../constants/urls/urls";
import { colors } from "../../../../../../../constants/styles/colors";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
// import { editToken } from "../../../../../../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ChangePasswordBody = ({ onCloseHandler }) => {
    const { id } = useSelector((state) => state.auth);

    const [ passwordsInfos, setPasswordsInfo ] = useState({
        userID: id,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [ oldPassError, setOldPassError ] = useState(false);
    const [ newPassError, setNewPassError ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ openCloseModal, setOpenCloseModal ] = useState(false); 
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const makeCallForChangePass = () => {
        try {
            const changeUserPass = async () => {
                const response = await changePassword(
                    urls.PUT_CHANGE_PASSWORD_URL, 
                    passwordsInfos
                );

                if (response.message === "success") {
                    setOpenCloseModal(true);
                    setTimeout(() => onCloseHandler(), 3000);
                } else if (response.message === "wrong password") {
                    setOldPassError(true);
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

    const onSaveBtnHandler = (password) => {
        setOldPassError(false);
        setNewPassError(false);

        passwordValidation(password) ? makeCallForChangePass() : setNewPassError(true);
    }

    return (
        <div className="change-pass-body">
            <TextInput label={t("userSection.oldPassword")}
                       width="35ch"
                       isPassword={true}
                       existsError={oldPassError}
                       errorText={t("userSection.wrongPassword")}
                       onChangeHandler={(evt) => setPasswordsInfo({
                           ...passwordsInfos,
                           oldPassword: evt.target.value
                       })} />
            <TextInput label={t("userSection.newPassword")}
                       marginTop="10px"
                       width="35ch" 
                       isPassword={true}
                       existsError={newPassError}
                       errorText={t("userSection.passwordCritery")}
                       onChangeHandler={(evt) => {
                           setPasswordsInfo({
                               ...passwordsInfos,
                               newPassword: evt.target.value
                           });
                           evt.target.value === passwordsInfos.confirmNewPassword ? setIsDisabled(false) : setIsDisabled(true);
                           !evt.target.value.length && setIsDisabled(true);
                       }} />
            <TextInput label={t("userSection.confirmNewPassword")}
                       marginTop="10px"
                       width="35ch"
                       isPassword={true}
                       onChangeHandler={(evt) => {
                           setPasswordsInfo({
                               ...passwordsInfos,
                              confirmNewPassword: evt.target.value
                           });
                           evt.target.value === passwordsInfos.newPassword ? setIsDisabled(false) : setIsDisabled(true);
                           !evt.target.value.length && setIsDisabled(true);
                       }} />
            <div className="change-pass-body-btns">
                <Button label={t("changeTerminalData.saveBtn")}
                        backgroundColor="#008000"
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"10px"}
                        isDisabled={isDisabled}
                        onClickHandler={() => onSaveBtnHandler(passwordsInfos.newPassword)} />
                <Button label={t("addNewTerminal.cancelBtn")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={() => onCloseHandler()} />
            </div>
            {openCloseModal &&
                <SuccessModalBody />
            }
        </div>
    );
};

export default ChangePasswordBody;