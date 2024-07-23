import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const getData = async (url) => {
    return await axios.get(url, Headers);
};