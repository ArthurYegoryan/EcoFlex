import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";

const forgotPassword = async (url, email) => {
    return await axios.post(url, email, HeaderTokenConfig);
};

export default forgotPassword;