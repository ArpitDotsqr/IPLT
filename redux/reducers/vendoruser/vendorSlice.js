import { contactVerfify, emailVerify, getAllVendorsList, getVendorDataById, vendorTripDetailCount } from "@/redux/actions/vendor/vendorActions"
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    error: null,
    vendorList: [],
    particularVendorData: [],
    isLoading: false,
    mobileCheck: {},
    emailCheck: {},
    allTripVendorGraphCount: null,
    allCompletedVendorGraphCount: null,
    allOngingVendorGraphCount: null
}

const vendorSlice = createSlice({
    name: "vendorSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllVendorsList.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllVendorsList.fulfilled, (state, action) => {
            state.vendorList = action?.payload?.data
            state.isLoading = false
        })
        builder.addCase(getAllVendorsList.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        builder.addCase(getVendorDataById.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getVendorDataById.fulfilled, (state, action) => {
            state.particularVendorData = action?.payload?.data?.rows
            state.isLoading = false
        })
        builder.addCase(getVendorDataById.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
        // mobile check
        builder.addCase(contactVerfify.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(contactVerfify.fulfilled, (state, action) => {
            state.mobileCheck = action?.payload?.data
        })
        builder.addCase(contactVerfify.rejected, (state, action) => {
            state.error = action.error.message
        })

        //email check
        builder.addCase(emailVerify.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(emailVerify.fulfilled, (state, action) => {
            state.emailCheck = action?.payload?.data
        })
        builder.addCase(emailVerify.rejected, (state, action) => {
            state.error = action.error.message
        })

        //vendor trip count
        builder.addCase(vendorTripDetailCount.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(vendorTripDetailCount.fulfilled, (state, action) => {
            state.allTripVendorGraphCount = action.payload.data.allTrips.count
            state.allCompletedVendorGraphCount = action.payload.data.completedTrips.count
            state.allOngingVendorGraphCount = action.payload.data.ongoingTrips.count
        })
        builder.addCase(vendorTripDetailCount.rejected, (state, action) => {
            state.error = action.error.message
        })

    }
})

export default vendorSlice.reducer