import axios from "axios";

const postUserInfo = async (url, params) => {
    return await axios.post(url, params);
};

export default postUserInfo;