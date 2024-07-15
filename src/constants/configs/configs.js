export const HeaderTokenConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};