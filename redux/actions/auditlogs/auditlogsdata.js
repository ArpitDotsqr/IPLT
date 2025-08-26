import { getToken } from "@/components/utils";
import { apiRequest } from "@/redux/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


// export const getAuditLogsDetail = createAsyncThunk('getAuditLogsDetail/user/getAuditLog', async (body) => {
//     try {
//         const response = await apiRequest.post('user/getAuditLog', body)
//         return response.data
//     } catch (error) {
//         throw error.response?.data
//     }
// })

export const getAuditLogsDetail = createAsyncThunk('getAuditLogsDetail/user/getAuditLog', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/getAuditLog', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});