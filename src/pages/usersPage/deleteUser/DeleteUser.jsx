import "./DeleteUser.css";
import Button from "../../../generalComponents/buttons/Button";
// import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import { deleteData } from "../../../api/deleteData";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { editToken } from "../../../redux/slices/authSlice";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DeleteUser = ({ 
    user, 
    setIsUserDeleted,
    isUserDeleted,
    onCloseHandler 
}) => {
    // const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onDeleteClickHandler = async () => {
        const response = await deleteData(urls.USERS_URL, user.id);

        if (response.status === 200) {
            setIsUserDeleted(!isUserDeleted);
            onCloseHandler();
            // setShowSuccessAnimation(true);
            // setTimeout(() => {
            //     onCloseHandler();
            // }, 2500);
        } else if (response.status === 401) {
            localStorage.clear();
            dispatch(editToken(""));
    
            navigate(paths.LOGIN);
        }
    };

    return (
        <div className="delete-user-content">
            <p>{t("generalQuestionsTexts.doYouWantDelete")} <b>{user.fullName}</b> {t("users.deleteUser.userData")}</p>
            <div className="delete-user-buttons">
                <Button label={t("operations.delete")} 
                        color={colors.successCancelColor}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.whiteColor}
                        hoverColor={colors.whiteHoverColor}
                        color={colors.cancelBgColor}
                        onClickHandler={() => onCloseHandler()} />
            </div>
            {/* {showSuccessAnimation &&
                <SuccessAnimation />
            } */}
        </div>
    )
};

export default DeleteUser;