import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user/userSlice";
import loginUserReducer from './signup/signupSlice'
import managerUserReducer from "./reducers/manageruser/managerUserSlice";
import masterDataReducer from './reducers/masterdata/masterDataSlice'
import vendorReducer from './reducers/vendoruser/vendorSlice'
import projectReducer from './reducers/projectdata/projectDataSlice'
import tripReducer from './reducers/tripdetails/tripDataSlice'
import auditReducer from './reducers/auditlog/auditlogSlice'


const store = configureStore({
    reducer: {
        userSlice: userSlice,
        managerUserSlice: managerUserReducer,
        loginUser: loginUserReducer,
        masterSlice: masterDataReducer,
        vendorSlice: vendorReducer,
        projectSlice: projectReducer,
        tripSlice: tripReducer,
        auditLogsSlice: auditReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})


export default store