import LoaderComponent from '@/components/comman_component/Loader';
import { AllPaymentEstimationList, allUpdateEstimation, approvedMail, getProjectDetails, getProjectNameList } from '@/redux/actions/project/projectData';
import { userRoles } from '@/utils/helpler';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';

const InvoiceAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [projectData, setProjectData] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRequested, setIsRequested] = useState(false);
  const [selectedPaymentEstimationId, setSelectedPaymentEstimationId] = useState(null);
  const [paymentEstimation, setPaymentEstimation] = useState("");
  // const [isActionLoading, setIsActionLoading] = useState(false);
  const currentUserData = useSelector((state) => state.userSlice.loginUserData);
  const projectList = useSelector((state) => state.projectSlice.getProjectNameList?.data);
  const projectDetails = useSelector((state) => state.projectSlice.projectDetailList);
  const paymentEstimationList = useSelector((state) => state?.projectSlice?.getPaymentEstimationList?.data);
  const loaderState = useSelector((state) => state?.projectSlice?.isLoading)


  useEffect(() => {
    dispatch(getProjectNameList());
    if (currentUserData?.Role?.key === userRoles.superadmin) {
      dispatch(AllPaymentEstimationList()).then(() => {
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching payment estimation list:", error);
        setLoading(false);
      });
    }
  }, [dispatch, currentUserData]);

  const handleProjectSearch = (selectedOption) => {
    setProjectData(selectedOption);
    setLoading(true);
    dispatch(getProjectDetails({ projectId: selectedOption.value }))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching project details:', error);
        setLoading(false);
      });
    setIsRequested(true);
  };

  const handleEmailMessage = () => {
    if (projectData && currentUserData && paymentEstimation) {
      const payload = {
        email: currentUserData.email,
        paymentEstimation: parseFloat(paymentEstimation),
        projectId: projectData.value,
      };

      dispatch(approvedMail(payload));
      // setIsRequested("")
      toast.success("Request sent Successfully");
      // dispatch(getProjectDetails({ projectId: projectData?.value }));
      // setIsRequested(true);
      // setShowModal(true);
    } else {
      toast.error("Request Failed");
    }
  };

  // const handleCloseModal = () => setShowModal(false);

  const handlePayment = (e) => {
    setPaymentEstimation(e.target.value);
  };

  const handleApprove = async (id) => {
    const payload = {
      id: id,
      isApproval: true,
      isReject: false
    };
    try {
      // setIsActionLoading(true);
      await dispatch(allUpdateEstimation(payload));
      toast.success("Request Approved");
      // setIsActionLoading(false);
      dispatch(AllPaymentEstimationList());
      setSelectedPaymentEstimationId(null);
      handleCloseModal();
    } catch (error) {
      // setIsActionLoading(false);
      // toast.error("Failed to approve the request.");
    }
  };

  const handleReject = async (id) => {
    const payload = {
      id: id,
      isApproval: false,
      isReject: true
    };
    try {
      // setIsActionLoading(true);
      await dispatch(allUpdateEstimation(payload));
      toast("Request Rejected");
      // setIsActionLoading(false);
      dispatch(AllPaymentEstimationList());
      setSelectedPaymentEstimationId(null);
      handleCloseModal();
    } catch (error) {
      // setIsActionLoading(false);
      // toast.error("Failed to reject the request.");
    }
  };

  return (
    <>

      {loaderState && <LoaderComponent />}
      <div className='Financial_invoice'>
        {currentUserData?.Role?.key === userRoles.mis && (
          <>
            <Row className="justify-content-end">
              <Col md={6} className="text-end">
                <button
                  onClick={() => router.push("/admin/invoices/createinvoice")}
                  className="create_new_project_btn mt-0">
                  Create Invoice <img src="/images/plus.svg" alt="Create Invoice" />
                </button>
              </Col>
            </Row>
            <div className="FinancialInvoiceBg">
              <Row className='justify-content-end'>
                <Col md={4}>
                  <div className='financialProjectColumn'>
                    <div className="">
                      <label className='mb-3'>Payment Estimation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={paymentEstimation}
                        onChange={handlePayment}
                        placeholder='Payment Estimation' />
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='financialProjectColumn'>
                    <div className="">
                      <label className='mb-3'>Project</label>
                      <Select
                        classNamePrefix="SelectWorkOrder"
                        placeholder="Select Project Name"
                        value={projectData}
                        onChange={handleProjectSearch}
                        options={projectList?.map((item) => ({
                          value: item.id,
                          label: item.projectName
                        }))} />
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='financialProjectColumn'>
                    <button className='PaymentRequestBtn' onClick={handleEmailMessage}>Payment Request</button>
                  </div>
                </Col>
              </Row>
            </div>

            {isRequested && (
              <div className="FinancialInvoiceBg">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='avgTripbyTransporter'>
                      {/* Content related to approval */}
                    </div>
                  </div>
                  <div className='col-md-12 p-0'>
                    <div className='avgTripbyTransporterInner'>
                      <div className="create_project_table">
                        <div className="table-responsive">
                          <Table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Project Name</th>
                                <th>Unit</th>
                                <th>Qty</th>
                                <th>Rate(in rs.)</th>
                                <th>Amount(in rs.)</th>
                                <th>GST Rate(%)</th>
                                <th>Amount(Including GST)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {projectDetails && projectDetails.ServiceDetail && projectDetails.ServiceDetail.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{projectDetails.ProjectDetails?.projectName}</td>
                                  <td>{item.unitIds.displayName}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.unitRate}</td>
                                  <td>{Number(item.quantity) * Number(item.unitRate)}</td>
                                  <td>{item.gstRateIds.displayName}</td>
                                  <td>{Number(item.unitRate) * Number(item.quantity) + Number(item.unitRate) * Number(item.quantity) * (Number(item.gstRateIds.name) / 100)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {currentUserData?.Role?.key === userRoles.superadmin && (

          <>

            {paymentEstimationList && paymentEstimationList.length > 0 ? (
              <div className='row'>
                <h4>Payment Request</h4>
                {paymentEstimationList.map((item) => (
                  <div key={item.id} className='col-md-6 mt-5'>
                    <div className="InvoiceCurrentUserData">
                      <div className="InvoiceCurrentUserDataCol">
                        <div className="CurrentUserDataInner">
                          <h5>Project Name</h5>
                          <p>{item.ProjectName.projectName}</p>
                        </div>
                        <div className="CurrentUserDataInner">
                          <h5>Payment Estimation</h5>
                          <p>{item.paymentEstimation}</p>
                        </div>
                      </div>
                      <div className='approved_and_rejected'>
                        <Button
                          onClick={() => {
                            handleApprove(item.id);
                          }}
                        // disabled={isActionLoading}
                        >
                          {selectedPaymentEstimationId === item.id ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button
                          onClick={() => {
                            handleReject(item.id);
                          }}
                          className='Reject'
                        // disabled={isActionLoading}
                        >
                          {selectedPaymentEstimationId === item.id ? 'Rejecting...' : 'Reject'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h5>No payment request available.</h5>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default InvoiceAdmin;



