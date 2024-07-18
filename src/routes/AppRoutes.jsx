import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
import FuelTypesPage from "../pages/fuelTypesPage/FuelTypesPage";
import StationGroupsPage from "../pages/stationGroupsPage/StationGroupsPage";
import FuelPricesPage from "../pages/fuelPricesPage/FuelPricesPage";
import DispensersPage from "../pages/dispensersPage/DispensersPage";
import UsersPage from "../pages/usersPage/UsersPage";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
import Error404Page from "../pages/error404Page/Error404Page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.LOGIN} element={<LoginRouteWrapper />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path={paths.MAIN} element={<ProtectedRoute />}>
                <Route index element={<Navigate to={paths.FUEL_TYPES} />} />
                <Route path={paths.FUEL_TYPES} element={<FuelTypesPage />} />
                <Route path={paths.STATIONS} element={<StationGroupsPage />} />
                <Route path={paths.FUEL_PRICES} element={<FuelPricesPage />} />
                <Route path={paths.DISPENSERS} element={<DispensersPage />} />
                <Route path={paths.USERS} element={<UsersPage />} />
                <Route path={paths.TRANSACTIONS} element={<TransactionsPage />} />
                <Route path={paths.ANY} element={<Error404Page />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;