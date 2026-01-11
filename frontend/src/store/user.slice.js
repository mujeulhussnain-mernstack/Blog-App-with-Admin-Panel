import { createSlice } from "@reduxjs/toolkit"
const authUser = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setAuthUser} = authUser.actions;
export default authUser.reducer;