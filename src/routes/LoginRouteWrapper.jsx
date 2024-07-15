import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const LoginRouteWrapper = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");

    if (token) {
        return <Navigate to="/terminals" />
    }

    return <Outlet />;
};

export default LoginRouteWrapper;