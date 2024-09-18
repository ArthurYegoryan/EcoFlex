import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import MainPage from "../pages/mainPage/MainPage";

const ProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");

    if (!token) {
        return <Navigate to={paths.LOGIN} />
    }
    
    return (
        <MainPage />
    );
};

export default ProtectedRoute;