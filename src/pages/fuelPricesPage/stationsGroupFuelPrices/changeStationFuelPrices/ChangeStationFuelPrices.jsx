import "./ChangeStationFuelPrices.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInputSeparateLabel from "../../../../generalComponents/inputFields/textInputSeparateLabel/TextInputSeparateLabel";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import WarningModalBody from "../../../../generalComponents/modalComponent/warningModalBody/WarningModalBody";
import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../../generalComponents/loaders/Loader";
import { changeData } from "../../../../api/changeData";
import { colors } from "../../../../assets/styles/colors";
import { fieldsWidths } from "../../../../assets/styles/fieldsWidths";
import { paths } from "../../../../constants/paths/paths";
import { urls } from "../../../../constants/urls/urls";
import { editToken } from "../../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeStation = ({
    station,
    isStationFuelPricesChanged,
    setIsStationFuelPricesChanged,
    onCloseHandler,
}) => {
    const changeFuelPricesBody = {
        staionGroupId: station.stationGroup.id,
        stationIds: [
            station.id
        ],
        fuelTypeIdToPrice: {}
    };
    const [ fuelTypesIdsPrices, setFuelTypesIdsPrices ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isOpenWarningModalBody, setIsOpenWarningModalBody ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSaveHandler = async () => {
        changeFuelPricesBody.fuelTypeIdToPrice = fuelTypesIdsPrices;

        setIsLoading(true);
        const response = await changeData(urls.FUEL_PRICES_URL, changeFuelPricesBody);
        setIsLoading(false);

        if (response.status === 200) {
            setIsStationFuelPricesChanged(!isStationFuelPricesChanged);
            setShowSuccessAnimation(true);
            setTimeout(() => {
                onCloseHandler();
            }, 2500);
        } else if (response.status === 401) {
            dispatch(editToken(""));
            localStorage.clear();

            navigate(paths.LOGIN);
        }
    };

    return (
        <div className="change-station-fuel-prices">
            {
                station.fuelTypes.map((fuelType) => {
                    return <TextInputSeparateLabel label={fuelType.name}
                                                   defaultValue={fuelType.price}
                                                   textInputWidth="100px"
                                                   labelMarginLeft={"50px"}
                                                   textInputMarginRight={"50px"}
                                                   onChangeHandler={(e) => {
                                                       setFuelTypesIdsPrices({
                                                           ...fuelTypesIdsPrices,
                                                           [fuelType.id]: e.target.value
                                                       })
                                                   }} />
                })
            }
            <div className="change-station-fuel-prices-buttons">
                <Button label={t("operations.save")}
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"30px"}
                        onClickHandler={() => setIsOpenWarningModalBody(true)} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={onCloseHandler} />
            </div>
            {isOpenWarningModalBody &&
                <ModalComponent onCloseHandler={() => setIsOpenWarningModalBody(false)}
                                isOpen={isOpenWarningModalBody}
                                body={<WarningModalBody warningTitle={t("generalQuestionsTexts.attention")}
                                                        warningText={t("generalQuestionsTexts.stationFuelTypesPricesWillBeChanged")}
                                                        onSaveHandler={() => {
                                                            setIsOpenWarningModalBody(false);
                                                            onSaveHandler();
                                                        }}
                                                        onCloseHandler={() => setIsOpenWarningModalBody(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {isLoading &&
                <Loader />
            }
        </div>
    );
};

export default ChangeStation;