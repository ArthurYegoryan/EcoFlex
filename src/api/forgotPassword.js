import axios from "axios";

export const forgotPassword = async (url, params) => {
    return await axios.post(url, params);
};