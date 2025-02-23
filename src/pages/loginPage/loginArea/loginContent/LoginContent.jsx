import "./LoginContent.css";
import LoginForm from "../loginForm/LoginForm";
import { colors } from "../../../../assets/styles/colors";

const LoginContent = () => {
    return (
        <div style={{ backgroundColor: colors.loginBgColor }} className="login-content">
            <LoginForm />
        </div>
    );
};

export default LoginContent;