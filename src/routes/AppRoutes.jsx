import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
import FuelTypesPage from "../pages/fuelTypesPage/FuelTypesPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.LOGIN} element={<LoginRouteWrapper />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path={paths.MAIN} element={<ProtectedRoute />}>
                <Route index element={<Navigate to={paths.FUEL_TYPES} />} />
                <Route path={paths.FUEL_TYPES} element={<FuelTypesPage />} />
                {/* <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/*" element={<ErrorPage />} /> */}
            </Route>
        </Routes>
    );
};

export default AppRoutes;