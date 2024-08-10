import "./StationPage.css";
import Pagination from "../../../generalComponents/pagination/Pagination";
import { getData } from "../../../api/getData";
import { addNumeration } from "../../../utils/helpers/addNumeration";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { editToken } from "../../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StationPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;
    
    const url = window.location.href;
    const stationGroupId = Number(url.slice(url.lastIndexOf("/") + 1));

    const [ stations, setStations ] = useState([]);
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "PageSize": pageSize,
        "OrderDir": "Asc"
    });
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isStationChanged, setIsStationChanged ] = useState(false);
    const [ isOpenChangeModal, setIsOpenChangeModal ] = useState(false);
    const [ showLoading, setShowLoading ] = useState();

    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    const queryString = `?StationGroupId=${stationGroupId}`;

    useEffect(() => {
        const getStations = async () => {
            setShowLoading(true);
            const response = await getData(urls.STATIONS_URL + queryString);
            setShowLoading(true);

            console.log("Response: ", response);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                setStations(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        getStations();
    }, [queryFields, currentPage, isStationChanged]);

    return (
        <div>
            Station Page

            <div className="stations-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
        </div>
    );
};

export default StationPage;