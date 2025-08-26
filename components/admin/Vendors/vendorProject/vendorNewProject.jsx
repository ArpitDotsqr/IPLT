import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import VendorsBasicDetails from "./vendorInnerForms/basicDetails";
import VendorDocumnets from "./vendorInnerForms/vendorDoc";
import VendorCapabilityAndAssets from "./vendorInnerForms/capatbilityAssets";
import { useDispatch, useSelector } from "react-redux";
import {
  getMasterDataOrganisation,
  getMasterDataVehicleType,
  getMasterDataVendor,
} from "@/redux/actions/masterdata/masterData";
import {
  createVendorAssetDetails,
  createVendorBasicDetails,
  createVendorDocDetails,
  getVendorDataById,
} from "@/redux/actions/vendor/vendorActions";
import { toast } from "react-toastify";
import { setVendorId } from "@/redux/reducers/masterdata/masterDataSlice";

const VendorNewProject = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [details, setdetails] = useState(0);
  const [selectedVendorType, setSelectedVendorType] = useState("");
  const [detailForm, setDetailForm] = useState([
    "Basic Details",
    "Documents",
    "Vendor Capability & Asset details",
  ]);

  const vendorId = useSelector((state) => state.masterSlice.vendorId);
  const mobileValidation = useSelector(
    (state) => state.vendorSlice?.mobileCheck?.success
  );
  const emailValidation = useSelector(
    (state) => state.vendorSlice?.emailCheck?.success
  );
  const vendorDataById = useSelector(
    (state) => state.vendorSlice.particularVendorData
  );
  const masterList = useSelector(
    (state) => state.masterSlice.vendorMasterDataList?.MasterData?.rows
  );

  const vehicleTypeDisable = (value) => {
    setSelectedVendorType(value);
    const isExcavatorOrPetrolPump =
      value === "petrolpump" || value === "excavator";
    if (isExcavatorOrPetrolPump) {
      setDetailForm(["Basic Details", "Documents"]);
    } else {
      setDetailForm([
        "Basic Details",
        "Documents",
        "Vendor Capability & Asset details",
      ]);
    }
  };

  useEffect(() => {
    if (
      vendorDataById[0]?.UserDetail?.vendorTypes?.name === "petrolpump" ||
      vendorDataById[0]?.UserDetail?.vendorTypes?.name === "excavator"
    ) {
      setDetailForm(["Basic Details", "Documents"]);
    } else {
      setDetailForm([
        "Basic Details",
        "Documents",
        "Vendor Capability & Asset details",
      ]);
    }
  }, [router.query.id, vendorDataById[0]?.UserDetail?.vendorTypes?.name]);

  useEffect(() => {
    if (details === 0) {
      dispatch(getMasterDataVendor({ types: "vendortype" }));
      dispatch(getMasterDataOrganisation({ types: "organizationtype" }));
    }
    if (details === 2) {
      dispatch(getMasterDataVehicleType({ types: "vehicletype" }));
    }
    if (router.query.id) {
      dispatch(getVendorDataById({ id: Number(router.query.id) }));
    }
  }, [details, router.query.id]);

  const handleSubmit = (values) => {
    if (details === 0) {
      if (!router.query.id) {
        dispatch(createVendorBasicDetails(values)).then((res) => {
          if (res.payload.success) {
            dispatch(setVendorId(res.payload.data.id));
            toast.success(res?.payload?.message);
            setdetails(1);
          } else {
            toast.info(res?.payload?.message);
          }
        });
      } else {
        dispatch(createVendorBasicDetails(values)).then((res) => {
          if (res.payload.success) {
            toast.success("Vendor Basic Details Updated");
            router.push("/admin/vendors");
          }
        });
      }
    }
    if (details === 1) {
      if (!router.query.id) {
        let formdata = new FormData();
        formdata.append("panCardFrontImage", values.panCardFrontImage);
        formdata.append("panCardBackImage", values.panCardBackImage);
        formdata.append("cancelChequeImage", values.cancelChequeImage);
        formdata.append("gstImage", values.gstImage);

        delete values.panCardBackImage;
        delete values.panCardFrontImage;
        delete values.cancelChequeImage;
        delete values.gstImage;

        let vendorValues = { ...values, userId: vendorId };
        formdata.append("vendorProfile", JSON.stringify(vendorValues));
        dispatch(createVendorDocDetails(formdata)).then((response) => {
          if (response?.payload?.success) {
            if (selectedVendorType === "petrolpump") {
              toast.success("Vendor Documents are Created");
              router.push("/admin/vendors");
            }
            if (selectedVendorType === "excavator") {
              toast.success("Vendor Documents are Created");
              router.push("/admin/vendors");
            }
            if (selectedVendorType === "transporter") {
              setdetails(2);
            }
          } else {
            toast.info(response.payload.message);
          }
        });
      } else {
        let updateformdata = new FormData();
        updateformdata.append("panCardFrontImage", values.panCardFrontImage);
        updateformdata.append("panCardBackImage", values.panCardBackImage);
        updateformdata.append("cancelChequeImage", values.cancelChequeImage);
        updateformdata.append("gstImage", values.gstImage);

        delete values.panCardBackImage;
        delete values.panCardFrontImage;
        delete values.cancelChequeImage;
        delete values.gstImage;

        let vendorUpdatedValues = { ...values };
        updateformdata.append(
          "vendorProfile",
          JSON.stringify(vendorUpdatedValues)
        );
        dispatch(createVendorDocDetails(updateformdata)).then((res) => {
          if (res?.payload?.success) {
            toast.success("Vendor Docs Updated");
            router.push("/admin/vendors");
          }
        });
      }
    }
    if (details === 2) {
      if (!router.query.id) {
        let formData = new FormData();
        let vendorAsset = { ...values, userId: vendorId, payload: [] };
        values.payload.forEach((elem) => {
          formData.append("rcImageFront", elem.rcImageFront);
          formData.append("rcImageBack", elem.rcImageBack);
          formData.append("drivingLicenseImage", elem.drivingLicenseImage);
          formData.append("fitnessValidityImage", elem.fitnessValidityImage);
          formData.append("otherImage", elem.otherImage);
          formData.append("insuranceImage", elem.insuranceImage);

          let modifiedElem = { ...elem };
          modifiedElem.uniId = elem.vehicleNumber;
          delete modifiedElem.rcImageFront;
          delete modifiedElem.rcImageBack;
          delete modifiedElem.drivingLicenseImage;
          delete modifiedElem.fitnessValidityImage;
          delete modifiedElem.insuranceImage;
          delete modifiedElem.otherImage;
          vendorAsset.payload.push(modifiedElem);
        });
        formData.append("profileData", JSON.stringify(vendorAsset));
        dispatch(createVendorAssetDetails(formData)).then((res) => {
          if (res?.payload?.success) {
            toast.success("Vendor Capability & Asset details Created");
            router.push("/admin/vendors");
          } else {
            toast.info(res.payload.message);
          }
        });
      } else {
        let updateformData = new FormData();
        let updateAssetValue = { ...values, payload: [] };

        values.payload.forEach((elem) => {
          updateformData.append("rcImageFront", elem.rcImageFront);
          updateformData.append("rcImageBack", elem.rcImageBack);
          updateformData.append(
            "drivingLicenseImage",
            elem.drivingLicenseImage
          );
          updateformData.append(
            "fitnessValidityImage",
            elem.fitnessValidityImage
          );
          updateformData.append("otherImage", elem.otherImage);
          updateformData.append("insuranceImage", elem.insuranceImage);

          let modifiedElem = { ...elem };
          modifiedElem.uniId = elem.vehicleNumber;
          delete modifiedElem.rcImageFront;
          delete modifiedElem.rcImageBack;
          delete modifiedElem.drivingLicenseImage;
          delete modifiedElem.fitnessValidityImage;
          delete modifiedElem.insuranceImage;
          delete modifiedElem.otherImage;
          updateAssetValue.payload.push(modifiedElem);
        });
        updateformData.append("profileData", JSON.stringify(updateAssetValue));
        dispatch(createVendorAssetDetails(updateformData)).then((res) => {
          if (res?.payload?.success) {
            toast.success("Vendor Capability & Asset details Updated");
            router.push("/admin/vendors");
          }
        });
      }
    }
  };

  const initializedValues = useMemo((e) => {
    let initialvalues = {};
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    if (details === 0) {
      if (router.query.id && vendorDataById) {
        initialvalues = {
          id: Number(vendorDataById[0]?.id),
          vendorTypeId: vendorDataById[0]?.UserDetail?.vendorTypes?.name,
          name: vendorDataById[0]?.name,
          orgTypeId: vendorDataById[0]?.UserDetail?.orgTypes?.id,
          registeredStreetAddress:
            vendorDataById[0]?.registeredAddress?.registeredStreetAddress,
          registeredState:
            vendorDataById[0]?.registeredAddress?.registeredState,
          registeredCity: vendorDataById[0]?.registeredAddress?.registeredCity,
          communicationStreetAddress:
            vendorDataById[0]?.communicationAddress?.communicationStreetAddress,
          communicationState:
            vendorDataById[0]?.communicationAddress?.communicationState,
          communicationCity:
            vendorDataById[0]?.communicationAddress?.communicationCity,
          contactDetails: vendorDataById[0]?.VendorContactDetail?.map(
            (item) => ({
              id: item?.id,
              mobile: item?.mobile,
              email: item?.email,
              designation: item?.designation,
            })
          ),
        };
      } else {
        initialvalues = {
          contactDetails: [
            {
              mobile: "",
              email: "",
              designation: "",
            },
          ],
        };
      }
    }
    if (details === 1) {
      if (router.query.id) {
        initialvalues = {
          userId: vendorDataById[0]?.id,
          id: vendorDataById[0]?.UserDocuments?.id
            ? vendorDataById[0]?.UserDocuments?.id
            : "",
          pan: vendorDataById[0]?.UserDetail?.pan,
          gstNumber: vendorDataById[0]?.UserDetail?.gstNumber,
          bankName: vendorDataById[0]?.UserDetail?.bankName,
          bankAccountNumber: vendorDataById[0]?.UserDetail?.bankAccountNumber,
          bankHolderName: vendorDataById[0]?.UserDetail?.bankHolderName,
          bankIfsc: vendorDataById[0]?.UserDetail?.bankIfsc,
        };
      }
    }
    if (details === 2) {
      if (router.query.id) {
        initialvalues = {
          userId: vendorDataById[0]?.id,
          ownedVehicles: vendorDataById[0]?.UserDetail?.ownedVehicles,
          rentedVehicles: vendorDataById[0]?.UserDetail?.rentedVehicles,
          moblizationTime: vendorDataById[0]?.UserDetail?.moblizationTime,
          payload:
            vendorDataById[0]?.UserAssets?.length > 0
              ? vendorDataById[0]?.UserAssets?.map((item) => ({
                  id: item?.id,
                  uniId: item?.vehicleNumber,
                  vehicleNumber: item?.vehicleNumber,
                  vehicleTypeId: item?.vehicleTypeId,
                  vehicleWheels: item?.vehicleWheels,
                  // vehicleMeasurement: item?.vehicleMeasurement,
                  vehicleVolume: item?.vehicleVolume,
                  vehicleCapacity: item?.vehicleCapacity,
                  vehicleTareWeight: item?.vehicleTareWeight,
                  insuranceValidity: item?.insuranceValidity,
                  driverName: item?.driverName,
                  drivingLicenseNumber: item?.drivingLicenseNumber,
                }))
              : [{}],
        };
      } else {
        initialvalues = {
          payload: [
            {
              vehicleNumber: "",
              vehicleTypeId: "",
              vehicleWheels: "",
              // vehicleMeasurement: "",
              vehicleVolume: "",
              vehicleCapacity: "",
              vehicleTareWeight: "",
              insuranceValidity: "",
              driverName: "",
              drivingLicenseNumber: "",
            },
          ],
        };
      }
    }
    return initialvalues;
  }, []);

  const validate = (values) => {
    const errors = {};
    const basicDetailArray = [];
    const assetDetail = [];

    if (details === 0) {
      if (!router.query.id) {
        values.contactDetails?.map((item, index) => {
          const contactError = {};

          if (item.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(item.email)) {
              contactError["email"] = "Invalid email";
            }
            if (!emailValidation) {
              contactError["email"] = "Email Already in use";
            }
          } else {
            contactError["email"] = "Email is Required";
          }

          if (item.mobile) {
            if (item.mobile.length !== 10) {
              contactError["mobile"] = "Invalid mobile number";
            }
            if (!mobileValidation) {
              contactError["mobile"] = "Contact Already in use";
            }
          } else {
            contactError["mobile"] = "Mobile number is Required";
          }

          if (!item.designation) {
            contactError["designation"] = "Designation is Required";
          }
          basicDetailArray[index] = contactError;
        });

        //!To remove the error array for the added last one if Add btn is clicked

        if (values?.contactDetails?.length > 1) {
          if (
            basicDetailArray?.[basicDetailArray.length - 1]?.mobile ==
            "Mobile number is Required"
          ) {
            basicDetailArray.pop();
          }
        }

        errors["contactDetails"] = basicDetailArray;

        if (!values.vendorTypeId) {
          errors["vendorTypeId"] = "Required";
        }
        if (!values.name) {
          errors["name"] = "Required";
        }
        if (!values.orgTypeId) {
          errors["orgTypeId"] = "Required";
        }
      }
    }
    if (details === 1) {
      if (!router.query.id) {
        if (!values.pan) {
          errors["pan"] = "Required";
        }
        if (!values.gstNumber) {
          errors["gstNumber"] = "Required";
        }
        if (!values.bankName) {
          errors["bankName"] = "Required";
        }
        if (!values.bankAccountNumber) {
          errors["bankAccountNumber"] = "Required";
        }
        if (!values.bankHolderName) {
          errors["bankHolderName"] = "Required";
        }
        if (!values.bankIfsc) {
          errors["bankIfsc"] = "Required";
        }
      }
    }

    if (details === 2) {
      if (!router.query.id) {
        if (!values.ownedVehicles) {
          errors["ownedVehicles"] = "Required";
        }
        if (!values.rentedVehicles) {
          errors["rentedVehicles"] = "Required";
        }
        if (!values.moblizationTime) {
          errors["moblizationTime"] = "Required";
        }
        values.payload?.map((item, index) => {
          const error = {};
          if (!item.vehicleNumber) {
            error["vehicleNumber"] = "Required";
          }
          if (item.vehicleNumber) {
            // const regex = new RegExp(
            //   "^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$"
            // );
            // if (!regex.test(item.vehicleNumber)) {
            //   error["vehicleNumber"] = "Invalid Format";
            // }
          }
          if (!item.vehicleTypeId) {
            error["vehicleTypeId"] = "Required";
          }
          if (!item.vehicleWheels) {
            error["vehicleWheels"] = "Required";
          }
          // if (!item.vehicleMeasurement) {
          //   error['vehicleMeasurement'] = 'Required'
          // }
          if (!item.vehicleVolume) {
            error["vehicleVolume"] = "Required";
          }
          if (!item.vehicleCapacity) {
            error["vehicleCapacity"] = "Required";
          }
          if (!item.vehicleTareWeight) {
            error["vehicleTareWeight"] = "Required";
          }
          if (!item.insuranceValidity) {
            error["insuranceValidity"] = "Required";
          }
          if (!item.driverName) {
            error["driverName"] = "Required";
          }
          if (!item.drivingLicenseNumber) {
            error["drivingLicenseNumber"] = "Required";
          }
          assetDetail[index] = error;
        });
        errors["payload"] = assetDetail;
      }
    }
    return errors;
  };

  return (
    <div className="VendorSection">
      <div className="back_btn_all">
        <p onClick={() => router.push("/admin/vendors")}>
          <span className="back_icon">
            <img src="/images/back_icon.svg" alt="" class="img-fluid" />
          </span>
          Back
        </p>
        <div className="back_import">
          <Button variant="">
            <span className="import_icon">
              <img src="/images/import_icon.svg" alt="" class="img-fluid" />
            </span>
            Import from .xlsx
          </Button>
        </div>
      </div>
      <ul className="nav ProjectAdmin_tabs create_project_main">
        {detailForm?.map((steps, stepsIndex) => (
          <li className="nav-item d-flex" key={stepsIndex}>
            <a
              className={`nav-link admin_tabs_name ${
                details === stepsIndex && "head-active"
              }`}
              active="true"
              onClick={() => {
                setdetails(stepsIndex);
              }}>
              {steps}
            </a>
          </li>
        ))}
      </ul>
      <Form
        onSubmit={handleSubmit}
        mutators={{ ...arrayMutators }}
        keepDirtyOnReinitialize
        validate={validate}
        initialValues={initializedValues}
        render={({
          handleSubmit,
          values,
          errors,
          form: {
            mutators: { push, remove, pop },
          },
          touched,
          valid,
        }) => {
          return (
            <form
              onSubmit={(e) => {
                if (!valid) toast.error("Please Complete All Required Field");
                handleSubmit(e);
              }}>
              {details === 0 && (
                <div className=" vender_basic_details">
                  <VendorsBasicDetails
                    values={values}
                    errors={errors}
                    push={push}
                    remove={remove}
                    vehicleTypeDisable={vehicleTypeDisable}
                  />
                </div>
              )}
              {details === 1 && (
                <VendorDocumnets values={values} errors={errors} push={push} />
              )}
              {details === 2 && (
                <VendorCapabilityAndAssets
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                />
              )}
            </form>
          );
        }}
      />
    </div>
  );
};

export default VendorNewProject;
