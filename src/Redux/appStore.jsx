import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlic'
import requestReducer from "./requestSlice"
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        Connection:connectionReducer,
        request:requestReducer
    }
})

export default appStore
