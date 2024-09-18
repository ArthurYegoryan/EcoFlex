import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const changeData = async (url, newData) => {
    try {
        return await axios.put(url, newData, Headers);
    } catch (err) {
        return err.response;
    }
};