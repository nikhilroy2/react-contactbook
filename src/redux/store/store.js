import { configureStore } from "@reduxjs/toolkit";
import contactBookSlice from "../slice/contactBookSlice";
import contactBookListSlice from "../slice/contactBookListSlice";
import loginSlice from '../slice/loginSlice'
export default configureStore({
    reducer: {
        contact_book: contactBookSlice,
        contact_book_list: contactBookListSlice,
        auth_login: loginSlice
    }
})