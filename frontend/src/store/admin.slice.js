import { createSlice } from "@reduxjs/toolkit";
const admin = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        posts: null,
        users: null
    }, reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
    }
})

export const { setAdmin, setPosts, setUsers } = admin.actions;
export default admin.reducer;