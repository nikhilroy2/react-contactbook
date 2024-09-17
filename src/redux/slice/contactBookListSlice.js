import { createSlice } from "@reduxjs/toolkit";
export const contactBookListSlice = createSlice({
    name: "contact_book_list",
    initialState: {
        value: []
    },
    reducers: {
        // for get
        contactBookList: (state, action) => {
            state.value = action.payload
        },
        // for post
        appendContactBook: (state, action) => {
            (state.value).unshift(action.payload) // prepend
        },
        // for put
        editContactBook: (state, action) => {
            state.value = state.value.map(item => {
                if (item.contact_book_id === action.payload.contact_book_id) {
                    return { ...item, ...action.payload };  // Merge updated item with current item
                }
                return item;  // Return the unchanged item if it's not the one to update
            });
        },
        // for delete
        contactBookDelete: (state, action) => {
            (state.value).filter(a => a.contact_book_id != action.payload)
        }
    }
})
export const { contactBookList, appendContactBook, contactBookDelete, editContactBook } = contactBookListSlice.actions
export default contactBookListSlice.reducer