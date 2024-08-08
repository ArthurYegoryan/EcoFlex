import "./LogoutContainer.css";
import { paths } from "../../../../../../constants/paths/paths";
import { editToken } from "../../../../../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogoutContainer = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        localStorage.clear();
        dispatch(editToken(""));
        <Navigate to={paths.LOGIN} />
    };

    return (
        <div className="logout">
            <img src={process.env.PUBLIC_URL + "img/logout.svg"} 
                 alt="logout"
                 onClick={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;