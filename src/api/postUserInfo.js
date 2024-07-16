import axios from "axios";

export const postUserInfo = async (url, params) => {
    return await axios.post(url, params);
};