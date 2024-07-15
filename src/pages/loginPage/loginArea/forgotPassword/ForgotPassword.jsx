import './ForgotPassword.css';
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import ForgotPasswordBody from "./forgotPasswordBody/ForgotPasswordBody";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <div className="forgot-password">
                <span className="forgot-password-text"
                    onClick={() => setOpenCloseModal(true)}
                >
                    {t("userSection.forgotPassword")}
                </span>
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title={t("userSection.forgotPassword")}
                                body={<ForgotPasswordBody onCloseHandler={() => setOpenCloseModal(false)} />}
                />
            }
        </>        
    );
};

export default ForgotPassword;