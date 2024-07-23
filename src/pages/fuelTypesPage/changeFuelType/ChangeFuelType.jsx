import "./ChangeFuelType.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../generalComponents/buttons/Button";
import Loader from "../../../generalComponents/loaders/Loader";
import { changeData } from "../../../api/changeData";
import { urls } from "../../../constants/urls/urls";
import { colors } from "../../../assets/styles/colors";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { autoFillWithDefaultData } from "../../../utils/helpers/autoFillWithDefaultData";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeFueltype = ({ 
    fuelTypeData,
    isFuelTypeChanged,
    setIsFuelTypeChanged,
    onCloseHandler 
}) => {
    const [ changedFuelTypeData, setChangedFuelTypeData ] = useState({
        id: fuelTypeData.id,
        name: fuelTypeData.name,
        yandexFuelTypeId: fuelTypeData.yandexFuelTypeId,
        countType: fuelTypeData.countType,
        adgCode: fuelTypeData.adgCode,
        departmentId: fuelTypeData.departmentId
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const { t } = useTranslation();

    const onSaveHandler = async () => {
        if (isChangedAnyData(fuelTypeData, changedFuelTypeData)) {
            try {
                setIsLoading(true);
                const response = await changeData(urls.FUEL_TYPES_URL, autoFillWithDefaultData(fuelTypeData, changedFuelTypeData));
                setIsLoading(false);
    
                if (response.data.message === "Success") {
                    setIsFuelTypeChanged(!isFuelTypeChanged);
                    onCloseHandler();
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            onCloseHandler();
        }
    }

    return (
        <div className="change-fuel-type-fields">
            <TextInputComponent label={t("fuelTypesTable.fuelName")}
                                defaultValue={fuelTypeData.name}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.adgCode")}
                                defaultValue={fuelTypeData.adgCode}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    adgCode: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.departmentId")}
                                defaultValue={fuelTypeData.departmentId}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    departmentId: Number(evt.target.value)
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.yandexId")}
                                defaultValue={fuelTypeData.yandexFuelTypeId}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedFuelTypeData({
                                    ...changedFuelTypeData,
                                    yandexFuelTypeId: evt.target.value
                                })}} />
            <SelectComponent label={t("fuelTypesTable.addChangeFuelType.chooseCountType")}
                             chooseData={["Kg", "Ltr"]}
                             defaultValue={fuelTypeData.countType === "L" ? "Ltr" : fuelTypeData.countType}
                             marginTop={"25px"}
                             onChooseHandler={(evt) => {setChangedFuelTypeData({
                                ...changedFuelTypeData,
                                countType: evt.target.value === "Ltr" ? "L" : evt.target.value
                            })}} />
            <div className="change-fuel-type-buttons">
                <Button label={t("operations.save")}
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        color={colors.successCancelColor}
                        marginRight={"10px"}
                        onClickHandler={onSaveHandler} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        color={colors.successCancelColor}
                        onClickHandler={onCloseHandler} />
            </div>
            {isLoading &&
                <Loader />
            }
        </div>
    );
};

export default ChangeFueltype;