import { NavLink } from "react-router-dom";
import "./LinkComponent.css";

const LinkComponent = ({
    routePath,
    label
}) => {
    return (
        <li className="link-component">
            <NavLink to={routePath} className="route-link">
                <b>{label}</b>
            </NavLink>
        </li>       
    );
};

export default LinkComponent;