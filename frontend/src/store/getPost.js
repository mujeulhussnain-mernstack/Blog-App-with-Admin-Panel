import { createSlice } from "@reduxjs/toolkit"
const post = createSlice({
    name: 'post',
    initialState: {
        post: null,
        allPosts: null,
        individualPost: null,
        postComments: null,
        searchedPostTitle: null
    },
    reducers: {
        getPost: (state, action) => {
            state.post = action.payload
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        setIndividualPost: (state, action) => {
            state.individualPost = action.payload
        },
        setPostComments: (state, action) => {
            state.postComments = action.payload
        },
        setSearchPostTile: (state, action) => {
            state.searchedPostTitle = action.payload
        }
    }
})
export const { getPost, setAllPosts, setIndividualPost, setPostComments, setSearchPostTile } = post.actions;
export default post.reducer