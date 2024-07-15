import "./ErrorModalBody.css";

const ErrorModalBody = () => {
    return (
        <div className="error-modal-body">
            <div className="error-modal-body-image-div">
                <img src={process.env.PUBLIC_URL + "server_connection_failed.svg"} alt="Connection failed" />
            </div>
            <div className="error-modal-body-text-div">
                <p>Server connection error!</p>
                <p>Please, try again!</p>
            </div>
        </div>
    );
};

export default ErrorModalBody;