import { createSlice } from "@reduxjs/toolkit";
const admin = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        posts: null,
        users: null,
        comments: null,
        blogList: null
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
        setComments: (state, action) => {
            state.comments = action.payload
        },
        setBlogList: (state, action) => {
            state.blogList = action.payload
        }
    }
})

export const { setAdmin, setPosts, setUsers, setComments, setBlogList } = admin.actions;
export default admin.reducer;