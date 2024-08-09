import "./SearchSection.css";
import AddNewFueltype from "./addNewFuelType/AddNewFuelType";
import ButtonComponent from "../../../generalComponents/buttons/Button";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import { FileDownload } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { downloadCSV } from "../../../api/downloadCSV";
import { urls } from "../../../constants/urls/urls";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchSection = ({
    isFuelTypeChanged,
    setIsFuelTypeChanged
}) => {
    const [ isOpenAddModal, setIsOpenAddModal ] = useState(false);
    const [ showConnectionError, setShowConnectionError ] = useState(false);
    const { t } = useTranslation();

    const onCliCkExportBtn = async () => {
        setShowConnectionError(false);
        try {
            await downloadCSV(urls.DOWNLOAD_CSV_URL + "?downloadType=FuelType", "FuelTypes")
        } catch (err) {
            setShowConnectionError(true);
        }
    }

    return (
        <>
            <div className="fuel-types-search-area">
                <ButtonComponent label={t("operations.export")}
                                    startIcon={<FileDownload />}
                                    marginRight="15px"
                                    onClickHandler={onCliCkExportBtn} />
                <ButtonComponent label={t("fuelTypes.addChangeFuelType.addNewFuelType")}
                                    startIcon={<Add />}
                                    onClickHandler={() => setIsOpenAddModal(true)} />
            </div>
            {isOpenAddModal &&
                <ModalComponent onCloseHandler={() => setIsOpenAddModal(false)}
                                isOpen={isOpenAddModal}
                                title={t("fuelTypes.addChangeFuelType.addNewFuelType")}
                                body={<AddNewFueltype isFuelTypeChanged={isFuelTypeChanged}
                                                      setIsFuelTypeChanged={setIsFuelTypeChanged}
                                                      onCloseHandler={() => setIsOpenAddModal(false)} />} />
            }
            {showConnectionError &&
                <p className="fuel-types-connection-error-text">{t("errors.connectionError")}</p>
            }
        </>
    );
};

export default SearchSection;