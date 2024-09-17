import { configureStore } from "@reduxjs/toolkit";
import contactBookSlice from "../slice/contactBookSlice";
import contactBookListSlice from "../slice/contactBookListSlice";
export default configureStore({
    reducer: {
        contact_book: contactBookSlice,
        contact_book_list: contactBookListSlice
    }
})