import "./ChangePasswordContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button"; 
import ModalComponent from "../../../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import ChangePasswordBody from "./changePasswordBody/ChangePasswordBody";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const ChangePasswordContainer = () => {
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <div className="change-password">
                <Button label={t("userSection.changePassword")} 
                        marginRight="15px"
                        onClickHandler={() => setOpenCloseModal(true)} 
                />
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title={t("userSection.changePassword")}
                                body={<ChangePasswordBody onCloseHandler={() => setOpenCloseModal(false)} />}
                />
            }
        </>
    );
};

export default ChangePasswordContainer;