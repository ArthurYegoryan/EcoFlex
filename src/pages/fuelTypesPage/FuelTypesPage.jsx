import "./FuelTypesPage.css";
import SearchSection from "./fuelTypesSearchSection/FuelTypesSearchSection";
import ChangeFueltype from "./changeFuelType/ChangeFuelType";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import { getData } from "../../api/getData";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { paths } from "../../constants/paths/paths";
import { urls } from "../../constants/urls/urls";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FuelTypesPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ fuelTypes, setFuelTypes ] = useState([]);
    const [ choosedFuelType, setChoosedFuelType ] = useState({});
    const [ showLoading, setShowLoading ] = useState(false);
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ queryFields, setQueryFields ] = useState({
        "OrderBy": "Id",
        "PageSize": pageSize,
        "OrderDir": "Asc"
    });
    const [ isFuelTypeChanged, setIsFuelTypeChanged ] = useState(false);
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
        byYandexId: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "YandexFuelTypeId",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byFuelName: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "Name",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        },
        byCountType: () => {
            setQueryFields({
                ...queryFields,
                "OrderBy": "CountType",
                "OrderDir": queryFields.OrderDir === "Asc" ? "Desc" : "Asc"
            });
        }
    };

    let queryString = `?OrderBy=${queryFields.OrderBy}&PageIndex=${currentPage}&PageSize=${queryFields.PageSize}&OrderDir=${queryFields.OrderDir}`;

    useEffect(() => {
        try {
            const callForFuelTypes = async () => {
                setShowLoading(true);
                const response = await getData(urls.FUEL_TYPES_URL + queryString);
                setShowLoading(false);

                if (response.status === 200) {
                    const { list, count, rowsPerPage } = response.data.data;
    
                    setFuelTypes(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                    setPageCount(Math.ceil(count/rowsPerPage));
                } else if (response.status === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN)
                }
            }
            callForFuelTypes();
        } catch (err) {
            console.log(err);
        }
    }, [queryFields, currentPage, isFuelTypeChanged]);

    return (
        <div style={{ minWidth: "450px" }} className="fuel-types-page">
            <SearchSection isFuelTypeChanged={isFuelTypeChanged}
                           setIsFuelTypeChanged={setIsFuelTypeChanged} />
            <Table whichTable="fuelTypes"
                   datas={fuelTypes}
                   setCurrentData={setChoosedFuelType}
                   onClickEditButton={() => setIsOpenChangeModal(true)}
                   fuelTypesfilterHandlers={filterHandlers}
                   scrollX={true}
                   minWidth={"1500px"} />
            <div className="fuel-types-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {showLoading &&
                <Loader />
            }
            {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("fuelTypes.addChangeFuelType.changeFuelTypeData")}
                                body={<ChangeFueltype fuelTypeData={choosedFuelType}
                                                      isFuelTypeChanged={isFuelTypeChanged}
                                                      setIsFuelTypeChanged={setIsFuelTypeChanged}
                                                      onCloseHandler={() => setIsOpenChangeModal(false)} />} />
            }
        </div>
    );
};

export default FuelTypesPage;