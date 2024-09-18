import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const addData = async (url, newData) => {
    try {
        return await axios.post(url, newData, Headers);
    } catch (err) {
        return err.response.data;
    }
};