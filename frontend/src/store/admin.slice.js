import { createSlice } from "@reduxjs/toolkit";
const admin = createSlice({
    name: 'admin',
    initialState: {
        admin: null
    },reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload
        }
    }
})

export const {setAdmin} = admin.actions;
export default admin.reducer;