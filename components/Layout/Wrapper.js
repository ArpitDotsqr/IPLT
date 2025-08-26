import { setLayoutByRole } from '@/redux/reducers/user/userSlice'
import { userRoles } from '@/utils/helpler'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from './AdminLayout'
import { usePathname } from 'next/navigation'
import AdminLogin from '../admin/AdminLogin'
import ForgotPassword from '../forgotPassword'
import ChangePasswordAdminPage from '../changePassword'


const Wrapper = ({children}) => {
    const pathname = usePathname();
    const router = useRouter()
    const dispatch = useDispatch()

   //  const layoutByRole = useSelector((state) => state.userSlice.layoutByRole)

    return (
        <div>
            {/* {layoutByRole === userRoles.admin && (
                <AdminLayout >{children}</AdminLayout>
            )} */}

            {pathname === "/" ? (
                <AdminLogin />
            ) : pathname === "/forgotpassword" ? (
                <ForgotPassword />
            ) : pathname === "/changepassword" ? <ChangePasswordAdminPage /> : (
                <AdminLayout >{children}</AdminLayout>
            )}
        </div>
    )
}

export default Wrapper