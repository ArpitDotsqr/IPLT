import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Field } from "react-final-form";

const VendorDocumnets = () => {
  const router = useRouter();

  // Comprehensive validation function for all fields
  const validateField = (fieldName, value) => {
    // Required field validation
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${fieldName} is required`;
    }

    switch (fieldName) {
      case "pan":
        return validatePAN(value);
      case "gstNumber":
        return validateGST(value);
      case "bankIfsc":
        return validateIFSC(value);
      case "bankAccountNumber":
        return validateBankAccount(value);
      case "bankName":
        return validateBankName(value);
      case "bankHolderName":
        return validateBankHolderName(value);
      case "panCardFrontImage":
      case "panCardBackImage":
      case "gstImage":
      case "cancelChequeImage":
        return validateFileUpload(value, fieldName);
      default:
        return undefined;
    }
  };

  // PAN validation
  const validatePAN = (value) => {
    const pan = value.replace(/\s/g, "").toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(pan)) {
      return "Please enter a valid PAN number (e.g., ABCDE1234F)";
    }
    return undefined;
  };

  // GST validation
  const validateGST = (value) => {
    const gst = value.replace(/\s/g, "").toUpperCase();
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!gstRegex.test(gst)) {
      return "Please enter a valid GST number (e.g., 22AAAAA0000A1Z5)";
    }
    return undefined;
  };

  // IFSC validation
  const validateIFSC = (value) => {
    const ifsc = value.replace(/\s/g, "").toUpperCase();
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!ifscRegex.test(ifsc)) {
      return "Please enter a valid IFSC code (e.g., SBIN0001234)";
    }
    return undefined;
  };

  // Bank account number validation
  const validateBankAccount = (value) => {
    const accountNumber = value.replace(/\s/g, "");
    const accountRegex = /^[0-9]{9,18}$/;

    if (!accountRegex.test(accountNumber)) {
      return "Please enter a valid bank account number (9-18 digits)";
    }
    return undefined;
  };

  // Bank name validation
  const validateBankName = (value) => {
    const bankName = value.trim();
    if (bankName.length < 2) {
      return "Bank name must be at least 2 characters long";
    }
    if (bankName.length > 50) {
      return "Bank name must not exceed 50 characters";
    }
    const bankNameRegex = /^[a-zA-Z\s&.-]+$/;
    if (!bankNameRegex.test(bankName)) {
      return "Bank name can only contain letters, spaces, &, . and -";
    }
    return undefined;
  };

  // Bank holder name validation
  const validateBankHolderName = (value) => {
    const holderName = value.trim();
    if (holderName.length < 2) {
      return "Bank holder name must be at least 2 characters long";
    }
    if (holderName.length > 50) {
      return "Bank holder name must not exceed 50 characters";
    }
    const holderNameRegex = /^[a-zA-Z\s]+$/;
    if (!holderNameRegex.test(holderName)) {
      return "Bank holder name can only contain letters and spaces";
    }
    return undefined;
  };

  // File upload validation
  const validateFileUpload = (file, fieldName) => {
    if (!file) {
      return `${fieldName
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())} is required`;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Please upload only JPG, PNG, GIF or PDF files";
    }

    return undefined;
  };

  // Helper function to format input values
  const formatInputValue = (value, fieldName) => {
    switch (fieldName) {
      case "pan":
      case "gstNumber":
      case "bankIfsc":
        return value.replace(/\s/g, "").toUpperCase();
      case "bankAccountNumber":
        return value.replace(/\s/g, "");
      case "bankName":
      case "bankHolderName":
        return value.trim();
      default:
        return value;
    }
  };

  return (
    <>
      <div className="Project_basic_Detail">
        <h2>Documents</h2>
        <p>
          All Documents are mandatory<span className="start_icon">*</span>
        </p>
        <Row>
          <Col md={4}>
            <Field name="pan" validate={(value) => validateField("pan", value)}>
              {({ input, meta }) => (
                <>
                  <div className="form_Label">
                    <label className="">PAN no.</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                  <input
                    className="input-group w-100 cred-input form-control"
                    {...input}
                    type="text"
                    placeholder="Enter PAN no. (e.g., ABCDE1234F)"
                    maxLength={10}
                    onChange={(e) => {
                      const value = formatInputValue(e.target.value, "pan");
                      input.onChange(value);
                    }}
                  />
                </>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field
              name="panCardFrontImage"
              validate={(value) => validateField("panCardFrontImage", value)}>
              {({ input, meta }) => (
                <>
                  <div className="form_Label ">
                    {" "}
                    <label className="">Upload front PAN card</label>
                  </div>
                  <input
                    className="input-group w-100 cred-input file-upload-field form-control "
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    onChange={(e) => input.onChange(e.target.files[0])}
                  />
                  {meta.error && meta.touched && (
                    <span className="start_icon">{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field
              name="panCardBackImage"
              validate={(value) => validateField("panCardBackImage", value)}>
              {({ input, meta }) => (
                <>
                  <div className="form_Label">
                    {" "}
                    <label className="">Upload back PAN card</label>
                  </div>
                  <input
                    className="input-group w-100 cred-input file-upload-field form-control"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    onChange={(e) => input.onChange(e.target.files[0])}
                  />
                  {meta.error && meta.touched && (
                    <span className="start_icon">{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </Col>
          <Col md={6}>
            <Field
              name="gstNumber"
              validate={(value) => validateField("gstNumber", value)}>
              {({ input, meta }) => (
                <div className="">
                  <div>
                    <label className="">GST no.</label>
                    {meta.touched && meta.error && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...input}
                    className="form-control"
                    placeholder="Enter GST no. (e.g., 22AAAAA0000A1Z5)"
                    maxLength={15}
                    onChange={(e) => {
                      const value = formatInputValue(
                        e.target.value,
                        "gstNumber"
                      );
                      input.onChange(value);
                    }}
                  />
                </div>
              )}
            </Field>
          </Col>
          <Col md={6}>
            <Field
              name="gstImage"
              validate={(value) => validateField("gstImage", value)}>
              {({ input, meta }) => (
                <>
                  <div className="form_Label ">
                    {" "}
                    <label className="">upload GST</label>
                  </div>
                  <input
                    className="input-group w-100 cred-input file-upload-field form-control "
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    onChange={(e) => input.onChange(e.target.files[0])}
                  />
                  {meta.error && meta.touched && (
                    <span className="start_icon">{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {" "}
            <h4>Bank Details</h4>
          </Col>
          <Col md={4}>
            <Field
              name="bankName"
              validate={(value) => validateField("bankName", value)}>
              {({ input, meta }) => (
                <>
                  <div>
                    <label>Bank name</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                    <input
                      {...input}
                      type="text"
                      className="input-group w-100 cred-input  form-control"
                      placeholder="Enter Bank name"
                      maxLength={50}
                      onChange={(e) => {
                        const value = formatInputValue(
                          e.target.value,
                          "bankName"
                        );
                        input.onChange(value);
                      }}
                    />
                  </div>
                </>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field
              name="bankAccountNumber"
              validate={(value) => validateField("bankAccountNumber", value)}>
              {({ input, meta }) => (
                <>
                  <div>
                    <label>Bank account no.</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                    <input
                      className="input-group w-100 cred-input  form-control"
                      {...input}
                      type="text"
                      placeholder="Enter bank account no."
                      maxLength={18}
                      onChange={(e) => {
                        const value = formatInputValue(
                          e.target.value,
                          "bankAccountNumber"
                        );
                        input.onChange(value);
                      }}
                    />
                  </div>
                </>
              )}
            </Field>
          </Col>
          <Col md={4}>
            <Field
              name="bankIfsc"
              validate={(value) => validateField("bankIfsc", value)}>
              {({ input, meta }) => (
                <>
                  <div>
                    <label>Bank IFSC code</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                    <input
                      {...input}
                      type="text"
                      className="input-group w-100 cred-input  form-control"
                      placeholder="Enter bank IFSC code (e.g., SBIN0001234)"
                      maxLength={11}
                      onChange={(e) => {
                        const value = formatInputValue(
                          e.target.value,
                          "bankIfsc"
                        );
                        input.onChange(value);
                      }}
                    />
                  </div>
                </>
              )}
            </Field>
          </Col>
          <Col md={6}>
            <Field
              name="bankHolderName"
              validate={(value) => validateField("bankHolderName", value)}>
              {({ input, meta }) => (
                <>
                  <div>
                    <label>Bank holders name</label>
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                    <input
                      {...input}
                      type="text"
                      className="input-group w-100 cred-input form-control"
                      placeholder="Bank holders name"
                      maxLength={50}
                      onChange={(e) => {
                        const value = formatInputValue(
                          e.target.value,
                          "bankHolderName"
                        );
                        input.onChange(value);
                      }}
                    />
                  </div>
                </>
              )}
            </Field>
          </Col>
          <Col md={6}>
            <Field
              name="cancelChequeImage"
              validate={(value) => validateField("cancelChequeImage", value)}>
              {({ input, meta }) => (
                <>
                  <div>
                    <label>Upload cancelled cheque</label>
                    <input
                      type="file"
                      className="input-group w-100 cred-input file-upload-field form-control"
                      accept=".jpg,.jpeg,.png,.gif,.pdf"
                      onChange={(e) => input.onChange(e.target.files[0])}
                    />
                    {meta.error && meta.touched && (
                      <span className="start_icon">{meta.error}</span>
                    )}
                  </div>
                </>
              )}
            </Field>
          </Col>
        </Row>
      </div>
      <div className="save_or_next_btn">
        {router.query.id ? (
          <Button type="submit">Update </Button>
        ) : (
          <Button type="submit">Save & Next</Button>
        )}
      </div>
    </>
  );
};

export default VendorDocumnets;
