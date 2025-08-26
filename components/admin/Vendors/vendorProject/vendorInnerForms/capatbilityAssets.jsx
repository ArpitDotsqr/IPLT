import ModalDoc from "@/components/comman_component/ModalDoc";
import {
  assetDetailsDelete,
  getVendorDataById,
} from "@/redux/actions/vendor/vendorActions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Accordion, Col, Image, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const VendorCapabilityAndAssets = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { values, push, remove } = props;

  const tableHead = [
    "Vehicle No",
    "Vehicle Type",
    "Wheels",
    "Volume",
    "Vehicle Age",
    "Capacity",
    "Insurance",
    "Driver Name",
    "Documents",
    "Actions",
  ];

  const [displayIndex, setDisplayIndex] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedImages, setSelectedImages] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState("");

  const handleView = (fileData) => {
    setSelectedFileData(fileData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFileData("");
  };

  const masterListVehicleType = useSelector(
    (state) => state.masterSlice.vehicleTypeList
  );

  // const vehiclesFields = [
  //     {
  //         label: (name) => name ? name + " No." : " No.",
  //         fieldName: "number",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "text",
  //         placeholder: "Enter Vehicle No.",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Type" : "Type",
  //         fieldName: "type",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "select",
  //         options: [],
  //         placeholder: "Select Vehicle type",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Wheels" : " Wheels",
  //         fieldName: "wheels",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "number",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Measurement" : " Measurement",
  //         fieldName: "measurement",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "text",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Capacity" : " Capacity",
  //         fieldName: "capacity",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "text",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Age" : "  Age",
  //         fieldName: "age",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "number",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Tare Weight" : "  Tare Weight",
  //         fieldName: "tareWeight",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "text",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + " Insurance Validity" : "  Insurance Validity",
  //         fieldName: "insuranceValidity",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "type",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "Registration Certificate - Front" : " Registration Certificate - Front",
  //         fieldName: "rcFront",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "file",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "Registration Certificate - Back" : " Registration Certificate - Back",
  //         fieldName: "rcBack",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "file",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "Driver Name" : " Driver Name",
  //         fieldName: "driverName",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "text",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "DL Number" : " DL Number",
  //         fieldName: "dlNumber",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "number",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "Driving License -Front" : " Driving License -Front",
  //         fieldName: "dlFront",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "file",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  //     {
  //         label: (name) => name ? name + "Driving License -Front" : " Driving License -Front",
  //         fieldName: "dlFront",
  //         assetTypes: ["vehicle", "excavator"],
  //         type: "file",
  //         placeholder: "aaa",
  //         disabled: () => { return false },
  //         onChange: (e, input) => { input.onChange(e) }
  //     },
  // ]

  const handlefile = (file, onChange, values) => {
    let name = file.target.files[0]["name"];
    let filename = values.vehicleNumber + "_" + name;
    let filess = new File(file.target.files, filename);
    onChange(filess);
  };

  const handleAssetDelete = (data) => {
    dispatch(
      assetDetailsDelete({ id: data?.id, userId: router.query.id })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success(res?.payload?.data?.message);
        dispatch(getVendorDataById({ id: Number(router.query.id) }));
      } else {
        toast.error("Error");
      }
    });
  };

  const toggleDoc = (images) => {
    setSelectedImages(images);
    setIsModalOpen(!isModalOpen);
  };

  const calculateAge = (registerdate) => {
    const currentdateObj = new Date();
    const birthdateObj = new Date(registerdate);

    let age = currentdateObj.getFullYear() - birthdateObj.getFullYear();

    if (
      currentdateObj.getMonth() < birthdateObj.getMonth() ||
      (currentdateObj.getMonth() === birthdateObj.getMonth() &&
        currentdateObj.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }
    return age ? age : "0";
  };

  return (
    <>
      <div className="Project_basic_Detail">
        <h2>Vendor Capability</h2>
        <p>
          All fields are mandatory<span className="start_icon">*</span>
        </p>
        <h4>No. of vehicles/ excavators</h4>
        <Row>
          <Col md={4}>
            <Field name="ownedVehicles">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Owned</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="No. of vehicles owned"
                  />
                </div>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field name="rentedVehicles">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Rented</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="No. of vehicles rented"
                  />
                </div>
              )}
            </Field>
          </Col>

          <Col md={4}>
            <Field name="moblizationTime">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Mobilization time</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="No. of days"
                  />
                </div>
              )}
            </Field>
          </Col>
        </Row>
      </div>
      <div className="Project_basic_Detail">
        <Row>
          <Col md={6}>
            <h2>Asset Details</h2>
          </Col>
          {/* <Col md={6} className='text-end'>
                        <Button className='ImportFromCSVBtn'> <img src={'/images/upload-icon.svg'} alt="" /> Import from CSV</Button>
                    </Col> */}
        </Row>

        <FieldArray name="payload">
          {({ fields }) =>
            fields.map(
              (name, index) =>
                index === displayIndex && (
                  <div key={index}>
                    {/* <Row>
                                     <Col md={6} className='d-flex gap-3'>
                                        <Field name={`${item}.assetType`} type='radio' value={'vehicle'}>
                                            {({ input, meta }) => (
                                                <div className='d-flex gap-2' >
                                                    <input
                                                        type='radio'
                                                        {...input}
                                                        value={'vehicle'}
                                                        placeholder='Enter Vehicle No.'
                                                    />
                                                    <label className='' >Vehicle</label>
                                                    {meta.touched && meta.error && (
                                                        <span className=''>
                                                            {meta.error}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Field>

                                        <Field name={`${item}.assetType`} type='radio' value={'excavator'}>
                                            {({ input, meta }) => (
                                                <div className='d-flex gap-2' >
                                                    <input
                                                        type='radio'
                                                        {...input}
                                                        value={'excavator'}
                                                    />
                                                    <label className='' >Excavator</label>
                                                    {meta.touched && meta.error && (
                                                        <span className=''>
                                                            {meta.error}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Field>
                                    </Col> 
                                </Row > */}
                    {/* <Row>
                                    {vehiclesFields && vehiclesFields.map((fieldItem, fieldIndex) => fieldItem.assetTypes.includes(values && values.payload[index]['assetType']) &&
                                        <Col md={4} key={`asset_${fieldIndex}`}>

                                            <Field name={`${item}.${fieldItem.fieldName}`} >
                                                {({ input, meta }) => (
                                                    <div className=' ' >
                                                        <label className='' >{fieldItem.label(values && values.payload[index]['assetType'])}</label>
                                                        <input
                                                            {...input}
                                                            className='form-control'
                                                            type={fieldItem.type}
                                                            placeholder={fieldItem.placeholder}
                                                            disabled={fieldItem.disabled()}
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
                                        )}
                                </Row> */}
                    {/* <Col md={12}>
                                    <div className="Vendor_Capability_Add_Import_btn">
                                        <Button type='button'
                                            onClick={addVehicle} >
                                            Add Vehicle
                                        </Button>
                                    </div>
                                </Col> */}

                    <Accordion defaultActiveKey="0" className="accodion_main">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="accordion_title">
                          Vehicle Details
                        </Accordion.Header>

                        <Accordion.Body>
                          <Row>
                            <Col md={4}>
                              <Field name={`${name}.vehicleNumber`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">Vehicle No.</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter Vehicle No."
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.vehicleTypeId`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">Vehicle Type</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <select
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Select Vehicle Type">
                                      <option value="">
                                        Select Vehicle Type
                                      </option>
                                      {masterListVehicleType?.length > 0 &&
                                        masterListVehicleType.map(
                                          (item, index) => (
                                            <option
                                              key={`vehicleType_${index}`}
                                              value={item?.id}>
                                              {item?.displayName}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.vehicleWheels`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">Wheels</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <select
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Vendor Type">
                                      <option value="">
                                        Select no. of wheels
                                      </option>
                                      <option value="10">10</option>
                                      <option value="12">12</option>
                                      <option value="14">14</option>
                                      <option value="16">16</option>
                                      <option value="18">18</option>
                                      <option value="22">22</option>
                                    </select>
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Row>
                                <div>
                                  <label className="">
                                    Vehicle Measurement
                                  </label>
                                </div>
                                <Col md={4}>
                                  <Field name={`${name}.vehicleLength`}>
                                    {({ input, meta }) => (
                                      <input
                                        type="text"
                                        {...input}
                                        className="form-control"
                                        placeholder="Length"
                                      />
                                    )}
                                  </Field>
                                </Col>
                                <Col md={4}>
                                  <Field name={`${name}.vehicleHeight`}>
                                    {({ input, meta }) => (
                                      <input
                                        type="text"
                                        {...input}
                                        className="form-control"
                                        placeholder="height"
                                      />
                                    )}
                                  </Field>
                                </Col>
                                <Col md={4}>
                                  <Field name={`${name}.vehicleWidth`}>
                                    {({ input, meta }) => (
                                      <input
                                        type="text"
                                        {...input}
                                        className="form-control"
                                        placeholder="width"
                                      />
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                            </Col>

                            <Col md={4}>
                              <Field name={`${name}.vehicleVolume`}>
                                {({ input, meta }) => (
                                  <div className="w-100">
                                    <div>
                                      <label className="">Vehicle Volume</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Vehicle volume"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.vehicleCapacity`}>
                                {({ input, meta }) => (
                                  <div className="w-100">
                                    <div>
                                      <label className="">
                                        Vehicle Capacity
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter Vehicle Capacity (MT)"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.vehicleTareWeight`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      <label className="">
                                        Vehicle Tare Weight
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="input-group w-100 cred-input file-upload-field form-control"
                                      placeholder="Enter Vehicle tare weight"
                                    />
                                  </>
                                )}
                              </Field>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="1">
                        <Accordion.Header className="accordion_title">
                          Registration Details
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4}>
                              <Field name={`${name}.registrationDate`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">
                                        Registration date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="date"
                                      {...input}
                                      className="form-control"
                                      placeholder="Registered date"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>

                            <Col md={4}>
                              <Field name={`${name}.rcImageFront`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      <div>
                                        {" "}
                                        <label className="">
                                          Upload front Registration Certificate
                                        </label>
                                      </div>
                                      <input
                                        className="input-group w-100 cred-input file-upload-field form-control"
                                        type="file"
                                        placeholder="Upload Vehicle R.C"
                                        accept=".jpg,.jpeg"
                                        onChange={(e) =>
                                          handlefile(
                                            e,
                                            input.onChange,
                                            values.payload[index]
                                          )
                                        }
                                      />
                                      {meta.error && meta.touched && (
                                        <span className="">{meta.error}</span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.rcImageBack`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      <div>
                                        <label>
                                          Upload back Registration Certificate
                                        </label>
                                      </div>
                                      <input
                                        className="input-group w-100 cred-input file-upload-field form-control"
                                        type="file"
                                        onChange={(e) =>
                                          handlefile(
                                            e,
                                            input.onChange,
                                            values.payload[index]
                                          )
                                        }
                                        placeholder="Upload Vehicle R.C"
                                        accept=".jpg,.jpeg"
                                      />
                                      {meta.error && meta.touched && (
                                        <span className="">{meta.error}</span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </Field>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="2">
                        <Accordion.Header className="accordion_title">
                          Insurance and fitness Details
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4}>
                              <Field name={`${name}.insuranceValidity`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">
                                        Insurance Validity
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter Insurance"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.insuranceImage`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      {" "}
                                      <label className="">
                                        Upload Insurance
                                      </label>
                                    </div>
                                    <input
                                      className="input-group w-100 cred-input file-upload-field form-control"
                                      type="file"
                                      placeholder="Upload Insurance"
                                      accept=".jpg,.jpeg"
                                      onChange={(e) =>
                                        handlefile(
                                          e,
                                          input.onChange,
                                          values.payload[index]
                                        )
                                      }
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="">{meta.error}</span>
                                    )}
                                  </>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.fitnessValidityImage`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      {" "}
                                      <label className="">
                                        Fitness Validty
                                      </label>
                                    </div>
                                    <input
                                      className="input-group w-100 cred-input file-upload-field form-control"
                                      type="file"
                                      placeholder="Upload fitness validty"
                                      accept=".jpg,.jpeg"
                                      onChange={(e) =>
                                        handlefile(
                                          e,
                                          input.onChange,
                                          values.payload[index]
                                        )
                                      }
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="">{meta.error}</span>
                                    )}
                                  </>
                                )}
                              </Field>
                            </Col>

                            <Col md={4}>
                              <Field name={`${name}.otherImage`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      {" "}
                                      <label className="">Other</label>
                                    </div>
                                    <input
                                      className="input-group w-100 cred-input file-upload-field form-control"
                                      type="file"
                                      placeholder="other"
                                      accept=".jpg,.jpeg"
                                      onChange={(e) =>
                                        handlefile(
                                          e,
                                          input.onChange,
                                          values.payload[index]
                                        )
                                      }
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="">{meta.error}</span>
                                    )}
                                  </>
                                )}
                              </Field>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="3">
                        <Accordion.Header className="accordion_title">
                          Driver Details
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4}>
                              <Field name={`${name}.driverName`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">Driver Name</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter Driver name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.driverContactNo`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">
                                        Driver Contact no.
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter driver contact no."
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
                              <Field name={`${name}.drivingLicenseNumber`}>
                                {({ input, meta }) => (
                                  <div className="">
                                    <div>
                                      <label className="">DL Number</label>
                                      {meta.error && meta.touched && (
                                        <span className="start_icon">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      type="text"
                                      {...input}
                                      className="form-control"
                                      placeholder="Enter DL number"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={4}>
                              <Field name={`${name}.drivingLicenseImage`}>
                                {({ input, meta }) => (
                                  <>
                                    <div>
                                      <label>Driving Licence</label>
                                    </div>
                                    <input
                                      className="input-group w-100 cred-input file-upload-field form-control"
                                      type="file"
                                      placeholder="Upload Driving Licence"
                                      accept=".jpg,.jpeg"
                                      onChange={(e) =>
                                        handlefile(
                                          e,
                                          input.onChange,
                                          values.payload[index]
                                        )
                                      }
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="">{meta.error}</span>
                                    )}
                                  </>
                                )}
                              </Field>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )
            )
          }
        </FieldArray>

        <Row>
          <Col md={12}>
            <div className="Vendor_Capability_Add_Import_btn">
              <Button
                type="button"
                onClick={() => {
                  push("payload", {
                    vehicleNumber: "",
                    vehicleTypeId: "",
                    vehicleWheels: "",
                    vehicleMeasurement: "",
                    vehicleVolume: "",
                    vehicleCapacity: "",
                    vehicleTareWeight: "",
                    insuranceValidity: "",
                    driverName: "",
                    drivingLicenseNumber: "",
                  });
                  setDisplayIndex(values?.payload?.length);
                }}>
                Add Vehicle
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="Vendor_Capability_table">
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      {tableHead.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {values.payload &&
                      values.payload?.map((item, ind) => {
                        if (ind !== values.payload.length - 1) {
                          const vehicleType = masterListVehicleType?.find(
                            (type) => type.id == item.vehicleTypeId
                          );
                          return (
                            <tr key={ind}>
                              <td>{item.vehicleNumber}</td>
                              <td>{vehicleType && vehicleType.displayName}</td>
                              <td>{item.vehicleWheels}</td>
                              {/* <td>{Number(item.vehicleWidth)*Number(item.vehicleLength)* Number(item.vehicleHeight)}</td> */}
                              <td>{item.vehicleVolume}</td>
                              <td>{calculateAge(item.registrationDate)}</td>
                              <td>{item.vehicleCapacity}</td>
                              <td>{item.insuranceValidity}</td>
                              <td>{item.driverName}</td>
                              <td>
                                <span
                                  className="password_visiable position-absolute"
                                  onClick={() => handleView(item)}>
                                  <Image
                                    width={20}
                                    height={30}
                                    src="/images/visibility_icon.svg"
                                    alt=""
                                    class="img-fluid"
                                  />
                                </span>
                              </td>
                              <td>
                                <div className="EditOrDeleteBtn">
                                  <Button onClick={() => setDisplayIndex(ind)}>
                                    <Image
                                      width={20}
                                      height={20}
                                      src="/images/edit_icon.svg"
                                      alt=""
                                    />
                                  </Button>
                                  {router.query.id ? (
                                    <Button
                                      onClick={() => handleAssetDelete(item)}>
                                      <Image
                                        width={20}
                                        height={20}
                                        src="/images/delete_icon.svg"
                                        alt=""
                                      />
                                    </Button>
                                  ) : (
                                    <Button
                                      // disabled={displayIndex === 0}
                                      onClick={() => {
                                        remove("payload", ind);
                                        if (ind !== 0) {
                                          setDisplayIndex(ind - 1);
                                        } else {
                                          setDisplayIndex(0);
                                        }
                                      }}>
                                      <Image
                                        width={20}
                                        height={20}
                                        src="/images/delete_icon.svg"
                                        alt=""
                                      />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </Table>
                <ModalDoc
                  showModal={showModal}
                  handleClose={handleCloseModal}
                  fileData={selectedFileData}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="save_or_next_btn">
        {router.query.id ? (
          <Button type="submit">Update </Button>
        ) : (
          <Button type="submit">Save & Create vendor</Button>
        )}
      </div>
    </>
  );
};

export default VendorCapabilityAndAssets;
