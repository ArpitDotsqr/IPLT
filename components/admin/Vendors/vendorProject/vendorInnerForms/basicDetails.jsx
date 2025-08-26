
import React, { useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';
import { contactVerfify, emailVerify, getVendorDataById, vendorContactDelete } from '@/redux/actions/vendor/vendorActions';
import { useRouter } from 'next/router';
import LoaderComponent from '@/components/comman_component/Loader';
import Image from 'next/image';
import { toast } from 'react-toastify';


const VendorsBasicDetails = (props) => {
    const tableHead = ["S.No", "Designation", "Contact no.", "Email ID", "Actions"]

    const { values, push, remove } = props
    const dispatch = useDispatch()
    const router = useRouter()
    const [displayIndex, setDisplayIndex] = useState(0);
    const masterList = useSelector((state) => state.masterSlice.vendorMasterDataList?.MasterData?.rows)
    const organizationtypeList = useSelector((state) => state.masterSlice.organisationMasterDataList?.MasterData?.rows)
    const vendorLoader = useSelector((state) => state.vendorSlice.isLoading)
    const vendorDataById = useSelector((state) => state.vendorSlice.particularVendorData)

    const handlePhoneNo = (e) => {
        if (e.length === 10) {
            dispatch(contactVerfify({ mobile: e }))
        }
    }

    const handleEmailCheck = (e) => {
        if (e) {
            dispatch(emailVerify({ email: e }));
        }
    }

    const handleContactDelete = (Id) => {
        dispatch(vendorContactDelete({ id: Id })).then((res) => {
            if (res?.payload?.data?.success) {
                toast.success('Deleted')
                dispatch(getVendorDataById({ id: Number(router.query.id) }))
            } else {
                toast.error(res?.payload?.data?.message)
            }
        })
    }

    return (
        <>
            {vendorLoader && <LoaderComponent />}
            <div className='Project_basic_Detail'>
                <h2>Basic Details</h2>
                <Row>
                    <Col md={4}>
                        <Field name='vendorTypeId'>
                            {({ input, meta }) => (
                                <div className='' >
                                    <div>
                                        <label className='' >Vendor Type</label><span className='start_icon'>*</span>
                                        {meta.touched && meta.error && (
                                            <span className='start_icon'>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                    <select
                                        // type='text'
                                        {...input}
                                        className='form-control'
                                        placeholder='Vendor Type'
                                        onChange={(e) => {
                                            input.onChange(e)
                                            props.vehicleTypeDisable(e.target.value)
                                        }}
                                    >
                                        <option value="">Select Vendor Type</option>
                                        {masterList?.length > 0 && masterList.map((item, index) => (
                                            <option key={`vendorType_${index}`} value={item?.name}>{item?.displayName}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </Field>
                    </Col>
                    <Col md={8}>
                        <Field name='name'>
                            {({ input, meta }) => (
                                <div className='' >
                                    <div>
                                        <label className='' >Organization Name</label><span className='start_icon'>*</span>
                                        {meta.touched && meta.error && (
                                            <span className='start_icon'>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                    <input
                                        type='text'
                                        {...input}
                                        className='form-control'
                                        placeholder='Enter Organization Name'
                                    />
                                </div>
                            )}
                        </Field>
                    </Col>
                    <Col md={4}>
                        <Field name='orgTypeId'>
                            {({ input, meta }) => (
                                <div className='' >
                                    <div>
                                        <label className='' >Organization Type</label><span className='start_icon'>*</span>
                                        {meta.touched && meta.error && (
                                            <span className='start_icon'>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                    <select
                                        // type='text'
                                        {...input}
                                        className='form-control'
                                        placeholder='Select Organization Type'
                                    >
                                        <option value="">Select Organization Type</option>
                                        {organizationtypeList?.length > 0 && organizationtypeList.map((item, index) => (
                                            <option key={`Org_${index}`} value={item?.id} >{item?.displayName}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </Field>
                    </Col>
                </Row>
            </div>
            <div className='Project_basic_Detail '>
                <div className="clint_detail">
                    <h2>Registered address</h2>
                    <Row>
                        <Col md={12}>
                            <Field name='registeredStreetAddress'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter address'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                        <Col md={3}>
                            <Field name='registeredCity'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter city'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                        <Col md={3}>
                            <Field name='registeredState'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter state'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='Project_basic_Detail '>
                <div className="clint_detail">
                    <h2>Communication address</h2>
                    <Row>
                        <Col md={12}>
                            <Field name='communicationStreetAddress'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter address'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                        <Col md={3}>
                            <Field name='communicationCity'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter city'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                        <Col md={3}>
                            <Field name='communicationState'>
                                {({ input, meta }) => (
                                    <div className='' >
                                        <input
                                            type='text'
                                            {...input}
                                            className='form-control'
                                            placeholder='Enter state'
                                        />
                                        {meta.touched && meta.error && (
                                            <span className=''>
                                                {meta.error}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='Project_basic_Detail'>
                <div className="Un-loading_site_Details clint_detail">

                    <h2>Contact details</h2>
                    <FieldArray name='contactDetails' >
                        {({ fields }) => (
                            <>
                                {fields.map((name, index) =>
                                    index === displayIndex && (
                                        <div className='' key={index}>
                                            <Row>
                                                <Col md={4}>
                                                    <Field name={`${name}.mobile`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' > Contact no. </label><span className='start_icon'>*</span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-2'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Enter contact no.'
                                                                    onChange={(e) => {
                                                                        handlePhoneNo(e.target.value)
                                                                        input.onChange(e.target.value)
                                                                    }}
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
                                                <Col md={4}>
                                                    <Field name={`${name}.email`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Email ID</label><span className='start_icon'>*</span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-2'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Email ID'
                                                                    onChange={(e) => {
                                                                        handleEmailCheck(e.target.value)
                                                                        input.onChange(e.target.value)
                                                                    }}
                                                                />

                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>
                                                <Col md={4}>
                                                    <Field name={`${name}.designation`}>
                                                        {({ input, meta }) => (
                                                            <div className='' >
                                                                <div>
                                                                    <label className='' >Designation</label><span className='start_icon'>*</span>
                                                                    {meta.touched && meta.error && (
                                                                        <span className='start_icon ms-lg-2'>
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type='text'
                                                                    {...input}
                                                                    className='form-control'
                                                                    placeholder='Enter designation '
                                                                />

                                                            </div>
                                                        )}
                                                    </Field>
                                                </Col>

                                                <div className='d-flex'>
                                                    {/* <div
                                                    type="button"
                                                    // className="w-25"
                                                    className='Executive_btn'
                                                    onClick={() => {
                                                        push('contactDetails', {
                                                            mobile: '',
                                                            email: '',
                                                            designation: ''
                                                        })
                                                        setDisplayIndex(
                                                            values?.contactDetails?.length
                                                        )
                                                    }}>
                                                    <p  >+ Add More Contacts</p>
                                                </div> */}
                                                    {/* {fields.length > 1 && (
                                                    <div
                                                        className="ms-2"
                                                        type="button"
                                                        onClick={() => fields.remove(index)
                                                        }
                                                    >
                                                        <p className='Executive_btn' >- Remove Contacts</p>
                                              
                                                    </div>
                                                )} */}
                                                </div>
                                                <div className="comman_add_btn">
                                                    <Button type='button' className='' onClick={() => {
                                                        push('contactDetails', {
                                                            mobile: '',
                                                            email: '',
                                                            designation: ''
                                                        })
                                                        setDisplayIndex(
                                                            values?.contactDetails?.length
                                                        );
                                                    }}>
                                                        Add Contact
                                                    </Button>
                                                </div>
                                            </Row>
                                        </div>
                                    ))}
                            </>
                        )}
                    </FieldArray>
                </div>

                <Row>
                    <Col md={12}>
                        <div className='Vendor_Capability_table'>
                            <div className="table-responsive">
                                <Table >
                                    <thead>
                                        <tr>
                                            {tableHead.map((item, index) => (
                                                <th key={index} >{item}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {router.query.id ?
                                            values.contactDetails?.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td >{ind + 1}</td>
                                                    <td >{item.mobile ? item.mobile : "-"}</td>
                                                    <td>{item.email ? item.email : "-"}</td>
                                                    <td>{item.designation ? item.designation : "-"}</td>
                                                    <td>
                                                        <div className='EditOrDeleteBtn'>
                                                            <Button onClick={() => setDisplayIndex(ind)}>
                                                                <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                            </Button>
                                                            {router.query.id ? (
                                                                <Button onClick={() => handleContactDelete(item?.id)}>
                                                                    <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    // disabled={displayIndex === 0}
                                                                    onClick={() => {
                                                                        remove('contactDetails', ind)
                                                                        if (ind !== 0) {
                                                                            setDisplayIndex(ind - 1)
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
                                            ))
                                            : values.contactDetails?.map((item, ind) => {
                                                if (ind !== (values.contactDetails.length - 1)) {
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{ind + 1}</td>
                                                            <td>{item.mobile ? item.mobile : "-"}</td>
                                                            <td>{item.email ? item.email : "-"}</td>
                                                            <td>{item.designation ? item.designation : "-"}</td>
                                                            <td>
                                                                <div className='EditOrDeleteBtn'>
                                                                    <Button onClick={() => setDisplayIndex(ind)}>
                                                                        <Image width={20} height={20} src="/images/edit_icon.svg" alt='' />
                                                                    </Button>
                                                                    {router.query.id ? (
                                                                        <Button onClick={() => handleContactDelete(item?.id)}>
                                                                            <Image width={20} height={20} src="/images/delete_icon.svg" alt='' />
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            // disabled={displayIndex === 0}
                                                                            onClick={() => {
                                                                                remove('contactDetails', ind)
                                                                                if (ind !== 0) {
                                                                                    setDisplayIndex(ind - 1)
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
                    </Col>
                </Row>
            </div>

            <div className="save_or_next_btn">
                {router.query.id ? <Button type='submit'>Update</Button> : <Button type='submit'>Save & Next</Button>}
            </div>
        </>
    )
}

export default VendorsBasicDetails