import "./StationPage.css";
import Table from "../../../generalComponents/table/Table";
import Pagination from "../../../generalComponents/pagination/Pagination";
import Loader from "../../../generalComponents/loaders/Loader";
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
    const [ choosedStation, setChoosedStation ] = useState({});
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
    
    const filterHandlers = {
        byId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Id",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byYandexId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "YandexStationId",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Name",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationAddress: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Address",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationPhoneNumber: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "PhoneNumber",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationTin: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "TIN",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        }
    };
    
    const queryString = `?OrderBy=${queryFields.OrderBy}&StationGroupId=${stationGroupId}&PageIndex=${currentPage}&PageSize=${queryFields.PageSize}&OrderDir=${queryFields.OrderDir}`;

    useEffect(() => {
        const getStations = async () => {
            setShowLoading(true);
            const response = await getData(urls.STATIONS_URL + queryString);
            setShowLoading(false);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                list.map((item) => {
                    const itemFuelTypesList = [];
                    item.fuelTypes.map((itemFuelType) => {
                        itemFuelTypesList.push(`${itemFuelType.name} (${itemFuelType.countType}) \n`);
                    });
                    item.fuelTypes = itemFuelTypesList;
                });

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
        <div style={{ minWidth: "900px" }} className="stations-group-page">
            Station Page

            <Table whichTable={"stations"}
                    datas={stations}
                    setCurrentData={setChoosedStation}
                    onClickEditButton={() => setIsOpenChangeModal(true)}
                    stationsFilterHandlers={filterHandlers} />
            <div className="stations-page-pagination">
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

export default StationPage;