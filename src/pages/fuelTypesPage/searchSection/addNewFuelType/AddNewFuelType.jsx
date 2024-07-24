import "./AddNewFuelType.css";
import TextInputComponent from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../../generalComponents/buttons/Button";
import Loader from "../../../../generalComponents/loaders/Loader";
import { addData } from "../../../../api/addData";
import { urls } from "../../../../constants/urls/urls";
import { colors } from "../../../../assets/styles/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddNewFueltype = ({ 
    isFuelTypeChanged,
    setIsFuelTypeChanged,
    onCloseHandler 
}) => {
    const [ newFuelTypeData, setNewFuelTypeData ] = useState({
        name: "",
        yandexFuelTypeId: "",
        countType: "Kg",
        adgCode: "",
        departmentId: 0
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const { t } = useTranslation();

    const onSaveHandler = async () => {
        try {
            setIsLoading(true);
            const response = await addData(urls.FUEL_TYPES_URL, newFuelTypeData);
            setIsLoading(false);

            if (response.data.message === "Success") {
                setIsFuelTypeChanged(!isFuelTypeChanged);
                onCloseHandler();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="add-new-fuel-type-fields">
            <TextInputComponent label={t("fuelTypesTable.fuelName")}
                                width="473px"
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.adgCode")}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    adgCode: evt.target.value
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.departmentId")}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    departmentId: Number(evt.target.value)
                                })}} />
            <TextInputComponent label={t("fuelTypesTable.yandexId")}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setNewFuelTypeData({
                                    ...newFuelTypeData,
                                    yandexFuelTypeId: evt.target.value
                                })}} />
            <SelectComponent label={t("fuelTypesTable.addChangeFuelType.chooseCountType")}
                             chooseData={["Kg", "Ltr"]}
                             marginTop={"25px"}
                             onChooseHandler={(evt) => {setNewFuelTypeData({
                                ...newFuelTypeData,
                                countType: evt.target.value === "Ltr" ? "L" : evt.target.value
                            })}} />
            <div className="add-new-fuel-type-buttons">
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

export default AddNewFueltype;