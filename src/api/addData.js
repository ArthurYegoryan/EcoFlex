import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const addData = async (url, newData) => {
    return await axios.post(url, newData, Headers);
};