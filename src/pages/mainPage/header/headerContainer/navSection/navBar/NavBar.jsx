import "./NavBar.css";
import LogoComponent from "../../../../../../generalComponents/logoComponent/LogoComponent";
import NavLinks from "./navLinks/NavLinks";
import { colors } from "../../../../../../constants/styles/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMenuStatusFalse, editMenuStatusTrue } from "../../../../../../redux/slices/menuSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const [ burgerClass, setBurgerClass ] = useState("burger-bar clicked");
    const [ menuClass, setMenuClass ] = useState("menu visible");
    const [ isMenuClicked, setIsMenuClicked ] = useState(true);

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
            dispatch(editMenuStatusFalse());
        } else {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
            dispatch(editMenuStatusTrue());
        }
        setIsMenuClicked(!isMenuClicked);
        
    }
    
    return (
        <div className="nav-bar">
            <div style={{ backgroundColor: colors.burgerMenuIconColor }} className={menuClass}>
                <LogoComponent className="logo-nav-bar"
                               width="235px"/>
                <NavLinks />
            </div>
            <div className="burger-menu" style={{ backgroundColor: colors.burgerMenuIconBgColor }} onClick={updateMenu}>
                <div style={{ backgroundColor: colors.burgerMenuIconColor }} className={burgerClass}></div>
                <div style={{ backgroundColor: colors.burgerMenuIconColor }} className={burgerClass}></div>
                <div style={{ backgroundColor: colors.burgerMenuIconColor }} className={burgerClass}></div>
            </div>           
        </div>
    );
};

export default NavBar;