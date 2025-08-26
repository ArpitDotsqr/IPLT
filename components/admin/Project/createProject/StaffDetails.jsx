import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray } from 'react-final-form-arrays';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LoaderComponent from '@/components/comman_component/Loader';
import { deleteStaffDetail, getProjectDetails } from '@/redux/actions/project/projectData';
import Select from 'react-select'
import { getUserData } from '@/redux/actions/auth';

const StaffDetails = (props) => {
    const { values, push, remove, change } = props
    const router = useRouter()
    const dispatch = useDispatch()

    const [displayIndex, setDisplayIndex] = useState(0)
    const [displayIndex1, setDisplayIndex1] = useState(0)
    const [displayIndex2, setDisplayIndex2] = useState(0)
    const [displayIndex3, setDisplayIndex3] = useState(0)
    const [displayIndex4, setDisplayIndex4] = useState(0)

    const getManagerUserData = useSelector((state) => state.managerUserSlice?.managerUserList.rows)
    const getAllVendorLists = useSelector((state) => state.vendorSlice.vendorList?.rows)
    const projectReqList = useSelector((state) => state.projectSlice.projectRequirementList?.requirementsTabData)
    const projectLoader = useSelector((state) => state.projectSlice.isLoading)
    const currentUserData = useSelector((state) => state.userSlice.getUserList)

    const handleDeleteStaffDetail = (Id, remove, type, index) => {
        if (Id) {
            dispatch(deleteStaffDetail(Id)).then((res) => {
                if (res?.payload?.data?.success) {
                    dispatch(getProjectDetails({ projectId: router.query.id }))
                }
            })
        } else {
            if (type === 'projectManagers') {
                remove('projectManagers', index)
                if (index !== 0) {
                    setDisplayIndex(index - 1)
                } else {
                    setDisplayIndex(0)
                }
            }
            if (type === 'loadingExecutives') {
                remove('loadingExecutives', index)
                if (index !== 0) {
                    setDisplayIndex1(index - 1)
                } else {
                    setDisplayIndex1(0)
                }
            }
            if (type === 'unloadingExecutives') {
                remove('unloadingExecutives', index)
                if (index !== 0) {
                    setDisplayIndex2(index - 1)
                } else {
                    setDisplayIndex2(0)
                }
            }
            if (type === 'weighbridgeExecutive') {
                remove('weighbridgeExecutive', index)
                if (index !== 0) {
                    setDisplayIndex3(index - 1)
                } else {
                    setDisplayIndex3(0)
                }
            }
            if (type === 'petrolPump') {
                remove('petrolPump', index)
                if (index !== 0) {
                    setDisplayIndex4(index - 1)
                } else {
                    setDisplayIndex4(0)
                }
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
                setValue(`${fieldName}.mobile`, res?.payload?.data?.mobile);
            }
        })
    }

    console.log(values, "Sdsfsdfsdf")

    return (
        <>
            {projectLoader && <LoaderComponent />}
            <div className='Project_basic_Detail'>
                <h2>Staff Details</h2>

                <FieldArray name='projectManagers' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex && (
                                    <div key={index} >

                                        <Row>
                                            <Col md={8}>
                                                <Field name={`${name}.projectManagerId`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Project Manager</label><span className='start_icon'></span>
                                                                {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-0'>
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {/* <select
                                                                {...input}
                                                                className='form-control'
                                                            >
                                                                <option value="">Select project Manager</option>
                                                                {getManagerUserData?.length > 0 && getManagerUserData.map((item, index) => {
                                                                    if (item.Role.key === 'projectmanager') {
                                                                        return <option key={`projectmanager_${index}`} value={item?.id}>{item?.name}</option>
                                                                    }
                                                                })}
                                                            </select> */}
                                                            <Select
                                                                {...input}
                                                                styles={Customstyle}
                                                                placeholder='Select project Manager'
                                                                // onChange={(option) => input.onChange(option.value)}
                                                                onChange={(selectedOption) => {
                                                                    input.onChange(selectedOption)
                                                                    handleChange(selectedOption, change, name)
                                                                }}
                                                                options={getManagerUserData?.filter(item => item.Role.key === 'projectmanager').map((item) => ({
                                                                    value: item.id,
                                                                    label: item.name,

                                                                }))}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>

                                            <Col md={4}>
                                                <Field name={`${name}.mobile`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' ></label><span className='start_icon'></span>
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
                                                                placeholder='Contact no.'
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

                                            <Col md={12}>
                                                <Field name={`${name}.remarks`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            {/* {meta.touched && meta.error && (
                                                                <span className='start_icon ms-lg-0'>
                                                                    {meta.error}
                                                                </span>
                                                            )} */}
                                                            <input
                                                                type='text'
                                                                {...input}
                                                                className='form-control pb-4 pt-3'
                                                                placeholder='Remarks'
                                                            />
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
                        push('projectManagers', {
                            projectManagerId: '',
                            mobile: '',
                            remarks: ''
                        })
                        setDisplayIndex(values.projectManagers.length)
                    }}>Add Project Manager</Button>
                </div>
                <FieldArray name='loadingExecutives' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex1 && (
                                    <div key={index} >
                                        <Row>
                                            <Col md={8}>
                                                <Field name={`${name}.loadingExecutiveId`} >
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Loading Executive</label><span className='start_icon'></span>
                                                                {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-0'>
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {/* <select
                                                                {...input}
                                                                className='form-control'
                                                                placeholder='Select executive'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveLoading}
                                                              
                                                            >
                                                                <option value="">Select executive</option>
                                                                {getManagerUserData?.length > 0 && getManagerUserData.map((item, index) => {
                                                                    if (item.Role.key === 'fieldexecutive') {
                                                                        return <option key={`loadingexe_${index}`} value={item?.id}>{item?.name}</option>
                                                                    }
                                                                    return null;
                                                                })}
                                                            </select> */}
                                                            <Select
                                                                 {...input}
                                                                styles={Customstyle}
                                                                placeholder='Select executive'
                                                                isDisabled={projectReqList && !projectReqList[0]?.isFieldExecutiveLoading}
                                                                // onChange={(option) => input.onChange(option.value)}
                                                                onChange={(selectedOption) => {
                                                                    input.onChange(selectedOption)
                                                                    handleChange(selectedOption, change, name)
                                                                }}
                                                                onBlur={() => input.onBlur(input.value)}
                                                                options={getManagerUserData?.filter(item => item.Role.key === 'fieldexecutive').map((item) => ({
                                                                    value: item.id,
                                                                    label: item.name
                                                                }))}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>

                                            <Col md={4}>
                                                <Field name={`${name}.mobile`} >
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' ></label><span className='start_icon'></span>
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
                                                                placeholder='Contact no.'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveLoading}
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

                                            <Col md={12}>
                                                <Field name={`${name}.remarks`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <input
                                                                type='text'
                                                                {...input}
                                                                className='form-control pb-4 pt-3'
                                                                placeholder='Remarks'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveLoading}
                                                            />
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
                        push('loadingExecutives', {
                            loadingExecutiveId: '',
                            mobile: '',
                            remarks: ''
                        })
                        setDisplayIndex1(values.loadingExecutives.length)
                    }}
                        disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveLoading}
                    >Add Executive</Button>
                </div>

                <FieldArray name='unloadingExecutives' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex2 && (
                                    <div key={index} >
                                        <Row>
                                            <Col md={8}>
                                                <Field name={`${name}.unloadingExecutiveId`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Unloading Executive</label><span className='start_icon'></span>
                                                                {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-0'>
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {/* <select
                                                                {...input}
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading}
                                                                className='form-control'
                                                                placeholder='Select executive'
                                                            >
                                                                <option value="">Select executive</option>
                                                                {getManagerUserData?.length > 0 && getManagerUserData.map((item, index) => {
                                                                    if (item.Role.key === 'fieldexecutive') {
                                                                        return <option key={`loadingexe_${index}`} value={item?.id}>{item?.name}</option>
                                                                    }
                                                                }
                                                                )}
                                                            </select> */}
                                                            <Select
                                                                 {...input}
                                                                styles={Customstyle}
                                                                placeholder='Select executive'
                                                                isDisabled={projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading}
                                                                onChange={(selectedOption) => {
                                                                    input.onChange(selectedOption)
                                                                    handleChange(selectedOption, change, name)
                                                                }}
                                                                // onChange={(option) => input.onChange(option.value)}
                                                                onBlur={() => input.onBlur(input.value)}
                                                                options={getManagerUserData?.filter(item => item.Role.key === 'fieldexecutive').map((item) => ({
                                                                    value: item.id,
                                                                    label: item.name
                                                                }))}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>

                                            <Col md={4}>
                                                <Field name={`${name}.mobile`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' ></label><span className='start_icon'></span>
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
                                                                placeholder='Contact no.'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading}
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

                                            <Col md={12}>
                                                <Field name={`${name}.remarks`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <input
                                                                type='text'
                                                                {...input}
                                                                className='form-control pb-4 pt-3'
                                                                placeholder='Remarks'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading}
                                                            />
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
                        push('unloadingExecutives', {
                            unloadingExecutiveId: '',
                            mobile: '',
                            remarks: ''
                        })
                        setDisplayIndex2(values.unloadingExecutives.length)
                    }}
                        disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading}
                    >Add Executive</Button>
                </div>

                <FieldArray name='weighbridgeExecutive' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex3 && (
                                    <div key={index} >
                                        <Row>
                                            <Col md={8}>
                                                <Field name={`${name}.weighbridgeExecutiveId`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Weighbridge Executive</label><span className='start_icon'></span>
                                                                {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-0'>
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {/* <select
                                                                {...input}
                                                                className='form-control'
                                                                placeholder='Select executive'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment}
                                                            >
                                                                <option value="">Select executive</option>
                                                                {getManagerUserData?.length > 0 && getManagerUserData.map((item, index) => {
                                                                    if (item.Role.key === 'fieldexecutive') {
                                                                        return <option key={`loadingexe_${index}`} value={item?.id}>{item?.name}</option>
                                                                    }
                                                                }
                                                                )}
                                                            </select> */}
                                                            <Select
                                                             {...input}
                                                                styles={Customstyle}
                                                                placeholder='Select executive'
                                                                onChange={(selectedOption) => {
                                                                    input.onChange(selectedOption)
                                                                    handleChange(selectedOption, change, name)
                                                                }}
                                                                // onChange={(option) => input.onChange(option.value)}
                                                                isDisabled={projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment}
                                                                onBlur={() => input.onBlur(input.value)}
                                                                options={getManagerUserData?.filter(item => item.Role.key === 'fieldexecutive').map((item) => ({
                                                                    value: item.id,
                                                                    label: item.name
                                                                }))}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>

                                            <Col md={4}>
                                                <Field name={`${name}.mobile`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' ></label><span className='start_icon'></span>
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
                                                                placeholder='Contact no.'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment}
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

                                            <Col md={12}>
                                                <Field name={`${name}.remarks`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <input
                                                                type='text'
                                                                {...input}
                                                                className='form-control pb-4 pt-3'
                                                                placeholder='Remarks'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment}
                                                            />
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
                        push('weighbridgeExecutive', {
                            weighbridgeExecutiveId: '',
                            mobile: '',
                            remarks: ''
                        })
                        setDisplayIndex3(values.weighbridgeExecutive.length)
                    }}
                        disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment}
                    >Add Executive</Button>
                </div>

                <FieldArray name='petrolPump' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex4 && (
                                    <div key={index} >
                                        <Row>
                                            <Col md={8}>
                                                <Field name={`${name}.petrolPumpId`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Petrol Pump Executive</label><span className='start_icon'></span>
                                                                {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-0'>
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {/* <select
                                                                {...input}
                                                                className='form-control'
                                                                placeholder='Select petrol pump'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump}
                                                            >
                                                                <option value="">Select petrol pump</option> */}
                                                            {/* {getAllVendorLists?.length > 0 && getAllVendorLists.map((item, index) => {
                                                                    if (item.UserDetail.vendorTypes.name === 'petrolpump')
                                                                        return <option key={`petrolpump_${index}`} value={item?.id}>{item?.name}</option>
                                                                }
                                                                )} */}
                                                            {/* {getManagerUserData?.length > 0 && getManagerUserData.map((item, index) => {
                                                                    if (item.Role.key === 'fieldexecutive') {
                                                                        return <option key={`loadingexe_${index}`} value={item?.id}>{item?.name}</option>
                                                                    }
                                                                }
                                                                )}
                                                            </select> */}
                                                            <Select
                                                                 {...input}
                                                                styles={Customstyle}
                                                                placeholder='Select executive'
                                                                isDisabled={projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump}
                                                                onChange={(selectedOption) => {
                                                                    input.onChange(selectedOption)
                                                                    handleChange(selectedOption, change, name)
                                                                }}
                                                                // onChange={(option) => input.onChange(option.value)}
                                                                onBlur={() => input.onBlur(input.value)}
                                                                options={getManagerUserData?.filter(item => item.Role.key === 'fieldexecutive').map((item) => ({
                                                                    value: item.id,
                                                                    label: item.name
                                                                }))}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>

                                            <Col md={4}>
                                                <Field name={`${name}.mobile`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' ></label><span className='start_icon'></span>
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
                                                                placeholder='Contact no.'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump}
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

                                            <Col md={12}>
                                                <Field name={`${name}.remarks`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <input
                                                                type='text'
                                                                {...input}
                                                                className='form-control pb-4 pt-3'
                                                                placeholder='Remarks'
                                                                disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump}
                                                            />
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
                        push('petrolPump', {
                            petrolPumpId: '',
                            mobile: '',
                            remarks: ''
                        })
                        setDisplayIndex4(values.petrolPump.length)
                    }}
                        disabled={projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump}
                    >Add Executive</Button>
                </div>

                <div className="Vendor_Capability_table">
                    <div className="table-responsive">
                        <Table className='table' >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Remarks</th>
                                    <th>Contact no.</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values?.projectManagers && values.projectManagers?.map((item, index) => {
                                    if (index !== (values.projectManagers.length - 1) || router.query.id) {
                                        const projectIdName = getManagerUserData.find(name => name.id == item?.projectManagerId.value)
                                        return (
                                            <tr>
                                                <td>{projectIdName?.name}</td>
                                                <td>{projectIdName?.Role.title}</td>
                                                <td>{item?.remarks}</td>
                                                <td>{item?.mobile}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteStaffDetail(item?.id, remove, 'projectManagers', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('projectManagers', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex(index - 1)
                                                                } else {
                                                                    setDisplayIndex(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}

                                {(projectReqList && projectReqList[0]?.isFieldExecutiveLoading === false) ? '' : values.loadingExecutives?.map((item, index) => {
                                    if (index !== (values.loadingExecutives.length - 1) || router.query.id) {
                                        const loadingExecutive = getManagerUserData.find(name => name.id == item?.loadingExecutiveId.value)
                                        return (
                                            <tr>
                                                <td>{loadingExecutive?.name}</td>
                                                <td>{loadingExecutive?.Role.title}</td>
                                                <td>{item?.remarks}</td>
                                                <td>{item?.mobile}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex1(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteStaffDetail(item?.id, remove, 'loadingExecutives', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('loadingExecutives', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex1(index - 1)
                                                                } else {
                                                                    setDisplayIndex1(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}

                                {(projectReqList && projectReqList[0]?.isFieldExecutiveUnloading === false) ? '' : values.unloadingExecutives?.map((item, index) => {
                                    if (index !== (values.unloadingExecutives.length - 1) || router.query.id) {
                                        const unloadingExecutive = getManagerUserData.find(name => name.id == item.unloadingExecutiveId.value)
                                        return (
                                            <tr>
                                                <td>{unloadingExecutive?.name}</td>
                                                <td>{unloadingExecutive?.Role.title}</td>
                                                <td>{item.remarks}</td>
                                                <td>{item.mobile}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex2(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteStaffDetail(item?.id, remove, 'unloadingExecutives', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('unloadingExecutives', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex2(index - 1)
                                                                } else {
                                                                    setDisplayIndex2(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}

                                {(projectReqList && projectReqList[0]?.isFieldExecutiveWeighment === false) ? '' : values.weighbridgeExecutive?.map((item, index) => {
                                    if (index !== (values.weighbridgeExecutive.length - 1) || router.query.id) {
                                        const weighbridgeExecutive = getManagerUserData.find(name => name.id == item.weighbridgeExecutiveId.value)
                                        return (
                                            <tr>
                                                <td>{weighbridgeExecutive?.name}</td>
                                                <td>{weighbridgeExecutive?.Role.title}</td>
                                                <td>{item.remarks}</td>
                                                <td>{item.mobile}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex3(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteStaffDetail(item?.id, remove, 'weighbridgeExecutive', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('weighbridgeExecutive', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex3(index - 1)
                                                                } else {
                                                                    setDisplayIndex3(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}

                                {(projectReqList && projectReqList[0]?.isFieldExecutiveFuelPump === false) ? '' : values.petrolPump?.map((item, index) => {
                                    if (index !== (values.petrolPump.length - 1) || router.query.id) {
                                        const petrolpumpExecutive = getManagerUserData.find(name => name.id == item.petrolPumpId.value)
                                        return (
                                            <tr>
                                                <td>{petrolpumpExecutive?.name}</td>
                                                <td>{petrolpumpExecutive?.Role.title}</td>
                                                <td>{item.remarks}</td>
                                                <td>{item.mobile}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex4(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteStaffDetail(item?.id, remove, 'petrolPump', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('petrolPump', index)
                                                                if (index !== 0) {
                                                                    setDisplayIndex4(index - 1)
                                                                } else {
                                                                    setDisplayIndex4(0)
                                                                }
                                                            }}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
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
export default StaffDetails;