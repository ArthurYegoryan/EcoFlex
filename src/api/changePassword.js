import axios from "axios";
import { Headers } from "../constants/configs/configs";

const changePassword = async (url, passwordsData) => {
    return await axios.post(url, passwordsData, Headers);
};

export default changePassword;