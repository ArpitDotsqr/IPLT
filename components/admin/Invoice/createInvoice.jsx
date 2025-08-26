import React, { useEffect, useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoaderComponent from '@/components/comman_component/Loader';
import Select from "react-select";
import { useRouter } from 'next/router';
import InvoiceDetails from './InvoiceDeatils';
import arrayMutators from "final-form-arrays";

import {
  getAllInvoiceList,
  getAllTransporterList,
  getProjectNameList,
  invoiceCreate,
  getProjectDetails,
  allProjectWiseDetails,
  UpdateInvoice
} from '@/redux/actions/project/projectData';

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState(null);
  const [vendorList, setVendorList] = useState(null);
  const [paymentReleased, setPaymentReleased] = useState("");
  const [projectWeight, setProjectWeight] = useState(0);
  const [paymentEstimation, setPaymentEstimation] = useState(0);
  const [paymentOutstanding, setPaymentOutstanding] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const loaderProject = useSelector((state) => state?.projectSlice?.isLoading);
  const projectNameList = useSelector((state) => state?.projectSlice?.getProjectNameList?.data);
  const transporterList = useSelector((state) => state?.projectSlice?.TransporterList?.data);
  const invoiceList = useSelector((state) => state?.projectSlice?.getListInvoice?.data);
  const [projectHasError, setProjectHasError] = useState(false);

  const { id } = router.query;

  useEffect(() => {
    dispatch(getProjectNameList());
    dispatch(getAllTransporterList());
    if (id) {
      dispatch(getAllInvoiceList(id));
    }
  }, [dispatch, id]);


  useEffect(() => {
    if (invoiceList && invoiceList.length > 0) {
      const invoice = invoiceList.find(item => item.id === parseInt(id));
      if (invoice) {
        setVendorList({ value: invoice.vendorId, label: invoice.Vendors?.name });
        setProjectList({ value: invoice.projectId, label: invoice.ProjectNames?.projectName });
        setProjectWeight(invoice.weight);
        setPaymentReleased(invoice.paymentReleased);
        setPaymentEstimation(invoice.paymentEstimation);
        setPaymentOutstanding(invoice.paymentOutStanding);
        setUtrNumber(invoice.UTR_Number);
        setPaymentDate(invoice.paymentDate);
      }
    }
  }, [id, invoiceList]);


  const handleSubmit = (values) => {
    const payload = {
      vendorId: values.vendorName?.value,
      projectId: values.projectname?.value,
      weight: values.weight,
      paymentEstimation: values.paymentestimation,
      paymentReleased: values.paymentreleased,
      paymentOutStanding: values.paymentestimation - values.paymentreleased,

      paymentDate: values.paymentdate,
      UTR_Number: values.utrnumber
    };

    if (id) {
      dispatch(UpdateInvoice({ id: id, ...payload }))
        .then(response => {
          if (!response.error) {
            toast.success("Invoice updated successfully");
            dispatch(getAllInvoiceList(id));
          } else {
            toast.error("Failed to update invoice");
          }
        })
        .catch(error => {
          console.error("Error updating invoice:", error);
          toast.error("Failed to update invoice");
        });
    } else {
      dispatch(invoiceCreate(payload))
        .then(response => {
          if (!response.error) {
            toast.success("Invoice created successfully");
            dispatch(getAllInvoiceList());
          } else {
            toast.error("Failed to create invoice");
          }
        })

        .catch(error => {
          console.error("Error creating invoice:", error);
          toast.error("Failed to create invoice");
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.vendorName) {
      errors.vendorName = 'Required';
    }
    if (!values.projectname) {
      errors.projectname = 'Required';
    }
    // if (!values.paymentestimation && (projectWeight || paymentEstimation)) {
    //   errors.paymentestimation = 'Required';
    // }
    if (!values.paymentreleased) {
      errors.paymentreleased = 'Required';
    }
    // if (!values.paymentoutstanding && (paymentReleased || paymentEstimation)) {
    //   errors.paymentoutstanding = 'Required';
    // }
    if (!values.paymentdate) {
      errors.paymentdate = 'Required';
    }
    if (!values.utrnumber) {
      errors.utrnumber = 'Required';
    }
    return errors;
  };

  const handleProjectSearch = (selectedOption) => {
    setProjectList(selectedOption);

    if (selectedOption) {
      setLoading(true);
      Promise.all([
        dispatch(getProjectDetails({ projectId: selectedOption.value })),
        dispatch(allProjectWiseDetails({ projectId: selectedOption.value })),
        dispatch(getProjectNameList({ id: selectedOption?.value })),
        dispatch(getProjectNameList())
      ])
        .then(([projectDetailsResponse, projectWiseDetailsResponse, projectNameListResponse]) => {
          setLoading(false);
          const projectDetails = projectDetailsResponse.payload?.data;
          const projectWiseDetails = projectWiseDetailsResponse.payload?.data;
          const projectNameList = projectNameListResponse.payload?.data?.data[0];

          if (projectDetails && projectWiseDetails && projectNameList) {
            setProjectWeight(projectWiseDetails.totalWeight || 0);
            setPaymentEstimation(projectNameList?.Estimation[0]?.paymentEstimation || 0);
            setProjectHasError(!projectNameList.Estimation[0]?.paymentEstimation);
          } else {
            setProjectWeight(0);
            setPaymentEstimation(0);
            setProjectHasError(true);
          }

          if (!projectNameList.Estimation[0]?.paymentEstimation) {
            toast.error("Payment Request not send ");
          }
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
          setLoading(false);
          setProjectHasError(true);
        });
    }
  };


  const handleSelectChange = (selectOption) => {
    setVendorList(selectOption);
  };

  const calculatePaymentOutstanding = (released, estimation) => {
    const releasedAmount = parseFloat(released);
    const estimationAmount = parseFloat(estimation);
    if (!isNaN(releasedAmount) && !isNaN(estimationAmount)) {
      return estimationAmount - releasedAmount;
    }
    return 0;
  };


  return (
    <>
      {loaderProject && <LoaderComponent />}
      <div className='ProjectAdmin'>
        <div className="back_btn_all pt-0">
          <p onClick={() => router.push('/admin/invoices')}>
            <span className="back_icon">
              <img src="/images/back_icon.svg" alt="" className="img-fluid" />
            </span>
            Back
          </p>
        </div>
        <div className='main_user_createmain'>
          <Form
            onSubmit={(values) => {
              if (!projectHasError) {
                handleSubmit(values);
              } else {
                toast.error("Cannot save due to project error");
              }
            }}
            validate={validate}
            mutators={{ ...arrayMutators }}
            keepDirtyOnReinitialize
            initialValues={{
              weight: projectWeight,
              paymentreleased: paymentReleased,
              paymentestimation: paymentEstimation,
              paymentoutstanding: calculatePaymentOutstanding(paymentReleased, paymentEstimation),
              projectname: projectList,
              vendorName: vendorList,
              utrnumber: utrNumber,
              paymentdate: paymentDate
            }}
            render={({ handleSubmit, values, errors, form: { mutators: { push, remove }, change }, touched, valid }) => (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!valid) {
                  toast.error('Please complete all required fields');
                } else if (!projectHasError) {
                  handleSubmit(e);
                } else {
                  toast.error("Cannot save due to project error");
                }
              }}>
                <div className='Project_basic_Detail InvoiceCreateProject'>
                  <h2>Basic Details</h2>
                  <div className='row align-items-center'>
                    <Col md={4}>
                      <label>Vendor</label>
                      <Field name="vendorName">
                        {({ input, meta }) => (
                          <div>
                            <Select
                              {...input}
                              className='vendorName'
                              classNamePrefix="Invoiceselect"
                              placeholder="Select Vendor"
                              value={vendorList}
                              onChange={(option) => {
                                input.onChange(option);
                                handleSelectChange(option);
                              }}
                              options={transporterList?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                              }))}
                              isDisabled={!!id}
                            />
                            {meta.touched && meta.error && (
                              <span className='start_icon'>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <label>Project</label>
                      <Field name="projectname">
                        {({ input, meta }) => (
                          <div>
                            <Select
                              {...input}
                              className='projectname'
                              classNamePrefix="Invoiceselect"
                              placeholder="Select Project"
                              value={projectList}
                              onChange={(option) => {
                                input.onChange(option);
                                handleProjectSearch(option);
                              }}
                              options={projectNameList?.map((item) => ({
                                value: item.id,
                                label: item.projectName,
                              }))}
                              isDisabled={!!id}
                            />
                            {meta.touched && meta.error && (
                              <span className='start_icon'>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='weight'>
                        {({ input, meta }) => (
                          <div>
                            <label>Weight</label>
                            <input

                              {...input}
                              type='text'
                              className='form-control'
                              placeholder='Weight'
                              disabled
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='paymentestimation'>
                        {({ input, meta }) => (
                          <div>
                            <label>Payment Estimation</label>
                            <input
                              {...input}
                              type='number'
                              className='form-control'
                              min={0}
                              placeholder='0'
                              disabled
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='paymentreleased'>
                        {({ input, meta }) => (
                          <div>
                            <label>Payment Released</label>
                            <input
                              {...input}
                              type='number'
                              className='form-control'
                              placeholder='0'
                            />
                            {meta.touched && meta.error && (
                              <span className='start_icon'>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='paymentoutstanding'>
                        {({ input, meta }) => (
                          <div>
                            <label>Payment Outstanding</label>
                            <input
                              {...input}
                              type='number'
                              className='form-control'
                              value={calculatePaymentOutstanding(values.paymentreleased, values.paymentestimation)}
                              placeholder='Payment Outstanding'
                              disabled
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='paymentdate'>
                        {({ input, meta }) => (
                          <div>
                            <label>Payment Date</label>
                            <input
                              {...input}
                              type='date'
                              className='form-control'
                              placeholder=''
                            />
                            {meta.touched && meta.error && (
                              <span className='start_icon'>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name='utrnumber'>
                        {({ input, meta }) => (
                          <div>
                            <label>UTR Number</label>
                            <input
                              {...input}
                              type='text'
                              className='form-control'
                              min={0}
                              placeholder='0'
                            />
                            {meta.touched && meta.error && (
                              <span className='start_icon'>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                  </div>
                </div>
                <div className="save_or_next_btn">
                  {router.query.id ? <Button type='submit'>Update</Button> : <Button type='submit'>Save</Button>}
                </div>
              </form>
            )}
          />
        </div>
        {/* {
          invoiceList?.length > 0 ? <InvoiceDetails /> : <h4>No Data Found..</h4>
        } */}
        <InvoiceDetails />
      </div>
    </>
  );
};

export default CreateInvoice;






















