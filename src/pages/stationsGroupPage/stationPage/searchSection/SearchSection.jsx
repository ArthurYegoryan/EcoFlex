import "./SearchSection.css";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ButtonComponent from "../../../../generalComponents/buttons/Button";
import SearchIcon from '@mui/icons-material/Search';
import { FileDownload } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SearchSection = () => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    return (
        <div className="stations-search-area">
            <TextInput label={t("searchSections.searchData")} />
            <ButtonComponent label={t("operations.search")}
                            startIcon={<SearchIcon />}
                            marginLeft={"15px"} />
            {role === "Admin" &&
                <ButtonComponent label={t("operations.export")}
                                startIcon={<FileDownload />}
                                marginLeft={"15px"} />
            }
            {role === "Admin" &&
                <ButtonComponent label={t("stations.addChangeStation.addNewStation")}
                                startIcon={<Add />}
                                marginLeft={"15px"} />
            }
        </div>
    );
};

export default SearchSection;