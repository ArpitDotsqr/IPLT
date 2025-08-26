import AdminLayout from '@/components/Layout/AdminLayout'
import Layout from '@/components/admin/layout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function AdminPage({ children }) {
    const router = useRouter()

    // useEffect(() => {
    //     if (router.pathname === "/admin") {
    //         router.push("/admin/dashboard")
    //     }
    // }, [])

    // useEffect(() => {
    //     if (router.pathname === "/admin" && !router.asPath.includes("/admin/")) {
    //         router.push("/admin/dashboard");
    //     }
    // }, [router.pathname]);
    // console.log("adminpageeeeeeeeeeeee", router.pathname)

    // if (!children) return null;
    // console.log(children, "asdasdasdasd")
    return (
        <>
            <AdminLayout children={children} />
        </>
    )
}

export default AdminPage