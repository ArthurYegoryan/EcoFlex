import "./Error404Page.css";
import ButtonComponent from "../../generalComponents/buttons/Button";
import { paths } from "../../constants/paths/paths";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Error404Page = () => {
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");

    const onClickHandler = () => {
        if (role === "Admin") navigate(paths.FUEL_TYPES);
        else if (role === "FuelSupervisor") navigate(paths.STATIONS);
    };

    return (
        <div className="not-found-page">
            <div className="not-found-div">
                <div className="error-404-div">
                    <h1>404</h1>
                </div>
                <h2>OOPS! PAGE NOT BE FOUND</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                <div className="home-button-div">
                    <ButtonComponent label="Home page"
                                     hoverColor="#E1C700"
                                     onClickHandler={onClickHandler} />
                </div>
            </div>
        </div>
    );
};

export default Error404Page;