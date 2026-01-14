import { createSlice } from "@reduxjs/toolkit"
const post = createSlice({
    name: 'post',
    initialState: {
        post: null
    },
    reducers: {
        getPost: (state, action) => {
            state.post = action.payload
        }
    }
})
export const { getPost } = post.actions;
export default post.reducer