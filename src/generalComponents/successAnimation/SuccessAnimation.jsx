import "./SuccessAnimation.css";

const SuccessAnimation = ({
    width = "100",
    height = "100"
}) => {
    return (
        <div className="success-modal-content">
            <svg width={width} height={height}>
                <circle
                    fill="none"
                    stroke="#68E534"
                    stroke-width="8"
                    cx="350"
                    cy="50"
                    r="45"
                    strokeLinecap="round"
                    transform="rotate(-90 200 200)"
                    className="success-modal-circle"
                />
                <polyline
                    fill="none"
                    stroke="#68E534"
                    points="23,55 47,80 77,35"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="success-modal-tick"
                />
            </svg>
        </div>
    );
};

export default SuccessAnimation;