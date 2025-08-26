import { getToken } from "@/components/utils"
import { apiRequest } from "@/redux/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

// basic details action for vendor form
export const createVendorBasicDetails = createAsyncThunk('createVendorBasicDetails/user/createVendorBasicDetail', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/createVendorBasicDetail', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }

})

export const emailVerify = createAsyncThunk('emailVerify/user/duplicateEmail-contactNumber', async (body) => {
    return apiRequest
        .post('user/duplicateEmail-contactNumber', body)
        .then((res) => res)
        .catch((err) => err)
})

export const contactVerfify = createAsyncThunk('contactVerfify/user/duplicateEmail-contactNumber', async (body) => {
    return apiRequest
        .post('user/duplicateEmail-contactNumber', body)
        .then((res) => res)
        .catch((err) => err)
})

// doc details action for vandor form
export const createVendorDocDetails = createAsyncThunk('createVendorDocDetails/user/createVendorDocument', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/createVendorDocument', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})

// asset details action for vendor form
export const createVendorAssetDetails = createAsyncThunk('createVendorAssetDetails/user/createVendorAsset', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/createVendorAsset', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})


// vendor list action
export const getAllVendorsList = createAsyncThunk('getAllVendorsList/user/getAllVendors', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/getAllVendors', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})

// vendor data by id
export const getVendorDataById = createAsyncThunk('getVendorDataById/user/getAllVendors', async (body) => {
    const token = getToken()
    try {
        const response = await apiRequest.post('user/getAllVendors', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message)
    }
})

// asset delete action 
export const assetDetailsDelete = createAsyncThunk('assetDetailsDelete/user/deleteVendorAssets', async (body) => {
    return apiRequest
        .post('user/deleteVendorAssets', body)
        .then((res) => res)
        .catch((err) => err)
})

// vendor approval
export const vendorApprovalBySuperadmin = createAsyncThunk('vendorApprovalBySuperadmin/user/updateVendorStatus', async (body) => {
    return apiRequest
        .post('user/updateVendorStatus', body)
        .then((res) => res)
        .catch((err) => err)
})

// delete vendor contact
export const vendorContactDelete = createAsyncThunk('vendorContactDelete/user/deleteVendorContactDetails', async (body) => {
    return apiRequest
        .post('user/deleteVendorContactDetails', body)
        .then((res) => res)
        .catch((err) => err)
})

// vendor trip detail count
// export const vendorTripDetailCount = createAsyncThunk('vendorTripDetailCount/trip/getAllTripCount', async (body) => {
//     return apiRequest
//         .post('trip/getAllTripCount', body)
//         .then((res) => res)
//         .catch((err) => err)
// })
export const vendorTripDetailCount = createAsyncThunk('vendorTripDetailCount/trip/getAllTripCount', async (body) => {
    const token = getToken();
    try {
        const response = await apiRequest.post('trip/getAllTripCount', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});
