import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import AutoAddress from "./AutoAddress";
import { useRouter } from "next/router";
import LoaderComponent from "@/components/comman_component/Loader";
import {
  deleteLoading,
  deletePurchaseOrderDetails,
  deleteServiceDetail,
  deleteUnoading,
  getProjectDetails,
} from "@/redux/actions/project/projectData";
import { toast } from "react-toastify";

const BasicDetails = (props) => {
  const { values, push, remove, change } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const serviceDetailTableHead = [
    "S.No.",
    "Unit",
    "Qty",
    "Rate(in rs.)",
    "Amount(in rs.)",
    "GST Rate(%)",
    "Amount(Including GST)",
    "Action",
  ];
  const loadingTableHeading = [
    "S.No.",
    "Dyke/Cello",
    "Address",
    "Longitude",
    "Latitude",
    "Action",
  ];
  const unLoadingTableHeading = [
    "S.No.",
    "Chainage",
    "Address",
    "Longitude",
    "Latitude",
    "Action",
  ];

  const masterDataMaterial = useSelector(
    (state) => state.masterSlice.materialList
  );
  const masterDataServicetype = useSelector(
    (state) => state.masterSlice.serviceTypeList
  );
  const masterDataunittype = useSelector(
    (state) => state.masterSlice.unitTypeList
  );
  const masterDatagstRatetype = useSelector(
    (state) => state.masterSlice.gstRateTypeList
  );
  const masterDataDyke = useSelector((state) => state.masterSlice.dykeList);
  const masterDataCello = useSelector((state) => state.masterSlice.celloList);
  const projectLoader = useSelector((state) => state.projectSlice.isLoading);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayIndex1, setDisplayIndex1] = useState(0);
  const [displayIndex2, setDisplayIndex2] = useState(0);

  const selectResult = (result, setValue, fieldName) => {
    if (result) {
      setValue(`${fieldName}.loadingLatitude`, result?.latitude.toString());
      setValue(`${fieldName}.loadingLongitude`, result?.longitude.toString());
      setValue(
        `${fieldName}.loadingAddress`,
        result?.addressDetails?.formatted_address
      );
    }
  };

  const selectResultUnloading = (result, setValue, fieldName) => {
    if (result) {
      setValue(`${fieldName}.unloadingLatitude`, result?.latitude.toString());
      setValue(`${fieldName}.unloadingLongitude`, result?.longitude.toString());
      setValue(
        `${fieldName}.unloadingAddress`,
        result?.addressDetails?.formatted_address
      );
    }
  };

  const handleFile = (file, onChange, values) => {
    let name = file.target.files[0]["name"];
    let filename = values.purchaseOrderNumber + "_" + name;
    let filess = new File(file.target.files, filename);
    let event = { target: { files: filess } };
    onChange(event);
  };

  // let name = e.target.files[0]['name']
  // let filename = values.purchaseOrderNumber + '_' + name
  // let filess = new File(e.target.files, filename)
  // console.log(filess, filess[0], 'filess')
  // let event = { target: { files: filess } }
  // console.log(event, 'event')
  // input.onChange(event.target.files.filess)
  const object = {
    celloId: masterDataCello,
    dykeId: masterDataDyke,
  };

  const handleDeletePurchaseOrder = (fields, index, values) => {
    if (router.query.id) {
      if (values[index].purchaseOrderEndMonth !== "") {
        if (values[index] && values[index].id) {
          dispatch(deletePurchaseOrderDetails(values[index].id)).then((res) => {
            if (res?.payload?.data?.success) {
              fields.remove(index);
              toast.success("deleted");
            }
          });
        }
      } else {
        fields.remove(index);
      }
    } else {
      fields.remove(index);
    }
  };

  const handleDeleteServiceDetail = (Id, remove, serviceDetails, index) => {
    if (Id) {
      dispatch(deleteServiceDetail(Id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getProjectDetails({ projectId: router.query.id }));
        }
      });
    } else {
      remove("serviceDetails", index);
      if (index !== 0) {
        setDisplayIndex(index - 1);
      } else {
        setDisplayIndex(0);
      }
    }
  };

  const handleDeleteLoading = (Id, remove, loadingPointDetails, index) => {
    if (Id) {
      dispatch(deleteLoading(Id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getProjectDetails({ projectId: router.query.id }));
        }
      });
    } else {
      remove("loadingPointDetails", index);
      if (index !== 0) {
        setDisplayIndex1(index - 1);
      } else {
        setDisplayIndex1(0);
      }
    }
  };

  const handleDeleteUnloading = (Id, remove, unloadingPointDetails, index) => {
    if (Id) {
      dispatch(deleteUnoading(Id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getProjectDetails({ projectId: router.query.id }));
        }
      });
    } else {
      remove("unloadingPointDetails", index);
      if (index !== 0) {
        setDisplayIndex2(index - 1);
      } else {
        setDisplayIndex2(0);
      }
    }
  };

  return (
    <>
      {projectLoader && <LoaderComponent />}
      <div className="Project_basic_Detail">
        <h2>Project Details</h2>
        <Row>
          <Col md={8}>
            <Field name="projectName">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Project name </label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="Enter project name"
                  />
                </div>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field name="materialId">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Material</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <select
                    // type='text'
                    {...input}
                    className="form-control"
                    placeholder="Vendor Type">
                    <option value="">Select Material</option>
                    {masterDataMaterial?.length > 0 &&
                      masterDataMaterial.map((item, index) => (
                        <option
                          key={`materialType_${index}`}
                          value={item?.name}>
                          {item?.displayName}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </Field>
          </Col>

          <Col md={8}>
            <Field name="purchaseOrderNumber">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Purchase order</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="Enter Purchase order no."
                  />
                </div>
              )}
            </Field>
          </Col>

          <Col md={4}>
            <Field name="purchaseOrderStartMonth">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Order Start Month</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="date"
                    {...input}
                    className="form-control"
                    placeholder="Enter Order start month"
                  />
                </div>
              )}
            </Field>
          </Col>
        </Row>

        <FieldArray name="purchaseOrder">
          {({ fields }) => (
            <>
              {fields.map((name, index) => (
                <div className="" key={index}>
                  <Row>
                    <Col md={4}>
                      <Field name={`${name}.purchaseOrderVersion`}>
                        {({ input, meta }) => (
                          <>
                            <div className="form_Label ">
                              <label className="">Version {index + 1}</label>
                              {meta.touched && meta.error && (
                                <span className="start_icon ms-lg-2">
                                  {meta.error}
                                </span>
                              )}
                            </div>
                            <input
                              className="input-group w-100 cred-input file-upload-field form-control "
                              type="file"
                              placeholder="Upload Purchaseorderversion"
                              onChange={(e) =>
                                handleFile(e, input.onChange, values)
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Col>
                    <Col md={4}>
                      <Field name={`${name}.purchaseOrderEndMonth`}>
                        {({ input, meta }) => (
                          <div className="">
                            <div>
                              <label className="">Order End Month</label>
                              <span className="start_icon"></span>
                              {meta.touched && meta.error && (
                                <span className="start_icon ms-lg-2">
                                  {meta.error}
                                </span>
                              )}
                            </div>
                            <input
                              type="date"
                              {...input}
                              className="form-control"
                              placeholder="Enter Order end month"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>

                    <Row>
                      <Col md={4} className="d-flex align-items-center">
                        <div className="d-flex">
                          <p
                            className="text_add_version"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              push("purchaseOrder", {
                                purchaseOrderVersion: "",
                                purchaseOrderEndMonth: "",
                              });
                            }}>
                            <span className="d-inline-block">+ </span> Add
                            Version
                          </p>

                          {fields.length > 1 && (
                            <p
                              className="text_add_version"
                              type="button"
                              onClick={() =>
                                handleDeletePurchaseOrder(
                                  fields,
                                  index,
                                  values?.purchaseOrder
                                )
                              }>
                              <span className="d-inline-block">- </span> Remove
                              Version
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </div>
              ))}
            </>
          )}
        </FieldArray>
      </div>

      <div className="Project_basic_Detail">
        <h2>Service Details </h2>
        <FieldArray name="serviceDetails">
          {({ fields }) => (
            <>
              {fields.map(
                (name, index) =>
                  index === displayIndex && (
                    <div className="" key={index}>
                      <Row>
                        <Col md={4}>
                          <Field name={`${name}.serviceTypeId`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Service type</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <select
                                  {...input}
                                  className="form-control"
                                  placeholder="Select Service type">
                                  <option value="">Select Service type</option>
                                  {masterDataServicetype?.length > 0 &&
                                    masterDataServicetype.map((item, index) => (
                                      <option
                                        key={`serviceType_${index}`}
                                        value={item?.name}>
                                        {item?.displayName}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={4}>
                          <Field name={`${name}.unitId`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Unit</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <select
                                  {...input}
                                  className="form-control"
                                  placeholder="Vendor Type">
                                  <option>Select Unit</option>
                                  {masterDataunittype?.length > 0 &&
                                    masterDataunittype.map((item, index) => (
                                      <option
                                        key={`unitType_${index}`}
                                        value={item?.name}>
                                        {item?.displayName}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={4}>
                          <Field name={`${name}.unitRate`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Unit Rate</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="number"
                                  {...input}
                                  className="form-control"
                                  placeholder="Enter amount in ₹"
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={4}>
                          <Field name={`${name}.quantity`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Quantity</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="number"
                                  {...input}
                                  className="form-control"
                                  placeholder="Enter Quantity"
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={4}>
                          <Field name={`${name}.gstRateId`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">GST rate</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <select
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Vendor Type">
                                  <option value="">Select GST rate</option>
                                  {masterDatagstRatetype?.length > 0 &&
                                    masterDatagstRatetype.map((item, index) => (
                                      <option
                                        key={`gstrateType_${index}`}
                                        value={item?.name}>
                                        {item?.displayName}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </div>
                  )
              )}
            </>
          )}
        </FieldArray>

        <div className="save_or_upload_btn">
          <Button
            className="save_btn"
            type="button"
            onClick={() => {
              push("serviceDetails", {
                serviceTypeId: "",
                unitId: "",
                unitRate: "",
                quantity: "",
                gstRateId: "",
              });
              setDisplayIndex(values?.serviceDetails?.length);
            }}>
            {" "}
            Add
          </Button>
        </div>

        <Row>
          <Col md={12}>
            <div className="Vendor_Capability_table">
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr>
                      {serviceDetailTableHead.map((item, ind) => (
                        <th key={ind}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {values.serviceDetails &&
                      values.serviceDetails?.map((item, ind) => {
                        if (
                          ind !== values.serviceDetails.length - 1 ||
                          router.query.id
                        ) {
                          // const gstData = masterDatagstRatetype.find(elem => elem.id == item.gstRateId)
                          return (
                            <>
                              <tr>
                                <td>{ind + 1}</td>
                                <td>{item.unitId}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unitRate}</td>
                                <td>
                                  {Number(item.quantity) *
                                    Number(item.unitRate)}
                                </td>
                                <td>{item.gstRateId}</td>
                                <td>
                                  {Number(item.gstRateId) === 0
                                    ? Number(item.quantity) *
                                      Number(item.quantity)
                                    : Number(item.quantity) *
                                      Number(item.quantity) *
                                      Number(item.gstRateId)}
                                </td>
                                <td>
                                  <div className="EditOrDeleteBtn">
                                    <Button
                                      onClick={() => setDisplayIndex(ind)}>
                                      <Image
                                        width={20}
                                        height={20}
                                        src="/images/edit_icon.svg"
                                        alt=""
                                      />
                                    </Button>

                                    {router.query.id ? (
                                      <Button
                                        onClick={() =>
                                          handleDeleteServiceDetail(
                                            item?.id,
                                            remove,
                                            "serviceDetails",
                                            ind
                                          )
                                        }>
                                        <Image
                                          width={20}
                                          height={20}
                                          src="/images/delete_icon.svg"
                                          alt=""
                                        />
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          remove("serviceDetails", ind);
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
                            </>
                          );
                        }
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Client Details */}

      <div className="Project_basic_Detail">
        <h2>Client Details</h2>
        <Row>
          <Col md={8}>
            <Field name="clientName">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Name</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="Enter client name"
                  />
                </div>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field name="gstNumber">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">GST no.</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                  />
                </div>
              )}
            </Field>
          </Col>
          <Col md={12}>
            <Field name="clientAddress">
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">Client Address</label>
                    <span className="start_icon"></span>
                    {meta.touched && meta.error && (
                      <span className="start_icon ms-lg-2">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="Enter street address"
                  />
                </div>
              )}
            </Field>
          </Col>
        </Row>
      </div>

      {/* Loading Details */}
      <div className="Project_basic_Detail">
        <h2>Loading Details</h2>
        <FieldArray name="loadingPointDetails">
          {({ fields }) => (
            <>
              {fields.map(
                (name, index) =>
                  index === displayIndex1 && (
                    <div key={index}>
                      <Row>
                        <div className="project_requirments_inner d-flex align-items-center">
                          <p className="dyke_txt mb-0">Dyke/Cello: </p>
                          <Field
                            name={`${name}.loadingType`}
                            type="radio"
                            value={"dykeId"}>
                            {({ input, meta }) => (
                              <>
                                <input
                                  type="radio"
                                  value={"dykeId"}
                                  onChange={(e) => input.onChange(e)}
                                  {...input}
                                />
                                <div>
                                  <label
                                    htmlFor={`inline-radio-1-${index}`}
                                    className="m-lg-1">
                                    Dyke
                                  </label>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon m-lg-0">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </Field>

                          <Field
                            name={`${name}.loadingType`}
                            type="radio"
                            value={"celloId"}>
                            {({ input, meta }) => (
                              <div className="d-flex m-lg-1">
                                <input
                                  type="radio"
                                  onChange={(e) => input.onChange(e)}
                                  value={"celloId"}
                                  {...input}
                                />
                                <div>
                                  <label
                                    htmlFor={`inline-radio-2-${index}`}
                                    className="m-lg-1">
                                    Cello
                                  </label>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-0">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                          <Field name={`${name}.select`}>
                            {({ input, meta }) => (
                              <>
                                <div className="dyke_txt_select">
                                  <div>
                                    {meta.touched && meta.error && (
                                      <span className="start_icon ms-lg-2">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control"
                                    placeholder="Vendor Type">
                                    <option value="">Select </option>
                                    {object[
                                      values.loadingPointDetails[index]
                                        ?.loadingType
                                    ]?.length > 0 &&
                                      object[
                                        values.loadingPointDetails[index]
                                          .loadingType
                                      ].map((item, masterDataCelloindex) => (
                                        <option
                                          key={`cello_${masterDataCelloindex}`}
                                          value={Number(item?.id)}>
                                          {item?.displayName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <Col md={12}>
                          <Field name={`${name}.loadingAddress`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Loading address</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <AutoAddress
                                  className="cs-input Profile-text py-input py-input-ca p-0 border-0 mb-3 cs-input mb-3 ref-height-6"
                                  selectResult={(result) => {
                                    selectResult(result, change, name);
                                  }}
                                  selectedAddress={
                                    values.loadingPointDetails[index]
                                      ?.loadingAddress
                                  }
                                />
                                {/* <input
                                  type="text"
                                  className="cs-input Profile-text py-input py-input-ca p-0 border-0 mb-3 cs-input mb-3 ref-height-6"
                                /> */}
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={6}>
                          <Field name={`${name}.loadingLongitude`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Geo-location</label>
                                  <span className="start_icon"></span>
                                  {/* {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-2'>
                                                                        {meta.error}
                                                                    </span>
                                                                )} */}
                                </div>
                                <input
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Longitude (for eg: 24.12345678)"
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={6}>
                          <Field name={`${name}.loadingLatitude`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className=""></label>
                                  <span className="start_icon"></span>
                                  {/* {meta.touched && meta.error && (
                                                                    <span className='start_icon ms-lg-2'>
                                                                        {meta.error}
                                                                    </span>
                                                                )} */}
                                </div>
                                <input
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Latitude (for eg: -56.12345678)"
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </div>
                  )
              )}
            </>
          )}
        </FieldArray>

        <div className="save_or_upload_btn">
          <Button
            className="save_btn"
            type="button"
            onClick={() => {
              push("loadingPointDetails", {
                loadingAddress: "",
                loadingLongitude: "",
                loadingLatitude: "",
                selectedOption: "",
                selectedDyke: "",
              });
              setDisplayIndex1(values?.loadingPointDetails?.length);
            }}>
            Add Site
          </Button>
        </div>

        <div className="Vendor_Capability_table">
          <div className="table-responsive">
            <Table className="table">
              <thead>
                <tr>
                  {loadingTableHeading.map((item, ind) => (
                    <th key={ind}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.loadingPointDetails &&
                  values.loadingPointDetails.map((item, index) => {
                    if (
                      index !== values.loadingPointDetails.length - 1 ||
                      router.query.id
                    ) {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item?.loadingType}</td>
                            <td>{item?.loadingAddress}</td>
                            <td>{item?.loadingLongitude}</td>
                            <td>{item?.loadingLatitude}</td>
                            <td>
                              <div className="EditOrDeleteBtn">
                                <Button onClick={() => setDisplayIndex1(index)}>
                                  <Image
                                    width={20}
                                    height={20}
                                    src="/images/edit_icon.svg"
                                    alt=""
                                  />
                                </Button>

                                {router.query.id ? (
                                  <Button
                                    onClick={() =>
                                      handleDeleteLoading(
                                        item?.id,
                                        remove,
                                        "loadingPointDetails",
                                        index
                                      )
                                    }>
                                    <Image
                                      width={20}
                                      height={20}
                                      src="/images/delete_icon.svg"
                                      alt=""
                                    />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      remove("loadingPointDetails", index);
                                      if (index !== 0) {
                                        setDisplayIndex1(index - 1);
                                      } else {
                                        setDisplayIndex1(0);
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
                        </>
                      );
                    }
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Un-Loading Details */}

      <div className="Project_basic_Detail">
        <h2>Un-loading Details</h2>
        <FieldArray name="unloadingPointDetails">
          {({ fields }) => (
            <>
              {fields.map(
                (name, index) =>
                  index === displayIndex2 && (
                    <div key={index}>
                      <Row>
                        <Col md={4}>
                          <Field name={`${name}.chainageNumber`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Chainage no.</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Enter chainage no."
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={12}>
                          <Field name={`${name}.unloadingAddress`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  <label className="">Un-loading address</label>
                                  <span className="start_icon"></span>
                                  {meta.touched && meta.error && (
                                    <span className="start_icon ms-lg-2">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <AutoAddress
                                  className="cs-input Profile-text py-input py-input-ca p-0 border-0 mb-3 cs-input mb-3 ref-height-6"
                                  selectResult={(result) => {
                                    selectResultUnloading(result, change, name);
                                  }}
                                  selectedAddress={
                                    values.unloadingPointDetails[index]
                                      ?.unloadingAddress
                                  }
                                />
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={6}>
                          <Field name={`${name}.unloadingLongitude`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  {" "}
                                  <label className="">Geo-location</label>
                                  <span className="start_icon"></span>
                                </div>
                                <input
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Longitude (for eg: 24.12345678)"
                                />
                                {meta.touched && meta.error && (
                                  <span className="">{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col md={6}>
                          <Field name={`${name}.unloadingLatitude`}>
                            {({ input, meta }) => (
                              <div className="">
                                <div>
                                  {" "}
                                  <label className=""></label>
                                  <span className="start_icon"></span>
                                </div>
                                <input
                                  type="text"
                                  {...input}
                                  className="form-control"
                                  placeholder="Latitude (for eg: -56.12345678)"
                                />
                                {meta.touched && meta.error && (
                                  <span className="">{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </div>
                  )
              )}
            </>
          )}
        </FieldArray>

        <div className="save_or_upload_btn">
          <Button
            className="save_btn"
            type="button"
            onClick={() => {
              push("unloadingPointDetails", {
                chainageNumber: "",
                unloadingAddress: "",
                unloadingLongitude: "",
                unloadingLatitude: "",
              });
              setDisplayIndex2(values?.unloadingPointDetails?.length);
            }}>
            Add Site
          </Button>
        </div>

        <div className="Vendor_Capability_table">
          <div className="table-responsive">
            <Table className="table">
              <thead>
                <tr>
                  {unLoadingTableHeading.map((item, ind) => (
                    <th key={ind}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.unloadingPointDetails &&
                  values.unloadingPointDetails.map((item, index) => {
                    if (
                      index !== values.unloadingPointDetails.length - 1 ||
                      router.query.id
                    ) {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.chainageNumber}</td>
                            <td>{item.unloadingAddress}</td>
                            <td>{item.unloadingLongitude}</td>
                            <td>{item.unloadingLatitude}</td>
                            <td>
                              <div className="EditOrDeleteBtn">
                                <Button onClick={() => setDisplayIndex2(index)}>
                                  <Image
                                    width={20}
                                    height={20}
                                    src="/images/edit_icon.svg"
                                    alt=""
                                  />
                                </Button>

                                {router.query.id ? (
                                  <Button
                                    onClick={() =>
                                      handleDeleteUnloading(
                                        item?.id,
                                        remove,
                                        "unloadingPointDetails",
                                        index
                                      )
                                    }>
                                    <Image
                                      width={20}
                                      height={20}
                                      src="/images/delete_icon.svg"
                                      alt=""
                                    />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      remove("unloadingPointDetails", index);
                                      if (index !== 0) {
                                        setDisplayIndex2(index - 1);
                                      } else {
                                        setDisplayIndex2(0);
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
                        </>
                      );
                    }
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className="save_or_next_btn">
        {router.query.id ? (
          <Button type="submit">Update</Button>
        ) : (
          <Button type="submit">Save & Next</Button>
        )}
      </div>
    </>
  );
};
export default BasicDetails;
