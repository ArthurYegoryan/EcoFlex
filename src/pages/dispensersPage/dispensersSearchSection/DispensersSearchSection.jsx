import "./DispensersSearchSection.css";
import AddDispenser from "./addDispenser/AddDispenser";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ButtonComponent from "../../../generalComponents/buttons/Button";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import SearchIcon from '@mui/icons-material/Search';
import { FileDownload } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { downloadCSV } from "../../../api/downloadCSV";
import { urls } from "../../../constants/urls/urls";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const DispensersSearchSection = ({
    stationsGroups,
    stations,
    allFuelTypes,
    isDispenserAdded,
    setIsDispenserAdded,
    setSearchText,
    isSearchClicked,
    setIsSearchClicked
}) => {
    const [ isOpenedAddDispenserModal, setIsOpenedAddDispenserModal ] = useState(false);
    const [ showConnectionError, setShowConnectionError ] = useState(false);
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    const onCliCkExportBtn = async () => {
        setShowConnectionError(false);
        try {
            await downloadCSV(urls.DOWNLOAD_CSV_URL + "?downloadType=Dispenser", "Dispensers");
        } catch (err) {
            setShowConnectionError(true);
        }
    }

    return (
        <div className="dispensers-search-area">
            <TextInput label={t("searchSections.searchData")}
                        onChangeHandler={(e) => setSearchText(e.target.value.trim())} />
            <ButtonComponent label={t("operations.search")}
                            startIcon={<SearchIcon />}
                            height={"30px"}
                            marginTop={"5px"}
                            marginLeft={"15px"}
                            onClickHandler={() => setIsSearchClicked(!isSearchClicked)} />
            {role === "Admin" &&
                <ButtonComponent label={t("operations.export")}
                                startIcon={<FileDownload />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={onCliCkExportBtn} />
            }
            {role === "Admin" &&
                <ButtonComponent label={t("dispensers.addChangeDispenser.addNewDispenser")}
                                startIcon={<Add />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedAddDispenserModal(true)} />
            }
            {showConnectionError &&
                <p className="dispensers-connection-error-text">{t("errors.connectionError")}</p>
            }
            {isOpenedAddDispenserModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedAddDispenserModal(false)}
                                isOpen={isOpenedAddDispenserModal}
                                title={t("dispensers.addChangeDispenser.addNewDispenser")}
                                body={<AddDispenser stationsGroups={stationsGroups}
                                                    stations={stations}
                                                    allFuelTypes={allFuelTypes}
                                                    isDispenserAdded={isDispenserAdded}
                                                    setIsDispenserAdded={setIsDispenserAdded}
                                                    onCloseHandler={() => setIsOpenedAddDispenserModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
        </div>
    );
};

export default DispensersSearchSection;