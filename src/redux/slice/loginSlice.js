import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
    name: "is_login",
    initialState: {
        value: false
    },
    reducers: {
        isLoginNow: (state, action)=> {
            state.value = action.payload
        }
    }
})
export const {isLoginNow} = loginSlice.actions;
export default loginSlice.reducer;