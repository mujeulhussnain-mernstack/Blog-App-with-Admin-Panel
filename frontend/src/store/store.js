import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./user.slice.js"
import postReducer from "./getPost.js"
const store = configureStore({
    reducer: {
        user: userReducer,
        inidPost: postReducer 
    }
})
export default store;