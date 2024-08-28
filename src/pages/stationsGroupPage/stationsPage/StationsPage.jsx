import "./StationsPage.css";
import SearchSection from "./stationsSearchSection/StationsSearchSection";
import ChangeStation from "./changeStation/ChangeStation";
import Table from "../../../generalComponents/table/Table";
import Pagination from "../../../generalComponents/pagination/Pagination";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import Loader from "../../../generalComponents/loaders/Loader";
import { getData } from "../../../api/getData";
import { addNumeration } from "../../../utils/helpers/addNumeration";
import { makeFuelTypesList } from "../../../utils/helpers/makeFuelTypesList";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { editToken } from "../../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../../../assets/styles/colors";

const StationPage = () => {
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
    const [ isStationAdded, setIsStationAdded ] = useState(false);
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
                const listForView = makeFuelTypesList(list);

                setStations(addNumeration(listForView, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        getStations();
    }, [queryFields, currentPage, isStationAdded, isStationChanged]);

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

    return (
        <div style={{ minWidth: "800px" }} className="stations-page">
            <SearchSection stationGroupId={stationGroupId}
                           allFuelTypes={allFuelTypes}
                           isStationAdded={isStationAdded}
                           setIsStationAdded={setIsStationAdded}
                           setSearchText={setSearchText}
                           isSearchClicked={isSearchClicked}
                           setIsSearchClicked={setIsSearchClicked} />
            <p className="stations-back-stations-groups-link"
                style={{
                    color: colors.linkColor
                }}
                onClick={() => {
                    navigate(paths.STATIONS_GROUPS)
                }}
            >
                {t("stations.returnStationsGroupPage")}
            </p>

            <Table whichTable={"stations"}
                    size="small"
                    datas={stations}
                    setCurrentData={setChoosedStation}                    
                    onClickEditButton={() => setIsOpenChangeModal(true)}
                    stationsFilterHandlers={filterHandlers}
                    scrollBoth={true}
                    minWidth={"1500px"} />
            <div className="stations-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("stations.addChangeStation.changeStationData")}
                                body={<ChangeStation stationGroupId={stationGroupId}
                                                     stationData={choosedStation}
                                                     isStationChanged={isStationChanged}
                                                     setIsStationChanged={setIsStationChanged}
                                                     allFuelTypes={allFuelTypes}
                                                     onCloseHandler={() => setIsOpenChangeModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default StationPage;