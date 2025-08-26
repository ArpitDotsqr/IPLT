import { getToken } from "@/components/utils";
import { apiRequest } from "@/redux/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


// export const getTripDetails = createAsyncThunk('getTripDetails/trip/getAllTrip', async (body) => {
//     return apiRequest
//         .post('trip/getAllTrip', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripDetails = createAsyncThunk('getTripDetails/trip/getAllTrip', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/getAllTrip', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// trip action by id
// export const getTripDataById = createAsyncThunk('getTripDataById/trip/getTripDetail', async (body) => {
//     return apiRequest
//         .post('trip/getTripDetail', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripDataById = createAsyncThunk('getTripDataById/trip/getTripDetail', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/getTripDetail', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// trip approval list
// export const getTripApprovalList = createAsyncThunk('getTripApprovalList/trip/tripListForApprovals', async (body) => {
//     return apiRequest
//         .post('trip/tripListForApprovals', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripApprovalList = createAsyncThunk('getTripApprovalList/trip/tripListForApprovals', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/tripListForApprovals', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// approved/reject trip action
export const updateTripStatus = createAsyncThunk('updateTripStatus/trip/tripStatusUpdate', async (body) => {
    return apiRequest
        .post('trip/tripStatusUpdate', body)
        .then((res) => res)
        .catch((err) => err)
})

// trip rejected list
// export const getRejectedList = createAsyncThunk('getRejectedList/trip/rejectedTripList', async (body) => {
//     return apiRequest
//         .post('trip/rejectedTripList', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getRejectedList = createAsyncThunk('getRejectedList/trip/rejectedTripList', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/rejectedTripList', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// trip cancelled list
// export const getCancelList = createAsyncThunk('getCancelList/trip/cancelledTripList', async (body) => {
//     return apiRequest
//         .post('trip/cancelledTripList', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getCancelList = createAsyncThunk('getCancelList/trip/cancelledTripList', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/cancelledTripList', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// get trip list by Id
// export const getTripByIdList = createAsyncThunk('getTripByIdList/trip/tripDataById', async (body) => {
//     return apiRequest
//         .post('trip/tripDataById', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripByIdList = createAsyncThunk('getTripByIdList/trip/trip/tripDataById', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/tripDataById', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});
// completed trip list api for approval
// export const getTripCompletedList = createAsyncThunk('getTripCompletedList/trip/completedTripListforApproval', async (body) => {
//     return apiRequest
//         .post('trip/completedTripListforApproval', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripCompletedList = createAsyncThunk('getTripCompletedList/trip/completedTripListforApproval', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('trip/completedTripListforApproval', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});