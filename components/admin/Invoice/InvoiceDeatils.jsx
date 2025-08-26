import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoiceList } from '@/redux/actions/project/projectData';
import LoaderComponent from '@/components/comman_component/Loader';
import { Button, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';

const InvoiceDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const loaderProject = useSelector((state) => state?.projectSlice?.isLoading);
    const invoiceList = useSelector(state => state.projectSlice.getListInvoice?.data);


    useEffect(() => {
        dispatch(getAllInvoiceList());
    }, [dispatch]);


    const handleEditInvoice = (id) => {
        dispatch(getAllInvoiceList())
        router.push(`/admin/invoices/edit/${id}`);
    };

    return (
        <>
            {loaderProject && <LoaderComponent />}
            <div className="FinancialInvoiceBg">
                <h4>Invoice Details</h4>
                <div className="table-responsive">
                    <Table className='table'>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Project Name</th>
                                <th>Vendor Name</th>
                                <th>Weight</th>
                                <th>Payment Estimation</th>
                                <th>Payment Released</th>
                                <th>Payment Outstanding</th>
                                <th>Payment Date</th>
                                <th>UTR Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceList && invoiceList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.ProjectNames?.projectName}</td>
                                    <td>{item?.Vendors?.name}</td>
                                    <td>{item?.weight ? item?.weight : 0}</td>
                                    <td>{item?.paymentEstimation}</td>
                                    <td>{item?.paymentReleased}</td>
                                    {/* <td>{item?.paymentOutStanding ? item?.paymentOutStanding : 0}</td> */}
                                    <td>{item.paymentEstimation - item.paymentReleased}</td>
                                    <td>{item?.paymentDate}</td>
                                    <td>{item?.UTR_Number}</td>
                                    <td>
                                        <Button onClick={() => handleEditInvoice(item.id)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default InvoiceDetails;
