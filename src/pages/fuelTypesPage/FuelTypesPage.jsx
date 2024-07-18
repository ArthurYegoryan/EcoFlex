import "./FuelTypesPage.css";
import TableComponent from "../../generalComponents/table/Table";
import Loader from "../../generalComponents/loaders/Loader";
import { getFuelTypes } from "../../api/getFuelTypes";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";

const FuelTypesPage = () => {
    const [ fuelTypes, setFuelTypes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        try {
            const callForFuelTypes = async () => {
                setIsLoading(true);
                const response = await getFuelTypes(urls.GET_FUEL_TYPES_URL);
                setIsLoading(false);
    
                setFuelTypes(response.data.data.list);
                console.log("Fuel types response: ", JSON.stringify(response.data.data, null, 2));
            }
            callForFuelTypes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <div>FuelTypesPage</div>
            <TableComponent whichTable="fuelTypes"
                            datas={fuelTypes} />
            {isLoading &&
                <Loader />
            }
        </div>
    );
};

export default FuelTypesPage;