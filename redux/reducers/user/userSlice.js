import { getDetailUser, getUserData, verifyEmail } from "@/redux/actions/auth";
import { getJobRole, getNoficationData, routePath } from "@/redux/actions/user/userActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: false,
    activeNavItem: null,
    layoutByRole: 'admin',
    jobRoleList: [],
    error: null,
    getUserList: [],
    isLoading: false,
    getNotificationList: [],
    loginUserData: [],
    pathnameDetail: []
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setLoginStatus(state, action) {
            state.loginStatus = action.payload
        },
        setActiveNav(state, action) {
            state.activeNavItem = action.payload
        },
        setLayoutByRole(state, action) {
            state.layoutByRole = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJobRole.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(getJobRole.fulfilled, (state, action) => {
            state.jobRoleList = action?.payload?.data?.MasterData
        })
        builder.addCase(getJobRole.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.isLoading = false;
            });
        builder.addCase(getUserData.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.getUserList = action?.payload?.data
        })
        builder.addCase(getUserData.rejected, (state, action) => {
            state.error = action.error.message
        })

        builder.addCase(getNoficationData.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(getNoficationData.fulfilled, (state, action) => {
            state.getNotificationList = action?.payload?.data?.data?.rows
        })
        builder.addCase(getNoficationData.rejected, (state, action) => {
            state.error = action.error.message
        })

        builder.addCase(getDetailUser.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(getDetailUser.fulfilled, (state, action) => {
            state.loginUserData = action?.payload?.data
        })
        builder.addCase(getDetailUser.rejected, (state, action) => {
            state.error = action.error.message
        })

        builder.addCase(routePath.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(routePath.fulfilled, (state, action) => {
            state.pathnameDetail = action?.payload?.data
        })
        builder.addCase(routePath.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export const { setActiveNav, setLayoutByRole, setLoginStatus } = userSlice.actions
export default userSlice.reducer