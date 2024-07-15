import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: true
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        editMenuStatusFalse: (state) => {
            state.isMenuOpen = false;
        },
        editMenuStatusTrue: (state) => {
            state.isMenuOpen = true;
        },
    }
});

export const { editMenuStatusFalse, editMenuStatusTrue } = menuSlice.actions;
export default menuSlice.reducer;