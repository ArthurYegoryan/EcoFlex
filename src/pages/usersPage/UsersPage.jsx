import "./UsersPage.css";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { getData } from "../../api/getData";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ users, setUsers ] = useState([]);
    const [ choosedUser, setChoosedUser ] = useState({});
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
    const [ isUserAdded, setIsUserAdded ] = useState(false);
    const [ isUserChanged, setIsUserChanged ] = useState(false);
    const [ isOpenChangeModal, setIsOpenChangeModal ] = useState(false);
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState(false);
    
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
        byFullName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "FullName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byRole: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Role",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "StationGroupName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byPhoneNumber: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "PhoneNumber",
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
        const getUsers = async () => {
            setShowLoading(true);
            const response = await getData(urls.USERS_URL + queryString);
            setShowLoading(false);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                list.map((user) => {
                    user.fullName = user.firstName + " " + user.lastName;

                    let stationsList = "";
                    user.stations.map((station) => {
                        stationsList += station.name + ", ";
                    });
                    user.stationsList = stationsList.length ? stationsList.slice(0, stationsList.length - 2) : stationsList;
                });

                setUsers(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        }
        getUsers();
    }, [queryFields, currentPage, isUserAdded, isUserChanged]);

    return (
        <div style={{ minWidth: "900px" }} className="users-page">
            {/* <SearchSection isStationsGroupAdded={isStationsGroupAdded}
                           setIsStationsGroupAdded={setIsStationsGroupAdded}
                           setSearchText={setSearchText}
                           isSearchClicked={isSearchClicked}
                           setIsSearchClicked={setIsSearchClicked} /> */}
            <Table whichTable={"users"}
                    datas={users}
                    setCurrentData={setChoosedUser}
                    onClickEditButton={() => setIsOpenChangeModal(true)}
                    filterHandlers={filterHandlers} />
            <div className="users-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {/* {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("stations.addChangeStation.changeStationData")}
                                body={<ChangeStationsGroup stationsGroupData={choosedStationsGroup}
                                                           isStationsGroupChanged={isStationsGroupChanged}
                                                           setIsStationsGroupChanged={setIsStationsGroupChanged}
                                                           onCloseHandler={() => setIsOpenChangeModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            } */}
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default UsersPage;