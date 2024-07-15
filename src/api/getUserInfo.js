import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";

const getUserInfo = async (url, params) => {
    return await axios.get(url, {
       ...HeaderTokenConfig,
       params
    });
};

export default getUserInfo;