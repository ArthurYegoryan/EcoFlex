import "./NavLinks.css";
import LinkComponent from "../../../../../../../generalComponents/links/LinkComponent";
import { paths } from "../../../../../../../constants/paths/paths";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    return (
        <nav className="nav-links">
            <ul className="nav-ul">
                {role === "Admin" &&
                    <LinkComponent routePath={paths.FUEL_TYPES}
                                   label={t("nav.fuelTypes")} />
                }                
                <LinkComponent routePath={paths.STATIONS} 
                               label={t("nav.stationGroups")} />
                <LinkComponent routePath={paths.FUEL_PRICES} 
                               label={t("nav.fuelPrices")} />
                {role === "Admin" &&
                    <>
                        <LinkComponent routePath={paths.DISPENSERS} 
                                       label={t("nav.dispensers")} />
                        <LinkComponent routePath={paths.USERS} 
                                       label={t("nav.users")} />
                    </>                    
                }                
                <LinkComponent routePath={paths.TRANSACTIONS} 
                               label={t("nav.transactions")} />
            </ul>
        </nav>
    );
};

export default NavLinks;