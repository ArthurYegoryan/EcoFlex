import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";

const changePassword = async (url, passwordsData) => {
    return await axios.post(url, passwordsData, HeaderTokenConfig);
};

export default changePassword;