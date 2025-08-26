import React, { useEffect, useMemo, useState } from "react";
import BasicDetails from "./BasicDetails";
import Requirment from "./Requiement";
import EicDetails from "./EicDetails";
import StaffDetails from "./StaffDetails";
import VendorDetails from "./VendorDetails";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterialType,
  getPaymentTerm,
  getReconciliationArrangementtype,
  getServiceType,
  getTransporterUnit,
  getUnitType,
  getcelloType,
  getdykeType,
  getgstRateType,
} from "@/redux/actions/masterdata/masterData";
import {
  createBasicDetails,
  createEicDetails,
  createRequirement,
  createStaffDetail,
  createVendorDetail,
  getAllRequirement,
  getProjectDetails,
  updateProjectEicDetail,
  updateProjectVendorDetail,
  updateProjetBasicDetail,
  updateProjetRequirement,
} from "@/redux/actions/project/projectData";
import { toast } from "react-toastify";
import { setProjectId } from "@/redux/reducers/projectdata/projectDataSlice";
import { getAllManagerUser } from "@/redux/actions/manageuser/manageruserlist";
import { getAllVendorsList } from "@/redux/actions/vendor/vendorActions";

const DetailForm = [
  "Basic Details",
  "Requirements",
  "EIC Details",
  "Staff Details",
  "Vendor Details",
];

const CreateNewProject = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [details, setdetails] = useState(0);

  const projectIdDetail = useSelector((state) => state.projectSlice.projectId);
  const projectReqList = useSelector(
    (state) => state.projectSlice.projectRequirementList?.requirementsTabData
  );
  const projectData = useSelector(
    (state) => state.projectSlice.projectDetailList
  );

  useEffect(() => {
    dispatch(getMaterialType({ types: "materialtype" }));
    dispatch(getServiceType({ types: "servicetype" }));
    dispatch(getUnitType({ types: "unittype" }));
    dispatch(getgstRateType({ types: "gstrate" }));
    dispatch(getdykeType({ types: "dyketype" }));
    dispatch(getcelloType({ types: "cellotype" }));
    dispatch(
      getAllManagerUser({
        user: ["projectmanager", "fieldexecutive"],
        dropdown: true,
      })
    );
    dispatch(
      getAllVendorsList({
        vendorType: ["transporter", "excavator", "petrolpump"],
        dropdown: true,
      })
    );
    dispatch(getPaymentTerm({ types: "paymenttermtype" }));
    dispatch(getTransporterUnit({ types: "transporterunittype" }));
    dispatch(
      getReconciliationArrangementtype({
        types: "reconciliationarrangementtype",
      })
    );
  }, []);

  useEffect(() => {
    if (details === 3 && projectIdDetail) {
      dispatch(getAllRequirement({ projectId: projectIdDetail }));
    }
    if (details === 3 && router.query.id) {
      dispatch(getAllRequirement({ projectId: Number(router.query.id) }));
    }
    if (router.query.id) {
      dispatch(getProjectDetails({ projectId: Number(router.query.id) }));
    }
  }, [details, router.query.id]);

  const handleSubmit = (values) => {
    if (details === 0) {
      if (router.query.id) {
        const updateModifiedValues = {
          clientDetail: {
            clientName: values.clientName,
            gstNumber: values.gstNumber,
            clientAddress: values.clientAddress,
            id: Number(projectData?.ProjectDetails?.clientDetailIds?.id),
          },
          projectDetails: {
            id: Number(projectData?.ProjectDetails?.id),
            projectName: values.projectName,
            materialId: values.materialId,
            clientDetailsId: Number(
              projectData?.ProjectDetails?.clientDetailIds?.id
            ),
          },
          purchaseOrderDetails: values?.purchaseOrder?.map((eleme) => ({
            id: Number(router.query.id) ? eleme.id : undefined,
            projectId: Number(router.query.id),
            uniId: values.purchaseOrderNumber,
            purchaseOrderNumber: values.purchaseOrderNumber,
            purchaseOrderStartMonth: values.purchaseOrderStartMonth,
            purchaseOrderEndMonth: eleme.purchaseOrderEndMonth,
          })),

          serviceDetails: values.serviceDetails
            ?.filter((item) => item?.serviceTypeId !== "")
            ?.map((elem) => ({
              id: elem?.id ? elem.id : undefined,
              projectId: Number(router.query.id),
              serviceTypeId: elem?.serviceTypeId,
              unitId: elem?.unitId,
              unitRate: elem?.unitRate,
              gstRateId: elem?.gstRateId,
              quantity: elem?.quantity,
            })),

          loadingPointDetails: values.loadingPointDetails.map((point) => {
            if (point.loadingType === "dykeId") {
              return {
                id: point?.id,
                dykeId: point.select,
                projectId: Number(router.query.id),
                loadingAddress: point.loadingAddress,
                loadingLongitude: point.loadingLongitude,
                loadingLatitude: point.loadingLatitude,
              };
            } else if (point.loadingType === "celloId") {
              return {
                id: point?.id,
                celloId: point.select,
                projectId: Number(router.query.id),
                loadingAddress: point.loadingAddress,
                loadingLatitude: point.loadingLatitude,
                loadingLongitude: point.loadingLongitude,
              };
            }
          }),
          unloadingPointDetails: values.unloadingPointDetails.map((elem) => ({
            id: elem?.id ? elem.id : undefined,
            projectId: Number(router.query.id),
            chainageNumber: elem?.chainageNumber,
            unloadingAddress: elem?.unloadingAddress,
            unloadingLongitude: elem?.unloadingLongitude,
            unloadingLatitude: elem?.unloadingLatitude,
          })),
        };

        let updateFormData = new FormData();
        values.purchaseOrder.forEach((elem) => {
          updateFormData.append(
            "purchaseOrderVersionImage",
            elem.purchaseOrderVersion
          );
        });
        updateFormData.append(
          "projectData",
          JSON.stringify(updateModifiedValues)
        );
        dispatch(updateProjetBasicDetail(updateFormData)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Basic Detail Updated");
            router.push("/admin/project");
          } else {
            toast.info(res.payload.message);
          }
        });

        // console.log("Submitted", updateModifiedValues?.serviceDetails);
      } else {
        const modifiedValues = {
          ...values,
          purchaseOrder: values.purchaseOrder.map((order) => {
            if (
              values.purchaseOrderNumber &&
              values.purchaseOrderStartMonth &&
              values.purchaseOrderEndMonth
            ) {
              return {
                uniId: values.purchaseOrderNumber,
                purchaseOrderNumber: values.purchaseOrderNumber,
                purchaseOrderStartMonth: values.purchaseOrderStartMonth,
                purchaseOrderEndMonth: values.purchaseOrderEndMonth,
              };
            } else if (order.purchaseOrderEndMonth) {
              return {
                uniId: values.purchaseOrderNumber,
                purchaseOrderNumber: values.purchaseOrderNumber,
                purchaseOrderStartMonth: values.purchaseOrderStartMonth,
                purchaseOrderEndMonth: order.purchaseOrderEndMonth,
              };
            }
          }),

          loadingPointDetails: values.loadingPointDetails
            ?.filter((item) => item?.loadingAddress !== "")
            .map((point) => {
              if (point.loadingType === "dykeId") {
                return {
                  dykeId: point.select,
                  loadingAddress: point.loadingAddress,
                  loadingLongitude: point.loadingLongitude,
                  loadingLatitude: point.loadingLatitude,
                };
              } else if (point.loadingType === "celloId") {
                return {
                  celloId: point.select,
                  loadingAddress: point.loadingAddress,
                  loadingLatitude: point.loadingLatitude,
                  loadingLongitude: point.loadingLongitude,
                };
              }
              return {};
            }),

          unloadingPointDetails: values.unloadingPointDetails
            ?.filter((item) => item?.chainageNumber !== "")
            .map((elem) => ({
              // id: elem?.id ? elem.id : undefined,
              // projectId: Number(router.query.id),
              chainageNumber: elem?.chainageNumber,
              unloadingAddress: elem?.unloadingAddress,
              unloadingLongitude: elem?.unloadingLongitude,
              unloadingLatitude: elem?.unloadingLatitude,
            })),
        };

        //!FILTERING FOR THAT ADDITIONAL EXTRA ENTRY

        modifiedValues["serviceDetails"] = values.serviceDetails
          ?.filter((item) => item?.serviceTypeId !== "")
          ?.map((elem) => ({
            // id: elem?.id ? elem.id : undefined,
            // projectId: Number(router.query.id),
            serviceTypeId: elem?.serviceTypeId,
            unitId: elem?.unitId,
            unitRate: elem?.unitRate,
            gstRateId: elem?.gstRateId,
            quantity: elem?.quantity,
          }));

        delete modifiedValues.purchaseOrderStartMonth;
        delete modifiedValues.purchaseOrderNumber;

        let formData = new FormData();
        values.purchaseOrder.forEach((elem) => {
          formData.append(
            "purchaseOrderVersionImage",
            elem.purchaseOrderVersion
          );
        });
        formData.append("projectData", JSON.stringify(modifiedValues));

        dispatch(createBasicDetails(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            dispatch(setProjectId(res.payload.data.id));
            toast.success("Basic Detail Created");
            setdetails(1);
          } else {
            toast.info(res.payload.message);
          }
        });
      }
    }
    if (details === 1) {
      if (router.query.id) {
        dispatch(updateProjetRequirement(values)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            router.push("/admin/project");
          } else {
            toast.error(res?.payload?.data?.message);
          }
        });
      } else {
        dispatch(
          createRequirement({ ...values, projectId: projectIdDetail })
        ).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            setdetails(2);
          } else {
            toast.info(res?.payload?.data?.message);
          }
        });
      }
    }
    if (details === 2) {
      if (router.query.id) {
        const updatedEicDetails = values.EicDetails.map((eleme) => {
          const projectId = eleme.id
            ? eleme.projectId
            : Number(router.query.id);
          return {
            id: eleme.id,
            projectId,
            name: eleme.name,
            designation: eleme.designation,
            mobile: eleme.mobile,
            email: eleme.email,
          };
        });
        dispatch(updateProjectEicDetail(updatedEicDetails)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            router.push("/admin/project");
          } else {
            toast.error(res?.payload?.data?.message);
          }
        });
      } else {
        const newValue = values.EicDetails?.map((elem) => ({
          ...elem,
          projectId: projectIdDetail,
        }));
        dispatch(createEicDetails(newValue)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            setdetails(3);
          } else {
            toast.info(res?.payload?.data?.message);
          }
        });
      }
    }
    if (details === 3) {
      if (router.query.id && projectData) {
        let updateStaffValues = {
          projectId: Number(router.query.id),
          projectManagers: values.projectManagers.map((elem) => ({
            ...elem,
            projectId: Number(router.query.id),
            projectManagerId: elem.projectManagerId.value,
            fieldExecutiveTypeName: "projectmanager",
          })),
          loadingExecutives: values.loadingExecutives.map((elem) => ({
            ...elem,
            projectId: Number(router.query.id),
            loadingExecutiveId: elem.loadingExecutiveId.value,
            fieldExecutiveTypeName: "loadingexecutive",
          })),
          unloadingExecutives: values.unloadingExecutives.map((elem) => ({
            ...elem,
            projectId: Number(router.query.id),
            unloadingExecutiveId: elem.unloadingExecutiveId.value,
            fieldExecutiveTypeName: "unloadingexecutive",
          })),
          weighbridgeExecutive: values.weighbridgeExecutive.map((elem) => ({
            ...elem,
            projectId: Number(router.query.id),
            weighbridgeExecutiveId: elem.weighbridgeExecutiveId.value,
            fieldExecutiveTypeName: "weighbridgeexecutive",
          })),
          petrolPump: values.petrolPump.map((elem) => ({
            ...elem,
            projectId: Number(router.query.id),
            petrolPumpId: elem.petrolPumpId.value,
            fieldExecutiveTypeName: "petrolpumpexecutive",
          })),
        };

        if (!projectReqList[0]?.isFieldExecutiveLoading) {
          delete updateStaffValues.loadingExecutives;
        }
        if (!projectReqList[0]?.isFieldExecutiveUnloading) {
          delete updateStaffValues.unloadingExecutives;
        }
        if (!projectReqList[0]?.isFieldExecutiveWeighment) {
          delete updateStaffValues.weighbridgeExecutive;
        }
        if (!projectReqList[0]?.isFieldExecutiveFuelPump) {
          delete updateStaffValues.petrolPump;
        }

        dispatch(createStaffDetail(updateStaffValues)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            router.push("/admin/project");
          } else {
            toast.info(res?.payload?.data?.message);
          }
        });
      } else {
        let staffValues = {
          projectId: projectIdDetail,
          projectManagers: values.projectManagers.map((elem) => ({
            ...elem,
            projectManagerId: elem.projectManagerId.value,
            fieldExecutiveTypeName: "projectmanager",
          })),
          loadingExecutives: values.loadingExecutives.map((elem) => ({
            ...elem,
            loadingExecutiveId: elem.loadingExecutiveId.value,
            fieldExecutiveTypeName: "loadingexecutive",
          })),
          unloadingExecutives: values.unloadingExecutives.map((elem) => ({
            ...elem,
            unloadingExecutiveId: elem.unloadingExecutiveId.value,
            fieldExecutiveTypeName: "unloadingexecutive",
          })),
          weighbridgeExecutive: values.weighbridgeExecutive.map((elem) => ({
            ...elem,
            weighbridgeExecutiveId: elem.weighbridgeExecutiveId.value,
            fieldExecutiveTypeName: "weighbridgeexecutive",
          })),
          petrolPump: values.petrolPump.map((elem) => ({
            ...elem,
            petrolPumpId: elem.petrolPumpId.value,
            fieldExecutiveTypeName: "petrolpumpexecutive",
          })),
        };

        if (!projectReqList[0]?.isFieldExecutiveLoading) {
          delete staffValues.loadingExecutives;
        }
        if (!projectReqList[0]?.isFieldExecutiveUnloading) {
          delete staffValues.unloadingExecutives;
        }
        if (!projectReqList[0]?.isFieldExecutiveWeighment) {
          delete staffValues.weighbridgeExecutive;
        }
        if (!projectReqList[0]?.isFieldExecutiveFuelPump) {
          delete staffValues.petrolPump;
        }
        dispatch(createStaffDetail(staffValues)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            setdetails(4);
          } else {
            toast.info(res?.payload?.data?.message);
          }
        });
      }
    }
    if (details === 4) {
      if (router.query.id) {
        const updateValues = {
          transporterData: values?.transporterData?.map((eleme) => ({
            id: eleme?.id,
            projectId: Number(router.query.id),
            transporterNameId: eleme?.transporterNameId.value,
            mobile: eleme?.mobile,
            paymentTerm: eleme?.paymentTerm,
            dieselQuantity: eleme?.dieselQuantity,
            tripCashAmount: eleme?.tripCashAmount,
            transporterUnit: eleme?.transporterUnit,
            unitRateAmount: eleme?.unitRateAmount,
            gstRate: eleme?.gstRate,
            transporterQuantity: eleme?.transporterQuantity,
          })),

          excavatorData: values?.excavatorData?.map((elem) => ({
            id: elem?.id,
            projectId: Number(router.query.id),
            excavatorNameId: elem?.excavatorNameId.value,
            mobile: elem?.mobile,
            paymentTerm: elem?.paymentTerm,
            hoursPerMonth: elem?.hoursPerMonth,
            ratePerHourAmount: elem?.ratePerHourAmount,
            isWithDiesel: elem?.isWithDiesel,
            gstRate: elem?.gstRate,
          })),

          petrolPumpData: values?.petrolPumpData?.map((elem) => ({
            id: elem?.id,
            projectId: Number(router.query.id),
            petrolPumpId: elem?.petrolPumpId.value,
            mobile: elem?.mobile,
            totalCreditAmount: elem?.totalCreditAmount,
            discountPerLiter: elem?.discountPerLiter,
            reconciliationArrangement: elem?.reconciliationArrangement,
          })),
        };
        dispatch(updateProjectVendorDetail(updateValues)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            router.push("/admin/project");
          } else {
            toast.error(res?.payload?.data?.message);
          }
        });
      } else {
        const Vendordetail = {
          projectId: projectIdDetail,
          transporterData: values?.transporterData?.map((eleme) => ({
            transporterNameId: eleme?.transporterNameId.value,
            mobile: eleme?.mobile,
            paymentTerm: eleme?.paymentTerm,
            dieselQuantity: eleme?.dieselQuantity,
            tripCashAmount: eleme?.tripCashAmount,
            transporterUnit: eleme?.transporterUnit,
            unitRateAmount: eleme?.unitRateAmount,
            gstRate: eleme?.gstRate,
            transporterQuantity: eleme?.transporterQuantity,
          })),

          excavatorData: values?.excavatorData?.map((elem) => ({
            excavatorNameId: elem?.excavatorNameId.value,
            mobile: elem?.mobile,
            paymentTerm: elem?.paymentTerm,
            hoursPerMonth: elem?.hoursPerMonth,
            ratePerHourAmount: elem?.ratePerHourAmount,
            isWithDiesel: elem?.isWithDiesel,
            gstRate: elem?.gstRate,
          })),

          petrolPumpData: values?.petrolPumpData?.map((elem) => ({
            petrolPumpId: elem?.petrolPumpId.value,
            mobile: elem?.mobile,
            totalCreditAmount: elem?.totalCreditAmount,
            discountPerLiter: elem?.discountPerLiter,
            reconciliationArrangement: elem?.reconciliationArrangement,
          })),
        };
        dispatch(createVendorDetail(Vendordetail)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success(res?.payload?.data?.message);
            router.push("/admin/project");
          } else {
            toast.info(res?.payload?.data?.message);
          }
        });
      }
    }
  };

  const initializedValues = useMemo((e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    let initialvalues = {};
    if (details === 0) {
      if (router.query.id && projectData) {
        initialvalues = {
          id: Number(projectData?.ProjectDetails?.id),
          projectName: projectData?.ProjectDetails?.projectName,
          materialId: projectData?.ProjectDetails?.materialIds?.name,
          purchaseOrder:
            projectData?.PurchaseOrderDetail?.length > 0
              ? projectData?.PurchaseOrderDetail?.map((elem) => ({
                  id: elem?.id,
                  uniId: elem?.purchaseOrderNumber,
                  projectId: Number(router.query.id),
                  purchaseOrderEndMonth: elem?.purchaseOrderEndMonth,
                }))
              : [{}],
          purchaseOrderStartMonth:
            projectData?.PurchaseOrderDetail &&
            projectData?.PurchaseOrderDetail[0]?.purchaseOrderStartMonth,
          purchaseOrderNumber:
            projectData?.PurchaseOrderDetail &&
            projectData?.PurchaseOrderDetail[0]?.purchaseOrderNumber,

          serviceDetails:
            projectData?.ServiceDetail?.length > 0
              ? projectData?.ServiceDetail?.map((elem) => ({
                  id: elem?.id,
                  projectId: Number(router.query.id)
                    ? Number(router.query.id)
                    : undefined,
                  serviceTypeId: elem?.serviceTypeIds?.name,
                  unitId: elem?.unitIds?.name,
                  unitRate: elem?.unitRate,
                  gstRateId: elem?.gstRateIds?.name,
                  quantity: elem?.quantity,
                }))
              : [{}],
          clientName: projectData?.ProjectDetails?.clientDetailIds?.clientName,
          gstNumber: projectData?.ProjectDetails?.clientDetailIds?.gstNumber,
          clientAddress:
            projectData?.ProjectDetails?.clientDetailIds?.clientAddress,

          loadingPointDetails: projectData?.LoadingPointsDetail?.map((elem) => {
            if (elem?.dykeIdName?.types === "dyketype") {
              return {
                id: elem?.id,
                projectId: Number(router.query.id),
                loadingType: "dykeId",
                select: elem?.dykeIdName?.id,
                loadingAddress: elem?.loadingAddress,
                loadingLongitude: elem?.loadingLongitude,
                loadingLatitude: elem?.loadingLatitude,
              };
            } else if (elem?.celloIdName?.types === "cellotype") {
              return {
                id: elem?.id,
                loadingType: "celloId",
                projectId: Number(router.query.id),
                select: elem?.celloIdName?.id,
                loadingAddress: elem?.loadingAddress,
                loadingLatitude: elem?.loadingLatitude,
                loadingLongitude: elem?.loadingLongitude,
              };
            }
          }),
          unloadingPointDetails:
            projectData?.UnloadingPointsDetail?.length > 0
              ? projectData?.UnloadingPointsDetail?.map((elem) => ({
                  id: elem?.id,
                  projectId: Number(router.query.id),
                  chainageNumber: elem?.chainageNumber,
                  unloadingAddress: elem?.unloadingAddress,
                  unloadingLongitude: elem?.unloadingLongitude,
                  unloadingLatitude: elem?.unloadingLatitude,
                }))
              : [{}],
        };
      } else {
        initialvalues = {
          projectName: "",
          materialId: "",
          purchaseOrderNumber: "",
          purchaseOrderStartMonth: "",
          purchaseOrder: [
            {
              purchaseOrderVersion: "",
              purchaseOrderEndMonth: "",
            },
          ],
          serviceDetails: [
            {
              serviceTypeId: "",
              unitId: "",
              unitRate: "",
              gstRateId: "",
              quantity: "",
            },
          ],
          clientName: "",
          gstNumber: "",
          clientAddress: "",
          loadingPointDetails: [
            {
              loadingAddress: "",
              loadingLongitude: "",
              loadingLatitude: "",
              loadingType: "",
              select: "",
            },
          ],
          unloadingPointDetails: [
            {
              chainageNumber: "",
              unloadingAddress: "",
              unloadingLongitude: "",
              unloadingLatitude: "",
            },
          ],
        };
      }
    }
    if (details === 1) {
      if (router.query.id && projectData) {
        initialvalues = {
          projectId: Number(router.query.id),
          isFieldExecutiveLoading:
            projectData?.FieldExecutiveDeployment?.isFieldExecutiveLoading,
          isFieldExecutiveFuelPump:
            projectData?.FieldExecutiveDeployment?.isFieldExecutiveFuelPump,
          isFieldExecutiveWeighment:
            projectData?.FieldExecutiveDeployment?.isFieldExecutiveWeighment,
          isFieldExecutiveUnloading:
            projectData?.FieldExecutiveDeployment?.isFieldExecutiveUnloading,
          isVehiclePassRequired:
            projectData?.isVehiclePassRequirement?.isVehiclePassRequired,
          documentsRequired: {
            rc: projectData?.isVehiclePassRequirement?.documentsRequired?.rc,
            insurance:
              projectData?.isVehiclePassRequirement?.documentsRequired
                ?.insurance,
            fitness:
              projectData?.isVehiclePassRequirement?.documentsRequired?.fitness,
            driverLicense:
              projectData?.isVehiclePassRequirement?.documentsRequired
                ?.driverLicense,
            other:
              projectData?.isVehiclePassRequirement?.documentsRequired?.other,
          },

          isVehicleWeightLoading:
            projectData?.VehicleWeighment?.isVehicleWeightLoading,
          isVehicleWeightTareWeight:
            projectData?.VehicleWeighment?.isVehicleWeightTareWeight,
          isVehicleWeightTwiceUnloading:
            projectData?.VehicleWeighment?.isVehicleWeightTwiceUnloading,

          isGeoFencingLoading: projectData?.GeoFencing?.isGeoFencingLoading,
          isGeoFencingUnloading: projectData?.GeoFencing?.isGeoFencingUnloading,

          isGeoImgLoading:
            projectData?.GeoTaggedPictureRequirenment?.isGeoImgLoading,
          isGeoImgWeighment:
            projectData?.GeoTaggedPictureRequirenment?.isGeoImgWeighment,
          isGeoImgUnloading:
            projectData?.GeoTaggedPictureRequirenment?.isGeoImgUnloading,

          isDieselAllotted: projectData?.DieselAndTripCash?.isDieselAllotted,
          maxDieselAllotted: projectData?.DieselAndTripCash?.maxDieselAllotted,
          isCashAllotted: projectData?.DieselAndTripCash?.isCashAllotted,
          maxCashAllotted: projectData?.DieselAndTripCash?.maxCashAllotted,

          isSignedChallan: projectData?.DocumentSubmitted?.isSignedChallan,
          isWeighbridgeSlip: projectData?.DocumentSubmitted?.isWeighbridgeSlip,
          otherDocument1: projectData?.DocumentSubmitted?.otherDocument1,
          otherDocument2: projectData?.DocumentSubmitted?.otherDocument2,
        };
      } else {
        initialvalues = {
          isFieldExecutiveLoading: "",
          isFieldExecutiveFuelPump: "",
          isFieldExecutiveWeighment: "",
          isFieldExecutiveUnloading: "",
          isVehiclePassRequired: "",
          documentsRequired: {
            rc: "",
            insurance: "",
            fitness: "",
            driverLicense: "",
            other: "",
          },
          isVehicleWeightLoading: "",
          isVehicleWeightTareWeight: "",
          isVehicleWeightTwiceUnloading: "",
          isGeoFencingLoading: "",
          isGeoFencingUnloading: "",
          isGeoImgLoading: "",
          isGeoImgWeighment: "",
          isGeoImgUnloading: "",
          isDieselAllotted: "",
          maxDieselAllotted: "",
          isCashAllotted: "",
          maxCashAllotted: "",
          isSignedChallan: "",
          isWeighbridgeSlip: "",
          otherDocument1: "",
          otherDocument2: "",
        };
      }
    }
    if (details === 2) {
      if (router.query.id && projectData) {
        initialvalues = {
          EicDetails:
            projectData?.EicDetails?.length > 0
              ? projectData?.EicDetails?.map((elem) => ({
                  id: elem?.id,
                  projectId: Number(router.query.id),
                  name: elem?.name,
                  designation: elem?.designation,
                  mobile: elem?.mobile,
                  email: elem?.email,
                }))
              : [{}],
        };
      } else {
        initialvalues = {
          EicDetails: [
            {
              name: "",
              designation: "",
              mobile: "",
              email: "",
            },
          ],
        };
      }
    }
    if (details === 3) {
      if (router.query.id && projectData) {
        // let projectManager = projectData?.StaffDetail?.length > 0 && projectData?.StaffDetail?.find((elem) => elem?.fieldExecutiveTypeIds?.name === 'projectmanager')
        let loading =
          projectData?.StaffDetail?.length > 0 &&
          projectData?.StaffDetail?.find(
            (elem) => elem?.fieldExecutiveTypeIds?.name === "loadingexecutive"
          );
        let unloading =
          projectData?.StaffDetail?.length > 0 &&
          projectData?.StaffDetail?.find(
            (elem) => elem?.fieldExecutiveTypeIds?.name === "unloadingexecutive"
          );
        let weighbridge =
          projectData?.StaffDetail?.length > 0 &&
          projectData?.StaffDetail?.find(
            (elem) =>
              elem?.fieldExecutiveTypeIds?.name === "weighbridgeexecutive"
          );
        let petrolpump =
          projectData?.StaffDetail?.length > 0 &&
          projectData?.StaffDetail?.find(
            (elem) =>
              elem?.fieldExecutiveTypeIds?.name === "petrolpumpexecutive"
          );

        initialvalues = {
          projectManagers:
            projectData?.StaffDetail?.length > 0
              ? projectData.StaffDetail.filter((elem) => {
                  return elem?.fieldExecutiveTypeIds?.name === "projectmanager";
                }).map((elem) => ({
                  id: elem?.id,
                  projectManagerId: {
                    value: Number(elem?.projectStaffId),
                    label: elem?.projectStaffIdDetail.name,
                  },
                  mobile: elem?.mobile,
                  remarks: elem?.remarks,
                }))
              : [{}],

          loadingExecutives: loading
            ? projectData.StaffDetail.filter(
                (elem) =>
                  elem?.fieldExecutiveTypeIds?.name === "loadingexecutive"
              ).map((elem) => ({
                id: elem?.id,
                loadingExecutiveId: {
                  value: `${elem?.projectStaffId}`,
                  label: elem?.projectStaffIdDetail.name,
                },
                mobile: elem?.mobile,
                remarks: elem?.remarks,
                disabled: !(
                  projectReqList && projectReqList[0]?.isFieldExecutiveLoading
                ),
              }))
            : [{}],

          unloadingExecutives: unloading
            ? projectData.StaffDetail.filter(
                (elem) =>
                  elem?.fieldExecutiveTypeIds?.name === "unloadingexecutive"
              ).map((elem) => ({
                id: elem?.id,
                unloadingExecutiveId: {
                  value: `${elem?.projectStaffId}`,
                  label: elem?.projectStaffIdDetail.name,
                },
                mobile: elem?.mobile,
                remarks: elem?.remarks,
                disabled: !(
                  projectReqList && projectReqList[0]?.isFieldExecutiveUnloading
                ),
              }))
            : [{}],

          weighbridgeExecutive: weighbridge
            ? projectData.StaffDetail.filter(
                (elem) =>
                  elem?.fieldExecutiveTypeIds?.name === "weighbridgeexecutive"
              ).map((elem) => ({
                id: elem?.id,
                weighbridgeExecutiveId: {
                  value: `${elem?.projectStaffId}`,
                  label: elem?.projectStaffIdDetail.name,
                },
                mobile: elem?.mobile,
                remarks: elem?.remarks,
                disabled: !(
                  projectReqList && projectReqList[0]?.isFieldExecutiveWeighment
                ),
              }))
            : [{}],

          petrolPump: petrolpump
            ? projectData.StaffDetail.filter(
                (elem) =>
                  elem?.fieldExecutiveTypeIds?.name === "petrolpumpexecutive"
              ).map((elem) => ({
                id: elem?.id,
                petrolPumpId: {
                  value: `${elem?.projectStaffId}`,
                  label: elem?.projectStaffIdDetail.name,
                },
                mobile: elem?.mobile,
                remarks: elem?.remarks,
                disabled: !(
                  projectReqList && projectReqList[0]?.isFieldExecutiveFuelPump
                ),
              }))
            : [{}],
        };
      } else {
        initialvalues = {
          projectManagers: [
            {
              projectManagerId: "",
              mobile: "",
              remarks: "",
            },
          ],
          loadingExecutives: [
            {
              loadingExecutiveId: "",
              mobile: "",
              remarks: "",
            },
          ],
          unloadingExecutives: [
            {
              unloadingExecutiveId: "",
              mobile: "",
              remarks: "",
            },
          ],
          weighbridgeExecutive: [
            {
              weighbridgeExecutiveId: "",
              mobile: "",
              remarks: "",
            },
          ],
          petrolPump: [
            {
              petrolPumpId: "",
              mobile: "",
              remarks: "",
            },
          ],
        };
      }
    }
    if (details === 4) {
      if (router.query.id && projectData) {
        initialvalues = {
          transporterData:
            projectData?.TransporterDetail?.length > 0
              ? projectData?.TransporterDetail?.map((eleme) => ({
                  id: eleme?.id,
                  projectId: Number(router.query.id),
                  transporterNameId: {
                    value: eleme?.transporterIds?.id,
                    label: eleme?.transporterIds?.name,
                  },
                  mobile: eleme?.mobile,
                  paymentTerm: eleme?.TransporterPaymentTermIds?.name,
                  dieselQuantity: eleme?.dieselQuantity,
                  tripCashAmount: eleme?.tripCashAmount,
                  transporterUnit: eleme?.TransporterUnitIds?.name,
                  unitRateAmount: eleme?.unitRateAmount,
                  gstRate: eleme?.TransporterGstRateIds?.name,
                  transporterQuantity: eleme?.transporterQuantity,
                }))
              : [{}],

          excavatorData:
            projectData?.ExcavatorDetail?.length > 0
              ? projectData?.ExcavatorDetail?.map((elem) => ({
                  id: elem?.id,
                  projectId: Number(router.query.id),
                  excavatorNameId: {
                    value: elem?.excavatorIds?.id,
                    label: elem?.excavatorIds?.name,
                  },
                  mobile: elem?.mobile,
                  paymentTerm: elem?.ExcavatorPaymentTermIds?.name,
                  hoursPerMonth: elem?.hoursPerMonth,
                  ratePerHourAmount: elem?.ratePerHourAmount,
                  isWithDiesel: elem?.diesel,
                  gstRate: elem?.ExcavatorGstRateIds?.name,
                }))
              : [{}],

          petrolPumpData:
            projectData?.PetrolPumpDetail?.length > 0
              ? projectData?.PetrolPumpDetail?.map((elem) => ({
                  id: elem?.id,
                  projectId: Number(router.query.id),
                  petrolPumpId: {
                    value: elem?.petrolPumpIds?.id,
                    label: elem?.petrolPumpIds?.name,
                  },
                  mobile: elem?.mobile,
                  totalCreditAmount: elem?.totalCreditAmount,
                  discountPerLiter: elem?.discountPerLiter,
                  reconciliationArrangement: elem?.PetrolPumpReconIds?.name,
                }))
              : [{}],
        };
      } else {
        initialvalues = {
          transporterData: [
            {
              transporterNameId: "",
              mobile: "",
              paymentTerm: "",
              dieselQuantity: "",
              tripCashAmount: "",
              transporterUnit: "",
              unitRateAmount: "",
              gstRate: "",
              transporterQuantity: "",
            },
          ],
          excavatorData: [
            {
              excavatorNameId: "",
              mobile: "",
              paymentTerm: "",
              hoursPerMonth: "",
              ratePerHourAmount: "",
              isWithDiesel: "",
              gstRate: "",
            },
          ],
          petrolPumpData: [
            {
              petrolPumpId: "",
              mobile: "",
              totalCreditAmount: "",
              discountPerLiter: "",
              reconciliationArrangement: "",
            },
          ],
        };
      }
    }
    return initialvalues;
  });

  const validate = (values) => {
    const errors = {};
    const basicDetailArray = [];
    const serviceDetailArray = [];
    const loadingDetail = [];
    const unloadingDetail = [];
    const eicDetail = [];
    const staffDetailProjManager = [];
    const staffDetailLoading = [];
    const staffDetailUnloading = [];
    const staffDetailWeigh = [];
    const staffDetailPetrolpump = [];
    const transporterDetail = [];
    const excavatorDetail = [];
    const petrolpumpDetail = [];
    if (details === 0) {
      if (!values.projectName) {
        errors["projectName"] = "Required";
      }
      if (!values.materialId) {
        errors["materialId"] = "Required";
      }
      if (!values.purchaseOrderNumber) {
        errors["purchaseOrderNumber"] = "Required";
      }
      if (!values.purchaseOrderStartMonth) {
        errors["purchaseOrderStartMonth"] = "Required";
      }
      if (
        values.purchaseOrder &&
        Array.isArray(values.purchaseOrder) &&
        values.purchaseOrder.length > 0
      ) {
        values.purchaseOrder.map((elem, index) => {
          let error = {};
          if (!elem.purchaseOrderEndMonth) {
            error["purchaseOrderEndMonth"] = "Required";
          }
          // const file = elem.purchaseOrderVersion
          // if (!file) {
          //   error['purchaseOrderVersion'] = 'Required'
          // } else if (!isValidFileType(file)) {
          //   error['purchaseOrderVersion'] = 'Invalid file type'
          // } else if (file.size > MAX_FILE_SIZE) {
          //   error['purchaseOrderVersion'] = 'File size exceeds the limit'
          // }
          basicDetailArray[index] = error;
        });
      }
      errors["purchaseOrder"] = basicDetailArray;

      if (
        values.serviceDetails &&
        Array.isArray(values.serviceDetails) &&
        values.serviceDetails.length > 0
      ) {
        values?.serviceDetails?.map((item, index) => {
          let error = {};
          if (!item.serviceTypeId) {
            error["serviceTypeId"] = "Required";
          }
          if (!item.unitId) {
            error["unitId"] = "Required";
          }
          if (!item.unitRate) {
            error["unitRate"] = "Required";
          }
          if (!item.quantity) {
            error["quantity"] = "Required";
          }
          if (!item.gstRateId) {
            error["gstRateId"] = "Required";
          }
          serviceDetailArray[index] = error;
        });
      }

      //!To remove the error array for the added last one if Add btn is clicked
      if (values?.serviceDetails?.length > 1) {
        if (
          serviceDetailArray?.[serviceDetailArray.length - 1]?.serviceTypeId ==
          "Required"
        ) {
          serviceDetailArray.pop();
        }
      }

      // console.log("values?.serviceDetails", values?.serviceDetails);
      errors["serviceDetails"] = serviceDetailArray;

      if (!values.clientName) {
        errors["clientName"] = "Required";
      }
      if (!values.gstNumber) {
        errors["gstNumber"] = "Required";
      }
      if (!values.clientAddress) {
        errors["clientAddress"] = "Required";
      }

      if (
        values.loadingPointDetails &&
        Array.isArray(values.loadingPointDetails) &&
        values.loadingPointDetails.length > 0
      ) {
        values.loadingPointDetails.map((elem, index) => {
          let error = {};
          if (!elem?.loadingType) {
            error["loadingType"] = "*";
          }
          if (!elem?.select) {
            error["select"] = "Required";
          }
          if (!elem?.loadingAddress) {
            error["loadingAddress"] = "Required";
          }
          // if (!elem.loadingLongitude) {
          //   error['loadingLongitude'] = 'Required'
          // }
          // if (!elem.loadingLatitude) {
          //   error['loadingLatitude'] = 'Required'
          // }
          loadingDetail[index] = error;
        });

        //!To remove the error array for the added last one if Add btn is clicked
      }

      if (values?.loadingPointDetails?.length > 1) {
        if (loadingDetail?.[loadingDetail.length - 1]?.loadingType == "*") {
          loadingDetail.pop();
        }
      }

      // console.log("Error Loading", loadingDetail);

      errors["loadingPointDetails"] = loadingDetail;

      if (
        values.unloadingPointDetails &&
        Array.isArray(values.unloadingPointDetails) &&
        values.unloadingPointDetails.length > 0
      ) {
        values.unloadingPointDetails.map((elem, index) => {
          let error = {};
          if (!elem.chainageNumber) {
            error["chainageNumber"] = "Required";
          }
          if (!elem.unloadingAddress) {
            error["unloadingAddress"] = "Required";
          }
          unloadingDetail[index] = error;
        });
      }

      if (values?.unloadingPointDetails?.length > 1) {
        if (
          unloadingDetail?.[unloadingDetail.length - 1]?.chainageNumber ==
          "Required"
        ) {
          unloadingDetail.pop();
        }
      }

      // console.log("unload error", unloadingDetail);
      errors["unloadingPointDetails"] = unloadingDetail;
    }
    if (details === 1) {
      if (
        values.isFieldExecutiveLoading?.length === 0 ||
        values.isFieldExecutiveFuelPump?.length === 0 ||
        values.isFieldExecutiveWeighment?.length === 0 ||
        values.isFieldExecutiveUnloading?.length === 0
      ) {
        errors["isFieldExecutiveLoading"] =
          "Please select all the below fields";
      }
      if (values.isVehiclePassRequired?.length === 0) {
        errors["isVehiclePassRequired"] = "Please select the below fields";
      }
      if (
        values.isVehicleWeightLoading?.length === 0 ||
        values.isVehicleWeightTareWeight?.length === 0 ||
        values.isVehicleWeightTwiceUnloading?.length === 0
      ) {
        errors["isVehicleWeightLoading"] = "Please select all the below fields";
      }
      if (
        values.isGeoFencingLoading?.length === 0 ||
        values.isGeoFencingUnloading?.length === 0
      ) {
        errors["isGeoFencingLoading"] = "Please select all the below fields";
      }
      if (
        values.isGeoImgLoading?.length === 0 ||
        values.isGeoImgWeighment?.length === 0 ||
        values.isGeoImgUnloading?.length === 0
      ) {
        errors["isGeoImgLoading"] = "Please select all the below fields";
      }
      if (
        values.isDieselAllotted?.length === 0 ||
        values.isCashAllotted?.length === 0 ||
        (values.isDieselAllotted && !values.maxDieselAllotted) ||
        (values.isCashAllotted && !values.maxCashAllotted)
      ) {
        errors["isDieselAllotted"] = "Please fill all the below fields";
      }
      if (
        values.isSignedChallan?.length === 0 ||
        values.isWeighbridgeSlip?.length === 0
      ) {
        errors["isSignedChallan"] = "Please select all the below fields";
      }
    }
    if (details === 2) {
      if (
        values.EicDetails &&
        Array.isArray(values.EicDetails) &&
        values.EicDetails.length > 0
      ) {
        values.EicDetails.map((elem, index) => {
          let error = {};
          if (!elem.name) {
            error["name"] = "Required";
          }
          if (!elem.mobile) {
            error["mobile"] = "Required";
          } else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(elem.mobile)) {
              error["mobile"] = "Invalid mobile number format";
            }
          }
          if (!elem.designation) {
            error["designation"] = "Required";
          }
          if (!elem.email) {
            error["email"] = "Required";
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(elem.email)) {
              error["email"] = "Invalid email format";
            }
          }
          eicDetail[index] = error;
        });
        errors["EicDetails"] = eicDetail;
      }
    }
    if (details === 3) {
      if (
        values.projectManagers &&
        Array.isArray(values.projectManagers) &&
        values.projectManagers.length > 0
      ) {
        values.projectManagers.map((elem, index) => {
          let error = {};
          if (!elem.projectManagerId) {
            error["projectManagerId"] = "Required";
          }
          if (!elem.mobile) {
            error["mobile"] = "Required";
          } else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(elem.mobile)) {
              error["mobile"] = "Invalid mobile number format";
            }
          }
          // if (!elem.remarks) {
          //   error['remarks'] = 'Required'
          // }
          staffDetailProjManager[index] = error;
        });
        errors["projectManagers"] = staffDetailProjManager;
      }

      if (
        values.loadingExecutives &&
        Array.isArray(values.loadingExecutives) &&
        values.loadingExecutives.length > 0
      ) {
        values.loadingExecutives.map((elem, index) => {
          let error = {};
          if (
            !(projectReqList && !projectReqList[0]?.isFieldExecutiveLoading)
          ) {
            if (!elem.loadingExecutiveId) {
              error["loadingExecutiveId"] = "Required";
            }
            if (!elem.mobile) {
              error["mobile"] = "Required";
            } else {
              const mobileRegex = /^\d{10}$/;
              if (!mobileRegex.test(elem.mobile)) {
                error["mobile"] = "Invalid mobile number format";
              }
            }
          }
          // if (!elem.remarks) {
          //   error['remarks'] = 'Required'
          // }
          staffDetailLoading[index] = error;
        });
        errors["loadingExecutives"] = staffDetailLoading;
      }

      if (
        values.unloadingExecutives &&
        Array.isArray(values.unloadingExecutives) &&
        values.unloadingExecutives.length > 0
      ) {
        values.unloadingExecutives.map((elem, index) => {
          let error = {};
          if (
            !(projectReqList && !projectReqList[0]?.isFieldExecutiveUnloading)
          ) {
            if (!elem.unloadingExecutiveId) {
              error["unloadingExecutiveId"] = "Required";
            }
            if (!elem.mobile) {
              error["mobile"] = "Required";
            } else {
              const mobileRegex = /^\d{10}$/;
              if (!mobileRegex.test(elem.mobile)) {
                error["mobile"] = "Invalid mobile number format";
              }
            }
          }
          // if (!elem.remarks) {
          //   error['remarks'] = 'Required'
          // }
          staffDetailUnloading[index] = error;
        });
        errors["unloadingExecutives"] = staffDetailUnloading;
      }

      if (
        values.weighbridgeExecutive &&
        Array.isArray(values.weighbridgeExecutive) &&
        values.weighbridgeExecutive.length > 0
      ) {
        values.weighbridgeExecutive.map((elem, index) => {
          let error = {};
          if (
            !(projectReqList && !projectReqList[0]?.isFieldExecutiveWeighment)
          ) {
            if (!elem.weighbridgeExecutiveId) {
              error["weighbridgeExecutiveId"] = "Required";
            }
            if (!elem.mobile) {
              error["mobile"] = "Required";
            } else {
              const mobileRegex = /^\d{10}$/;
              if (!mobileRegex.test(elem.mobile)) {
                error["mobile"] = "Invalid mobile number format";
              }
            }
          }
          // if (!elem.remarks) {
          //   error['remarks'] = 'Required'
          // }
          staffDetailWeigh[index] = error;
        });
        errors["weighbridgeExecutive"] = staffDetailWeigh;
      }

      if (
        values.petrolPump &&
        Array.isArray(values.petrolPump) &&
        values.petrolPump.length > 0
      ) {
        values.petrolPump.map((elem, index) => {
          let error = {};
          if (
            !(projectReqList && !projectReqList[0]?.isFieldExecutiveFuelPump)
          ) {
            if (!elem.petrolPumpId) {
              error["petrolPumpId"] = "Required";
            }
            if (!elem.mobile) {
              error["mobile"] = "Required";
            } else {
              const mobileRegex = /^\d{10}$/;
              if (!mobileRegex.test(elem.mobile)) {
                error["mobile"] = "Invalid mobile number format";
              }
            }
          }
          // if (!elem.remarks) {
          //   error['remarks'] = 'Required'
          // }
          staffDetailPetrolpump[index] = error;
        });
        errors["petrolPump"] = staffDetailPetrolpump;
      }
    }
    if (details === 4) {
      if (
        values.transporterData &&
        Array.isArray(values.transporterData) &&
        values.transporterData.length > 0
      ) {
        values.transporterData.map((elem, index) => {
          let error = {};
          if (!elem.transporterNameId) {
            error["transporterNameId"] = "Required";
          }
          if (!elem.mobile) {
            error["mobile"] = "Required";
          } else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(elem.mobile)) {
              error["mobile"] = "Invalid mobile number format";
            }
          }
          if (!elem.paymentTerm) {
            error["paymentTerm"] = "Required";
          }
          if (!elem.dieselQuantity) {
            error["dieselQuantity"] = "Required";
          }
          if (!elem.tripCashAmount) {
            error["tripCashAmount"] = "Required";
          }
          if (!elem.transporterUnit) {
            error["transporterUnit"] = "Required";
          }
          if (!elem.unitRateAmount) {
            error["unitRateAmount"] = "Required";
          }
          if (!elem.gstRate) {
            error["gstRate"] = "Required";
          }
          if (!elem.transporterQuantity) {
            error["transporterQuantity"] = "Required";
          }
          transporterDetail[index] = error;
        });
        errors["transporterData"] = transporterDetail;
      }

      if (
        values.excavatorData &&
        Array.isArray(values.excavatorData) &&
        values.excavatorData.length > 0
      ) {
        values.excavatorData.map((elem, index) => {
          let error = {};
          if (!elem.excavatorNameId) {
            error["excavatorNameId"] = "Required";
          }
          if (!elem.mobile) {
            error["mobile"] = "Required";
          } else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(elem.mobile)) {
              error["mobile"] = "Invalid mobile number format";
            }
          }
          if (!elem.paymentTerm) {
            error["paymentTerm"] = "Required";
          }
          if (!elem.hoursPerMonth) {
            error["hoursPerMonth"] = "Required";
          }
          if (!elem.ratePerHourAmount) {
            error["ratePerHourAmount"] = "Required";
          }
          // if (!elem.isWithDiesel) {
          //   error['isWithDiesel'] = 'Required'
          // }
          if (!elem.gstRate) {
            error["gstRate"] = "Required";
          }

          excavatorDetail[index] = error;
        });
        errors["excavatorData"] = excavatorDetail;
      }

      if (
        values.petrolPumpData &&
        Array.isArray(values.petrolPumpData) &&
        values.petrolPumpData.length > 0
      ) {
        values.petrolPumpData.map((elem, index) => {
          let error = {};
          if (!elem.petrolPumpId) {
            error["petrolPumpId"] = "Required";
          }
          if (!elem.mobile) {
            error["mobile"] = "Required";
          } else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(elem.mobile)) {
              error["mobile"] = "Invalid mobile number format";
            }
          }
          if (!elem.totalCreditAmount) {
            error["totalCreditAmount"] = "Required";
          }
          if (!elem.discountPerLiter) {
            error["discountPerLiter"] = "Required";
          }
          if (!elem.reconciliationArrangement) {
            error["reconciliationArrangement"] = "Required";
          }
          petrolpumpDetail[index] = error;
        });
        errors["petrolPumpData"] = petrolpumpDetail;
      }
    }

    return errors;
  };

  // const isValidFileType = (file) => {
  //   const allowedFileTypes = ['pdf', 'doc', 'jpeg', 'jpg'];
  //   const fileType = file.name.split('.').pop().toLowerCase();
  //   return allowedFileTypes.includes(fileType);
  // };

  // const MAX_FILE_SIZE = 1024 * 1024 * 5

  return (
    <div className="ProjectAdmin">
      <div class="back_btn_all pt-0">
        <p onClick={() => router.push("/admin/project")}>
          <span class="back_icon">
            <img src="/images/back_icon.svg" alt="" class="img-fluid" />
          </span>
          Back
        </p>
      </div>
      {/* <div className='back_import'>
          <Button variant=""><span className='import_icon'><img src="/images/import_icon.svg" alt="" class="img-fluid" /></span>Import from .xlsx</Button>
        </div> */}

      <ul className="nav ProjectAdmin_tabs create_project_main">
        {DetailForm &&
          DetailForm?.map((steps, stepsIndex) => (
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
            mutators: { push, remove },
            change,
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
                <BasicDetails
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                  change={change}
                />
              )}
              {details === 1 && (
                <Requirment
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                  change={change}
                  touched={touched}
                />
              )}
              {details === 2 && (
                <EicDetails
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                />
              )}
              {details === 3 && (
                <StaffDetails
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                  change={change}
                />
              )}
              {details === 4 && (
                <VendorDetails
                  values={values}
                  errors={errors}
                  push={push}
                  remove={remove}
                  change={change}
                />
              )}
            </form>
          );
        }}
      />
    </div>
  );
};

export default CreateNewProject;
