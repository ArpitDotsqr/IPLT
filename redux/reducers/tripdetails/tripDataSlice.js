import {
  getCancelList,
  getRejectedList,
  getTripApprovalList,
  getTripByIdList,
  getTripCompletedList,
  getTripDataById,
  getTripDetails,
} from "@/redux/actions/trip/tripDetail";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allTripDetails: [],
  error: null,
  tripCount: null,
  particularTripData: [],
  tripListForApproval: [],
  tripForApprovalCount: null,
  rejectedTripList: [],
  rejectedTripCount: null,
  cancelledTripList: [],
  cancelledTripCount: null,
  tripDetailsById: [],
  completedTripCount: null,
  completedTripList: [],
  progressBarLoadingData: [],
  progressBarUnloadingData: [],
  weightData: [],
};

const tripSlice = createSlice({
  name: "tripSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all trip detail list
    builder.addCase(getTripDetails.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getTripDetails.fulfilled, (state, action) => {
      state.allTripDetails = action.payload.data.allTrip?.rows;
      state.tripCount = action.payload.data.allTrip?.count;
      state.isLoading = false;
    });

    builder.addCase(getTripDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // get trip data by id
    builder.addCase(getTripDataById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getTripDataById.fulfilled, (state, action) => {
      state.particularTripData = action.payload.data.tripData;
      state.progressBarLoadingData = action.payload.data.loadingPointData;
      state.progressBarUnloadingData = action.payload.data.unloadingPointData;
      state.isLoading = false;
    });

    builder.addCase(getTripDataById.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // trip approval list
    builder.addCase(getTripApprovalList.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getTripApprovalList.fulfilled, (state, action) => {
      // if (action.meta.arg.tripId) {
      //     state.tripFullData = action.payload.data.data?.rows
      // } else {
      state.tripListForApproval = action.payload.data.data?.rows;
      state.tripForApprovalCount = action.payload.data.data?.count;
      // }
      state.isLoading = false;
    });

    builder.addCase(getTripApprovalList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // rejected list
    builder.addCase(getRejectedList.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getRejectedList.fulfilled, (state, action) => {
      state.rejectedTripList = action.payload.data.data?.rows;
      state.rejectedTripCount = action.payload.data.data?.count;
      state.isLoading = false;
    });

    builder.addCase(getRejectedList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // cancelled list
    builder.addCase(getCancelList.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getCancelList.fulfilled, (state, action) => {
      state.cancelledTripList = action.payload.data.data?.rows;
      state.cancelledTripCount = action.payload.data.data?.count;
      state.isLoading = false;
    });

    builder.addCase(getCancelList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // trip list by id
    builder.addCase(getTripByIdList.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getTripByIdList.fulfilled, (state, action) => {
      state.tripDetailsById = action.payload.data.tripData;
      state.weightData = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(getTripByIdList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // completed trip list approval
    builder.addCase(getTripCompletedList.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getTripCompletedList.fulfilled, (state, action) => {
      state.completedTripList = action.payload.data.data?.rows;
      state.completedTripCount = action.payload.data.data?.count;
      state.isLoading = false;
    });

    builder.addCase(getTripCompletedList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default tripSlice.reducer;
