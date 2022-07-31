import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {searchValue: ""}

export const searchSlice = createSlice({
    name: "search",
    initialState: {value: initialStateValue},
    reducers: {
        setSearchTrue: (state, action) => {
            state.value = action.payload;
        },

        setSearchFalse: (state) => {
            state.value = initialStateValue
        }
    }
});

export const { setSearchTrue, setSearchFalse} = searchSlice.actions;

export default searchSlice.reducer;
