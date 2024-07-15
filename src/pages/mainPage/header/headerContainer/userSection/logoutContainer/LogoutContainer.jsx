import "./LogoutContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
// import { editToken } from "../../../../../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

const LogoutContainer = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onClickHandler = () => {
        localStorage.clear();
        // dispatch(editToken(""));
        <Navigate to="/login" />
    };

    return (
        <div className="logout">
            <img src={process.env.PUBLIC_URL + "img/logout.svg"} alt="logout" />
            <Button label={t("userSection.logout")} onClickHandler={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;