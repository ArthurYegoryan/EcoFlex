import "./UserSection.css";
import LanguageContainer from "./languageContainer/LanguageContainer";
import UserContainer from "./userContainer/UserContainer";
import ChangePasswordContainer from "./changePasswordContainer/ChangePasswordContainer";
import LogoutContainer from "./logoutContainer/LogoutContainer";

const UserSection = () => {
    return (
        <div className="user-section">
            <LanguageContainer />
            <UserContainer />
            <ChangePasswordContainer />
            <LogoutContainer />
        </div>
    );
};

export default UserSection;