import { useSelector } from "react-redux";
import LinkComponent from "../../../../../../../generalComponents/links/LinkComponent";
import "./NavLinks.css";
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    return (
        <nav className="nav-links">
            <ul className="nav-ul">
                <LinkComponent routePath="/terminals" 
                               label={t("nav.terminals")} 
                               imageName="img/terminal" 
                               imageType=".svg" />
                <LinkComponent routePath="/transactions" 
                               label={t("nav.transactions")}
                               imageName="img/transaction"
                               imageType=".svg" />
                {(role === "admin" || role === "bank") &&
                    <LinkComponent routePath="/users" 
                                label={t("nav.users")}
                                imageName="img/users"
                                imageType=".svg" /> 
                }
                {role === "admin" &&
                    <LinkComponent routePath="/banks" 
                                label={t("nav.banks")}
                                imageName="img/bank"
                                imageType=".svg" />
                }
                        
            </ul>
        </nav>
    );
};

export default NavLinks;