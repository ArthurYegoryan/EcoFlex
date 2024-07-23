const URL = process.env.REACT_APP_API_URL;

export const urls = {
    POST_USER_INFO_URL: `${URL}Users/login`,
    POST_FORGOT_PASSWORD_URL: `${URL}Users/forgot-password`,

    FUEL_TYPES_URL: `${URL}FuelTypes`,
};