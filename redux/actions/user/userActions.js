import { getToken } from "@/components/utils";
import { apiRequest } from "@/redux/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getJobRole = createAsyncThunk('getJobRole/user/getRoleByTypes', async (body) => {
    return apiRequest
        .post('user/getRoleByTypes', body)
        .then((res) => res)
        .catch((err) => err)
})

export const createUser = createAsyncThunk('createUser/user/userSignUp', async (body, rejectedErr) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/userSignUp', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})

export const updateUser = createAsyncThunk('updateUser/user/updateDetails', async (body, rejectedErr) => {
    const token = getToken()
    try {
        const repsonse = await apiRequest.post('user/updateDetails', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return repsonse.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})

// notification list
export const getNoficationData = createAsyncThunk('getNoficationData/user/notificationList', async (body) => {
    const response = await apiRequest.get('user/notificationList', body)
    return response
})


// notification read or not
export const notificationStatus = createAsyncThunk('notificationStatus/user/readNotification', async (body) => {
    const response = await apiRequest.post('user/readNotification', body)
    return response
})

// path json action
export const routePath = createAsyncThunk('routePath/user/jsonPathList', async (body) => {
    const response = await apiRequest.get('user/jsonPathList', body)
    return response
})


