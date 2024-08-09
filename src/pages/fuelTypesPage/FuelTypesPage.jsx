import "./FuelTypesPage.css";
import SearchSection from "./searchSection/SearchSection";
import ChangeFueltype from "./changeFuelType/ChangeFuelType";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import { getData } from "../../api/getData";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const FuelTypesPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    const [ fuelTypes, setFuelTypes ] = useState([]);
    const [ choosenFuelType, setChoosenFuelType ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
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
                setIsLoading(true);
                const response = await getData(urls.FUEL_TYPES_URL + queryString);
                setIsLoading(false);

                const { list, count, rowsPerPage } = response.data.data;
    
                setFuelTypes(addNumeration(list, currentPage, pageSize, queryFields.OrderDir === "Desc" && true, count));
                setPageCount(Math.ceil(count/rowsPerPage));
            }
            callForFuelTypes();
        } catch (err) {
            console.log(err);
        }
    }, [queryFields, currentPage, isFuelTypeChanged]);

    return (
        <div style={{ minWidth: "900px" }} className="fuel-types-page">
            <SearchSection isFuelTypeChanged={isFuelTypeChanged}
                           setIsFuelTypeChanged={setIsFuelTypeChanged} />
            <Table whichTable="fuelTypes"
                   datas={fuelTypes}
                   setCurrentData={setChoosenFuelType}
                   onClickEditButton={() => setIsOpenChangeModal(true)}
                   fuelTypesfilterHandlers={filterHandlers} />
            <div className="fuel-types-page-pagination">
                <Pagination pageCount={pageCount}
                            setPage={setCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            {isLoading &&
                <Loader />
            }
            {isOpenChangeModal &&
                <ModalComponent onCloseHandler={() => setIsOpenChangeModal(false)}
                                isOpen={isOpenChangeModal}
                                title={t("fuelTypesTable.addChangeFuelType.changeFuelTypeData")}
                                body={<ChangeFueltype fuelTypeData={choosenFuelType}
                                                      isFuelTypeChanged={isFuelTypeChanged}
                                                      setIsFuelTypeChanged={setIsFuelTypeChanged}
                                                      onCloseHandler={() => setIsOpenChangeModal(false)} />} />
            }
        </div>
    );
};

export default FuelTypesPage;