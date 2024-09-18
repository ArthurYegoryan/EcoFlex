import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const getData = async (url) => {
    try {
        return await axios.get(url, Headers);
    } catch (err) {
        return err.response; 
    }
};