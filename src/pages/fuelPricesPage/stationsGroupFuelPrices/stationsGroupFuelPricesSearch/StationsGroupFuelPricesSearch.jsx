import "./StationsGroupFuelPricesSearch.css";
import ChangeStationsGroupFuelPrices from "./changeStationsGroupFuelPrices/ChangeStationsGroupFuelPrices";
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
    isStationsGroupFuelTypesChanged,
    setIsStationsGroupFuelTypesChanged,
    setSearchText,
    isSearchClicked,
    setIsSearchClicked
}) => {
    const [ isOpenedChangeStationsGroupFuelPricesModal, setIsOpenedChangeStationsGroupFuelPricesModal ] = useState(false);
    const [ isOpenedAddStationsGroupDiscountsModal, setIsOpenedAddStationsGroupDiscountsModal ] = useState(false);
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
            <TextInput label={t("searchSections.searchData")}
                       onChangeHandler={(e) => setSearchText(e.target.value.trim())} />
            <ButtonComponent label={t("operations.search")}
                            startIcon={<SearchIcon />}
                            height={"30px"}
                            marginTop={"5px"}
                            marginLeft={"15px"}
                            onClickHandler={() => setIsSearchClicked(!isSearchClicked)} />
            {(role === "Admin" || role === "FuelSupervisor") &&
                <ButtonComponent label={t("operations.export")}
                                startIcon={<FileDownload />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={onCliCkExportBtn} />
            }
            {(role === "Admin" || role === "FuelSupervisor") &&
                <ButtonComponent label={t("fuelPrices.changeAllFuelPricesOfStationsGroup")}
                                startIcon={<Add />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedChangeStationsGroupFuelPricesModal(true)} />
            }
            {(role === "Admin" || role === "FuelSupervisor") &&
                <ButtonComponent label={t("fuelPrices.addAllDiscountsOfStationsGroup")}
                                startIcon={<Add />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedAddStationsGroupDiscountsModal(true)} />
            }
            {showConnectionError &&
                <p className="stations-connection-error-text">{t("errors.connectionError")}</p>
            }
            {isOpenedChangeStationsGroupFuelPricesModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedChangeStationsGroupFuelPricesModal(false)}
                                isOpen={isOpenedChangeStationsGroupFuelPricesModal}
                                title={t("fuelPrices.changeAllFuelPricesOfStationsGroup")}
                                body={<ChangeStationsGroupFuelPrices 
                                            stationGroupId={stationGroupId}
                                            allFuelTypes={allFuelTypes}
                                            isStationsGroupFuelTypesChanged={isStationsGroupFuelTypesChanged}
                                            setStationsGroupFuelTypesChanged={setIsStationsGroupFuelTypesChanged}
                                            onCloseHandler={() => setIsOpenedChangeStationsGroupFuelPricesModal(false)} />}
                                bodyMaxHeight={"700px"}
                                closeImageUrl="../img/x.svg" />
            }
            {isOpenedAddStationsGroupDiscountsModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedAddStationsGroupDiscountsModal(false)}
                                isOpen={isOpenedAddStationsGroupDiscountsModal}
                                title={t("fuelPrices.addAllDiscountsOfStationsGroup")}
                                body={<ChangeStationsGroupFuelPrices 
                                            stationGroupId={stationGroupId}
                                            allFuelTypes={allFuelTypes}
                                            isStationsGroupFuelTypesChanged={isStationsGroupFuelTypesChanged}
                                            setStationsGroupFuelTypesChanged={setIsStationsGroupFuelTypesChanged}
                                            onCloseHandler={() => setIsOpenedChangeStationsGroupFuelPricesModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
        </div>
    );
};

export default SearchSection;