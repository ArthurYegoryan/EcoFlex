import './ForgotPassword.css';
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
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
                    {t("loginSection.forgotPassword")}
                </span>
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title={t("loginSection.forgotPassword")}
                                body={<ForgotPasswordBody onCloseHandler={() => setOpenCloseModal(false)} />}
                />
            }
        </>        
    );
};

export default ForgotPassword;