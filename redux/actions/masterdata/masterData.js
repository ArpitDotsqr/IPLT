import { apiRequest } from "@/redux/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


// vendor type
export const getMasterDataVendor = createAsyncThunk('getMasterData/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// organisation type 
export const getMasterDataOrganisation = createAsyncThunk('getMasterDataOrganisation/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// vehicle type
export const getMasterDataVehicleType = createAsyncThunk('getMasterDataVehicleType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// material type
export const getMaterialType = createAsyncThunk('getMaterialType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// service type
export const getServiceType = createAsyncThunk('getServiceType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// unit type
export const getUnitType = createAsyncThunk('getUnitType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// gstrate type
export const getgstRateType = createAsyncThunk('getgstRateType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// dyke type
export const getdykeType = createAsyncThunk('getdykeType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})
// cello type
export const getcelloType = createAsyncThunk('getcelloType/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// project staff detail
export const getStaffDetail = createAsyncThunk('getStaffDetail/user/getMasterData', async (body) => {
    return apiRequest
        .post('user/getMasterData', body)
        .then((res) => res)
        .catch((err) => err)
})

// payment Term
export const getPaymentTerm = createAsyncThunk('getPaymentTerm/user/getMasterData', async (body) => {
    return apiRequest
      .post('user/getMasterData', body)
      .then((res) => res)
      .catch((err) => err)
})

// transport Unittype
export const getTransporterUnit = createAsyncThunk('getTransporterUnit/user/getMasterData', async (body) => {
    return apiRequest
      .post('user/getMasterData', body)
      .then((res) => res)
      .catch((err) => err)
})

// ReconciliationArrangementtype
export const getReconciliationArrangementtype = createAsyncThunk('getReconciliationArrangementtype/user/getMasterData', async (body) => {
    return apiRequest
      .post('user/getMasterData', body)
      .then((res) => res)
      .catch((err) => err)
})