import { getMasterDataOrganisation, getMasterDataVehicleType, getMasterDataVendor, getMaterialType, getPaymentTerm, getReconciliationArrangementtype, getServiceType, getStaffDetail, getTransporterUnit, getUnitType, getcelloType, getdykeType, getgstRateType } from "@/redux/actions/masterdata/masterData"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    error: null,
    vendorMasterDataList: [],
    organisationMasterDataList: [],
    vendorId: null,
    vehicleTypeList: [],
    materialList: [],
    serviceTypeList: [],
    unitTypeList: [],
    gstRateTypeList: [],
    dykeList: [],
    celloList: [],
    staffDetailList: [],
    paymentTermList: [],
    transporterUnitList: [],
    ReconciliationList: []
}

const masterSlice = createSlice({
    name: 'masterDataSlice',
    initialState,
    reducers: {
        setVendorId(state, action) {
            state.vendorId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMasterDataVendor.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getMasterDataVendor.fulfilled, (state, action) => {
            state.vendorMasterDataList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getMasterDataVendor.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        builder.addCase(getMasterDataOrganisation.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getMasterDataOrganisation.fulfilled, (state, action) => {
            state.organisationMasterDataList = action.payload.data
            state.isLoading = false
        });

        builder.addCase(getMasterDataOrganisation.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

        builder.addCase(getMasterDataVehicleType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getMasterDataVehicleType.fulfilled, (state, action) => {
            state.vehicleTypeList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getMasterDataVehicleType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // material type
        builder.addCase(getMaterialType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getMaterialType.fulfilled, (state, action) => {
            state.materialList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getMaterialType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // service type
        builder.addCase(getServiceType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getServiceType.fulfilled, (state, action) => {
            state.serviceTypeList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getServiceType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // unit type
        builder.addCase(getUnitType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getUnitType.fulfilled, (state, action) => {
            state.unitTypeList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getUnitType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // gst Rate type
        builder.addCase(getgstRateType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getgstRateType.fulfilled, (state, action) => {
            state.gstRateTypeList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getgstRateType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // dyke type
        builder.addCase(getdykeType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getdykeType.fulfilled, (state, action) => {
            state.dykeList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getdykeType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // cello type
        builder.addCase(getcelloType.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getcelloType.fulfilled, (state, action) => {
            state.celloList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getcelloType.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // staff detail
        builder.addCase(getStaffDetail.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getStaffDetail.fulfilled, (state, action) => {
            state.staffDetailList = action.payload.data?.MasterData?.rows
            state.isLoading = false
        })
        builder.addCase(getStaffDetail.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        // payment Term
        builder.addCase(getPaymentTerm.fulfilled, (state, action) => {
            state.paymentTermList = action.payload.data?.MasterData?.rows
        })
        builder.addCase(getPaymentTerm.rejected, (state, action) => {
            state.error = action.error.message
        })

        // transporter unittype
        builder.addCase(getTransporterUnit.fulfilled, (state, action) => {
            state.transporterUnitList = action.payload.data?.MasterData?.rows
        })
        builder.addCase(getTransporterUnit.rejected, (state, action) => {
            state.error = action.error.message
        })
        // Reconciliation Arrangementtype
        builder.addCase(getReconciliationArrangementtype.fulfilled, (state, action) => {
            state.ReconciliationList = action.payload.data?.MasterData?.rows
        })
        builder.addCase(getReconciliationArrangementtype.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export const { setVendorId } = masterSlice.actions
export default masterSlice.reducer