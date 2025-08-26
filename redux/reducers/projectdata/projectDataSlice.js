import { AllPaymentEstimationList, UpdateInvoice, allProjectWiseDetails, allUpdateEstimation, approvedMail, avgTripByTransporter, getAllFleetDetails, getAllInvoiceList, getAllProjectDetails, getAllProjectStatus, getAllRequirement, getAllTransporterList, getProjectDetails, getProjectNameList, getProjectTripGraphData, getTripCompletedDataPerProject, getTripDetailPerProject, getTripOngoingDataPerProject, getWorkOrderDetail, invoiceCreate, overAllPerformanceOfFleet, tripByTransporter } from "@/redux/actions/project/projectData"
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    projectId: null,
    projectRequirementList: [],
    projectDetailList: [],
    allprojectDetailList: [],
    allTripProjectGraphData: null,
    allCompletedTripGraphData: null,
    allOngingTripGraphData: null,
    getOngoingProjectData: [],
    getCompletedProjectData: [],
    barGraphProjectData: [],
    AllTripCount: null,
    AllOngoingTripCount: null,
    AllCompletedTripCount: null,
    workOrderData: [],
    allProjectTripDetail: [],
    totalAllTriWeight: null,
    getProjectNameList: [],
    projectdetails: [],
    allFleetDetails: [],
    TransporterList: [],
    tripTransporter: [],
    avgtripTransporter: [],
    overAllPerformance: [],
    approvalMails: [],
    getProjectStatus: [],
    getUpdateEstimation: [],
    getPaymentEstimationList: [],
    CreateNewInvoice: [],
    getListInvoice: [],
    getupdateInvoice: []
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        setProjectId(state, action) {
            state.projectId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRequirement.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllRequirement.fulfilled, (state, action) => {
            state.projectRequirementList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getAllRequirement.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // get project detail slice
        builder.addCase(getProjectDetails.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getProjectDetails.fulfilled, (state, action) => {
            state.projectDetailList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getProjectDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // get all project detail list
        builder.addCase(getAllProjectDetails.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllProjectDetails.fulfilled, (state, action) => {
            state.allprojectDetailList = action.payload.data?.allProjectData
            state.allProjectTripDetail = action.payload.data?.tripData?.tripCount
            state.isLoading = false
        });

        builder.addCase(getAllProjectDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // get trip project detail
        builder.addCase(getTripDetailPerProject.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getTripDetailPerProject.fulfilled, (state, action) => {
            state.allTripProjectGraphData = action.payload.data.allTrips?.count
            state.allCompletedTripGraphData = action.payload.data.completedTrips?.count
            state.allOngingTripGraphData = action.payload.data.ongoingTrips?.count
            state.isLoading = false
        });

        builder.addCase(getTripDetailPerProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // ongoing trip count detail
        builder.addCase(getTripOngoingDataPerProject.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getTripOngoingDataPerProject.fulfilled, (state, action) => {
            state.getOngoingProjectData = action.payload.data.ongoingTripData
            state.isLoading = false
        });

        builder.addCase(getTripOngoingDataPerProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // completetd trip count detail
        builder.addCase(getTripCompletedDataPerProject.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getTripCompletedDataPerProject.fulfilled, (state, action) => {
            state.getCompletedProjectData = action.payload.data.completedTripData
            state.isLoading = false
        });

        builder.addCase(getTripCompletedDataPerProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // bar graph project trip data
        builder.addCase(getProjectTripGraphData.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getProjectTripGraphData.fulfilled, (state, action) => {
            state.barGraphProjectData = action.payload.allProjectData?.rows
            state.AllTripCount = action.payload.allTripsCount
            state.AllOngoingTripCount = action.payload.onGoingTripCount
            state.AllCompletedTripCount = action.payload.completedTripCount
            state.totalAllTriWeight = action.payload.totalTripsWeight
            state.isLoading = false
        });

        builder.addCase(getProjectTripGraphData.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // work order detail

        builder.addCase(getWorkOrderDetail.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getWorkOrderDetail.fulfilled, (state, action) => {
            state.workOrderData = action.payload.data.data
            state.workOrderSubject = action.payload.data.projectDetail
            state.isLoading = false
        });

        builder.addCase(getWorkOrderDetail.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });
        // Project name list 

        builder.addCase(getProjectNameList.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getProjectNameList.fulfilled, (state, action) => {
            state.getProjectNameList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getProjectNameList.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // Project wise details
        builder.addCase(allProjectWiseDetails.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(allProjectWiseDetails.fulfilled, (state, action) => {
            state.projectdetails = action.payload.data
            state.isLoading = false
        });

        builder.addCase(allProjectWiseDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });



        // project all fleet details
        builder.addCase(getAllFleetDetails.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllFleetDetails.fulfilled, (state, action) => {
            state.allFleetDetails = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getAllFleetDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // all transporter list
        builder.addCase(getAllTransporterList.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllTransporterList.fulfilled, (state, action) => {
            state.TransporterList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getAllTransporterList.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // trip by transporter

        builder.addCase(tripByTransporter.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(tripByTransporter.fulfilled, (state, action) => {
            state.tripTransporter = action.payload.data
            state.isLoading = false
        });

        builder.addCase(tripByTransporter.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // avg trip by trasporter
        builder.addCase(avgTripByTransporter.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(avgTripByTransporter.fulfilled, (state, action) => {
            state.avgtripTransporter = action.payload.data
            state.isLoading = false
        });

        builder.addCase(avgTripByTransporter.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // over all performance of Fleet
        builder.addCase(overAllPerformanceOfFleet.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(overAllPerformanceOfFleet.fulfilled, (state, action) => {
            state.overAllPerformance = action.payload.data
            state.isLoading = false
        });

        builder.addCase(overAllPerformanceOfFleet.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // Mail approval

        builder.addCase(approvedMail.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(approvedMail.fulfilled, (state, action) => {
            state.approvalMails = action.payload.data
            state.isLoading = false
        });

        builder.addCase(approvedMail.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // project Status

        builder.addCase(getAllProjectStatus.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllProjectStatus.fulfilled, (state, action) => {
            state.getProjectStatus = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getAllProjectStatus.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });



        // get all payment Etimation list

        builder.addCase(AllPaymentEstimationList.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(AllPaymentEstimationList.fulfilled, (state, action) => {
            state.getPaymentEstimationList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(AllPaymentEstimationList.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // all update estimation

        builder.addCase(allUpdateEstimation.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(allUpdateEstimation.fulfilled, (state, action) => {
            state.getUpdateEstimation = action.payload.data
            state.isLoading = false
        });

        builder.addCase(allUpdateEstimation.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });


        // create invoice
        builder.addCase(invoiceCreate.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(invoiceCreate.fulfilled, (state, action) => {
            state.CreateNewInvoice = action.payload.data;
            state.isLoading = false
        });

        builder.addCase(invoiceCreate.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // get invoice list

        builder.addCase(getAllInvoiceList.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAllInvoiceList.fulfilled, (state, action) => {
            state.getListInvoice = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getAllInvoiceList.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        // upadte The invoice 
        builder.addCase(UpdateInvoice.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(UpdateInvoice.fulfilled, (state, action) => {
            state.getupdateInvoice = action.payload.data
            state.isLoading = false
        });

        builder.addCase(UpdateInvoice.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

    }

})

export const { setProjectId } = projectSlice.actions
export default projectSlice.reducer