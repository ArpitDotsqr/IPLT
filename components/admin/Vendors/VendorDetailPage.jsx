import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Image from "next/image";
import {
  getVendorDataById,
  vendorTripDetailCount,
} from "@/redux/actions/vendor/vendorActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "@/components/comman_component/Loader";
import ViewModal from "@/components/comman_component/ViewDocumentModal";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  getTripDataById,
  getTripDetails,
} from "@/redux/actions/trip/tripDetail";
import Tripmodel from "../Trips/Tripmodel";
import NoDataPage from "@/components/comman_component/NoDataPage";
import Pagination from "../Pagination";
import UserDataModal from "@/components/comman_component/UserDataModal";

const VendorDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showImageModel, setShowImageModel] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState();
  const [activeFilter, setActiveFilter] = useState("");
  const [graphFilter, setGraphFilter] = useState("");
  const [dropDownModal, setDropDownModal] = useState(false);
  const [show, setShow] = useState(false);
  const [tripIds, setTripId] = useState(null);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });
  const [selectedImageFile, setSelectedImageFile] = useState();

  const vendorDataById = useSelector(
    (state) => state.vendorSlice.particularVendorData
  );
  const LoaderVendorData = useSelector((state) => state.vendorSlice.isLoading);

  const vendorAllTripCount = useSelector(
    (state) => state.vendorSlice.allTripVendorGraphCount
  );
  const vendorCompletedTripCount = useSelector(
    (state) => state.vendorSlice.allCompletedVendorGraphCount
  );
  const vendorOngoingTripCount = useSelector(
    (state) => state.vendorSlice.allOngingVendorGraphCount
  );

  const tripDetailsList = useSelector(
    (state) => state.tripSlice.allTripDetails
  );
  const countVendorTrip = useSelector((state) => state.tripSlice.tripCount);
  const tripDataById = useSelector(
    (state) => state.tripSlice.particularTripData
  );

  useEffect(() => {
    const id = Number(router.query.id);
    if (id) {
      dispatch(getVendorDataById({ id }));
      dispatch(vendorTripDetailCount({ vendorId: id, filter: graphFilter }));

      if (dropDownModal) {
        dispatch(
          getTripDetails({
            tripStatus: dropDownModal,
            vendorId: id,
            filter: graphFilter,
            ...pagination,
          })
        );
      }

      if (tripIds) {
        dispatch(getTripDataById({ tripId: tripIds }));
      }
    }
  }, [router.query.id, graphFilter, dropDownModal, tripIds, pagination]);

  const handleView = (img1, img2, img3, img4, img5, img6) => {
    setSelectedFileData([img1, img2, img3, img4, img5, img6]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFileData("");
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const FuncData = (label, graphdata, backgroundColor) => ({
    labels: [],
    datasets: [
      {
        label: label,
        data: graphdata,
        backgroundColor: backgroundColor,
        width: "20px",
        cutout: "70%",
      },
    ],
  });

  const allVendorExeData = FuncData(
    "",
    [vendorOngoingTripCount, vendorCompletedTripCount],
    ["#165DFF", " #50CD89"]
  );
  const onGoingVendorExeData = FuncData(
    "",
    [vendorOngoingTripCount, vendorCompletedTripCount],
    ["#165DFF", "#F2F2F2"]
  );
  const completedVendorExeData = FuncData(
    "",
    [vendorOngoingTripCount, vendorCompletedTripCount],
    ["#F2F2F2", "#50CD89"]
  );

  const handleFilterChange = (val) => {
    setGraphFilter(val);
    setActiveFilter(val);
  };

  const handleDropDownBtn = (type) => {
    setDropDownModal((prevState) => (prevState === type ? null : type));
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setTripId(id);
  };

  const handleViewImage = (fileData) => {
    console.log(fileData, "Asdasdasdasd")
    setSelectedImageFile(fileData);
    setShowImageModel(true);
  };

  const handleCloseImageModel = () => {
    setShowImageModel(false);
    setSelectedImageFile("");
  };
  return (
    <>
      {LoaderVendorData && <LoaderComponent />}
      <div className="VendorsEditDetailSection">
        <div class="back_btn_all" onClick={() => router.push("/admin/vendors")}>
          <p>
            <span class="back_icon">
              <img src="/images/back_icon.svg" alt="" class="img-fluid" />
            </span>
            Back
          </p>
        </div>
        {vendorDataById &&
          vendorDataById.map((vendordata, ind) => (
            <div className="manger_edit_details_main" key={ind}>
              <div className="edit_manger_active d-flex justify-content-end">
                <Button
                  variant=""
                  className="pt-0"
                  onClick={() =>
                    router.push(`/admin/vendors/edit/${vendordata?.id}`)
                  }
                >
                  Edit Details
                </Button>
              </div>
              <div class="vendors_edit_detail_inner VendorInformation">
                <h3>Vendor Details</h3>
                <div className="vendorsDetailsTable  ">
                  <div className="vendorsDetailsTable  ">
                    <div className="vendorsDetailsTableRow">
                      <span>Organization Name</span>
                      <p>{vendordata?.UserDetail?.orgTypes?.name}</p>
                    </div>
                    <div className="vendorsDetailsTableRow">
                      <span>Vendor Type</span>
                      <p>{vendordata?.UserDetail?.vendorTypes?.displayName}</p>
                    </div>
                    <div className="vendorsDetailsTableRow">
                      <span>Organization Type</span>
                      <p>{vendordata?.UserDetail?.orgTypes?.displayName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vendors_edit_detail_inner">
                <h3>Communication Address</h3>
                <div className="vendorsDetailsTable  ">
                  <div className="vendorsDetailsTableRow">
                    <span>Address</span>
                    <p>
                      {vendordata?.communicationAddress
                        ?.communicationStreetAddress
                        ? vendordata?.communicationAddress
                            ?.communicationStreetAddress
                        : "-"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>State</span>
                    <p>
                      {vendordata?.communicationAddress?.communicationState
                        ? vendordata?.communicationAddress?.communicationState
                        : "-"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>City</span>
                    <p>
                      {vendordata?.communicationAddress?.communicationCity
                        ? vendordata?.communicationAddress?.communicationCity
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div class="vendors_edit_detail_inner">
                <h3>Registred Address</h3>
                <div className="vendorsDetailsTable  ">
                  <div className="vendorsDetailsTableRow">
                    <span>Address</span>
                    <p>
                      {vendordata?.registeredAddress?.registeredStreetAddress
                        ? vendordata?.registeredAddress?.registeredStreetAddress
                        : "-"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>State</span>
                    <p>
                      {vendordata?.registeredAddress?.registeredState
                        ? vendordata?.registeredAddress?.registeredState
                        : "-"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>City</span>
                    <p>
                      {vendordata?.registeredAddress?.registeredCity
                        ? vendordata?.registeredAddress?.registeredCity
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div class="vendors_edit_detail_inner">
                <h3>Contact Details</h3>
                <div className="vendorsDetailsTable">
                  <div className="vendorsDetailsTableRow">
                    <span>Contact no.</span>
                    {vendordata.VendorContactDetail?.map((item, ind) => (
                      <p key={ind}>{item?.mobile}</p>
                    ))}
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>Email ID</span>
                    {vendordata.VendorContactDetail?.map((item, ind) => (
                      <p key={ind}>{item?.email}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div class="vendors_edit_detail_inner">
                <h3>Documents</h3>
                <div className="vendorsDetailsTable project_manger_details vender_edit_delt  ">
                  <div className="vendorsDetailsTableRow">
                    <span>PAN No.</span>
                    <p>
                      {vendordata?.UserDetail?.pan
                        ? vendordata?.UserDetail?.pan
                        : "_"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>GST No.</span>
                    <p>
                      {vendordata?.UserDetail?.gstNumber
                        ? vendordata?.UserDetail?.gstNumber
                        : "_"}
                    </p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>Bank Details</span>
                    <p onClick={() => handleViewImage(vendordata?.UserDocuments?.cancelChequeImage)}>
                      {vendordata?.UserDocuments?.cancelChequeImage
                        ? vendordata?.UserDocuments?.cancelChequeImage
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <span>Cancel Cheque</span>
                    <p onClick={() => handleViewImage(vendordata?.UserDocuments?.cancelChequeImage)}>
                      {vendordata?.UserDocuments?.cancelChequeImage
                        ? vendordata?.UserDocuments?.cancelChequeImage
                        : "_"}
                    </p>
                  </div>
                  <div   >
                    <span> GST Image</span>
                    <p onClick={() => handleViewImage(vendordata?.UserDocuments?.gstImage)}>
                      {vendordata?.UserDocuments?.gstImage
                        ? vendordata?.UserDocuments?.gstImage
                        : "_"}
                    </p>
                  </div>
                  <div>
                    <span> Pan Card Front Image</span>
                    <p onClick={() => handleViewImage(vendordata?.UserDocuments?.panCardFrontImage)}>
                      {vendordata?.UserDocuments?.panCardFrontImage
                        ? vendordata?.UserDocuments?.panCardFrontImage
                        : "_"}
                    </p>
                  </div>
                  <div>
                    <span>
                      {" "}
                      Pan Card Back Image
                    </span>
                    <p  onClick={() =>
                        handleViewImage(
                          vendordata?.UserDocuments?.panCardBackImage
                        )
                      }>
                      {vendordata?.UserDocuments?.panCardBackImage
                        ? vendordata?.UserDocuments?.panCardBackImage
                        : "_"}
                    </p>
                  </div>
                </div>
              </div>
              <div class="vendors_edit_detail_inner vender_aset_details">
                <h3>Asset details</h3>
                <div className="vendorsDetailsTable  ">
                  <div className="vendorsDetailsTableRow">
                    <span>Owned</span>
                    <p>{vendordata?.UserDetail?.ownedVehicles}</p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>Rented</span>
                    <p>{vendordata?.UserDetail?.rentedVehicles}</p>
                  </div>
                  <div className="vendorsDetailsTableRow">
                    <span>Mobilization time</span>
                    <p>{vendordata?.UserDetail?.moblizationTime}</p>
                  </div>
                </div>
                <div className="vendor_details_edit_view ">
                  <div className="table-responsive vendor_table_responsive">
                    <Table>
                      <thead>
                        <tr>
                          <th>Vehicle No.</th>
                          <th>Vehicle Type</th>
                          <th>Wheels</th>
                          <th>Vehicle Capacity</th>
                          <th>Vehicle TareWeight</th>
                          <th>Documents</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendordata?.UserAssets?.map((item, index) => (
                          <tr key={index}>
                            <td>{item?.vehicleNumber}</td>
                            <td>{item?.vehicleTypeIds?.displayName}</td>
                            <td>{item?.vehicleWheels}</td>
                            <td>{item?.vehicleCapacity} Metric Ton</td>
                            <td>{item?.vehicleTareWeight}</td>
                            <td
                              onClick={() =>
                                handleView(
                                  `${item.rcImageFront}=RcBack Image`,
                                  `${item.rcImageBack}=RcFront Image`,
                                  `${item.otherImage}=other`,
                                  `${item.insuranceImage}=Insurance Image`,
                                  `${item.fitnessValidityImage}=fitness Image`,
                                  `${item.drivingLicenseImage}=driving Licence Image`
                                )
                              }
                            >
                              <span className="password_visiable">
                                <Image
                                  width={20}
                                  height={30}
                                  src="/images/visibility_icon.svg"
                                  alt=""
                                  class="img-fluid"
                                />
                              </span>{" "}
                              View
                            </td>
                            {/* <td><div className=''><span>
                                                        <Image width={20} height={20} src="/images/edit_icon.svg" alt='' /></span>
                                                        <span> <Image width={20} height={20} src="/images/delete_icon.svg" alt='' /></span></div>
                                                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="manger_edit_details_main trip_edit_main">
          {/* {vendorOngoingTripCount !== 0 || vendorAllTripCount !== 0 || vendorCompletedTripCount !== 0 ? (
                        <> */}
          <div className="manger_edit_details_trip Executive_Trip_details">
            <h2 className="mb-0">Vendor Trip details</h2>
            <div className="manger_edit_details_trip_inner d-flex">
              <p className="mb-0">
                <Button
                                    className={`manger_edit_details_trip_inner ${activeFilter === '' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('')}
                >
                  All
                </Button>
              </p>
                            <p className='mb-0'>
                <Button
                  className={`manger_edit_details_trip_inner ${
                    activeFilter === "day" ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("day")}
                >
                  Day
                </Button>
              </p>
              <p className="mb-0">
                <Button
                  className={`manger_edit_details_trip_inner ${
                    activeFilter === "week" ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("week")}
                >
                  Week
                </Button>
              </p>
              <p className="mb-0">
                <Button
                  className={`manger_edit_details_trip_inner ${
                    activeFilter === "month" ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("month")}
                >
                  Month
                </Button>
              </p>
            </div>
          </div>
          <div className="manger_edit_details_trip_item">
            <div className="manger_trip_details_ ">
              <div className="manger_edit_image_bar_main row">
                <div className="manger_edit_image_bar_main row justify-content-around">
                  <div className="manger_edit_image_bar_inner col-sm-2">
                    <Doughnut data={allVendorExeData} />
                    <div className="m-4">
                      <h5>All Trips</h5>
                      <h2>
                        {vendorAllTripCount < 10
                          ? `0${vendorAllTripCount}`
                          : `${vendorAllTripCount}`}
                      </h2>
                    </div>
                  </div>

                  <div className="manger_edit_image_bar_inner col-sm-2">
                    <Doughnut data={onGoingVendorExeData} />
                    <div className="m-4">
                      <h5>
                        {" "}
                        <span className="m-lg-1">On-going Trips</span>
                        <Image
                          onClick={() => handleDropDownBtn("ongoing")}
                          height={15}
                          width={15}
                          src={"/images/down-arrow-black.svg"}
                        />
                      </h5>
                      <h2>
                        {vendorOngoingTripCount < 10
                          ? `0${vendorOngoingTripCount}`
                          : `${vendorOngoingTripCount}`}
                      </h2>
                    </div>
                  </div>

                  <div className="manger_edit_image_bar_inner col-sm-2">
                    <Doughnut data={completedVendorExeData} />
                    <div className="m-4">
                      <h5>
                        <span className="m-1">Completed Trips</span>
                        <Image
                          onClick={() => handleDropDownBtn("completed")}
                          height={15}
                          width={15}
                          src={"/images/down-arrow-black.svg"}
                        />
                      </h5>
                      <h2>
                        {vendorCompletedTripCount < 10
                          ? `0${vendorCompletedTripCount}`
                          : `${vendorCompletedTripCount}`}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </>
                    ) : <NoDataPage />} */}
        </div>

        {dropDownModal && (
          <div className="manger_edit_details_main trip_edit_main">
            <div className="manger_edit_details_trip d-flex justify-content-between">
              <h2 className="mb-0"> {dropDownModal} trips</h2>
              <div className="completed_trip_content d-flex"></div>
            </div>
            <div className="manageUserCompletedTripsTable">
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Date</th>
                      <th>Commodity</th>
                      <th>Diesel Issued</th>
                      <th>Cash</th>
                      <th>Un-loading Address</th>
                      <th>Load</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tripDetailsList?.length > 0 &&
                      tripDetailsList.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item?.id < 10 ? `#0${item?.id}` : `#${item?.id}`}
                          </td>
                          <td>{item.createdAt.split("T")[0]}</td>
                          <td>{item.MaterialNames.displayName}</td>
                          <td>{item.diesel}</td>
                          <td>₹{item.cash}</td>
                          <td>{item.UnoadingPointsDetails.unloadingAddress}</td>
                          <td>-</td>
                          <td>
                            <Button onClick={() => handleShow(item?.id)}>
                              View details
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
        {dropDownModal && countVendorTrip > 0 && (
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            list={tripDetailsList}
            count={countVendorTrip}
          />
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="TripAdminModal"
      >
        <Modal.Body>
          <div className="modal_header">
            <Button onClick={handleClose}>
              {" "}
              <img src="/images/back_icon.svg" /> Back
            </Button>
          </div>
          <div className="TripsModalBody">
            {/* <span className='Running_span'>{item?.TripStatus?.name}</span> */}

            <Tripmodel tripDataById={tripDataById} />
          </div>
        </Modal.Body>
      </Modal>

      {/* modal for image */}
      <ViewModal
        showModal={showModal}
        handleClose={handleCloseModal}
        fileData={selectedFileData}
      />

      <UserDataModal
        showModal={showImageModel}
        handleClose={handleCloseImageModel}
        fileData={selectedImageFile}
      />
    </>
  );
};

export default VendorDetailPage;
