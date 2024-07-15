import { NavLink } from "react-router-dom";
import "./LinkComponent.css";

const LinkComponent = ({
    routePath,
    label,
    imageName,
    imageType
}) => {
    return (
        <li className="link-component">
            <NavLink to={routePath} className="route-link">
                <img src={process.env.PUBLIC_URL + imageName + imageType} alt={imageName} />
                {label}
            </NavLink>
        </li>       
    );
};

export default LinkComponent;