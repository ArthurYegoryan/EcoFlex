import "./StationsGroupSearchSection.css";
import AddStationGroup from "./addStationGroup/AddStationGroup";
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

const StationsGroupSearchSection = ({
    isStationsGroupAdded,
    setIsStationsGroupAdded,
    setSearchText,
    isSearchClicked,
    setIsSearchClicked
}) => {
    const [ isOpenedAddStationsGroupModal, setIsOpenedAddStationsGroupModal ] = useState(false);
    const [ showConnectionError, setShowConnectionError ] = useState(false);
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    const onCliCkExportBtn = async () => {
        setShowConnectionError(false);
        try {
            await downloadCSV(urls.DOWNLOAD_CSV_URL + "?downloadType=StationGroup", "StationsGroups");
        } catch (err) {
            setShowConnectionError(true);
        }
    }

    return (
        <div className="stations-groups-search-area">
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
                <ButtonComponent label={t("stationsGroup.addChangeStationsGroup.addNewStationsGroup")}
                                startIcon={<Add />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedAddStationsGroupModal(true)} />
            }
            {showConnectionError &&
                <p className="stations-group-connection-error-text">{t("errors.connectionError")}</p>
            }
            {isOpenedAddStationsGroupModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedAddStationsGroupModal(false)}
                                isOpen={isOpenedAddStationsGroupModal}
                                title={t("stationsGroup.addChangeStationsGroup.addNewStationsGroup")}
                                body={<AddStationGroup isStationsGroupAdded={isStationsGroupAdded}
                                                       setIsStationsGroupAdded={setIsStationsGroupAdded}
                                                       onCloseHandler={() => setIsOpenedAddStationsGroupModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
        </div>
    );
};

export default StationsGroupSearchSection;