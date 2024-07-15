import './LoginForm.css';
import ForgotPassword from "../forgotPassword/ForgotPassword";
import TextInput from '../../../../generalComponents/inputFields/textInputComponent/TextInputComponent';
import Button from "../../../../generalComponents/buttons/Button";
import ModalComponent from '../../../../generalComponents/modalComponent/ModalComponent';
import ErrorModalBody from '../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody';
import getUserInfo from '../../../../api/getUserInfo';
import { urls } from '../../../../constants/urls/urls';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { editID, editRole, editUsername, editBank, editToken } from '../../../../redux/slices/authorization/authSlice';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [ loginParams, setLoginParams ] = useState({
        username: "",
        password: ""
    });
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ emptyPasswordError, setEmptyPasswordError ] = useState(false);
    const [ wrongUsernamePasswordError, setWrongUsernamePasswordError ] = useState(false);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);

    const onChangeUsernameHandler = (evt) => {
        setLoginParams({
            ...loginParams,
            username: evt.target.value
        });
    }

    const onChangePasswordHandler = (evt) => {
        setLoginParams({
            ...loginParams,
            password: evt.target.value
        });
    }

    const makeCallForUserData = () => {
        try {
            const loadUserData = async () => {
                const response = await getUserInfo(
                    urls.GET_USER_INFO_URL, 
                    loginParams
                );

                if (response.message === "success") {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user_id", response.userInfo.id);
                    localStorage.setItem("username", response.userInfo.username);
                    localStorage.setItem("role", response.userInfo.role);
                    localStorage.setItem("bank", response.userInfo.bank);

                    // dispatch(editID(response.userInfo.id));
                    // dispatch(editUsername(response.userInfo.username));
                    // dispatch(editRole(response.userInfo.role));
                    // dispatch(editBank(response.userInfo.bank));
                    // dispatch(editToken(response.token));

                    <Navigate to="/terminals" />;
                } else if (response.message === "wrong username or password") {
                    setWrongUsernamePasswordError(true);
                } else {
                    throw new Error("Connection error!");
                }                
            }
            loadUserData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }

    const onClickHandler = async (evt) => {
        evt.preventDefault();

        setEmptyUsernameError(false);
        setEmptyPasswordError(false);
        setWrongUsernamePasswordError(false);

        if (!loginParams.username.length || !loginParams.password.length) {
            if (!loginParams.username.length) setEmptyUsernameError(true);
            if (!loginParams.password.length) setEmptyPasswordError(true);
        } else {
            makeCallForUserData();
        }
    }

    return (
        <>
            <form action="" className="login-form">
                <TextInput label={t("userSection.username")}
                        size='normal'
                        onChangeHandler={onChangeUsernameHandler}
                        existsError={emptyUsernameError}
                        errorText={t("userSection.emptyUsernameError")} />
                <TextInput label={t("userSection.password")}
                        onChangeHandler={onChangePasswordHandler}
                        size='normal'
                        height='56px'
                        isPassword={true}
                        existsError={emptyPasswordError}
                        errorText={t("userSection.emptyPasswordError")}
                        marginTop="15px" />
                <ForgotPassword />
                {wrongUsernamePasswordError &&
                    <div className="login-error-message-div">
                        <label className="login-error-message">{t("userSection.wrongUsernamePassword")}</label>
                    </div>                    
                }
                <div className="login-button">
                    <Button type="submit" 
                        label="Login" 
                        backgroundColor='rgb(103, 103, 255)'
                        width="220px"
                        onClickHandler={onClickHandler}
                    />
                </div>
            </form>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
        </>
    );
};

export default LoginForm;