import { getAllManagerUser, getFieldExecutiveTripDetail, getManagerUserDataById } from "@/redux/actions/manageuser/manageruserlist"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    error: null,
    managerUserList: [],
    isLoading: false,
    particularmanagerUserData: [],
    countUser: null,
    allTripExecutiveGraphCount: null,
    completedExecutiveGraphCount: null,
    ongoingExecutiveGraphCount: null,
    managerUserCount: null
}

const managerUserSlice = createSlice({
    name: 'managerUserSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllManagerUser.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllManagerUser.fulfilled, (state, action) => {
            state.managerUserList = action.payload.data
            state.countUser = action.payload.data.count
            state.isLoading = false
        });

        builder.addCase(getAllManagerUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        builder.addCase(getManagerUserDataById.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getManagerUserDataById.fulfilled, (state, action) => {
            state.particularmanagerUserData = action.payload.data
            state.managerUserCount = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getManagerUserDataById.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // field executive trip detail for react-chart
        builder.addCase(getFieldExecutiveTripDetail.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getFieldExecutiveTripDetail.fulfilled, (state, action) => {
            state.allTripExecutiveGraphCount = action.payload.allTrips.count
            state.completedExecutiveGraphCount = action.payload.completedTrips.count
            state.ongoingExecutiveGraphCount = action.payload.ongoingTrips.count
            state.isLoading = false
        });

        builder.addCase(getFieldExecutiveTripDetail.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

    }
})

export default managerUserSlice.reducer