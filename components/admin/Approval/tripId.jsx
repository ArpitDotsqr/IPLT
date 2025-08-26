import LoaderComponent from "@/components/comman_component/Loader";
import { apibasePath } from "@/config";
import {
  getTripByIdList,
  updateTripStatus,
} from "@/redux/actions/trip/tripDetail";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const TripApprovalPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [commentShow, setComments] = useState(true);
  const [comments, setCommentsValue] = useState("");

  const getTripDetail = useSelector((state) => state.tripSlice.tripDetailsById);
  const wightOfVehicle = useSelector((state) => state.tripSlice.weightData);
  const currentUserData = useSelector((state) => state.userSlice.getUserList);
  const loaderTripDetail = useSelector((state) => state.tripSlice.isLoading);

  //   console.log("Cancel", getTripDetail);

  useEffect(() => {
    if (router.query.id) {
      dispatch(getTripByIdList({ tripId: Number(router.query.id) }));
    }
  }, [dispatch, router.query.id]);

  const handleApproval = (Id) => {
    dispatch(
      updateTripStatus({
        approvalId: Number(3),
        id: Id,
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        router.push("/admin/approvals");
        toast.success("Approved");
      }
    });
  };

  const handleReject = (Id) => {
    if (comments.trim() === "") {
      setComments(false);
      toast.info("Please, add comments before rejecting");
    } else {
      dispatch(
        updateTripStatus({
          rejected: true,
          id: Id,
          comments: comments,
        })
      ).then((res) => {
        if (res?.payload?.data?.success) {
          router.push("/admin/approvals");
          toast.success("Rejected");
        }
      });
    }
  };

  const handleCancel = (Id) => {
    dispatch(
      updateTripStatus({
        cancelled: true,
        id: Id,
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        router.push("/admin/approvals");
        toast.success("Cancelled");
      }
    });
  };

  let loadingcity = "";
  let loadingstate = "";
  let loadingzipcode = "";

  const address1 = getTripDetail?.LoadingPointsDetails?.loadingAddress;

  if (address1) {
    const cityRegex = /^[^,]+,\s*([^,]+)/;
    const stateRegex =
      /\b(?:Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal)\b/i;

    const addressParts = address1.split(",").map((part) => part.trim());
    const lastPart = addressParts[addressParts.length - 1];
    const lastPartElements = lastPart.split(" ");
    const lastPartZip = lastPartElements.pop();

    if (/\b\d{6}(?:-\d{3})?\b/.test(lastPartZip)) {
      loadingzipcode = lastPartZip;
    }

    const cityMatch = address1.match(cityRegex);
    if (cityMatch) {
      loadingcity = cityMatch[1];
    }

    for (let i = 0; i < addressParts.length; i++) {
      const part = addressParts[i];

      if (stateRegex.test(part)) {
        loadingstate = part;
      }
    }
  }

  let unloadingcity = "";
  let unloadingstate = "";
  let unloadingzipcode = "";

  const address2 = getTripDetail?.UnoadingPointsDetails?.unloadingAddress;

  if (address2) {
    const cityRegex = /^[^,]+,\s*([^,]+)/;
    const stateRegex =
      /\b(?:Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal)\b/i;

    const addressParts = address2.split(",").map((part) => part.trim());
    const lastPart = addressParts[addressParts.length - 1];
    const lastPartElements = lastPart.split(" ");

    const lastPartZip = lastPartElements.pop();
    if (/\b\d{6}(?:-\d{3})?\b/.test(lastPartZip)) {
      unloadingzipcode = lastPartZip;
    }

    const cityMatch = address2.match(cityRegex);
    if (cityMatch) {
      unloadingcity = cityMatch[1];
    }

    for (let i = 0; i < addressParts.length; i++) {
      const part = addressParts[i];

      if (stateRegex.test(part)) {
        unloadingstate = part;
      }
    }
  }

  function Capitalize(data) {
    if (data) {
      return data[0].toUpperCase() + data.slice(1);
    }
  }

  // function formatTime(timeData) {
  //     if (timeData) {
  //         const timePart = timeData?.split(':')
  //         const hourMinute = `${timePart[0]} : ${timePart[1]}`
  //         return hourMinute
  //     }
  //     return "-"
  // }

  function formatTime(timeData) {
    if (!timeData) return ""; // Return empty string if timeData is not provided

    const date = new Date(timeData);
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  }

  return (
    <>
      {loaderTripDetail && <LoaderComponent />}

      <div className="ProjectAdmin">
        <div
          class="back_btn_all pt-0"
          onClick={() => router.push("/admin/approvals")}>
          <p>
            <span class="back_icon">
              <img src="/images/back_icon.svg" alt="" class="img-fluid" />
            </span>
            Back
          </p>
        </div>
        <div className="manger_edit_details_main">
          <div class="vendors_edit_detail_inner border-0">
            <h3>Trip Details</h3>
            <div className="vendorsDetailsTable">
              <div className="vendorsDetailsTableRow">
                <span>Trip Created by</span>
                <p>
                  {getTripDetail?.CreatedBy
                    ? getTripDetail?.CreatedBy?.name
                    : "-"}
                </p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Trip ID</span>
                <p>#TR-{getTripDetail.id}</p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Date</span>
                <p>{getTripDetail?.createdAt?.split("T")[0]}</p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Commodity</span>
                <p>{getTripDetail?.MaterialNames?.displayName}</p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Diesel Issued</span>
                <p>
                  {getTripDetail?.diesel ? `${getTripDetail?.diesel} L` : "-"}
                </p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Cash Issued</span>
                <p>{getTripDetail?.cash ? `₹ ${getTripDetail?.cash}` : "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="manger_edit_details_main">
          <div class="vendors_edit_detail_inner border-0">
            <h3>Transporter details</h3>
            <div className="vendorsDetailsTable project_manger_details vender_edit_delt">
              <div className="vendorsDetailsTableRow">
                <span>Vendor name</span>
                {getTripDetail.VehicleData?.length > 0 &&
                  getTripDetail.VehicleData.map((item, index) => (
                    <p key={index}>
                      {item?.VehicleNumber?.VendorsDetail?.name}
                    </p>
                  ))}
                {getTripDetail?.OtherVehicleDetail?.length > 0 &&
                  getTripDetail?.OtherVehicleDetail.map((item, index) => (
                    <p key={index}>{item?.vendorName}</p>
                  ))}
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Contact no.</span>
                {getTripDetail.VehicleData?.length > 0 ? (
                  getTripDetail.VehicleData.map((item, index) => (
                    <p key={index}>
                      {item?.VehicleNumber?.VendorsDetail?.mobile
                        ? item?.VehicleNumber?.VendorsDetail?.mobile
                        : "-"}
                    </p>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Vehicle no.</span>
                {getTripDetail.VehicleData?.length > 0 &&
                  getTripDetail.VehicleData.map((item, index) => (
                    <p key={index}>{item?.VehicleNumber?.vehicleNumber}</p>
                  ))}
                {getTripDetail?.OtherVehicleDetail?.length > 0 &&
                  getTripDetail?.OtherVehicleDetail.map((item, index) => (
                    <p key={index}>{item?.vehicleNumber}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className='manger_edit_details_main'>
                    <div class="vendors_edit_detail_inner border-0"><h3>Vehicle details</h3>
                        <div className='vendorsDetailsTable project_manger_details vender_edit_delt  '>
                            <div className="vendorsDetailsTableRow">
                                <span>Loading weight</span>
                                <p>{wightOfVehicle.loadingPointData.loadedtruckweight && wightOfVehicle.loadingPointData.loadedtruckweight[0]?.loadedTruckWeight} Metric ton</p>
                            </div>
                            <div className="vendorsDetailsTableRow">
                                <span>Unloading weight</span>
                                <p>{wightOfVehicle.loadingPointData.loadedtruckweight && wightOfVehicle.unloadingPointData.unloadedtruckWeight[0]?.unloadedTruckWeight} Metric ton</p>
                            </div>
                            <div className="vendorsDetailsTableRow">
                                <span>Material weight</span>
                                <p>{wightOfVehicle.unloadingPointData.unloadedtruckWeight && wightOfVehicle.unloadingPointData.unloadedtruckWeight[0]?.netWeight_in_Tons} Metric ton</p>
                            </div>
                        </div>
                    </div>
                </div> */}

        <div className="manger_edit_details_main">
          <div class="vendors_edit_detail_inner border-0">
            <h3>Vehicle details</h3>
            <div className="vendorsDetailsTable project_manger_details vender_edit_delt  ">
              <div className="vendorsDetailsTableRow">
                <span>Loading weight</span>
                <p>
                  {wightOfVehicle.loadingPointData &&
                  wightOfVehicle.loadingPointData.loadedtruckweight &&
                  wightOfVehicle.loadingPointData.loadedtruckweight[0]
                    ?.loadedTruckWeight
                    ? `${wightOfVehicle.loadingPointData.loadedtruckweight[0].loadedTruckWeight} Metric ton`
                    : "-"}
                </p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Unloading weight</span>
                <p>
                  {wightOfVehicle.unloadingPointData &&
                  wightOfVehicle.unloadingPointData.unloadedtruckWeight &&
                  wightOfVehicle.unloadingPointData.unloadedtruckWeight[0]
                    ?.unloadedTruckWeight
                    ? `${wightOfVehicle.unloadingPointData.unloadedtruckWeight[0].unloadedTruckWeight} Metric ton`
                    : "-"}
                </p>
              </div>
              <div className="vendorsDetailsTableRow">
                <span>Material weight</span>
                <p>
                  {wightOfVehicle.unloadingPointData &&
                  wightOfVehicle.unloadingPointData.unloadedtruckWeight &&
                  wightOfVehicle.unloadingPointData.unloadedtruckWeight[0]
                    ?.netWeight_in_Tons
                    ? `${wightOfVehicle.unloadingPointData.unloadedtruckWeight[0].netWeight_in_Tons} Metric ton`
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="manger_edit_details_main">
          <div class="vendors_edit_detail_inner border-0">
            <h3>Loading address</h3>
            <div className="vendorsDetailsTable project_manger_details vender_edit_delt  ">
              <div className="vendorsDetailsTableRow">
                <span>Street address</span>
                <p>{getTripDetail?.LoadingPointsDetails?.loadingAddress}</p>
              </div>
              {/* <div className="vendorsDetailsTableRow">
                                <span>City</span>
                                <p>{loadingcity}</p>
                            </div> */}
              <div className="vendorsDetailsTableRow">
                <span>State</span>
                <p>{loadingstate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="manger_edit_details_main">
          <div class="vendors_edit_detail_inner border-0">
            <h3>Unloading address</h3>
            <div className="vendorsDetailsTable project_manger_details vender_edit_delt  ">
              <div className="vendorsDetailsTableRow">
                <span>Street address</span>
                <p>{getTripDetail?.UnoadingPointsDetails?.unloadingAddress}</p>
              </div>
              {/* <div className="vendorsDetailsTableRow">
                                <span>City</span>
                                <p>{unloadingcity}</p>
                            </div> */}
              <div className="vendorsDetailsTableRow">
                <span>State</span>
                <p>{unloadingstate ? unloadingstate : "-"}</p>
              </div>
            </div>
          </div>
        </div>
        {/* : "/images/no-image.png" */}
        <div
          className="manger_edit_details_main"
          style={{
            display:
              getTripDetail?.LoadingWeightData?.length > 0 ? "block" : "none",
          }}>
          <div class="vendors_edit_detail_inner border-0">
            {getTripDetail?.LoadingWeightData?.length > 0 && (
              <h3>Attachments</h3>
            )}
            <div className="vendorsDetailsTable project_manger_details vender_edit_delt">
              {getTripDetail?.LoadingWeightData?.length > 0 &&
                getTripDetail?.LoadingWeightData?.map((item, index) => (
                  <div className="" key={index}>
                    <h6>{`${Capitalize(item?.types)} Image`}</h6>
                    <Col md={2}>
                      <Image
                        width={200}
                        height={200}
                        src={`${apibasePath}documents/userPdf/${item.image}`}
                        alt=""
                      />
                    </Col>
                    <div className="d-flex">
                      <span>Uploaded by:</span>
                      <p className="ps-2">{item?.uploadedBy}</p>
                    </div>
                    <p>
                      {formatTime(item?.createdAt)}/
                      {item?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                ))}
              {getTripDetail?.UnloadingWeightData?.length > 0 &&
                getTripDetail?.UnloadingWeightData?.map((item, index) => (
                  <div className="" key={index}>
                    <h6>{`${Capitalize(item?.types)} Image`}</h6>
                    <Col md={2}>
                      <Image
                        width={200}
                        height={200}
                        src={`${apibasePath}documents/userPdf/${item.image}`}
                        alt=""
                      />
                    </Col>
                    <div className="d-flex">
                      <span>Uploaded by:</span>
                      <p className="ps-2">{item?.uploadedBy}</p>
                    </div>
                    <p>
                      {formatTime(item?.createdAt)}/
                      {item?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* comment below */}

        <div className="manger_edit_details_main">
          <h4>Comment</h4>
          <textarea
            placeholder=""
            id="w3review"
            name="w3review"
            className="text_area"
            disabled={commentShow}
            value={
              comments ||
              (getTripDetail &&
                getTripDetail.Comments &&
                getTripDetail.Comments[0] &&
                getTripDetail.Comments[0].comments)
            }
            onChange={(e) => setCommentsValue(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end approval_page_btn">
          {getTripDetail.ApprovalStatus?.key !== "rejected" && (
            <>
              <div className="reject_btn">
                <Button
                  type="submit"
                  // disabled={currentUserData.roleId === 2 ? true : currentUserData.roleId === 1 && false}
                  disabled={getTripDetail?.ApprovalStatus?.key === "cancelled"}
                  onClick={() => handleCancel(getTripDetail?.id)}>
                  <span>
                    {" "}
                    <img src={"/images/reject_icon.svg"} alt="" />
                  </span>
                  Cancel
                </Button>
              </div>
              <div className="reject_btn">
                <Button
                  type="submit"
                  // disabled={currentUserData.roleId === 2 ? true : currentUserData.roleId === 1 && false}
                  onClick={() => handleReject(getTripDetail?.id)}>
                  <span>
                    {" "}
                    <img src={"/images/reject_icon.svg"} alt="" />
                  </span>
                  Reject
                </Button>
              </div>
            </>
          )}
          <div className="approve_btn">
            <Button
              type="submit"
              // disabled={currentUserData.roleId === 2 ? true : currentUserData.roleId === 1 && false}
              onClick={() => handleApproval(getTripDetail?.id)}>
              <span>
                {" "}
                <img src={"/images/approve_icon.svg"} alt="" />
              </span>
              Approve
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripApprovalPage;
