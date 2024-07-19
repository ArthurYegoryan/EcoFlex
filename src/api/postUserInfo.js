import axios from "axios";

export const postUserInfo = async (url, params) => {
    try {
        return await axios.post(url, params);;
    } catch (err) {
        return err.response.status;
    }
};