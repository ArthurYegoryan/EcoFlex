import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const deleteData = async (url, id) => {
    try {
        return await axios.delete(url + "/" + id, Headers);
    } catch (err) {
        return err.response;
    }
};