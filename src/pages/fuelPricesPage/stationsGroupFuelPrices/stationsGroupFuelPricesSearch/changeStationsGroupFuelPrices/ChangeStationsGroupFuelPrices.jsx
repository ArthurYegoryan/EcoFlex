import "./ChangeStationsGroupFuelPrices.css";
import Button from "../../../../../generalComponents/buttons/Button";
import TextInputSeparateLabel from "../../../../../generalComponents/inputFields/textInputSeparateLabel/TextInputSeparateLabel";
import ModalComponent from "../../../../../generalComponents/modalComponent/ModalComponent";
import WarningModalBody from "../../../../../generalComponents/modalComponent/warningModalBody/WarningModalBody";
import SuccessAnimation from "../../../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../../../generalComponents/loaders/Loader";
import { changeData } from "../../../../../api/changeData";
import { colors } from "../../../../../assets/styles/colors";
import { paths } from "../../../../../constants/paths/paths";
import { urls } from "../../../../../constants/urls/urls";
import { editToken } from "../../../../../redux/slices/authSlice";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeStationsGroupFuelPrices = ({
    stationGroupId,
    allFuelTypes,
    setIsStationsGroupFuelPricesChanged,
    onCloseHandler,
}) => {
    const groupFuelPricesBody = {
        stationGroupId: stationGroupId,
        fuelTypeIdToPrice: {}
    };
    const [ fuelTypesIdsPrices, setFuelTypesIdsPrices ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isOpenWarningModalBody, setIsOpenWarningModalBody ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ goToBottom, setGoToBottom ] = useState(false);
    const bottomOfModalRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (goToBottom) {
            bottomOfModalRef.current.scrollIntoView();
        }
    }, [goToBottom]);

    const onSaveHandler = async () => {
        groupFuelPricesBody.fuelTypeIdToPrice = fuelTypesIdsPrices;

        setIsLoading(true);
        const response = await changeData(urls.FUEL_PRICES_URL, groupFuelPricesBody);
        setIsLoading(false);

        if (response.status === 200) {
            setIsStationsGroupFuelPricesChanged(Math.random());
            setGoToBottom(true);
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
        <div className="change-stations-group-fuel-prices">
            {
                allFuelTypes.map((fuelType) => {
                    return <TextInputSeparateLabel label={fuelType.name}
                                                   defaultValue={fuelType.price}
                                                   textInputWidth="100px"
                                                   labelMarginLeft={"50px"}
                                                   textInputMarginRight={"50px"}
                                                   onChangeHandler={(e) => {
                                                       setFuelTypesIdsPrices({
                                                           ...fuelTypesIdsPrices,
                                                           [fuelType.id]: Number(e.target.value)
                                                       })
                                                   }} />
                })
            }
            <div className="change-stations-group-fuel-prices-buttons">
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
            <div ref={bottomOfModalRef}></div>
            {isOpenWarningModalBody &&
                <ModalComponent onCloseHandler={() => setIsOpenWarningModalBody(false)}
                                isOpen={isOpenWarningModalBody}
                                body={<WarningModalBody warningTitle={t("generalQuestionsTexts.attention")}
                                                        warningText={t("generalQuestionsTexts.groupFuelTypesPricesWillBeChanged")}
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

export default ChangeStationsGroupFuelPrices;