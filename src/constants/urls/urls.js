const URL = process.env.REACT_APP_API_URL;

export const urls = {
    POST_USER_INFO_URL: `${URL}Users/login`,
    POST_FORGOT_PASSWORD_URL: `${URL}Users/forgot-password`,

    DOWNLOAD_CSV_URL: `${URL}Files/download-csv`,
    DOWNLOAD_CSV_STATIONS_URL: `${URL}Files/download-csv-st`,
    DOWNLOAD_CSV_TRANSACTIONS_URL: `${URL}Files/download-csv-tr`,
    DOWNLOAD_SUMMARY_URL: `${URL}Files/download-summary`,

    FUEL_TYPES_URL: `${URL}FuelTypes`,
    STATION_GROUPS_URL: `${URL}StationGroups`,
    STATIONS_URL: `${URL}Stations`,
    FUEL_PRICES_URL: `${URL}Prices`,
    FUEL_DISCOUNTS_URL: `${URL}Discounts`,
    DISPENSERS_URL: `${URL}Dispensers`,
    USERS_URL: `${URL}Users`,
    ADD_USER_URL: `${URL}Users/registration`,
    TRANSACTIONS_URL: `${URL}Transactions`,
};