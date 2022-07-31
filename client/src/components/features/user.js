import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {email: ""}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: initialStateValue},
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },

        logout: (state) => {
            state.value = initialStateValue
        },

        loginFailed: (state) => {
            state.value = initialStateValue
        }
    }
});

export const { login, logout, loginFailed} = userSlice.actions;

export default userSlice.reducer;
