import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./user.slice.js"
import postReducer from "./getPost.js"
import adminReducer from "./admin.slice.js"
const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        inidPost: postReducer 
    }
})
export default store;