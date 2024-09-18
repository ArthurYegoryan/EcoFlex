import "./WarningModalBody.css";
import Button from "../../buttons/Button";
import { colors } from "../../../assets/styles/colors";
import { useTranslation } from "react-i18next";

const WarningModalBody = ({
    warningTitle,
    warningText,
    onSaveHandler,
    onCloseHandler
}) => {
    const { t } = useTranslation();

    return (
        <div className="warning-modal-content">
            <h1>{warningTitle}</h1>
            <h3>{warningText}</h3>
            <div className="change-station-fuel-prices-buttons">
                <Button label={t("operations.save")}
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"30px"}
                        onClickHandler={onSaveHandler} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={onCloseHandler} />
            </div>
        </div>
    );
};

export default WarningModalBody;