import "./LogoutContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
import { editToken } from "../../../../../../redux/slices/authSlice";
import { paths } from "../../../../../../constants/paths/paths";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const LogoutContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onClickHandler = () => {
        localStorage.clear();
        dispatch(editToken(""));

        navigate(paths.LOGIN);
    };

    return (
        <div className="logout">
            <img src={process.env.PUBLIC_URL + "img/logout.svg"} alt="logout" />
            <Button label={t("userSection.logout")} onClickHandler={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;