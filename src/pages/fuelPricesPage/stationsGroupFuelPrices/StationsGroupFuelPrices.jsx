import "./StationsGroupFuelPrices.css";
import SearchSection from "./stationsGroupFuelPricesSearch/StationsGroupFuelPricesSearch";
import ChangeStationFuelPrices from "./changeStationFuelPrices/ChangeStationFuelPrices";
import Table from "../../../generalComponents/table/Table";
import Pagination from "../../../generalComponents/pagination/Pagination";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
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
import { colors } from "../../../assets/styles/colors";

const StationsGroupFuelPrices = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;
    
    const url = window.location.href;
    const stationGroupId = Number(url.slice(url.lastIndexOf("/") + 1));

    const [ allFuelTypes, setAllFuelTypes ] = useState([]);
    const [ stations, setStations ] = useState([]);
    const [ choosedStation, setChoosedStation ] = useState({});
    const [ searchText, setSearchText ] = useState("");
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "PageSize": pageSize,
        "OrderDir": "Asc",
        "SearchText": ""
    });
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isSearchClicked, setIsSearchClicked ] = useState(false);
    const [ isGroupFuelPricesChanged, setIsGroupFuelPricesChanged ] = useState(Math.random());
    const [ isStationFuelPricesChanged, setIsStationFuelPricesChanged ] = useState(false);
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
    
    const queryString = `?OrderBy=${queryFields.OrderBy}&StationGroupId=${stationGroupId}` + 
                        `&PageIndex=${currentPage}&PageSize=${queryFields.PageSize}` + 
                        `&OrderDir=${queryFields.OrderDir}&SearchText=${queryFields.SearchText}`;

    useEffect(() => {
        if (searchText !== queryFields.SearchText) {
            setQueryFields({
                ...queryFields,
                SearchText: searchText
            });
        }
    }, [isSearchClicked]);

    useEffect(() => {
        const getStations = async () => {
            setShowLoading(true);
            const response = await getData(urls.STATIONS_URL + queryString);
            setShowLoading(false);

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
    }, [queryFields, currentPage, isGroupFuelPricesChanged, isStationFuelPricesChanged]);

    useEffect(() => {
        const getFuelTypes = async () => {
            setShowLoading(true);
            const response = await getData(urls.FUEL_TYPES_URL + "?PageSize=1000");
            setShowLoading(false);

            if (response.status === 200) {
                const { list } = response.data.data;
                setAllFuelTypes(list);
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        getFuelTypes();
    }, []);

    const makeDatasForTable = (datas) => {
        const dataForTable = [];

        datas.map((data) => {
            dataForTable.push({
                name: data.name,
                countType: data.countType,
                price: data.price,
            });
        });

        return dataForTable;
    };

    return (
        <div style={{ minWidth: "900px" }} className="stations-group-fuel-prices-page">
            <SearchSection stationGroupId={stationGroupId}
                           allFuelTypes={allFuelTypes}
                           setIsStationsGroupFuelPricesChanged={setIsGroupFuelPricesChanged}
                           setSearchText={setSearchText}
                           isSearchClicked={isSearchClicked}
                           setIsSearchClicked={setIsSearchClicked} />
            <p className="stations-group-fuel-prices-back-stations-groups-link"
                style={{
                    color: colors.linkColor
                }}
                onClick={() => {
                    navigate(paths.FUEL_PRICES);
                }}
            >
                {t("stations.returnStationsGroupPage")}
            </p>

            <Table whichTable={"stationsGroupFuelPrices"}
                    size="small"
                    datas={stations}
                    setCurrentData={setChoosedStation}
                    renderHandler={(value) => {
                        return <Table whichTable={"fuelTypesWithPrices"}
                                      size="small"
                                      datas={makeDatasForTable(value)} />
                    }}
                    onClickEditButton={() => setIsOpenChangeModal(true)}
                    filterHandlers={filterHandlers} />
            <div className="stations-group-fuel-prices-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("fuelPrices.changeStationFuelPrices")}
                                body={<ChangeStationFuelPrices station={choosedStation}
                                                                isStationFuelPricesChanged={isStationFuelPricesChanged}
                                                                setIsStationFuelPricesChanged={setIsStationFuelPricesChanged}
                                                                onCloseHandler={() => setIsOpenChangeModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default StationsGroupFuelPrices;