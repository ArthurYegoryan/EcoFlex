import "./DispensersPage.css";
import SearchSection from "./dispensersSearchSection/DispensersSearchSection";
import ChangeDispenser from "./changeDispenser/ChangeDispenser";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import Loader from "../../generalComponents/loaders/Loader";
import { getData } from "../../api/getData";
import { makeDispensersForView } from "../../utils/helpers/makeDispensersForView";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

const DispensersPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ stationsGroups, setStationsGroups ] = useState([]);
    const [ stations, setStations ] = useState([]);
    const [ allFuelTypes, setAllFuelTypes ] = useState([]);
    const [ dispensers, setDispensers ] = useState([]);
    const [ choosedDispenser, setChoosedDispenser ] = useState({});
    const [ showLoading, setShowLoading ] = useState(false);
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isSearchClicked, setIsSearchClicked ] = useState(false);
    const [ searchText, setSearchText ] = useState("");
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "PageSize": pageSize,
        "OrderDir": "Asc",
        "SearchText": "",
    });
    const [ isDispenserAdded, setIsDispenserAdded ] = useState(false);
    const [ isDispenserChanged, setIsDispenserChanged ] = useState(false);
    const [ isOpenChangeModal, setIsOpenChangeModal ] = useState(false);

    const { isMenuOpen } = useSelector((state) => state.menu);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        bySerialNumber: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "SerialNumber",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byYandexDispenserId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "YandexDispenserId",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "StationName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationGroupName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "StationGroupName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        }
    };

    let queryString = `?OrderBy=${queryFields.OrderBy}&PageIndex=${currentPage}` + 
                      `&PageSize=${queryFields.PageSize}&OrderDir=${queryFields.OrderDir}` +
                      `&SearchText=${queryFields.SearchText}`;

    useEffect(() => {
        if (searchText !== queryFields.SearchText) {
            setQueryFields({
                ...queryFields,
                SearchText: searchText
            });
        }
    }, [isSearchClicked]);

    useEffect(() => {
        const callForDispensers = async () => {
            setShowLoading(true);
            const response = await getData(urls.DISPENSERS_URL + queryString);
            setShowLoading(false);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                setDispensers(makeDispensersForView(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count)));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        callForDispensers();
    }, [queryFields, currentPage, isDispenserAdded, isDispenserChanged]);

    useEffect(() => {
        const callForStationsGroupsFuelTypes = async () => {
            setShowLoading(true);
            const responseStationsGroups = await getData(urls.STATION_GROUPS_URL + "?PageSize=1000");
            const responseStations = await getData(urls.STATIONS_URL + "?PageSize=1000");
            const responseFuelTypes = await getData(urls.FUEL_TYPES_URL + "?PageSize=1000");
            setShowLoading(false);

            if (responseStationsGroups.status === 200 &&
                responseStations.status === 200 &&
                responseFuelTypes.status === 200
            ) {
                setStationsGroups(responseStationsGroups.data.data.list);
                setStations(responseStations.data.data.list);
                setAllFuelTypes(responseFuelTypes.data.data.list);
            } else if (responseStationsGroups.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        };
        callForStationsGroupsFuelTypes();
    }, []);

    return (
        <div style={{ minWidth: "750px" }} className="dispensers-page">
            <SearchSection stationsGroups={stationsGroups}
                           stations={stations}
                           allFuelTypes={allFuelTypes}
                           isDispenserAdded={isDispenserAdded}
                           setIsDispenserAdded={setIsDispenserAdded}
                           setSearchText={setSearchText}
                           isSearchClicked={isSearchClicked}
                           setIsSearchClicked={setIsSearchClicked} />
            <Table whichTable={"dispensers"}
                   datas={dispensers}
                   setCurrentData={setChoosedDispenser}
                   size="small"
                   onClickEditButton={() => setIsOpenChangeModal(true)}
                   filterHandlers={filterHandlers}
                   scrollX={true}
                   minWidth={"1500px"} />
            <div className="dispensers-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("dispensers.addChangeDispenser.changeDispenser")}
                                body={<ChangeDispenser dispenserData={choosedDispenser}
                                                        stationsGroups={stationsGroups}
                                                        stations={stations}
                                                        allFuelTypes={allFuelTypes}
                                                        isDispenserChanged={isDispenserChanged}
                                                        setIsDispenserChanged={setIsDispenserChanged}
                                                        onCloseHandler={() => setIsOpenChangeModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default DispensersPage;