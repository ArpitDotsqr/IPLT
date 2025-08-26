import { getToken } from "@/components/utils";
import { apiRequest } from "@/redux/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createBasicDetails = createAsyncThunk('createBasicDetails/project/createProjectBasicDetail', async (body) => {
    return apiRequest
        .post('project/createProjectBasicDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

export const createRequirement = createAsyncThunk('createRequirement/project/createProjectRequirement', async (body) => {
    return apiRequest
        .post('project/createProjectRequirement', body)
        .then((res) => res)
        .catch((err) => err)
})

export const createEicDetails = createAsyncThunk('createEicDetails/project/createProjectEicDetail', async (body) => {
    return apiRequest
        .post('project/createProjectEicDetail', body)
        .then((res) => res)
        .catch((err) => err)
})


export const getAllRequirement = createAsyncThunk('getAllRequirement/project/getAllProjectRequirement', async (body) => {
    return apiRequest
        .post('project/getAllProjectRequirement', body)
        .then((res) => res)
        .catch((err) => err)
})


export const createStaffDetail = createAsyncThunk('createStaffDetail/project/createProjectStaffDetail', async (body) => {
    return apiRequest
        .post('project/createProjectStaffDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

export const createVendorDetail = createAsyncThunk('createVendorDetail/project/createProjectVendorDetail', async (body) => {
    return apiRequest
        .post('project/createProjectVendorDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

export const getProjectDetails = createAsyncThunk('getProjectDetails/project/getProjectDetail', async (body) => {
    return apiRequest
        .post('project/getProjectDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

// export const getAllProjectDetails = createAsyncThunk('getAllProjectDetails/project/getAllProjects', async (body) => {
//     return apiRequest
//         .post('project/getAllProjects', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getAllProjectDetails = createAsyncThunk('getAllProjectDetails/project/getAllProjects', async (body) => {
    const token = getToken();
    try {
        const response = await apiRequest.post('project/getAllProjects', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// basic detail update
export const updateProjetBasicDetail = createAsyncThunk('updateProjetBasicDetail/project/updateProjectBasicDetails', async (body) => {
    return apiRequest
        .post('project/updateProjectBasicDetails', body)
        .then((res) => res)
        .catch((err) => err)
})

// requirement update
export const updateProjetRequirement = createAsyncThunk('updateProjetRequirement/project/updateProjectRequirement', async (body) => {
    return apiRequest
        .post('project/updateProjectRequirement', body)
        .then((res) => res)
        .catch((err) => err)
})


// Eic details
export const updateProjectEicDetail = createAsyncThunk('updateProjectEicDetail/project/updateProjectEicDetail', async (body) => {
    return apiRequest
        .post('project/updateProjectEicDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

// vendor details
export const updateProjectVendorDetail = createAsyncThunk('updateProjectVendorDetail/project/updateProjectVendorDetail', async (body) => {
    return apiRequest
        .post('project/updateProjectVendorDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

// delete purchase order
export const deletePurchaseOrderDetails = createAsyncThunk('deletePurchaseOrder/project/deletePurchaseOrderDetail', async (id) => {
    return apiRequest
        .delete(`project/deletePurchaseOrderDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete service delete
export const deleteServiceDetail = createAsyncThunk('deleteServiceDetail/project/deleteServiceDetail', async (id) => {
    return apiRequest
        .delete(`project/deleteServiceDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete loading address
export const deleteLoading = createAsyncThunk('deleteLoading/project/deleteLoadingPointDetail', async (id) => {
    return apiRequest
        .delete(`project/deleteLoadingPointDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete unloading address
export const deleteUnoading = createAsyncThunk('deleteUnoading/project/deleteUnloadingPointDetail', async (id) => {
    return apiRequest
        .delete(`project/deleteUnloadingPointDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete eic detail
export const deleteEicDetail = createAsyncThunk('deleteEicDetail/project/deleteEicDetail', async (id) => {
    return apiRequest
        .delete(`project/deleteEicDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete staffdetail
export const deleteStaffDetail = createAsyncThunk('deleteTransporter/project/deleteStaffDetail', async (id) => {
    return apiRequest
        .delete(`project/deleteStaffDetail/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete transporter
export const deleteTransporter = createAsyncThunk('deleteTransporter/project/deleteProjectTransporter', async (id) => {
    return apiRequest
        .delete(`project/deleteProjectTransporter/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete excavator
export const deleteExcavator = createAsyncThunk('deleteExcavator/project/deleteProjectExcavator', async (id) => {
    return apiRequest
        .delete(`project/deleteProjectExcavator/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// delete petrol pump
export const deletePetrolpump = createAsyncThunk('deletePetrolpump/project/deleteProjectPetrolPump', async (id) => {
    return apiRequest
        .delete(`project/deleteProjectPetrolPump/${id}`)
        .then((res) => res)
        .catch((err) => err)
})

// trip count per project 
// export const getTripDetailPerProject = createAsyncThunk('getTripDetailPerProject/trip/getAllTripCount', async (body) => {
//     return apiRequest
//         .post('trip/getAllTripCount', body)
//         .then((res) => res)
//         .catch((err) => err)
// })

export const getTripDetailPerProject = createAsyncThunk('getTripDetailPerProject/trip/getAllTripCount', async (body) => {
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

// trip count ongoing data per project 
export const getTripOngoingDataPerProject = createAsyncThunk('getTripOngoingDataPerProject/trip/getAllOngoingTrip', async (body) => {
    return apiRequest
        .post('trip/getAllOngoingTrip', body)
        .then((res) => res)
        .catch((err) => err)
})

// trip count completed data per project 
export const getTripCompletedDataPerProject = createAsyncThunk('getTripCompletedDataPerProject/trip/getAllCompletedTrip', async (body) => {
    return apiRequest
        .post('trip/getAllCompletedTrip', body)
        .then((res) => res)
        .catch((err) => err)
})



export const getProjectTripGraphData = createAsyncThunk('getProjectTripGraphData/project/projectTripCountForDashBoard', async (body) => {
    const token = getToken();
    try {
        const response = await apiRequest.post('project/projectTripCountForDashBoard', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectedErr.rejectWithValue(error.message);
    }
});

// workorder
export const getWorkOrderDetail = createAsyncThunk('getWorkOrderDetail/project/workOrderDetail', async (body) => {
    return apiRequest
        .post('project/workOrderDetail', body)
        .then((res) => res)
        .catch((err) => err)
})

export const getProjectNameList = createAsyncThunk("getProjectNameList/project/nameList", async (body) => {
    return apiRequest
        .post('project/projectList', body)
        .then((res) => res)
        .catch((res) => res)
})

export const allProjectWiseDetails = createAsyncThunk("allProjectWiseDetails/project/projectwise", async (body) => {
    return apiRequest
        .post('project/projectWiseDetails', body)
        .then((res) => res)
        .catch((res) => res)
})

export const getAllFleetDetails = createAsyncThunk("allFleetDetails/project/fleetdetails", async (body) => {
    return apiRequest
        .get('project/allFleetDetails', body)
        .then((res) => res)
        .catch((res) => res)
})

export const getAllTransporterList = createAsyncThunk("allTransporterList/project/transporterlist", async (body) => {
    return apiRequest
        .get('project/transporterList', body)
        .then((res) => res)
        .catch((res) => res)
})

export const tripByTransporter = createAsyncThunk("tripByTransporter/project/tripTransporter", async (body) => {
    return apiRequest
        .post('project/tripBytransporter', body)
        .then((res) => res)
        .catch((res) => res)
})

export const avgTripByTransporter = createAsyncThunk("avgTripByTransporter/project/TripByTransporter", async (body) => {
    return apiRequest
        .post('project/avgTripByTransporter', body)
        .then((res) => res)
        .catch((res) => res)
})

export const overAllPerformanceOfFleet = createAsyncThunk("overAllPerformance/project/AllPerformanceOfFleet", async (body) => {
    return apiRequest
        .post('project/overAllPerformanceOfFleet', body)
        .then((res) => res)
        .catch((res) => res)
})

export const approvedMail = createAsyncThunk("äpprovedMail/project/AllapprovalMail", async (body) => {
    return apiRequest
        .post("project/approvalMail", body)
        .then((res) => res)
        .catch((res) => res)
})

export const getAllProjectStatus = createAsyncThunk("projectApproved/project/getprojectStatus", async (body) => {
    return apiRequest
        .post("project/pendingProjectList", body)
        .then((res) => res)
        .catch((res) => res)
})
export const AllPaymentEstimationList = createAsyncThunk("paymentlist/project/allEstimation", async (body) => {
    return apiRequest
        .post("project/estimationList", body)
        .then((res) => res)
        .catch((res) => res)
})

export const allUpdateEstimation = createAsyncThunk("projectestimation/project/updateEstimation", async (body) => {
    return apiRequest
        .post("project/updateEstimation", body)
        .then((res) => res)
        .catch((res) => res)
})

export const invoiceCreate = createAsyncThunk("invoiceCreate/project/createnewinvoice", async (body) => {
    return apiRequest
        .post("project/createInvoice", body)
        .then((res) => res)
        .catch((res) => res)
})

export const getAllInvoiceList = createAsyncThunk("getInvoice/project/invoice", async (body) => {
    return apiRequest
        .post("project/invoiceList", body)
        .then((res) => res)
        .catch((res) => res)
})


export const UpdateInvoice = createAsyncThunk("getUpadte/project/getuUpdatelist", async (body) => {
    return apiRequest
        .post("project/updateInvoice", body)
        .then((res) => res)
        .then((res) => res)
})