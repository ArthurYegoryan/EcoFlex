import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: localStorage.getItem("user_id") ?? "",
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? "",
    token: localStorage.getItem("token") ?? ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
    }
});

// export const { editID, editUsername, editRole, editBank, editToken } = authSlice.actions;
export default authSlice.reducer;