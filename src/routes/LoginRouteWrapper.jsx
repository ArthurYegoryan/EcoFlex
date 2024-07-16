import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../constants/paths/paths";

const LoginRouteWrapper = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");

    if (token) {
        return <Navigate to={paths.FUEL_TYPES} />
    }

    return <Outlet />;
};

export default LoginRouteWrapper;