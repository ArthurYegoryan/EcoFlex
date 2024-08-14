import "./SearchSection.css";
import AddStation from "./addStation/AddStation";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ButtonComponent from "../../../../generalComponents/buttons/Button";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import SearchIcon from '@mui/icons-material/Search';
import { FileDownload } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { downloadCSV } from "../../../../api/downloadCSV";
import { urls } from "../../../../constants/urls/urls";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SearchSection = ({
    stationGroupId,
    allFuelTypes,
    isStationAdded,
    setIsStationAdded
}) => {
    const [ isOpenedAddStationModal, setIsOpenedAddStationModal ] = useState(false);
    const [ showConnectionError, setShowConnectionError ] = useState(false);
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    const onCliCkExportBtn = async () => {
        setShowConnectionError(false);
        try {
            await downloadCSV(urls.DOWNLOAD_CSV_STATIONS_URL, "Stations");
        } catch (err) {
            setShowConnectionError(true);
        }
    }

    return (
        <div className="stations-search-area">
            <TextInput label={t("searchSections.searchData")} />
            <ButtonComponent label={t("operations.search")}
                            startIcon={<SearchIcon />}
                            marginLeft={"15px"} />
            {role === "Admin" &&
                <ButtonComponent label={t("operations.export")}
                                startIcon={<FileDownload />}
                                marginLeft={"15px"}
                                onClickHandler={onCliCkExportBtn} />
            }
            {role === "Admin" &&
                <ButtonComponent label={t("stations.addChangeStation.addNewStation")}
                                startIcon={<Add />}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedAddStationModal(true)} />
            }
            {showConnectionError &&
                <p className="stations-connection-error-text">{t("errors.connectionError")}</p>
            }
            {isOpenedAddStationModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedAddStationModal(false)}
                                isOpen={isOpenedAddStationModal}
                                title={t("stations.addChangeStation.addNewStation")}
                                body={<AddStation stationGroupId={stationGroupId}
                                                  allFuelTypes={allFuelTypes}
                                                  isStationAdded={isStationAdded}
                                                  setIsStationAdded={setIsStationAdded}
                                                  onCloseHandler={() => setIsOpenedAddStationModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
        </div>
    );
};

export default SearchSection;