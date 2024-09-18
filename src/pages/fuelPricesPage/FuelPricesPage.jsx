import "./FuelPricesPage.css";
import Card from "../../generalComponents/cards/CardComponent";
import Loader from "../../generalComponents/loaders/Loader";
import { getData } from "../../api/getData";
import { urls } from "../../constants/urls/urls"
import { paths } from "../../constants/paths/paths";
import { colors } from "../../assets/styles/colors";
import { editToken } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FuelPricesPage = () => {
    const [ stationsGroupsList, setStationsGroupsList ] = useState([]);
    const [ showLoading, setShowLoading ] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getStationsGroups = async () => {
            setShowLoading(true);
            const response = await getData(urls.STATION_GROUPS_URL + "?PageSize=1000");
            setShowLoading(false);

            if (response.status === 200) {
                const stationsGroupsIdNameList = [];
                
                response.data.data.list.map((stationsGroup) => {
                    stationsGroupsIdNameList.push({
                        id: stationsGroup.id,
                        name: stationsGroup.name
                    });
                });

                setStationsGroupsList(stationsGroupsIdNameList);
            } else if (response.status === 401) {
                dispatch(editToken(""));
                localStorage.clear();

                navigate(paths.LOGIN);
            }
        };
        getStationsGroups();
    }, []);

    return (
        <div style={{
                 justifyContent: stationsGroupsList.length <= 3 ? "none" : "center",
                 alignItems: stationsGroupsList.length <= 3 ? "none" : "center",
                 height: stationsGroupsList.length <= 3 ? "none" : "100%",
             }}
             className="fuel-prices-page"
        >
            <div style={{
                     display: stationsGroupsList.length <= 3 ? "flex" : "grid",
                     gap: "50px 100px",
                     gridTemplateRows: "auto",
                     gridTemplateColumns: "250px 250px 250px",
                 }}
                 className="fuel-prices-cards-area"
            >
                {
                    stationsGroupsList.map((stationsGroup) => {
                        return <Card label={stationsGroup.name}
                                    width={"250px"}
                                    cardBgColor={colors.loginBgColor}
                                    onClickHandler={() => navigate(paths.FUEL_PRICES + "/" + stationsGroup.id)} />
                    })
                }
            </div>

            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default FuelPricesPage;