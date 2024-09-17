import { createSlice } from "@reduxjs/toolkit";

export const contactBookSlice = createSlice({
    name: 'contact_book_slice',
    initialState: {
        value: false
    },
    reducers: {
        isContactBookModal: (state, action)=> {
            state.value = action.payload
        }
    }
})
export const {isContactBookModal} = contactBookSlice.actions
export default contactBookSlice.reducer