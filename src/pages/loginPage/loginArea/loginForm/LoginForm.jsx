import './LoginForm.css';
import ForgotPassword from "../forgotPassword/ForgotPassword";
import TextInput from '../../../../generalComponents/inputFields/textInputComponent/TextInputComponent';
import Button from "../../../../generalComponents/buttons/Button";
import ModalComponent from '../../../../generalComponents/modalComponent/ModalComponent';
import ErrorModalBody from '../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody';
import Loader from '../../../../generalComponents/loaders/Loader';
import { postUserInfo } from '../../../../api/postUserInfo';
import { urls } from '../../../../constants/urls/urls';
import { paths } from '../../../../constants/paths/paths';
import { colors } from "../../../../assets/styles/colors";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editID, editRole, editUsername, editToken } from '../../../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [ loginParams, setLoginParams ] = useState({
        login: "",
        password: ""
    });
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ emptyPasswordError, setEmptyPasswordError ] = useState(false);
    const [ wrongUsernamePasswordError, setWrongUsernamePasswordError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);

    const onChangeUsernameHandler = (evt) => {
        setLoginParams({
            ...loginParams,
            login: evt.target.value
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
                setIsLoading(true);

                const response = await postUserInfo(
                    urls.POST_USER_INFO_URL, 
                    loginParams
                );

                setIsLoading(false);

                if (response === 401) setWrongUsernamePasswordError(true);
                else {
                    const { token, id, firstName, role } = response.data.data;
                    const { message } = response.data;

                    if (message === "Success") {
                        localStorage.setItem("token", token);
                        localStorage.setItem("user_id", id);
                        localStorage.setItem("username", firstName);
                        localStorage.setItem("role", role);

                        dispatch(editID(id));
                        dispatch(editUsername(firstName));
                        dispatch(editRole(role));
                        dispatch(editToken(token));

                        navigate(paths.FUEL_TYPES);
                    } else {
                        throw new Error("Connection error!");
                    }
                }
            }
            loadUserData();
        } catch(err) {
            setOpenCloseErrorModal(true);
        }
    }

    const onClickHandler = async (evt) => {
        evt.preventDefault();

        setEmptyUsernameError(false);
        setEmptyPasswordError(false);
        setWrongUsernamePasswordError(false);

        if (!loginParams.login.length || !loginParams.password.length) {
            if (!loginParams.login.length) setEmptyUsernameError(true);
            if (!loginParams.password.length) setEmptyPasswordError(true);
        } else {
            makeCallForUserData();
        }
    }

    return (
        <>
            <form action="" className="login-form">
                <TextInput label={t("loginSection.username")}
                        size='normal'
                        width='250px'
                        onChangeHandler={onChangeUsernameHandler}
                        existsError={emptyUsernameError}
                        errorText={t("errors.emptyUsernameError")} />
                <TextInput label={t("loginSection.password")}
                        onChangeHandler={onChangePasswordHandler}
                        size="normal"
                        height="56px"
                        width='250px'
                        isPassword={true}
                        existsError={emptyPasswordError}
                        errorText={t("errors.emptyPasswordError")}
                        marginTop="15px"
                        passwordBgColor="rgb(235, 235, 235)" />
                <ForgotPassword />
                {wrongUsernamePasswordError &&
                    <div className="login-error-message-div">
                        <label style={{ color: colors.loginFailedColor }} className="login-error-message">{t("errors.wrongUsernamePassword")}</label>
                    </div>                    
                }
                {isLoading &&
                    <Loader position="absolute" 
                            height="200px" 
                            width="200px"
                            top="20%" />
                }
                <div className="login-button">
                    <Button type="submit" 
                        label={t("loginSection.login")}
                        width='250px'
                        height="40px"
                        borderRadius="0 25px 25px 25px"
                        fontSize="15px"
                        onClickHandler={onClickHandler}
                    />
                </div>
            </form>
            {openCloseErrorModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseErrorModal(false)} 
                                isOpen={openCloseErrorModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
        </>
    );
};

export default LoginForm;