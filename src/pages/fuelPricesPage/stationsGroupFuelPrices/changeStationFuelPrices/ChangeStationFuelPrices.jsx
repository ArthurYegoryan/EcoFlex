import "./ChangeStationFuelPrices.css";
import TextInputSeparateLabel from "../../../../generalComponents/inputFields/textInputSeparateLabel/TextInputSeparateLabel";

const ChangeStation = ({
    station,
    onClickHandler,
}) => {
    console.log("Current staion: ", station);

    return (
        <div>
            {
                station.fuelTypes.map((fuelType) => {
                    return <TextInputSeparateLabel label={fuelType.name}
                                                   defaultValue={fuelType.price}
                                                   textInputWidth="100px"
                                                   labelMarginLeft={"50px"}
                                                   textInputMarginRight={"50px"} />
                })
            }
        </div>
    )
};

export default ChangeStation;