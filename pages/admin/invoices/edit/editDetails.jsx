import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getInvoiceDetails } from '@/redux/actions/project/projectData';
import CreateInvoice from '../createinvoice';
import LoaderComponent from '@/components/comman_component/Loader';

const EditInvoice = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [invoiceData, setInvoiceData] = useState(null);
    const loader = useSelector((state) => state.projectSlice.isLoading);

    useEffect(() => {
        if (id) {
            dispatch(getInvoiceDetails(id))
                .then((response) => {
                    setInvoiceData(response.payload.data);
                })
                .catch((error) => {
                    console.error('Error fetching invoice details:', error);
                });
        }
    }, [id, dispatch]);

    return (
        <>
            {loader && <LoaderComponent />}
            {invoiceData && <CreateInvoice invoiceData={invoiceData} />}
        </>
    );
};

export default EditInvoice;
