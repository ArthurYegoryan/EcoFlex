import "./TransactionsPage.css";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { makeTransactionsForView } from "../../utils/helpers/makeTransactionsForView";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { getData } from "../../api/getData";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ transactions, setTransactions ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "TransactionType": "",
        "StartDate": "",
        "EndDate": "",
        "FuelTypeId": "",
        "PageSize": pageSize,
        "OrderDir": "Desc",
        "SearchText": ""
    });
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isSearchClicked, setIsSearchClicked ] = useState(false);
    const [ showLoader, setShowLoader ] = useState(false);

    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                "OrderBy": "YandexTransactionId",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byTransactionType: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "TransactionType",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byTransactionDate: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "TransactionDate",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStation: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "StationName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byTin: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Tin",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byStationGroup: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "StationGroupName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byFuelType: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "FuelTypeName",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byFuelSize: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "FuelSize",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byAmount: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Amount",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byTransactionStatus: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "CurrentTransactionStatus",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byEcrStatus: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "CurrentTaxStatus",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byReceiptId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "ReceiptId",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
    };

    const queryString = `?OrderBy=${queryFields.OrderBy}&TransactionType=${queryFields.TransactionType}` +
                        `&StartDate=${queryFields.StartDate}&EndDate=${queryFields.EndDate}&FuelTypeId=${queryFields.FuelTypeId}` + 
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
        const getTransactions = async () => {
            setShowLoader(true);
            const response = await getData(urls.TRANSACTIONS_URL + queryString);
            setShowLoader(false);

            if (response.status === 200) {
                const { list, count, rowsPerPage } = response.data.data;

                setTransactions(makeTransactionsForView(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count)));
                setPageCount(Math.ceil(count/rowsPerPage));
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN)
            }
        }
        getTransactions();
    }, [queryFields, currentPage]);

    return (
        <div className="transactions-page">
            <Table whichTable={"transactions"}
                   size="small"
                   datas={transactions}
                   filterHandlers={filterHandlers}
                   scroll={true}
                   windowHeight={windowHeight}
                   minWidth={"1600px"} />
            <div className="transactions-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {showLoader &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsPage;