import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../services/api";

// login action
export const login = createAsyncThunk('login/user/login', async (body) => {
    debugger
    try {
        const response = await apiRequest.post('user/login', body)
        return response.data;
    } catch (error) {
        throw error;
    }
});

// verify email
export const verifyEmail = createAsyncThunk('verifyEmail/user/verifyEmail', async (body) => {
    const response = await apiRequest.post('user/verifyEmail', body)
    return response.data
})

// user details by id
export const getUserData = createAsyncThunk('getUserData/user/getUserData', async (body) => {
    const response = await apiRequest.post('user/getUserData', body)
    return response.data
})

// userDetail 
export const getDetailUser = createAsyncThunk('getDetailUser/user/getUserData', async (body) => {
    const response = await apiRequest.post('user/getUserData', body)
    return response.data
})

// create password 
export const createNewPassword = createAsyncThunk('createNewPassword/user/createPassword', async (body) => {
    const response = await apiRequest.post('user/createPassword', body)
    return response.data
})

// forgot password
export const forgotPassword = createAsyncThunk('forgotPassword/user/forgotpassword', async (body) => {
    const response = await apiRequest.post('user/forgotpassword', body)
    return response.data
})