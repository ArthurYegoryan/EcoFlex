import "./SuccessModal.css";

const SuccessModal = ({
    width = "200",
    height = "200"
}) => {
    return (
        <div className="success-modal-content">
            <svg width={width} height={height}>
                <circle
                    fill="none"
                    stroke="#68E534"
                    stroke-width="10"
                    cx="300"
                    cy="100"
                    r="90"
                    // stroke-width="20"
                    // cx="200"
                    // cy="200"
                    // r="190"
                    strokeLinecap="round"
                    transform="rotate(-90 200 200)"
                    className="success-modal-circle"
                />
                <polyline
                    fill="none"
                    stroke="#68E534"
                    points="50,110 90,140 150,76"
                    strokeWidth="12"
                    // points="88,214 173,284 304,138"
                    // strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="success-modal-tick"
                />
            </svg>
        </div>
    );
};

export default SuccessModal;