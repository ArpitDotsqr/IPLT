import {
  getAllFleetDetails,
  getAllProjectDetails,
  getProjectTripGraphData,
  getTripDetailPerProject,
} from "@/redux/actions/project/projectData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import debounce from "debounce";
import {
  getTripDataById,
  getTripDetails,
} from "@/redux/actions/trip/tripDetail";
import Tripmodel from "../Trips/Tripmodel";
import { getAllManagerUser } from "@/redux/actions/manageuser/manageruserlist";
import { getAllVendorsList } from "@/redux/actions/vendor/vendorActions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoaderComponent from "@/components/comman_component/Loader";
import MapComponent from "./MapComponent";
import TripPerformence from "./TripPerformence";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [tripIds, setTripId] = useState(null);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });
  const [activeFilter, setActiveFilter] = useState("");
  const [graphFilter, setGraphFilter] = useState("");

  const fleetDetails = useSelector(
    (state) => state?.projectSlice?.allFleetDetails
  );

  const projectDetailList = useSelector(
    (state) => state.projectSlice.allprojectDetailList?.rows
  );
  const projectDetailCount = useSelector(
    (state) => state.projectSlice.allprojectDetailList?.count
  );

  const graphProjectDetail = useSelector(
    (state) => state.projectSlice.barGraphProjectData
  );
  const loader = useSelector((state) => state.projectSlice.isLoading);

  const tripsCount = useSelector((state) => state.tripSlice.tripCount);
  const tripDetailsList = useSelector(
    (state) => state.tripSlice.allTripDetails
  );

  const getManagerUserData = useSelector(
    (state) => state.managerUserSlice?.managerUserList.rows
  );
  const countUserData = useSelector(
    (state) => state.managerUserSlice?.countUser
  );

  const getAllVendorLists = useSelector(
    (state) => state.vendorSlice.vendorList?.rows
  );
  const getAllVendorListCount = useSelector(
    (state) => state.vendorSlice.vendorList?.count
  );

  const allTripProjGraphData = useSelector(
    (state) => state.projectSlice.AllTripCount
  );
  const completedTripProjGraphData = useSelector(
    (state) => state.projectSlice.AllCompletedTripCount
  );
  const ongoingTripProjGraphData = useSelector(
    (state) => state.projectSlice.AllOngoingTripCount
  );
  const totalWeight = useSelector(
    (state) => state.projectSlice.totalAllTriWeight
  );

  const projectTripDetail = useSelector(
    (state) => state.projectSlice.allProjectTripDetail
  );

  useEffect(() => {
    dispatch(getAllProjectDetails({ ...pagination }));
    dispatch(getTripDetails({ tripStatus: ["completed"], ...pagination }));
    dispatch(
      getAllManagerUser({
        user: ["projectmanager", "fieldexecutive", "mis"],
        ...pagination,
      })
    );
    dispatch(
      getAllVendorsList({
        vendorType: ["transporter", "excavator", "petrolpump"],
        ...pagination,
      })
    );
    if (tripIds) {
      dispatch(getTripDataById({ tripId: tripIds }));
    }
  }, [dispatch, pagination, tripIds]);

  // for graph
  useEffect(() => {
    // dispatch(getTripDetailPerProject({ filter: graphFilter }))
    let obj = { pageNo: 1, pageSize: 40 };
    obj[graphFilter] = true;
    dispatch(getProjectTripGraphData(obj));
  }, [graphFilter]);

  const handleSearchTrip = debounce((searchItem) => {
    dispatch(getTripDetails({ search: Number(searchItem), ...pagination }));
  }, 400);

  const handleSearch = debounce((searchItem) => {
    dispatch(getAllProjectDetails({ search: searchItem, ...pagination }));
  }, 400);

  const handleSearchUser = debounce((searchItem) => {
    dispatch(getAllManagerUser({ search: searchItem, ...pagination }));
  }, 400);

  const handleSearchVendor = debounce((searchItem) => {
    dispatch(getAllVendorsList({ search: searchItem, ...pagination }));
  }, 400);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setTripId(id);
  };

  const labels =
    graphProjectDetail &&
    graphProjectDetail?.map((projname) => projname.projectName);

  const combinedData = graphProjectDetail?.map((proj) => ({
    projectName: proj.projectName,
    completedTrips: [proj.CompletedTripCount],
    ongoingTrips: [proj.OnGoingTripCount],
  }));

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Trips",
        data: combinedData?.map((data) => data.completedTrips),
        backgroundColor: "#50CD89",
      },
      {
        label: "Ongoing Trips",
        data: combinedData?.map((data) => data.ongoingTrips),
        backgroundColor: "#165DFF",
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const handleFilterChange = (val) => {
    setGraphFilter(val);
    setActiveFilter(val);
  };

  const getTripDetail = (projectId) => {
    if (projectId) {
      return projectTripDetail.find((trip) => trip.id === projectId);
    }
  };

  useEffect(() => {
    dispatch(getAllFleetDetails());
  }, []);

  return (
    <>
      {loader && <LoaderComponent />}
      <div className="Admin_DashboardPage">
        <Row className="Admin_DashboardPage_gap">
          <Col md={12}>
            <div className="DashboardPage_inner_detail">
              <div className="about_trips_detail">
                <Row className="about_trips_detail_inner">
                  {/* <Col>
                    <div className="about_trips_detail_inner_col">
                      <div className="right_col">
                        <p>Total Registered fleet</p>
                        {/* <h2>{totalWeight ? Number(totalWeight.toFixed(2)) : 0} <p>Metric tons</p></h2> */}
                  {/* <h2>
                          {fleetDetails?.TotalRegisteredFleet} <p></p>
                        </h2> */}
                  {/* </div> */}
                  {/* <div className="left_col"> */}
                  {/* <span className='span_first'><Image width={20} height={20} src={'/images/down_arrow.svg'} />112%</span> */}
                  {/* <span className='span_secound'> per month </span> */}
                  {/* </div> */}
                  {/* </div> */}
                  {/* </Col> */}
                  <Col>
                    <div className="about_trips_detail_inner_col">
                      <div className="right_col">
                        <p>Active Vehicle</p>
                        <h2>{fleetDetails?.ActiveFleetCount}</h2>
                      </div>
                      <div className="left_col">
                        {/* <span className='span_first'><Image width={20} height={20} src={'/images/down_arrow.svg'} />112%</span> */}
                        {/* <span className='span_secound'> per month </span> */}
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="about_trips_detail_inner_col">
                      <div className="right_col">
                        <p>Active Projects</p>
                        <h2>{fleetDetails?.ActiveProjectCount}</h2>
                      </div>
                      <div className="left_col">
                        {/* <span className='span_first'><Image width={20} height={20} src={'/images/down_arrow.svg'} />112%</span> */}
                        {/* <span className='span_secound'> per month </span> */}
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="about_trips_detail_inner_col">
                      <div className="right_col">
                        <p>All On-Going Trips</p>
                        <h2>{fleetDetails?.OngoingTripCount}</h2>
                      </div>
                      <div className="left_col">
                        {/* <span className='span_first'><Image width={20} height={20} src={'/images/down_arrow.svg'} />112%</span> */}
                        {/* <span className='span_secound'> per month </span> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="pychart">
                <Row>
                  <Col md={12}>
                    {/* <img src={'/images/chart.png'} alt='pychart' width={'100%'} className='img-fluid mt-5' /> */}
                    {/* <Bar options={options} data={data} /> */}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          {/* <MapComponent /> */}
          <TripPerformence />
          <Col md={12}>
            <div className="approvalsPage_inner_detail">
              <div className="approvalsPage_main_detail">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h2>Projects</h2>
                  </Col>
                  <Col md={6}>
                    <div className="ProjectID">
                      <input
                        placeholder="Enter Project name..."
                        type="text"
                        onChange={(e) => {
                          handleSearch(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Project ID</th>
                        <th>Project Name</th>
                        {/* <th>Project Site</th> */}
                        <th>Project Manager</th>
                        <th>Unloading Address</th>
                        <th>Total weights</th>
                        <th>Total trips</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectDetailList &&
                        projectDetailList?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                #PRJ-
                                {item.id < 10 ? `0${item.id}` : `${item.id}`}
                              </td>
                              <td>{item?.projectName}</td>
                              {/* <td>
                            {item?.ProjectSite?.map((site, siteIndex) => (
                              <div key={siteIndex}>{site.loadingAddress}</div>
                            ))}
                          </td> */}
                              <td>
                                {item?.ProjectManager?.map(
                                  (manager, mangeIndex) => (
                                    <div key={mangeIndex}>
                                      {manager.ProjectManagerName.name
                                        ? manager.ProjectManagerName.name
                                        : "-"}
                                    </div>
                                  )
                                )}
                              </td>
                              <td className="loadingAddress">
                                {item?.UnloadingAddressData?.map(
                                  (unloading, unIndex) => (
                                    <div key={unIndex}>
                                      {unloading.unloadingAddress}
                                    </div>
                                  )
                                )}
                              </td>
                              <td>{getTripDetail(item.id)?.totalWeight}</td>
                              <td>{getTripDetail(item.id)?.AllTripCount}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/admin/project/details/${item.id}`
                                    )
                                  }>
                                  View Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <Col md={12} className="mt-3">
              {projectDetailCount > 0 ? (
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  list={projectDetailList}
                  count={projectDetailCount}
                />
              ) : (
                ""
              )}
            </Col>
          </Col>

          <Col md={12}>
            <div className="approvalsPage_inner_detail">
              <div className="approvalsPage_main_detail">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h2>Completed Trips</h2>
                  </Col>
                  <Col md={6}>
                    <div className="ProjectID">
                      <input
                        placeholder="Enter Trip ID..."
                        type="text"
                        onChange={(e) => handleSearchTrip(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Trip ID</th>
                        <th>Commodity</th>
                        <th>Diesel Issued</th>
                        <th>Cash</th>
                        <th>Un-loading Address</th>
                        <th>Load</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tripDetailsList &&
                        tripDetailsList?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                #TR-
                                {item.id < 10 ? `0${item.id}` : `${item.id}`}
                              </td>
                              <td>{item?.MaterialNames?.displayName}</td>
                              <td>
                                {item?.diesel ? `${item?.diesel} L` : "-"}
                              </td>
                              <td>{item?.cash ? `₹ ${item?.cash}` : "-"}</td>
                              <td className="loadingAddress">
                                {item?.UnoadingPointsDetails?.unloadingAddress}
                              </td>
                              <td>-</td>
                              <td>
                                <button onClick={() => handleShow(item?.id)}>
                                  View Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="TripAdminModal">
                    <Modal.Body>
                      <div className="modal_header">
                        <Button onClick={handleClose}>
                          {" "}
                          <img src="/images/back_icon.svg" /> Back
                        </Button>
                      </div>
                      <div className="TripsModalBody">
                        <Tripmodel />
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
            <Col md={12} className="mt-3">
              {tripsCount > 0 ? (
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  list={tripDetailsList}
                  count={tripsCount}
                />
              ) : (
                ""
              )}
            </Col>
          </Col>
          <Col md={12}>
            <div className="approvalsPage_inner_detail">
              <div className="approvalsPage_main_detail">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h2>Users</h2>
                  </Col>
                  <Col md={6}>
                    <div className="ProjectID">
                      <input
                        placeholder="Enter User ID..."
                        type="text"
                        onChange={(e) => {
                          handleSearchUser(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Full name</th>
                        <th> Job role</th>
                        <th>Mobile no.</th>
                        <th> Address</th>
                        <th>Total trips</th>
                        <th>Total projects</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getManagerUserData &&
                        getManagerUserData?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {item?.id < 10
                                  ? `#TECH 0${item?.id}`
                                  : `#TECH ${item?.id}`}
                              </td>
                              <td>{item?.name}</td>
                              <td>{item?.Role?.title}</td>
                              <td>{item?.mobile}</td>
                              <td className="loadingAddress">
                                {item?.UserDetail?.streetAddress}
                              </td>
                              <td>{item?.TripCount}</td>
                              <td>{item?.ProjectCount}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    router.push(`/admin/manageusers/${item.id}`)
                                  }>
                                  View Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <Col md={12} className="mt-3">
              {countUserData > 0 ? (
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  list={getManagerUserData}
                  count={countUserData}
                />
              ) : (
                ""
              )}
            </Col>
          </Col>
          <Col md={12}>
            <div className="approvalsPage_inner_detail">
              <div className="approvalsPage_main_detail">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h2>Vendors</h2>
                  </Col>
                  <Col md={6}>
                    <div className="ProjectID">
                      <input
                        placeholder="Enter Vendor ID..."
                        type="text"
                        onChange={(e) => {
                          handleSearchVendor(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Vendor ID</th>
                        <th>Name</th>
                        <th> Total vehicles</th>
                        <th>Mobile no.</th>
                        <th> Address</th>
                        <th>Total trips</th>
                        <th>Total projects</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllVendorLists &&
                        getAllVendorLists?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                #TR-
                                {item.id < 10 ? `0${item.id}` : `${item.id}`}
                              </td>
                              {/* <td>{item?.UserDetail?.orgTypes?.displayName}</td> */}
                              <td>{item?.name}</td>
                              <td>{item?.UserAssets.length}</td>
                              <td className="loadingAddress">
                                {item?.VendorContactDetail?.map((item, ind) => (
                                  <div key={ind}>{item.mobile}</div>
                                ))}
                              </td>
                              <td>
                                {item?.registeredAddress
                                  ?.registeredStreetAddress
                                  ? `${item?.registeredAddress?.registeredStreetAddress}`
                                  : "-"}
                              </td>
                              <td>{item?.TripCount}</td>
                              <td>{item?.TotalProjectCount}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    router.push(`/admin/vendors/${item?.id}`)
                                  }>
                                  View Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <Col md={12} className="mt-3">
              {getAllVendorListCount > 0 ? (
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  list={getAllVendorLists}
                  count={getAllVendorListCount}
                />
              ) : (
                ""
              )}
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardPage;
