import { getAuditLogsDetail } from "@/redux/actions/auditlogs/auditlogsdata"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    error: null,
    auditLogsListData: [],
    isLoading: false,
    auditLogsListCount: null
}

const auditLogsSlice = createSlice({
    name: 'auditLogsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAuditLogsDetail.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getAuditLogsDetail.fulfilled, (state, action) => {
            state.auditLogsListData = action.payload.data?.rows
            state.auditLogsListCount = action.payload.data?.count
            state.isLoading = false
        });

        builder.addCase(getAuditLogsDetail.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false
        });

    }
})

export default auditLogsSlice.reducer