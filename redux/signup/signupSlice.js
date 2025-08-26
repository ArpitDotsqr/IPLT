import { login } from "../actions/auth";
const { createSlice } = require("@reduxjs/toolkit");



const LoginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        status: '',
        user: []
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            // state.status = action.status.message
            state.isLoading = false
        })
    }
})

export default LoginUserSlice.reducer