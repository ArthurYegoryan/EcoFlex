import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
import FuelTypesPage from "../pages/fuelTypesPage/FuelTypesPage";
import StationsGroupPage from "../pages/stationsGroupPage/StationsGroupPage";
import StationsPage from "../pages/stationsGroupPage/stationsPage/StationsPage";
import FuelPricesPage from "../pages/fuelPricesPage/FuelPricesPage";
import StationsGroupFuelPrices from "../pages/fuelPricesPage/stationsGroupFuelPrices/StationsGroupFuelPrices";
import DispensersPage from "../pages/dispensersPage/DispensersPage";
import UsersPage from "../pages/usersPage/UsersPage";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
import Error404Page from "../pages/error404Page/Error404Page";
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const role = useSelector((state) => state.auth.role) ?? localStorage.getItem("role");

    return (
        <Routes>
            <Route path={paths.LOGIN} element={<LoginRouteWrapper />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path={paths.MAIN} element={<ProtectedRoute />}>
                {
                    role === "Admin" ? <Route index element={<Navigate to={paths.FUEL_TYPES} />} /> :
                    role === "FuelSupervisor" ? <Route index element={<Navigate to={paths.STATIONS_GROUPS} />} /> : null
                }
                <Route path={paths.FUEL_TYPES} element={<FuelTypesPage />} />
                <Route path={paths.STATIONS_GROUPS} element={<StationsGroupPage />} />
                <Route path={paths.STATION} element={<StationsPage />} />
                <Route path={paths.FUEL_PRICES} element={<FuelPricesPage />} />
                <Route path={paths.STATIONS_GROUP_FUEL_PRICES} element={<StationsGroupFuelPrices />} />
                <Route path={paths.DISPENSERS} element={<DispensersPage />} />
                <Route path={paths.USERS} element={<UsersPage />} />
                <Route path={paths.TRANSACTIONS} element={<TransactionsPage />} />
                <Route path={paths.ANY} element={<Error404Page />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;