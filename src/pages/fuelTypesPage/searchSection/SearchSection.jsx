import "./SearchSection.css";
import ButtonComponent from "../../../generalComponents/buttons/Button";
import { FileDownload } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SearchSection = () => {
    const { t } = useTranslation();

    return (
        <div className="fuel-types-search-area">
            <ButtonComponent label={t("operations.export")}
                             startIcon={<FileDownload />}
                             marginRight="15px" />
            <ButtonComponent label={t("fuelTypesTable.addChangeFuelType.addNewFuelType")}
                             startIcon={<Add />} />
        </div>
    );
};

export default SearchSection;