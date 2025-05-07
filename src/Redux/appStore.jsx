import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlic'
import Connection from "../Components/Connection";
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        Connection:connectionReducer
    }
})

export default appStore
