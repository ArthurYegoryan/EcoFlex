import "./StationsGroupPage.css";
import TextInputComponent from "../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../generalComponents/buttons/Button";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination"
import Loader from "../../generalComponents/loaders/Loader";
import { getData } from "../../api/getData";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StationsGroupPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ stationsGroup, setStationsGroup ] = useState([]);
    const [ choosenStationsGroup, setChoosenStationsGroup ] = useState({});
    const [ showLoading, setShowLoading ] = useState(false);
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "PageSize": pageSize,
        "OrderDir": "Asc"
    });
    const [ isStationGroupChanged, setIsStationGroupChanged ] = useState(false);
    const [ isOpenChangeModal, setIsOpenChangeModal ] = useState(false);

    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    const filterHandlers = {
        byId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Id",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationsGroupName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Name",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationsGroupAddress: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Address",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationsGroupPhoneNumber: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "PhoneNumber",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        }
    };

    let queryString = `?OrderBy=${queryFields.OrderBy}&PageIndex=${currentPage}&PageSize=${queryFields.PageSize}&OrderDir=${queryFields.OrderDir}`;

    useEffect(() => {
        const callForStationGroups = async () => {
            setShowLoading(true);
            const response = await getData(urls.STATION_GROUPS_URL + queryString);
            setShowLoading(false);

            console.log("Response stations groups: ", response);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                setStationsGroup(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        callForStationGroups();
    }, [queryFields, currentPage, isStationGroupChanged]);

    return (
        <div style={{ minWidth: "900px" }} className="stations-group-page">
            <Table whichTable={"stationsGroup"}
                    datas={stationsGroup}
                    setCurrentData={setChoosenStationsGroup}
                    onClickEditButton={() => setIsOpenChangeModal(true)}
                    stationsGroupFilterHandlers={filterHandlers} />
            <div className="stations-group-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default StationsGroupPage;