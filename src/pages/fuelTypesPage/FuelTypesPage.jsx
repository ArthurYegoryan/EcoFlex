import "./FuelTypesPage.css";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { getFuelTypes } from "../../api/getFuelTypes";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FuelTypesPage = () => {
    const [ fuelTypes, setFuelTypes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ pageCount, setPageCount ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const { isMenuOpen } = useSelector((state) => state.menu);

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const callForFuelTypes = async () => {
                setIsLoading(true);
                const response = await getFuelTypes(urls.GET_FUEL_TYPES_URL);
                setIsLoading(false);

                const { list, count, page, rowsPerPage } = response.data.data;
    
                setFuelTypes(list);
                console.log("Fuel types response: ", JSON.stringify(response.data.data, null, 2));
                setPageCount(Math.ceil(count/rowsPerPage));
            }
            callForFuelTypes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div style={{ minWidth: "900px" }} className="fuel-types-page">
            <div>FuelTypesPage</div>
            <Table whichTable="fuelTypes"
                   datas={fuelTypes} />
            <Pagination pageCount={pageCount} 
                        setPage={setCurrentPage}
                        leftMargin={paginationLeftMarginClassname} />          
            {isLoading &&
                <Loader />
            }
        </div>
    );
};

export default FuelTypesPage;