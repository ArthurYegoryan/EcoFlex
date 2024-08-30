import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../constants/paths/paths";

const LoginRouteWrapper = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");
    const role = useSelector((state) => state.auth.role) ?? localStorage.getItem("role");

    if (token) {
        if (role === "Admin") return <Navigate to={paths.FUEL_TYPES} />
        else if (role === "FuelSupervisor") return <Navigate to={paths.STATIONS_GROUPS} />
    }

    return <Outlet />;
};

export default LoginRouteWrapper;