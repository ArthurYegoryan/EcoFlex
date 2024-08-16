import "./ChangeStationsGroup.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../generalComponents/buttons/Button";
import Loader from "../../../generalComponents/loaders/Loader";
import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import { changeData } from "../../../api/changeData";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { autoFillWithDefaultData } from "../../../utils/helpers/autoFillWithDefaultData";
import { editToken } from "../../../redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeStationsGroup = ({ 
    stationsGroupData,
    isStationsGroupChanged,
    setIsStationsGroupChanged,
    onCloseHandler 
}) => {
    const [ changedStationsGroupData, setChangedStationsGroupData ] = useState({
        id: stationsGroupData.id,
        name: stationsGroupData.name,
        address: stationsGroupData.address,
        phoneNumber: stationsGroupData.phoneNumber,
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const [ showStationsGroupNameErrorLabel, setShowStationsGroupNameErrorLabel ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetPrevValidations = () => {
        setShowStationsGroupNameErrorLabel(false);
    };

    const onSaveHandler = async () => {
        resetPrevValidations();
        const autoFilledChangedStationsGroupData = autoFillWithDefaultData(stationsGroupData, changedStationsGroupData);

        if (isChangedAnyData(stationsGroupData, autoFilledChangedStationsGroupData)) {
            try {
                setIsLoading(true);
                const response = await changeData(urls.STATION_GROUPS_URL, autoFilledChangedStationsGroupData);
                setIsLoading(false);
    
                if (response.status === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                } else if (response.status === 400) {
                    response.errors.map((err) => {
                        if (err.param === "Name") setShowStationsGroupNameErrorLabel(true);
                    });                    
                } else if (response.status === 200) {
                    setIsStationsGroupChanged(!isStationsGroupChanged);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
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
        <div className="change-stations-group-fields">
            <TextInputComponent label={t("stationsGroup.addChangeStationsGroup.name")}
                                defaultValue={stationsGroupData.name}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedStationsGroupData({
                                    ...changedStationsGroupData,
                                    name: evt.target.value
                                })}} />
            <TextInputComponent label={t("stationsGroup.stationsGroupAddress")}
                                defaultValue={stationsGroupData.address}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedStationsGroupData({
                                    ...changedStationsGroupData,
                                    address: evt.target.value
                                })}} />
            <TextInputComponent label={t("stationsGroup.stationsGroupPhoneNumber")}
                                defaultValue={stationsGroupData.phoneNumber}
                                marginTop={"25px"}
                                width="473px"
                                onChangeHandler={(evt) => {setChangedStationsGroupData({
                                    ...changedStationsGroupData,
                                    phoneNumber: evt.target.value
                                })}} />
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {showStationsGroupNameErrorLabel &&
                <p className="change-stations-group-error-text">{t("errors.stationsGroupExistsError")}</p>
            }
            <div className="change-station-buttons">
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

export default ChangeStationsGroup;