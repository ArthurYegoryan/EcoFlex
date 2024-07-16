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
        editID: (state, id) => {
            state.id = id;
        },
        editUsername: (state, username) => {
            state.username = username;
        },
        editRole: (state, role) => {
            state.role = role;
        },
        editToken: (state, token) => {
            state.token = token;
        }
    }
});

export const { editID, editUsername, editRole, editToken } = authSlice.actions;
export default authSlice.reducer;