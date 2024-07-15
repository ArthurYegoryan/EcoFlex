import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./MainPage.css";
import { useSelector } from "react-redux";

const MainPage = () => {
    const { isMenuOpen } = useSelector((state) => state.menu);
    let className = "";

    if (isMenuOpen) {
        className = "main-left-margin";
    }

    return (
        <div className="main-page">
            <Header />
            <main className={`main-section ${className}`}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainPage;