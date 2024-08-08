import "./StationGroupsPage.css";
import TextInputComponent from "../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../generalComponents/buttons/Button";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination"
import Loader from "../../generalComponents/loaders/Loader";
import { getData } from "../../api/getData";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const StationGroupsPage = () => {
    const [ showLoading, setShowLoading ] = useState(false);

    const { isMenuOpen } = useSelector((state) => state.menu);
    const { t } = useTranslation();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        const callForStationGroups = async () => {
            const response = await getData(urls.STATION_GROUPS_URL);

            console.log("Response: ", JSON.stringify(response, null, 2));
        };
        callForStationGroups();
    }, []);

    return (
        <div>StationGroupsPage</div>
    );
};

export default StationGroupsPage;