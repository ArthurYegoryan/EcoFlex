import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";

const ProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />
    }
    
    return (
        <MainPage />
    );
};

export default ProtectedRoute;