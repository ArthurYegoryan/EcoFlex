import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const getFuelTypes = async (url) => {
    return await axios.get(url, Headers);
};