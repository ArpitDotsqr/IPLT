import React, { useState } from 'react'
import { Accordion, Col, Row, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { Field } from 'react-final-form';
import { useRouter } from 'next/router';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '@/components/comman_component/Loader';
import { deleteExcavator, deletePetrolpump, deleteTransporter, getProjectDetails } from '@/redux/actions/project/projectData';
import Select from 'react-select'
import { getUserData } from '@/redux/actions/auth';

const VendorDetails = (props) => {
    const { values, remove, push, change } = props
    const router = useRouter()
    const dispatch = useDispatch()
    const [displayIndex, setDisplayIndex] = useState(0)
    const [displayIndex1, setDisplayIndex1] = useState(0)
    const [displayIndex2, setDisplayIndex2] = useState(0)

    const transporterHead = ['S.No.', "Name", "Unit", "Qty", "Rate(in rs.)", "Amount(in rs.)", "GST Rate", "Amount(Incl. GST)", "Action"]
    const excavatorHead = ["S.No", "Name", "Fixed Hrs/month", "Rate( in rs.)", "With Diesel", "Payment Terms", "GST Rate", "Action"]
    const petrolpumpHead = ["S.No", "Name", "Contact", "Credit", "Amount", "Reconciliation Arrangement", "Action"]
    // const masterDataMaterial = useSelector((state) => state.masterSlice.materialList)

    const masterDatapaymentTerms = useSelector((state) => state.masterSlice.paymentTermList)
    const masterDataTransporterUnit = useSelector((state) => state.masterSlice.transporterUnitList)
    const masterDatagstRatetype = useSelector((state) => state.masterSlice.gstRateTypeList)
    const masterDatagstReconciliationArr = useSelector((state) => state.masterSlice.ReconciliationList)
    const getAllVendorLists = useSelector((state) => state.vendorSlice.vendorList?.rows)
    const projectLoader = useSelector((state) => state.projectSlice.isLoading)
    const currentUserData = useSelector((state) => state.userSlice.getUserList)


    const handleDeleteTransporter = (Id, remove, transporterData, index) => {
        if (Id) {
            dispatch(deleteTransporter(Id)).then((res) => {
                if (res?.payload?.data?.success) {
                    dispatch(getProjectDetails({ projectId: router.query.id }))
                }
            })
        } else {
            remove('transporterData', index)
            if (index !== 0) {
                setDisplayIndex(index - 1)
            } else {
                setDisplayIndex(0)
            }
        }
    }

    const handleDeleteExcavator = (Id, remove, excavatorData, index) => {
        if (Id) {
            dispatch(deleteExcavator(Id)).then((res) => {
                if (res?.payload?.data?.success) {
                    dispatch(getProjectDetails({ projectId: router.query.id }))
                }
            })
        } else {
            remove('excavatorData', index)
            if (index !== 0) {
                setDisplayIndex1(index - 1)
            } else {
                setDisplayIndex1(0)
            }
        }
    }

    const handleDeletePetrolpump = (Id, remove, petrolPumpData, index) => {
        if (Id) {
            dispatch(deletePetrolpump(Id)).then((res) => {
                if (res?.payload?.data?.success) {
                    dispatch(getProjectDetails({ projectId: router.query.id }))
                }
            })
        } else {
            remove('petrolPumpData', index)
            if (index !== 0) {
                setDisplayIndex2(index - 1)
            } else {
                setDisplayIndex2(0)
            }
        }
    }

    const Customstyle = {
        control: (base) => ({
            ...base,
            fontFamily: "Roboto",
            fontSize: "16px",
            paddingLeft: "10px",
            minHeight: 46,
            height: 50,
            borderRadius: 4,
            color: "red",
            cursor: "text"
        }),
        menu: (base) => ({
            ...base,
            cursor: "text",
            fontFamily: "Roboto",
            fontSize: "16px",
        }),
    };

    const handleChange = (selectedOption, setValue, fieldName) => {
        dispatch(getUserData({ id: Number(selectedOption.value) })).then((res) => {
            if (res?.payload?.success) {
                setValue(`${fieldName}.mobile`, res?.payload?.data?.ContactDetails[0]?.mobile);
            }
        })
    }

    return (
        <>
            {projectLoader && <LoaderComponent />}
            {/* Transporter */}
            <div className='Project_basic_Detail'>
                <div className="project_Vendor_Details">
                    <FieldArray name='transporterData' >
                        {({ fields }) => (
                            <>
                                {fields.map((name, index) =>
                                    index === displayIndex && (
                                        <div key={index} >
                                            <Accordion defaultActiveKey="0" className='accodion_main'>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className='accordion_title'> Transporter</Accordion.Header>
                                                    <Row >
                                                        <Col md={8} >
                                                            <Field name={`${name}.transporterNameId`} >
                                                                {({ input, meta }) => (
                                                                    <>
                                                                        <div>
                                                                            <label className='' >Transporter name</label><span className='start_icon'></span>
                                                                            {meta.touched && meta.error && (
                                                                                <span className='start_icon ms-lg-0'>
                                                                                    {meta.error}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {/* <select
                                                                            {...input}
                                                                            placeholder='transport name'
                                                                        >
                                                                            <option value='' >select transporter</option>
                                                                            {getAllVendorLists?.length > 0 && getAllVendorLists.map((item, index) => {
                                                                                if (item.UserDetail.vendorTypes.name === 'transporter')
                                                                                    return <option key={`transporter_${index}`} value={item?.id}>{item?.name}</option>
                                                                            })}
                                                                        </select> */}

                                                                        <Select
                                                                            {...input}
                                                                            styles={Customstyle}
                                                                            placeholder='Select transporter'
                                                                            // onChange={(option) => input.onChange(option.value)}
                                                                            onChange={(selectedOption) => {
                                                                                input.onChange(selectedOption)
                                                                                handleChange(selectedOption, change, name)
                                                                            }}
                                                                            options={getAllVendorLists?.filter(item => item.UserDetail.vendorTypes.name === 'transporter').map((item) => ({
                                                                                value: item.id,
                                                                                label: item.name
                                                                            }))}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </Col>
                                                        <Col md={4} >
                                                            <Field name={`${name}.mobile`}>
                                                                {({ input, meta }) => (
                                                                    <div className='' >
                                                                        <div>
                                                                            <label className='' >Contact</label><span className='start_icon'></span>
                                                                            {meta.touched && meta.error && (
                                                                                <span className='start_icon ms-lg-0'>
                                                                                    {meta.error}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <input
                                                                            type='text'
                                                                            {...input}
                                                                            className='form-control'
                                                                            placeholder='Contact'
                                                                            onKeyPress={(event) => {
                                                                                if (!/[0-9]/.test(event.key)) {
                                                                                    event.preventDefault();
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Field>
                                                        </Col>
                                                    </Row>
                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col md={4}>
                                                                <Field name={`${name}.paymentTerm`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Payment terms</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <select
                                                                                {...input}
                                                                                className='form-control'
                                                                            >
                                                                                <option value="">Select payment terms</option>
                                                                                {masterDatapaymentTerms?.length > 0 && masterDatapaymentTerms.map((item, index) => (
                                                                                    <option key={`paymentTerm_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Field name={`${name}.dieselQuantity`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Diesel/Trip</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <input
                                                                                type='text'
                                                                                {...input}
                                                                                className='form-control'
                                                                                placeholder='Enter Quantity in liters'
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Field name={`${name}.tripCashAmount`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Trip Cash</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <input
                                                                                type='text'
                                                                                {...input}
                                                                                className='form-control'
                                                                                placeholder='Enter amount in ₹'
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>

                                                            <Col md={4}>
                                                                <Field name={`${name}.transporterUnit`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Unit</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <select
                                                                                {...input}
                                                                                className='form-control'
                                                                            >
                                                                                <option >Select Unit</option>
                                                                                {masterDataTransporterUnit?.length > 0 && masterDataTransporterUnit.map((item, index) => (
                                                                                    <option key={`transunit_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Field name={`${name}.unitRateAmount`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Unit Rate </label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <input
                                                                                type='text'
                                                                                {...input}
                                                                                className='form-control'
                                                                                placeholder='Enter amount in ₹'
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Field name={`${name}.gstRate`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >GST Rate</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <select
                                                                                type='text'
                                                                                {...input}
                                                                                className='form-control'
                                                                                placeholder='Vendor Type'
                                                                            >
                                                                                <option value="">Select GST rate</option>
                                                                                {masterDatagstRatetype?.length > 0 && masterDatagstRatetype.map((item, index) => (
                                                                                    <option key={`gstrateType_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Field name={`${name}.transporterQuantity`}>
                                                                    {({ input, meta }) => (
                                                                        <div className='' >
                                                                            <div>
                                                                                <label className='' >Quantity</label><span className='start_icon'></span>
                                                                                {meta.touched && meta.error && (
                                                                                    <span className='start_icon ms-lg-0'>
                                                                                        {meta.error}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <input
                                                                                type='text'
                                                                                {...input}
                                                                                className='form-control'
                                                                                placeholder='Enter Quantity'
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    ))}
                            </>
                        )}
                    </FieldArray>

                    <div className="save_or_upload_btn">
                        <Button className='save_btn' onClick={() => {
                            push('transporterData', {
                                transporterNameId: '',
                                mobile: '',
                                paymentTerm: '',
                                dieselQuantity: '',
                                tripCashAmount: '',
                                transporterUnit: '',
                                unitRateAmount: '',
                                gstRate: '',
                                transporterQuantity: ''
                            })
                            setDisplayIndex(values.transporterData.length)
                        }}>Add</Button>
                    </div>
                    <div className="table-responsive">
                        <Table className='table' >
                            <thead>
                                <tr>
                                    {transporterHead.map((item) => (
                                        <th>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {values.transporterData && values.transporterData.map((item, index) => {
                                    if (index !== (values.transporterData.length - 1) || router.query.id) {
                                        const transporterName = getAllVendorLists.find(elem => elem.id == item.transporterNameId.value)
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{transporterName?.name}</td>
                                                <td>{item.unitRateAmount}</td>
                                                <td>{item.transporterQuantity}</td>
                                                <td>{item.unitRateAmount}</td>
                                                <td>{item.tripCashAmount}</td>
                                                <td>{item.gstRate}</td>
                                                <td>{Number(item.gstRate) === 0 ? Number(item.tripCashAmount) : Number(item.tripCashAmount) * Number(item.gstRate)}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteTransporter(item?.id, remove, 'transporterData', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('transporterData', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex(index - 1)
                                                                } else {
                                                                    setDisplayIndex(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div></td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className='d-flex gap-4'>
                        {/* <div className="save_or_upload_btn"> */}
                        {/* <Button className='save_btn'>Save Transporter</Button> </div> */}
                        {/* <div class="Add_more_executive"><button type="button" class="btn btn-primary"> Add another transporter</button> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>

            {/* Excavator */}
            <div className='Project_basic_Detail'>
                <h2>Excavator</h2>
                <div className="project_Vendor_Details">
                    <FieldArray name='excavatorData' >
                        {({ fields }) => (
                            <>
                                {fields.map((name, index) =>
                                    index === displayIndex1 && (
                                        <div key={index} >
                                            <Row >
                                                <Col md={8} >
                                                    <Field name={`${name}.excavatorNameId`} >
                                                        {({ input, meta }) => (
                                                            <>
                                                                <div>
                                                                    <label className='' >Excavator vendor name</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {/* <select
                                                                    {...input}
                                                                    placeholder='select excavator'
                                                                >
                                                                    <option value='' >select excavator</option>
                                                                    {getAllVendorLists?.length > 0 && getAllVendorLists.map((item, index) => {
                                                                        if (item.UserDetail.vendorTypes.name === 'excavator')
                                                                            return <option key={`excavator_${index}`} value={item?.id}>{item?.name}</option>
                                                                    })}
                                                                </select> */}

                                                                <Select
                                                                    {...input}
                                                                    styles={Customstyle}
                                                                    placeholder='Select excavator'
                                                                    // onChange={(option) => input.onChange(option.value)}
                                                                    onChange={(selectedOption) => {
                                                                        input.onChange(selectedOption)
                                                                        handleChange(selectedOption, change, name)
                                                                    }}
                                                                    options={getAllVendorLists?.filter(item => item.UserDetail.vendorTypes.name === 'excavator').map((item) => ({
                                                                        value: item.id,
                                                                        label: item.name
                                                                    }))}
                                                                />
                                                            </>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4} >
                                                    <Field name={`${name}.mobile`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Contact</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Contact'
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={4}>
                                                    <Field name={`${name}.paymentTerm`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Payment terms</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    className='form-control'
                                                                >
                                                                    <option value="">Select payment terms</option>
                                                                    {masterDatapaymentTerms?.length > 0 && masterDatapaymentTerms.map((item, index) => (
                                                                        <option key={`paymentTerm_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4}>
                                                    <Field name={`${name}.hoursPerMonth`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Fixed Hours/month</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Enter hours'
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4} className='position-relative'>
                                                    <div className="">
                                                        <Field name={`${name}.ratePerHourAmount`}>
                                                            {({ input, meta }) => (
                                                                <>
                                                                    <div>
                                                                        <label className='' >Rate/Hour</label><span className='start_icon'></span>
                                                                        {meta.touched && meta.error && (
                                                                            <span className='start_icon ms-lg-0'>
                                                                                {meta.error}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className='' >
                                                                        <input
                                                                            type='text'
                                                                            {...input}
                                                                            className='form-control'
                                                                            placeholder='Enter amount in ₹'
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Field>
                                                        <Field name={`${name}.isWithDiesel`} >
                                                            {({ input, meta }) => (
                                                                <div className='RateHourSlect' >
                                                                    <select
                                                                        {...input}
                                                                        className='form-control'
                                                                    >
                                                                        <option value='' >choose diesel</option>
                                                                        <option value='true'>with diesel</option>
                                                                        <option value='false'>without diesel</option>
                                                                    </select>
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </div>
                                                </Col>


                                                <Col md={4}>
                                                    <Field name={`${name}.gstRate`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >GST rate</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    className='form-control'
                                                                >
                                                                    <option value="">Select GST rate</option>
                                                                    {masterDatagstRatetype?.length > 0 && masterDatagstRatetype.map((item, index) => {
                                                                        if (item.name == '18')
                                                                            return <option key={`gstrateType_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                            </>
                        )}
                    </FieldArray>

                    <div className="save_or_upload_btn">
                        <Button className='save_btn' onClick={() => {
                            push('excavatorData', {
                                excavatorNameId: '',
                                mobile: '',
                                paymentTerm: '',
                                hoursPerMonth: '',
                                ratePerHourAmount: '',
                                isWithDiesel: '',
                                gstRate: ''
                            })
                            setDisplayIndex1(values.excavatorData.length)
                        }}>Add</Button>
                    </div>
                    <div className="table-responsive">
                        <Table className='table' >
                            <thead>
                                <tr>
                                    {excavatorHead.map((item) => (
                                        <th>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {values.excavatorData && values.excavatorData.map((item, index) => {
                                    if (index !== (values.excavatorData.length - 1) || router.query.id) {
                                        const exporterName = getAllVendorLists.find(elem => elem.id == item.excavatorNameId.value)
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{exporterName?.name}</td>
                                                <td>{item.hoursPerMonth}</td>
                                                <td>{item.ratePerHourAmount}</td>
                                                <td>{item.isWithDiesel ? "Yes" : "No"}</td>
                                                <td>{item.paymentTerm}</td>
                                                <td>{item.gstRate ? `${item.gstRate}%` : '-'}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex1(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteExcavator(item?.id, remove, 'excavatorData', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('excavatorData', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex1(index - 1)
                                                                } else {
                                                                    setDisplayIndex1(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div></td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Petrol Pump */}

            <div className='Project_basic_Detail'>
                <h2>Petrol Pump</h2>
                <div className="project_Vendor_Details">
                    <FieldArray name='petrolPumpData' >
                        {({ fields }) => (
                            <>
                                {fields.map((name, index) =>
                                    index === displayIndex2 && (
                                        <div key={index} >
                                            <Row >
                                                <Col md={8} >
                                                    <Field name={`${name}.petrolPumpId`} >
                                                        {({ input, meta }) => (
                                                            <>
                                                                <div>
                                                                    <label className='' >Petrol pump name</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {/* <select
                                                                    {...input}
                                                                    placeholder='select petrol pump'
                                                                >
                                                                    <option value='' >select petrol pump</option>
                                                                    {getAllVendorLists?.length > 0 && getAllVendorLists.map((item, index) => {
                                                                        if (item.UserDetail.vendorTypes.name === 'petrolpump')
                                                                            return <option key={`petrolpump_${index}`} value={item?.id}>{item?.name}</option>
                                                                    })}
                                                                </select> */}
                                                                <Select
                                                                    {...input}
                                                                    styles={Customstyle}
                                                                    placeholder='Select petrol pump'
                                                                    // onChange={(option) => input.onChange(option.value)}
                                                                    onChange={(selectedOption) => {
                                                                        input.onChange(selectedOption)
                                                                        handleChange(selectedOption, change, name)
                                                                    }}
                                                                    options={getAllVendorLists?.filter(item => item.UserDetail.vendorTypes.name === 'petrolpump').map((item) => ({
                                                                        value: item.id,
                                                                        label: item.name
                                                                    }))}
                                                                />
                                                            </>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4} >
                                                    <Field name={`${name}.mobile`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Contact</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Contact'
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={4}>
                                                    <Field name={`${name}.totalCreditAmount`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Total credit</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Enter amount credit op to in ₹'
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4}>
                                                    <Field name={`${name}.discountPerLiter`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Discount/Litre</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Enter amount in ₹'
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4}>
                                                    <Field name={`${name}.reconciliationArrangement`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Reconciliation arrangement</label><span className='start_icon'></span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-0'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    placeholder='select'
                                                                >
                                                                    <option value='' >select </option>
                                                                    {masterDatagstReconciliationArr?.length > 0 && masterDatagstReconciliationArr.map((item, index) => (
                                                                        <option key={`gstrateType_${index}`} value={item?.name}>{item?.displayName}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                            </>
                        )}
                    </FieldArray>
                    <div className="save_or_upload_btn">
                        <Button className='save_btn' onClick={() => {
                            push('petrolPumpData', {
                                petrolPumpId: '',
                                mobile: '',
                                totalCreditAmount: '',
                                discountPerLiter: '',
                                reconciliationArrangement: ''
                            })
                            setDisplayIndex2(values.petrolPumpData.length)
                        }}>Add</Button>
                    </div>

                    <div className="table-responsive">
                        <Table className='table' >
                            <thead>
                                <tr>
                                    {petrolpumpHead.map((item) => (
                                        <th>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {values.petrolPumpData && values.petrolPumpData.map((item, index) => {
                                    if (index !== (values.petrolPumpData.length - 1) || router.query.id) {
                                        const petrolpumpName = getAllVendorLists.find(elem => elem.id == item.petrolPumpId.value)
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{petrolpumpName?.name}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.totalCreditAmount}</td>
                                                <td>{item.discountPerLiter}</td>
                                                <td>{item.reconciliationArrangement}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex2(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeletePetrolpump(item?.id, remove, 'petrolPumpData', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('petrolPumpData', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex2(index - 1)
                                                                } else {
                                                                    setDisplayIndex2(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div></td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <div className="save_or_next_btn">
                {router.query.id ? <Button type='submit'>Update </Button> : <Button type='submit'>Save & Next</Button>}
            </div>
        </>



    )
}
export default VendorDetails;