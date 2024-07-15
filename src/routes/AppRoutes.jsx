import { Navigate, Route, Routes } from "react-router-dom";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
// import TerminalsPage from "../pages/terminalsPage/TerminalsPage";
// import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
// import UsersPage from "../pages/usersPage/UsersPage";
// import BanksPage from "../pages/banksPage/BanksPage";
// import ErrorPage from "../pages/errorPage/ErrorPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginRouteWrapper />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path="/" element={<ProtectedRoute />}>
                {/* <Route index element={<Navigate to="/terminals" />} />
                <Route path="/terminals" element={<TerminalsPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/*" element={<ErrorPage />} /> */}
            </Route>
        </Routes>
    );
};

export default AppRoutes;