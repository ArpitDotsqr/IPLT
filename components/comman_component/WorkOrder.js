import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

const WorkOrderModal = ({ isOpen, onClose }) => {
  const firstToThird = [
    {
      FieldName: "scopeOfWork",
      termCondiitons:
        "1. Scope of work, in brief includes coordination, arrangements, and liaison for transportation and unloading to ensure incumbrance free execution of the work.",
      className: "terms-condition mb-2",
    },
    {
      FieldName: "secondPoint",
      termCondiitons: "2. IPL shall not pay any advance to undertake the work.",
      className: "terms-condition mb-2",
    },
    {
      FieldName: "thirdPoint",
      termCondiitons:
        "3. The vendor shall be fully responsible for goods quality & quantity supply to the clients.",
      className: "terms-condition mb-2",
    },
  ];

  const seventhPoint = [
    {
      name: "sixthOption",
      conditions:
        "6. The vendor shall provide signed copy of the challan and weighbridge to claim the payment.",
      className: "terms-condition mb-2",
    },
    {
      name: "sevetnthPoint",
      conditions:
        "7. IPL reserves the right to terminate the contract with immediate effect if :",
      className: "terms-condition mb-1",
    },
    {
      name: "sevetnthPointOne",
      conditions:
        "I. There is a serious mis-conduct by the vendor damaging IPL’s reputation",
      className: "terms-condition mx-3 mb-1",
    },
    {
      name: "sevetnthPointTwo",
      conditions: "II. There are serious escalations from the client",
      className: "terms-condition mx-3 mb-1",
    },
    {
      name: "sevetnthPointThree",
      conditions:
        "III. There is any fraud/ cheating/ mal functioning observed in execution of the project",
      className: "terms-condition mx-3 mb-1",
    },
    {
      name: "sevetnthPointFourth",
      conditions:
        "IV. The vendor is not able to meet target of mobilization of vehicles",
      className: "terms-condition mx-3 mb-1",
    },
    {
      name: "sevetnthPointFifth",
      conditions:
        "V. There are serious safety issues observed in project execution",
      className: "terms-condition mx-3 mb-1",
    },
    {
      name: "sevetnthPointSixth",
      conditions:
        "VI. The vendor stops the project without giving one-month prior notice",
      className: "terms-condition mx-3 mb-2",
    },
    {
      name: "vehicleHiring",
      conditions:
        "8. Vehicle Hiring b/w GTAs is exempt in the scenario of goods and services tax, hence no GST shall be chargeable on transportation services",
      className: "terms-condition mb-2",
    },
    {
      name: "settlement",
      conditions:
        "9. SETTLEMENT OF DISPUTES All disputes of difference of opinions on account of interpretation of clause, technical specifications etc. shall be resolved through direct and mutual discussions.",
      className: "terms-condition mb-2",
    },
  ];

  const router = useRouter();
  const [pdfState, setPdfState] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [initialFieldDelete] = useState(seventhPoint)
  const [fieldDelete, SetFieldDelete] = useState(initialFieldDelete);
  const [deletedField, setDeletedField] = useState([]);

  const [initialTermAndCondtion] = useState(firstToThird);
  const [termsAndCondtions, setTermsAndConditions] = useState(initialTermAndCondtion);
  const [deletedItems, setDeletedItems] = useState([])

  const autoDataWorkOrder = useSelector(
    (state) => state.projectSlice.workOrderData
  );
  const workOrderSub = useSelector(
    (state) => state.projectSlice.workOrderSubject
  );

  const savePDF = () => {
    var doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    let elementHTML = document.getElementById("contentToSaeve");
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save("work-order.pdf");
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 1080, //window width in CSS pixels
      margin: 0,
    });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${
      months[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;
    return formattedDate;
  };

  const getYear = () => {
    const currentYear = new Date();
    return currentYear.getFullYear();
  };

  const getMonth = () => {
    const currentMonth = new Date();
    return currentMonth.getMonth() + 1 < 10
      ? `0${currentMonth.getMonth() + 1}`
      : currentMonth.getMonth() + 1;
  };

  const Customstyle = {
    control: (base) => ({
      ...base,
      fontFamily: "Roboto",
      fontSize: "16px",
      // paddingLeft: "10px",
      minHeight: 15,
      // height: 10,
      borderRadius: 2,
      color: "white",
      cursor: "text",
      // width: "25%"
    }),
    menu: (base) => ({
      ...base,
      cursor: "text",
      fontFamily: "Roboto",
      fontSize: "14px",
    }),
  };

  const handleModalClose = () => {
    onClose();
    setTermsAndConditions(initialTermAndCondtion);
    setDeletedItems([]);
    SetFieldDelete(initialFieldDelete);
    setDeletedField([]);
  };

  const handleVendorSelect = (selectedOption, form) => {
    setSelectedVendor(selectedOption);
    form.change("vendorAddress", selectedOption.registeredAddress.registeredStreetAddress);
    form.change("vendorCity", selectedOption.registeredAddress.registeredCity);
    form.change("vendorPan", selectedOption.UserDetail.pan);
    form.change("vendorGst", selectedOption.UserDetail.gstNumber);
    form.change("vendorPaymentTerm",selectedOption.TripRateDetails.TransporterPaymentTermIds.displayName);
    form.change("vendorRate", selectedOption.TripRateDetails.unitRateAmount);
    form.change("diesel", workOrderSub?.maxDieselAndCash?.maxDieselAllotted);
    form.change("cash", workOrderSub?.maxDieselAndCash?.maxCashAllotted);
  };

  useEffect(() => {
    if (firstToThird) {
      setTermsAndConditions(firstToThird);
    }
  }, []);

  useEffect(() => {
    if (seventhPoint) {
      SetFieldDelete(seventhPoint);
    }
  }, []);

  const initialValues = {
    // let initialValues = {};
    // if (termsAndCondtions) {
      // initialValues = {
        scopeOfWork:
          "1. Scope of work, in brief includes coordination, arrangements, and liaison for transportation and unloading to ensure incumbrance free execution of the work.",
        secondPoint: "2. IPL shall not pay any advance to undertake the work.",
        thirdPoint:
          "3. The vendor shall be fully responsible for goods quality & quantity supply to the clients.",
      // };
    // } else if (fieldDelete) {
      // initialValues = {
        sixthOption:
          "6. The vendor shall provide signed copy of the challan and weighbridge to claim the payment.",
        sevetnthPoint:
          "7. IPL reserves the right to terminate the contract with immediate effect if:",
        sevetnthPointOne:
          "I. There is a serious mis-conduct by the vendor damaging IPL’s reputation",
        sevetnthPointTwo: "II. There are serious escalations from the client",
        sevetnthPointThree:
          "III. There is any fraud/ cheating/ mal functioning observed in execution of the project",
        sevetnthPointFourth:
          "IV. The vendor is not able to meet target of mobilization of vehicles",
        sevetnthPointFifth:
          "V. There are serious safety issues observed in project execution",
        sevetnthPointSixth:
          "VI. The vendor stops the project without giving one-month prior notice",
        vehicleHiring:
          " 8. Vehicle Hiring b/w GTAs is exempt in the scenario of goods and services tax, hence no GST shall be chargeable on transportation services.",
        settlement:
          "9. SETTLEMENT OF DISPUTES All disputes of difference of opinions on account of interpretation of clause, technical specifications etc. shall be resolved through direct and mutual discussions.",
         additionalInput: "",
      // };
    // }
    // return initialValues;
  };

  useEffect(() => {
    setPdfState(false);
  }, [pdfState]);

  const handleSubmit = (values) => {};

  const handleDeleteFirst = (index) => {
    const updatedTerms = [...termsAndCondtions];
    const deletedItem = updatedTerms.splice(index, 1)[0];
    setDeletedItems([...deletedItems, deletedItem])
    setTermsAndConditions(updatedTerms);
  };

  const handleDelete = (fieldIndex) => {
    const updateFields = [...fieldDelete];
    const deletedFeieldItem = updateFields.splice(fieldIndex, 1)[0];
    setDeletedField([...deletedField, deletedFeieldItem])
    SetFieldDelete(updateFields);
  };

  return (
    <Modal
      show={isOpen}
      // onHide={onClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="TripAdminModal"
      // onClose={handleModalClose}
    >
      <Modal.Header style={{display:"flex", alignItems:"end", justifyContent:"end"}}>
        {/* <Modal.Title>{date}</Modal.Title> */}
        <button style={{padding:"8px", borderRadius:"5px", fontWeight:"500"}} onClick={handleModalClose}>Close</button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div id="contentToSaeve" style={{ fontFamily: "Times New Roman" }}>
            <div style={{ padding: "20px 40px" }}>
              <h1 style={{ textAlign: "center", fontSize: "35px" }}>
                InfraPrime Logistics Technologies Pvt. Ltd.
              </h1>
              <p style={{ textAlign: "center" }}>
                Infrastructure | Innovation | Empathy
              </p>
              <div style={{ textAlign: "center" }}>
                <span
                  style={{ borderBottom: "1px solid black", fontWeight: "700" }}
                >
                  WORK ORDER
                </span>
              </div>
              <b>To,</b>
              <br />
              <Form
                onSubmit={handleSubmit}
                // initialValues={useMemo(
                //   () => initialValues,
                //   [termsAndCondtions, fieldDelete]
                // )}
                keepDirtyOnReinitialize
                mutators={{ ...arrayMutators }}
                render={({
                  handleSubmit,
                  form,
                  values,
                  form: {
                    mutators: { push, pop },
                  },
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div className="col-md-3 mt-1">
                          {pdfState ? (
                            <div>{selectedVendor?.label}</div>
                          ) : (
                            <Field name={`vendorName`}>
                              {({ input }) => (
                                <div className="">
                                  <Select
                                    {...input}
                                    styles={Customstyle}
                                    classNamePrefix="SelectWorkOrder"
                                    placeholder="vendor name"
                                    value={selectedVendor}
                                    onChange={(selectedOption) =>
                                      handleVendorSelect(selectedOption, form)
                                    }
                                    options={autoDataWorkOrder.map((item) => ({
                                      value: item.id,
                                      label: item.name,
                                      ...item,
                                    }))}
                                  />
                                </div>
                              )}
                            </Field>
                          )}
                        </div>

                        <Field name={`vendorAddress`}>
                          {({ input }) => (
                            <div className="col-md-3">
                              <input
                                type="text"
                                classNamePrefix="SelectWorkOrder"
                                {...input}
                                className=""
                                placeholder="vendor address"
                                style={{
                                  border: "none",
                                  padding: "10px 0",
                                  width: "fit-content",
                                  outline: "none",
                                }}
                              />
                            </div>
                          )}
                        </Field>

                        <Field name={`vendorCity`}>
                          {({ input }) => (
                            <div className="col-md-3">
                              <input
                                {...input}
                                type="text"
                                classNamePrefix="SelectWorkOrder"
                                className="form-control"
                                placeholder="vendor city"
                                style={{
                                  border: "none",
                                  padding: "10px 0",
                                  width: "fit-content",
                                  outline: "none",
                                }}
                              />
                            </div>
                          )}
                        </Field>
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center">
                            <div>
                              <b>Vendor PAN No.</b>
                            </div>
                            <div>
                              <Field name={`vendorPan`}>
                                {({ input }) => (
                                  <input
                                    type="text"
                                    {...input}
                                    className="form-control"
                                    placeholder="vendor pan"
                                    style={{
                                      border: "none",
                                      padding: "10px 0",
                                      width: "fit-content",
                                      outline: "none",
                                    }}
                                  />
                                )}
                              </Field>
                            </div>
                          </div>

                          <div className=" col-md-4 d-flex align-items-center">
                            <div>
                              <b> No. </b>
                            </div>
                            <div>
                              <input
                                type="text"
                                id="No"
                                placeholder=""
                                defaultValue={`IPL/${getYear()}/${getMonth()}/${
                                  router.query.id
                                }`}
                                style={{
                                  border: "none",
                                  marginBottom: "1px",
                                  outline: "none",
                                  borderBottom: "1px solid white",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center">
                            <div>
                              <b>Vendor GST No.</b>{" "}
                            </div>
                            <div>
                              <Field name={`vendorGst`}>
                                {({ input }) => (
                                  <input
                                    type="text"
                                    classNamePrefix="SelectWorkOrder"
                                    {...input}
                                    className="form-control"
                                    placeholder="vendor gst no."
                                    style={{
                                      border: "none",
                                      padding: "10px 0",
                                      width: "fit-content",
                                      outline: "none",
                                    }}
                                  />
                                )}
                              </Field>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <b>Date</b>{" "}
                            <input
                              type="text"
                              id="date"
                              placeholder=""
                              value={getCurrentDate()}
                              style={{
                                border: "none",
                                borderBottom: "1px solid white",
                                marginBottom: "5px",
                                outline: "none",
                              }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <b>Kind Attention</b>{" "}
                            <input
                              type="text"
                              id="attention"
                              placeholder=""
                              style={{
                                border: "none",
                                borderBottom: "1px solid white",
                                marginBottom: "5px",
                                outline: "none",
                              }}
                            />{" "}
                          </div>
                          <div className="col-md-4">
                            <b>PAN No. </b>
                            <input
                              type="text"
                              id="attentionPAN"
                              defaultValue={"AAECI4718E"}
                              style={{
                                border: "none",
                                borderBottom: "1px solid white",
                                marginBottom: "5px",
                                outline: "none",
                              }}
                            />{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <b>Contact Details</b>{" "}
                            <input
                              type="text"
                              id="contact"
                              placeholder=""
                              style={{
                                border: "none",
                                borderBottom: "1px solid white",
                                marginBottom: "5px",
                                outline: "none",
                              }}
                            />{" "}
                          </div>
                          <div className="col-md-4">
                            <b>GST No. </b>
                            <input
                              type="text"
                              id="contactGST"
                              defaultValue={"06AAECI4718E1ZT"}
                              style={{
                                border: "none",
                                borderBottom: "1px solid white",
                                marginBottom: "5px",
                                outline: "none",
                              }}
                            />
                          </div>
                        </div>
                        <p>
                          <strong>Subject:</strong>{" "}
                          <input
                            type="text"
                            id="subject"
                            placeholder=""
                            defaultValue={workOrderSub?.projectName || ""}
                            style={{
                              border: "none",
                              borderBottom: "1px solid white",
                              marginBottom: "5px",
                              outline: "none",
                            }}
                          />
                        </p>
                        <p>Dear Sir,</p>
                        <p>
                          With reference to the captioned subject and the
                          references mentioned, we are pleased to place work
                          order to you as detailed below:
                        </p>
                        <table border="1" cellspacing="0" cellpadding="5">
                          <tr
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                              }}
                            >
                              S.No.
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                              }}
                            >
                              Description
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                              }}
                            >
                              Rates/Charges
                            </th>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                              }}
                            >
                              1
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                              }}
                            >
                              Pond ash transportation and unloading
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              INR{" "}
                              <div className="UnitSelect m-1">
                                <Field name={`vendorRate`}>
                                  {({ input }) => (
                                    <input
                                      {...input}
                                      type="text"
                                      className="form-control"
                                      placeholder="rate"
                                      style={{
                                        border: "none",
                                        padding: "5px 0 0",
                                        width: "30px",
                                        outline: "none",
                                        borderBottom: "1px solid",
                                        borderRadius: "0",
                                      }}
                                    />
                                  )}
                                </Field>
                              </div>
                              per MT
                            </td>
                          </tr>
                        </table>
                        <p>
                          This Work Order supersedes all previous
                          representations, negotiations, understanding, letters
                          and correspondences exchanged between us on the
                          subject matter.
                        </p>
                        <strong>Terms & Conditions:</strong>
                        <br />
                        {termsAndCondtions.map((item, index) => (
                          <div key={index} className="d-flex">
                            <Field name={item.FieldName}>
                              {({ input }) => (
                                <div
                                  {...input}
                                  className={item.className}
                                  contentEditable
                                >
                                  {item.termCondiitons}
                                </div>
                              )}
                            </Field>
                            {!pdfState && (
                              <button
                                type="button"
                                onClick={() => handleDeleteFirst(index)}
                                style={{
                                  cursor: "pointer",
                                  background: "#fff",
                                  border: "1px solid transparent",
                                }}
                              >
                                ❌
                              </button>
                            )}
                          </div>
                        ))}
                        {/* <Field name="secondPoint">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mb-2"
                              contentEditable
                            >
                              2.IPL shall not pay any advance to undertake the
                              work.
                            </div>
                          )}
                        </Field>
                        <Field name="thirdPoint">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mb-2"
                              contentEditable
                            >
                              3.The vendor shall be fully responsible for goods
                              quality & quantity supply to the clients.
                            </div>
                          )}
                        </Field> */}
                        <div>
                          <p style={{ display: "flex", alignItems: "center" }}>
                            4. Payment shall be processed on a
                            <div style={{ marginRight: "10px" }}>
                              <Field name={`vendorPaymentTerm`}>
                                {({ input }) => (
                                  <input
                                    {...input}
                                    type="text"
                                    className="form-control"
                                    placeholder="payment"
                                    style={{
                                      border: "none",
                                      padding: "10px 0 0",
                                      width: "58px",
                                      outline: "none",
                                      marginLeft: "8px",
                                      borderBottom: "1px solid",
                                      borderRadius: "0",
                                    }}
                                  />
                                )}
                              </Field>
                            </div>
                            (Monthly/ Fortnightly/ Weekly) basis.
                          </p>
                        </div>
                        <p>
                          <div className="col-md-12 ">
                            5. IPL shall provide up to
                            <Field name={`diesel`}>
                              {({ input }) => (
                                <input
                                  type="text"
                                  {...input}
                                  placeholder="Fuel"
                                  style={{
                                    border: "none",
                                    padding: "10px 0 0",
                                    width: "50px",
                                    outline: "none",
                                    marginLeft: "8px",
                                    borderBottom: "1px solid",
                                    borderRadius: "0",
                                  }}
                                />
                              )}
                            </Field>
                            <span>Liters of Fuel and </span>
                            <Field name={`cash`}>
                              {({ input }) => (
                                <input
                                  type="text"
                                  {...input}
                                  style={{
                                    border: "none",
                                    padding: "10px 0 0",
                                    width: "50px",
                                    outline: "none",
                                    marginLeft: "8px",
                                    borderBottom: "1px solid",
                                    borderRadius: "0",
                                  }}
                                  placeholder="cash"
                                />
                              )}
                            </Field>
                            trip advance from the designated fuel stations.
                          </div>
                        </p>
                        {/* <Field name="sixthOption">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mb-2"
                              contentEditable
                            >
                              6.The vendor shall provide signed copy of the
                              challan and weighbridge to claim the payment.
                            </div>
                          )}
                        </Field> */}
                        {fieldDelete.map((fieldItem, fieldIndex) => (
                          <div key={fieldIndex} className="d-flex">
                            <Field name={fieldItem.name}>
                              {({ input }) => (
                                <div
                                  {...input}
                                  className={fieldItem.className}
                                  contentEditable
                                >
                                  {fieldItem.conditions}
                                </div>
                              )}
                            </Field>
                            {!pdfState && (
                              <button
                                type="button"
                                onClick={() => handleDelete(fieldIndex)}
                                style={{
                                  cursor: "pointer",
                                  background: "#fff",
                                  border: "1px solid transparent",
                                }}
                              >
                                ❌
                              </button>
                            )}
                          </div>
                        ))}
                        {/* <Field name="sevetnthPointOne">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-1"
                              contentEditable
                            >
                              I.There is a serious mis-conduct by the vendor
                              damaging IPL’s reputation
                            </div>
                          )}
                        </Field>
                        <Field name="sevetnthPointTwo">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-1"
                              contentEditable
                            >
                              II.There are serious escalations from the client
                            </div>
                          )}
                        </Field>
                        <Field name="sevetnthPointThree">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-1"
                              contentEditable
                            >
                              III.There is any fraud/ cheating/ mal functioning
                              observed in execution of the project
                            </div>
                          )}
                        </Field>
                        <Field name="sevetnthPointFourth">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-1"
                              contentEditable
                            >
                              IV.The vendor is not able to meet target of
                              mobilization of vehicles
                            </div>
                          )}
                        </Field>
                        <Field name="sevetnthPointFifth">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-1"
                              contentEditable
                            >
                              V.There are serious safety issues observed in
                              project execution
                            </div>
                          )}
                        </Field>
                        <Field name="sevetnthPointSixth">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mx-3 mb-2"
                              contentEditable
                            >
                              VI.The vendor stops the project without giving
                              one-month prior notice
                            </div>
                          )}
                        </Field> */}
                        {/* <Field name="vehicleHiring">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mb-2"
                              contentEditable
                            >
                              8.Vehicle Hiring b/w GTAs is exempt in the
                              scenario of goods and services tax, hence no GST
                              shall be chargeable on transportation services.
                            </div>
                          )}
                        </Field>
                        <Field name="settlement">
                          {({ input }) => (
                            <div
                              {...input}
                              className="terms-condition mb-2"
                              contentEditable
                            >
                              9.SETTLEMENT OF DISPUTES All disputes of
                              difference of opinions on account of
                              interpretation of clause, technical specifications
                              etc. shall be resolved through direct and mutual
                              discussions.
                            </div>
                          )}
                        </Field> */}
                        <FieldArray name="customers">
                          {({ fields }) =>
                            fields.map((name, index) => (
                              <div key={name} className="d-flex">
                                <Field name={`${name}.additionalInput`}>
                                  {({ input }) => (
                                    <input
                                      {...input}
                                      className={
                                        !pdfState
                                          ? "additionalfieldborder"
                                          : "terms-condition mb-2"
                                      }
                                    
                                    />
                                  )}
                                </Field>
                                {!pdfState && (
                                  <span
                                    onClick={() => {console.log(index,"index"); fields.remove(index)}}
                                    style={{ cursor: "pointer" }}
                                  >
                                    ❌
                                  </span>
                                )}
                              </div>
                            ))
                          }
                        </FieldArray>
                        {/* {!pdfState && ( */}
                          <>
                            <button
                              // className="add-button mx-2 mt-2"
                              className={!pdfState ? "add-button mx-2 mt-2" : ""}
                              type="button"
                              onClick={() => push("customers", undefined)}
                            >
                              Add Field
                            </button>
                          </>
                        {/* )} */}

                        <p>
                          Thanking you,
                          <br />
                          For
                          <input
                            type="text"
                            readOnly
                            id="companyName"
                            placeholder="Infraprime Logistics Technologies Pvt Ltd"
                            style={{
                              border: "none",
                              marginBottom: "5px",
                              outline: "none",
                              width: "40%",
                              fontWeight: "700",
                            }}
                          />
                          <span style={{ marginLeft: "25%" }}>For.</span>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <div style={{ display: "flex", gap: "52%" }}>
                            <div>Authorized Signatory</div>
                            <div>Authorized Signatory</div>
                          </div>
                        </p>
                      </div>
                    </form>
                  );
                }}
              />
            </div>
            <Row>
              <Col md={12} className="text-end">
              {!pdfState && (
                <Button
                  id="genratePdf"
                  type="button"
                  style={{ border: "none" }}
                  onClick={async () => {
                    setPdfState(true);
                    await savePDF();
                  }}
                >
                  Generate Pdf
                </Button>
              )}
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WorkOrderModal;
