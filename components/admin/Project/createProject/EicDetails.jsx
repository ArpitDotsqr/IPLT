import React, { useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '@/components/comman_component/Loader';
import { deleteEicDetail, getProjectDetails } from '@/redux/actions/project/projectData';

const EicDetails = (props) => {
    const { values, push, remove } = props
    const router = useRouter()
    const dispatch = useDispatch()

    const [displayIndex, setDisplayIndex] = useState(0);
    const projectLoader = useSelector((state) => state.projectSlice.isLoading)

    const handleDeleteEicDetail = (Id, remove, EicDetails, index) => {
        if (Id) {
            dispatch(deleteEicDetail(Id)).then((res) => {
                if (res?.payload?.data?.success) {
                    dispatch(getProjectDetails({ projectId: router.query.id }))
                }
            })
        } else {
            remove('EicDetails', index)
            if (index !== 0) {
                setDisplayIndex(index - 1)
            } else {
                setDisplayIndex(0)
            }
        }
    }



    return (
        <>
            {projectLoader && <LoaderComponent />}
            <div className='Project_basic_Detail'>
                <h2>EIC Details</h2>
                <FieldArray name='EicDetails' >
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) =>
                                index === displayIndex && (
                                    <div key={index} >
                                        <Row>
                                            <Col md={6}>
                                                <Field name={`${name}.name`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Name</label><span className='start_icon'></span>
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
                                                                placeholder='Enter name'
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>
                                            <Col md={6}>
                                                <Field name={`${name}.designation`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Designation</label><span className='start_icon'></span>
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
                                                                placeholder='Enter designation'
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </Col>
                                            <Col md={6}>
                                                <Field name={`${name}.mobile`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Contact no.</label><span className='start_icon'></span>
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
                                                                placeholder='Enter Contact no.'
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
                                            <Col md={6}>
                                                <Field name={`${name}.email`}>
                                                    {({ input, meta }) => (
                                                        <div className='' >
                                                            <div>
                                                                <label className='' >Email ID</label><span className='start_icon'></span>
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
                                                                placeholder='Enter Email ID'
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
                        push('EicDetails', {
                            name: '',
                            designation: '',
                            mobile: '',
                            email: ''
                        })
                        setDisplayIndex(values.EicDetails.length)
                    }}>Add EIC</Button>
                </div>
                <div className="Vendor_Capability_table">
                    <div className="table-responsive">
                        <Table className='table' >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Contact no.</th>
                                    <th>Email ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values?.EicDetails && values.EicDetails?.map((item, index) => {
                                    if (index !== (values.EicDetails.length - 1) || router.query.id) {
                                        return (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <div className='EditOrDeleteBtn'>
                                                        <Button onClick={() => setDisplayIndex(index)} >
                                                            <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                        </Button>
                                                        {router.query.id ? (
                                                            <Button onClick={() => handleDeleteEicDetail(item?.id, remove, 'EicDetails', index)}>
                                                                <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                remove('EicDetails', index)
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
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="save_or_next_btn">
                {router.query.id ? <Button type='submit'>Update</Button> : <Button type='submit'>Save & Next</Button>}
            </div>
        </>
    )
}
export default EicDetails;