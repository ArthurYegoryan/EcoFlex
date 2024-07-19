import './LoginContainer.css';
import LoginArea from './loginArea/LoginArea';
import { colors } from '../../constants/styles/colors';

const LoginContainer = () => {
    return (
        <div style={{ backgroundColor: colors.loginBgColor }} className="login-container">
            <LoginArea />
        </div>       
    );
};

export default LoginContainer;