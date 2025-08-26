import { getToken } from "@/components/utils";
import { apiRequest } from "@/redux/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllManagerUser = createAsyncThunk('getAllManagerUser/user/getAllUsers', async (body) => {
    try {
        const response = await apiRequest.post('user/getAllUsers', body)
        return response.data
    } catch (error) {
        throw error.response?.data
    }
})

export const getManagerUserDataById = createAsyncThunk('getManagerUserDataById/user/getUserData', async (body) => {
    try {
        const response = await apiRequest.post('user/getUserData', body)
        return response.data
    } catch (error) {
        throw error.response?.data
    }
})

// graph data for manageUser for fieldExecutive
// export const getFieldExecutiveTripDetail = createAsyncThunk('getFieldExecutiveTripDetail/trip/getAllTripCount', async (body) => {
//     try {
//         const response = await apiRequest.post('trip/getAllTripCount', body)
//         return response.data
//     } catch (error) {
//         throw error.response?.data
//     }
// })

export const getFieldExecutiveTripDetail = createAsyncThunk('getFieldExecutiveTripDetail/trip/getAllTripCount', async (body) => {
    const token = getToken();
    try {
        const response = await apiRequest.post('trip/getAllTripCount', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});