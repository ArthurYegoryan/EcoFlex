import './LoginArea.css';
import Logo from './logo/Logo';
import LoginContent from './loginContent/LoginContent';

const LoginArea = () => {
    return (
        <div className="login-area">
            <Logo />
            <LoginContent />
        </div>
    );
};

export default LoginArea;