import React from 'react';
import Router, { useRouter } from 'next/router';
import { isUserLogined } from './auth';
import AdminLogin from '@/components/admin/AdminLogin';

const withAuth = (Component) => {
    const Auth = (props) => {
        if (!isUserLogined()) {
            return <AdminLogin />;
        }

        let allowed = true;
        const router = useRouter();

        const ComponentToRender = allowed ? Component : <AdminLogin />;
        return <ComponentToRender {...props} />;
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }
    return Auth;
};

export default withAuth;


