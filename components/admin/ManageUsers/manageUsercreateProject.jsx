import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getJobRole, updateUser } from '@/redux/actions/user/userActions';
import { toast } from 'react-toastify';
import { getManagerUserDataById } from '@/redux/actions/manageuser/manageruserlist';
import LoaderComponent from '@/components/comman_component/Loader';
import { apiRequest } from '@/redux/services/api';
import { apibasePath } from '@/config';


const ManageUserCreateProject = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectfile, setSelectedFile] = useState(null)

  const jobRoleTypes = useSelector((state) => state.userSlice.jobRoleList)
  const managerUserDataById = useSelector((state) => state.managerUserSlice?.particularmanagerUserData)
  const LoaderEditPage = useSelector((state) => state.managerUserSlice.isLoading)

  useEffect(() => {
    dispatch(getJobRole({ types: "jobroles" }))
    if (router.query.id) {
      dispatch(getManagerUserDataById({ id: Number(router.query.id) }))
    }
  }, [dispatch, router.query.id])

  const handleSubmit = (values) => {

    if (!router.query.id) {
      const { aadharfile, panfile, bankPassbook, ...nonFileValues } = values;

      let formData = new FormData();
      const newValues = {
        ...nonFileValues,
        ...(isAdmin ? { 'user': 'admin' } : ''),
        aadhaar: aadharfile,
        pan: panfile,
        bankAccount: bankPassbook,
        profileData: JSON.stringify({
          ...nonFileValues,
          ...(isAdmin ? { 'user': 'admin' } : ''),
        }),
      };

      if (aadharfile) {
        formData.append('aadhaar', aadharfile);
      }
      if (panfile) {
        formData.append('panCardFrontImage', panfile);
      }
      if (bankPassbook) {
        formData.append('cancelChequeImage', bankPassbook);
      }
      if (selectfile) {
        formData.append('files', selectfile)
      }
      formData.append('profileData', newValues.profileData);

      if (formData) {
        dispatch(createUser(formData)).then((res) => {
          if (res?.payload?.success) {
            toast.success('Created Successfully')
            router.push('/admin/manageusers')
          }
        });
      } else {
        toast.error('Error')
      }
    } else {
      const { aadharfile, panfile, bankPassbook, ...nonFileValues } = values;

      let formdata = new FormData()
      const updatedValues = {
        ...nonFileValues,
        aadhaar: aadharfile,
        pan: panfile,
        bankAccount: bankPassbook,
        profileData: JSON.stringify({ ...nonFileValues })
      }
      if (aadharfile) {
        formdata.append('aadhaar', aadharfile);
      }
      if (panfile) {
        formdata.append('panCardFrontImage', panfile);
      }
      if (bankPassbook) {
        formdata.append('cancelChequeImage', bankPassbook);
      }
      if (selectfile) {
        formdata.append('files', selectfile)
      }

      formdata.append('detailData', updatedValues.profileData);

      if (formdata) {
        dispatch(updateUser(formdata)).then((res) => {
          if (res?.payload?.success) {
            toast.success(res?.payload?.message)
            router.push('/admin/manageusers')
          }
        })
      }
    }
  };

  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors['name'] = { required: "Required" }
    }
    if (!values.mobile) {
      errors['mobile'] = { required: "Required" }
    } else {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(values.mobile)) {
        errors['mobile'] = { required: 'Invalid mobile number' };
      }
    }
    if (!values.dob) {
      errors['dob'] = { required: "Required" }
    }
    if (!values.email) {
      errors['email'] = { required: "Required" };
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        errors['email'] = { required: 'Invalid email format' };
      }
    }

    if (!values.roleId && !isAdmin) {
      errors['roleId'] = { required: "Required" }
    }
    if (!values.aadhaar) {
      errors['aadhaar'] = { required: "*" }
    }
    else if (values.aadhaar?.length < 12) {
      errors['aadhaar'] = { error: "Minimum 12 Digits", ...errors.aadhaar }
    }
    // if (!values.pan) {
    //   errors['pan'] = { required: "*" }
    // }
    if (!values.streetAddress && !values.zipCode && !values.city && !values.state) {
      errors['streetAddress'] = { required: "Required" }
    }
    if (!values.bankPassbook && !values.panfile && !values.aadharfile) {
      errors['aadharfile'] = { required: "Required" }
    }
    return errors
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        document.getElementById('imagePreview').src = event.target.result
      }
      reader.readAsDataURL(file)
      setSelectedFile(file)
    }
  }

  const setInitialValues = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e
    }
    if (router.query.id && managerUserDataById) {

      const initialValues = {
        id: managerUserDataById && managerUserDataById.id,
        name: managerUserDataById && managerUserDataById.name,
        mobile: managerUserDataById && managerUserDataById.mobile,
        alternateMobile: managerUserDataById && managerUserDataById.UserDetail?.alternateMobile,
        dob: managerUserDataById && managerUserDataById.UserDetail.dob,
        email: managerUserDataById && managerUserDataById.email,
        aadhaar: managerUserDataById && managerUserDataById.UserDetail.aadhaar,
        pan: managerUserDataById && managerUserDataById.UserDetail.pan,
        roleId: managerUserDataById && managerUserDataById.Role.id,

        aadharfile: managerUserDataById && managerUserDataById.UserDocuments.aadhaar,
        panfile: managerUserDataById && managerUserDataById.UserDocuments.pan,
        bankPassbook: managerUserDataById && managerUserDataById.UserDocuments.bankAccount,

        streetAddress: managerUserDataById && managerUserDataById.UserDetail.streetAddress,
        zipCode: managerUserDataById && managerUserDataById.UserDetail.zipCode,
        city: managerUserDataById && managerUserDataById.UserDetail.city,
        state: managerUserDataById && managerUserDataById.UserDetail.state

      }
      return initialValues
    }
  }

  const handleUploadCvsFile = async (e) => {
    let uploadUserFile = e.target.files[0]
    if (uploadUserFile) {
      let formData = new FormData()
      formData.append('files', uploadUserFile)
      await apiRequest
        .post('user/createUserFromExcel', formData)
        .then((res) => {
          if (res?.data?.success) {
            toast.success("File uploaded Successfully");
          } else {
            toast.error('Error')
          }
        })
    }
  }
  const handleDownloadCvsFile = async (e) => {
    fetch(`${apibasePath}user/getUserSampleFile`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  return (
    <>
      {LoaderEditPage && <LoaderComponent />}
      <div className='manageUser_Section'>
        <div className='back_btn_all'>
          <p onClick={() => router.push('/admin/manageusers')} style={{ 'cursor': 'pointer' }}>
            <span className='back_icon'><img src="/images/back_icon.svg" alt="" class="img-fluid" /></span>
            Back
          </p>
          <div className='back_import'>

            <label htmlFor="file-input" className="border_btn" style={{ cursor: "pointer" }}>
              <span className='import_icon'><img src="/images/import_icon.svg" alt="" class="img-fluid" /></span>
              Upload .xlsx</label>
            <input
              id="file-input"
              className="importbtn"
              onChange={(e) => handleUploadCvsFile(e)}
              type="file"
              hidden
            />
            <Button variant="" onClick={handleDownloadCvsFile} className='m-lg-2'>
              <span className='import_icon'><img src="/images/import_icon.svg" alt="" class="img-fluid" /></span>Download Sample .xlsx
            </Button>
          </div>
        </div>

        <div className='main_user_createmain'>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            keepDirtyOnReinitialize
            initialValues={useMemo((e) => setInitialValues(e), [managerUserDataById])}
            render={({ handleSubmit, errors, touched, valid }) => {
              return (
                <form onSubmit={(e) => {
                  if (!valid)
                    toast.error("Please Complete All Required Field")
                  handleSubmit(e)
                }} >

                  <div className='Project_basic_Detail'>
                    <h2>Basic Details</h2>
                    <div className='row align-items-center'>
                      <Col md={4}>
                        <Field name='name'>
                          {({ input, meta }) => (
                            <div className='' >
                              <div>
                                <label className='' >Full Name</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon'>
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input
                                type='text'
                                {...input}
                                className='form-control'
                                placeholder='Enter Full Name'
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={4}>
                        <Field name='admin_checkbox'>
                          {({ input, meta }) => (
                            <div className='admin_checkbox'>
                              <input
                                {...input}
                                type='checkbox'
                                onChange={() => setIsAdmin(!isAdmin)}
                                disabled={router.query.id ? true : false}
                              />
                              <label className=''>Make as admin</label>
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={4}>
                        <div className='item_end'>
                          <div>
                            <h5>Profile Picture</h5>
                            <div className='d-flex align-items-center gap-3 m-3 ms-0'>
                              <div className='UserProfile_Picture'>
                                {selectfile ? (
                                  <img id='imagePreview' src='' alt='' />
                                ) : (
                                  <img src='/images/man 1.svg' alt='' />
                                )}
                              </div>
                              <div>
                                <input type='file' id="imageUpload" accept='.jpg'
                                  onChange={handleFileChange} hidden />
                                <label htmlFor="imageUpload" className="btn form-control-image m-0">Upload Image</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </div>
                    <Row>
                      <Col md={4}>
                        <Field name='mobile'>
                          {({ input, meta }) => (
                            <div className=''>
                              <div>
                                <label>Mobile Number</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon' >
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type='text'
                                className='form-control'
                                placeholder='Enter mobile number'
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                              />
                              {meta.touched && meta.error?.error && (
                                <span className='start_icon' >
                                  {meta.error?.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={4}>
                        <Field name='alternateMobile'>
                          {({ input, meta }) => (
                            <div className=''>
                              <div>
                                <label>Alternate Mobile Number</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon' >
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type='text'
                                className='form-control'
                                placeholder='Enter mobile number'
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
                        <Field name='dob'>
                          {({ input, meta }) => (
                            <div className='w-100'>
                              <div>
                                <label className=''>Date of Birth</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon'>
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input type="date"
                                className='form-control w-100'
                                {...input} />
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Field name='email'>
                          {({ input, meta }) => (
                            <div className=''>
                              <div>
                                <label>Email ID</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon'>
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input
                                type='text'
                                {...input}
                                placeholder='Enter email address'
                                className='form-control'
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={4}>
                        <Field name='roleId'>
                          {({ input, meta }) => (
                            <div className=''>
                              <div>
                                <label>Job Role {!isAdmin && <span className='start_icon'></span>}</label>
                                {!isAdmin && meta.touched && meta.error?.required && (
                                  <span className='start_icon'>
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <select {...input}
                                className='form-control'
                                disabled={isAdmin}
                              >
                                <option >Select</option>
                                {jobRoleTypes && jobRoleTypes.map((role) => (
                                  role.title !== "Vendor" && (
                                    <option key={role.id} value={role.id} >
                                      {role?.title}
                                    </option>
                                  )
                                ))}
                              </select>
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={4}>
                        <Field name='aadhaar'>
                          {({ input, meta }) => (
                            <div className=''>
                              <div>
                                <label>Aadhar Card</label>
                                {meta.touched && meta.error?.error && (
                                  <span className='start_icon'>
                                    {meta.error?.error}

                                  </span>
                                )}
                              </div>
                              <input
                                type='text'
                                {...input}
                                placeholder='XXXX/XXXX/XXXX'
                                className='w-100 form-control'
                                maxLength={12}
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                              />
                              {/* {meta.touched && meta.error?.error && ( */}
                              {/* // <span className='alert alert-danger'>
                                //   {meta.error?.error}

                                // </span> */}
                              {/* )} */}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Field name='pan'>
                          {({ meta, input }) => (
                            <div className=''>
                              <div>
                                <label>PAN No.</label>
                                {meta.touched && meta.error?.required && (
                                  <span className='start_icon'>
                                    {meta.error?.required}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type='text'
                                placeholder='Enter here'
                                className='form-control'
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                  </div>

                  <div className='main_user_document'>
                    <div className='Project_basic_Detail'>
                      <h2 className='mb-0'>Documents</h2>
                      <div className='d-flex gap-2 align-items-center' >
                        <p className='mb-2'>Upload at least one document <span className='start_icon'>*</span></p>
                        {/* {errors.aadharfile && (touched.aadharfile || touched.panfile || touched.bankPassbook) && <span className='start_icon'>*</span>} */}
                      </div>
                      <Row>
                        <Col>
                          <Field name="aadharfile">
                            {({ input, meta }) => (
                              <>
                                <div>
                                  <span className=''>Aadhar Card</span>
                                  <input
                                    className=" input-group w-100 cred-input file-upload-field form-control "
                                    type="file"
                                    onChange={(e) => input.onChange(e.target.files[0])}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </Col>
                        <Col>
                          <Field name="panfile">
                            {({ input, meta }) => (
                              <>
                                <div>
                                  <span className=''>Pan Card</span>
                                  <input
                                    className="input-group w-100 cred-input file-upload-field form-control"
                                    type="file"
                                    onChange={(e) => input.onChange(e.target.files[0])}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </Col>
                      </Row>

                      <Row>

                        <Col md={6}>
                          <Field name="bankPassbook">
                            {({ input, meta }) => (
                              <>
                                <div>
                                  <span className=''>BankPass Book</span>
                                  <input
                                    className="w-100 bg-fileclass input-group cred-input file-upload-field form-control"
                                    type="file"
                                    onChange={(e) => input.onChange(e.target.files[0])}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </Col>

                      </Row>

                    </div>
                  </div>

                  <div className='Project_basic_Detail'>
                    <div className="clint_detail">
                      <div className='d-flex gap-2 align-items-center'>
                        <h2 className=''>Base address</h2>
                        {errors.streetAddress && (touched.streetAddress || touched.zipCode || touched.city || touched.state) && <span className='start_icon mb-4'>*</span>}
                      </div>
                      <Row className="">
                        <div className='col mb-3'>
                          <Field name='streetAddress'>
                            {({ meta, input }) => (
                              <div className=''>
                                <input
                                  {...input}
                                  type='text'
                                  placeholder='Enter street address'
                                  className='form-control'
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <Col>
                          <Field name='zipCode'>
                            {({ meta, input }) => (
                              <div className=''>
                                <input
                                  {...input}
                                  type='text'
                                  placeholder='zip code'
                                  className='form-control'
                                  maxLength={6}
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

                        <Col>
                          <Field name='city'>
                            {({ meta, input }) => (
                              <div className=''>
                                <input
                                  {...input}
                                  type='text'
                                  placeholder='Enter city'
                                  className='form-control'
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>

                      <Row className="">
                        <Col>
                          <Field name='state'>
                            {({ meta, input }) => (
                              <div className=''>
                                <input
                                  {...input}
                                  type='text'
                                  placeholder='Enter state'
                                  className='form-control'
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end save_or_upload_btn ">
                    <Button type='submit' className='update_exe_btn'>{router.query.id ? "Update" : "Create"} Executive</Button>
                  </div>

                </form>
              )
            }}
          />
        </div>
      </div>
    </>

  )
}

export default ManageUserCreateProject