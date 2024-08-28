import "./TransactionsSearchSection.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../generalComponents/buttons/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { transactionTypes } from "../../../constants/transactionTypes/transactionTypes";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TransactionsSearchSection = ({
    allFuelTypes,
    searchParams,
    setSearchParams,
    isSearchClicked,
    setIsSearchClicked,
    onCliCkReportingBtn,
    onCliCkSummaryReportingBtn,
    showConnectionError,
}) => {
    const role = useSelector((state) => state.auth.role) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    const fuelTypesList = [];
    allFuelTypes.map((fuelType) => {
        fuelTypesList.push(fuelType.name);
    });

    return (
        <div className="transactions-search-area">
            <TextInput label={t("searchSections.searchData")}
                       marginTop={"12px"}
                       onChangeHandler={(e) => setSearchParams({
                           ...searchParams,
                           searchText: e.target.value.trim()
                       })} />
            <SelectComponent label={t("transactions.transactionsSearch.chooseTransactionType")}
                             defaultValue={"All"}
                             hasFirstRow={true}
                             firstRowLabel={"All"}
                             firstRowValue={"All"}
                             chooseData={transactionTypes}
                             width={"200px"}
                             marginTop={"12px"}
                             marginLeft={"15px"}
                             onChooseHandler={(e) => setSearchParams({
                                 ...searchParams,
                                 transactionType: e.target.value
                             })} />
            <SelectComponent label={t("transactions.transactionsSearch.chooseFuelType")}
                             defaultValue={"All"}
                             hasFirstRow={true}
                             firstRowLabel={"All"}
                             firstRowValue={"All"}
                             chooseData={fuelTypesList}
                             width={"200px"}
                             marginTop={"12px"}
                             marginLeft={"15px"}
                             onChooseHandler={(e) => setSearchParams({
                                ...searchParams,
                                fuelTypeName: e.target.value
                            })} />
            <div className="transactions-search-date">
                <span>{t("transactions.transactionsSearch.start")}</span>
                <DatePicker dateFormat="dd-MM-yyyy HH:mm"
                            timeFormat="HH:mm"
                            isClearable
                            showIcon
                            showTimeSelect
                            timeIntervals={15}
                            minDate={"01.01.2023"}
                            maxDate={Date.now()}
                            showYearDropdown
                            selected={searchParams.startDate}
                            onChange={(date) => setSearchParams({
                                ...searchParams,
                                startDate: date
                            })} />
            </div>
            <div className="transactions-search-date">
                <span>{t("transactions.transactionsSearch.end")}</span>
                <DatePicker dateFormat="dd-MM-yyyy HH:mm"
                            timeFormat="HH:mm"
                            isClearable
                            showIcon
                            showTimeSelect
                            timeIntervals={15}
                            minDate={"01.01.2023"}
                            maxDate={Date.now()}
                            showYearDropdown
                            selected={searchParams.endDate}
                            onChange={(date) => setSearchParams({
                                ...searchParams,
                                endDate: date
                            })} />
            </div>
            <Button label={t("operations.search")}
                    startIcon={<SearchIcon />}
                    height={"30px"}
                    marginTop={"20px"}
                    marginLeft={"15px"}
                    onClickHandler={() => setIsSearchClicked(!isSearchClicked)} />
            <Button label={t("operations.reporting")}
                    height={"30px"}
                    marginTop={"20px"}
                    marginLeft={"15px"}
                    onClickHandler={onCliCkReportingBtn} />
            {role === "FuelSupervisor" &&
                <Button label={t("operations.stationsSummaryReporting")}
                        fontSize={"10px"}
                        height={"30px"}
                        marginTop={"20px"}
                        marginLeft={"15px"}
                        onClickHandler={onCliCkSummaryReportingBtn} />
            }
            {showConnectionError &&
                <p className="dispensers-connection-error-text">{t("errors.connectionError")}</p>
            }
        </div>
    );
};

export default TransactionsSearchSection;