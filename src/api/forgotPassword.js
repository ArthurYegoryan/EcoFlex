import axios from "axios";

export const forgotPassword = async (url, params) => {
    try {
        return await axios.post(url, params);
    } catch (err) {
        return err;
    }
};