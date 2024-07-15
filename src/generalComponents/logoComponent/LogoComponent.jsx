import './LogoComponent.css';

const LogoComponent = ({
    className = "",
    width = "320px"
}) => {
    return (
        <div className={`logo ${className}`}
             style={{width: width}}
        >
            <img src={process.env.PUBLIC_URL + 'img/logo.svg'} alt="Logo" />
        </div>
    );
};

export default LogoComponent;