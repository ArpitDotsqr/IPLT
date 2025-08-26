import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Dropdown, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Tripmodel from './Tripmodel';
import { useDispatch, useSelector } from 'react-redux';
import { getTripDataById, getTripDetails } from '@/redux/actions/trip/tripDetail';
import Pagination from '../Pagination';
import NoDataPage from '@/components/comman_component/NoDataPage';
import { useRouter } from 'next/router';
import LoaderComponent from '@/components/comman_component/Loader';
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { BsCheck } from 'react-icons/bs';
import DatePickerComp from './DatePickerComp';
import Image from 'next/image';
import { getAllProjectDetails, getProjectTripGraphData, getTripDetailPerProject } from '@/redux/actions/project/projectData';
import AuditLogModal from '@/components/comman_component/AuditLogModal';
import { getAuditLogsDetail } from '@/redux/actions/auditlogs/auditlogsdata';
import { apibasePath } from '@/config';
import { apiRequest } from '@/redux/services/api';
import { toast } from 'react-toastify';


const TripAdmin = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [dataValue, setDataValue] = useState(0);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });
  const [tripIds, setTripId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tripsCount = useSelector((state) => state.tripSlice.tripCount)
  const tripDetailsList = useSelector((state) => state.tripSlice.allTripDetails)
  const tripLoader = useSelector((state) => state.tripSlice.isLoading)

  const [searchQuery, setSearchQuery] = useState('')

  // const allTripCount = useSelector((state) => state.projectSlice.allTripProjectGraphData)
  // const completedTripCount = useSelector((state) => state.projectSlice.allCompletedTripGraphData)
  // const ongoingTripCount = useSelector((state) => state.projectSlice.allOngingTripGraphData)

  const allTripCount = useSelector((state) => state.projectSlice.AllTripCount)
  const completedTripCount = useSelector((state) => state.projectSlice.AllCompletedTripCount)
  const ongoingTripCount = useSelector((state) => state.projectSlice.AllOngoingTripCount)
  const getAuditLogsDetails = useSelector((state) => state.auditLogsSlice.auditLogsListData)

  // console.log(allTripCount, "allTripCount")

  const TripsTab = [`All (${allTripCount})`, `Ongoing (${ongoingTripCount})`, `Completed (${completedTripCount})`];

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setTripId(id)
  };

  useEffect(() => {
    let filters = { tripStatus: [], ...pagination };
    let dataFilters = {}

    if (dataValue === 0) {
      filters.tripStatus = "All";
    } else if (dataValue === 1) {
      filters.tripStatus = "ongoing";
    } else if (dataValue === 2) {
      filters.tripStatus = "completed"
    }

    if (Number(searchQuery)) {
      filters.search = Number(searchQuery);
    } else if (searchQuery) {
      filters.search = searchQuery;
    }
    if (router.query) {
      dataFilters = router.query
    }

    const payload = { ...dataFilters, ...filters }

    dispatch(getTripDetails(payload))
  }, [dispatch, pagination, dataValue, searchQuery, router.query]);


  const onDateRangeSet = (startDate, endDate) => {

    if (startDate && endDate && (dataValue === 0)) {
      dispatch(getTripDetails({ 'dateRange': [startDate, endDate], tripStatus: 'All', ...pagination }))
    } else if (startDate && endDate && (dataValue === 1)) {
      dispatch(getTripDetails({ 'dateRange': [startDate, endDate], tripStatus: 'ongoing', ...pagination }))
    } else if (startDate && endDate && (dataValue === 2)) {
      dispatch(getTripDetails({ 'dateRange': [startDate, endDate], tripStatus: 'completed', ...pagination }))
    }
  };

  useEffect(() => {
    if (tripIds) {
      dispatch(getTripDataById({ 'tripId': tripIds }))
    }
    dispatch(getTripDetailPerProject())
    dispatch(getProjectTripGraphData({ ...pagination }))
  }, [dispatch, tripIds, dataValue])

  const handleFilter = (type) => {
    const { [type]: filter, ...currentQuery } = router.query
    const newQuery = filter ? currentQuery : { [type]: true }
    router.push({ pathname: router.pathname, query: newQuery })
  }

  function formatDate(dateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [year, month, day] = dateString.split('-');
    const monthInWords = months[parseInt(month) - 1];
    const formattedDate = `${day}-${monthInWords}-${year}`;

    return formattedDate;
  }

  // function formatTime(timeData) {
  //   if (timeData) {
  //     const timePart = timeData?.split(':')
  //     const hourMinute = `${timePart[0]} : ${timePart[1]}`
  //     return hourMinute
  //   }
  //   return "-"
  // }

  // function formatTime(timeData) {

  //   // let data = "2024-04-16T09:31:52.995Z"

  //   let date = new Date(timeData)
  //   const istDateString = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  //   const timePart = istDateString.split(",")[1]
  //   const x = timePart?.split(":")
  //   console.log(x, "Sdfsdfsdfsdf")
  //   const hourMinute = `${x[0]} : ${x[1]}`
  //   //     return hourMinute
  //   // const timePart = istDateString.toString().split(':')
  //   // let hour = parseInt(timePart[0])
  //   // const minute = timePart[1]
  //   // const ampmFormat = hour >= 12 ? 'PM' : 'AM'
  //   // hour = hour % 12 || 12
  //   // const hourMinute = `${hour}:${minute} ${ampmFormat}`
  //   return hourMinute
  // }
  function formatTime(timeData) {
    let date = new Date(timeData);
    const istDateString = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const x = istDateString.split(", ")[1].trim()

    let timeComponents = x.split(":");
    let hours = timeComponents[0];
    let minutes = timeComponents[1];
    let am_pm = x.split(" ")[1];

    const hourMinute = `${hours}:${minutes} ${am_pm}`;

    return hourMinute;
  }

  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  // progressBar func
  // function progressBar(loadingPointDatas, unloadingPointData) {
  //   let totalSteps = 5;
  //   let stepsCompleted = 0;

  //   console.log(loadingPointDatas, unloadingPointData, "43555555555555555")

  //   const relevantKeys = ['loadingpoint', 'petrolpump', 'loadedtruckweight'];
  //   for (const key of relevantKeys) {
  //     if (loadingPointDatas.hasOwnProperty(key)) {
  //       totalSteps += loadingPointDatas[key].some(item => item.image && item.image !== "") ? 1 : 0;
  //       stepsCompleted += loadingPointDatas[key].every(item => item.image && item.image !== "") ? 1 : 0;
  //     }
  //   }
  //   if (unloadingPointData) {
  //     totalSteps += Object.keys(unloadingPointData).length;
  //     for (const key of Object.keys(unloadingPointData)) {
  //       stepsCompleted += unloadingPointData[key].some(item => item.image && item.image !== "") ? 1 : 0;
  //     }
  //   }

  //   console.log(stepsCompleted,totalSteps, "qweqweqweqweqwe")
  //   const progressPercentage = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;
  //   return progressPercentage
  // }

  function progressBar(loadingPointDatas, unloadingPointData) {
    const spotTypes = ['loadingpoint', 'echallan', 'loadedtruckweight', 'petrolpump', 'unloadedtruckWeight', 'unloadingpoint', 'signedchallan'];
    let totalSteps = spotTypes.length;
    let stepsCompleted = 0;

    for (const spotType of spotTypes) {
      if (loadingPointDatas && loadingPointDatas[spotType] && loadingPointDatas[spotType].length > 0) {
        if (loadingPointDatas[spotType].some(item => item.image && item.image !== "")) {
          stepsCompleted++;
        }
      }
    }

    if (unloadingPointData) {
      for (const spotType of spotTypes) {
        if (unloadingPointData[spotType] && unloadingPointData[spotType].length > 0) {
          if (unloadingPointData[spotType].some(item => item.image && item.image !== "")) {
            stepsCompleted++;
          }
        }
      }
    }

    const progressPercentage = (stepsCompleted / totalSteps) * 100;
    return progressPercentage;
  }

  // const openDateRangePicker = () => {
  //   // Programmatically open the DateRangePicker
  //   const dateRangePicker = document.getElementById('dateRangePicker');
  //   if (dateRangePicker) {
  //     dateRangePicker.click();
  //   }
  // };

  const handleImageClick = (id) => {
    dispatch(getAuditLogsDetail({ tripId: id }))
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadCvsFile = async (e) => {
    let uploadUserFile = e.target.files[0]
    if (uploadUserFile) {
      let formData = new FormData()
      formData.append('datafile', uploadUserFile)
      await apiRequest
        .post('trip/createTripByExcel', formData)
        .then((res) => {
          if (res?.data?.success) {
            toast.success("File uploaded Successfully");
          } else {
            toast.error('Error')
          }
        })
    }
  }

  // const handleUploadCvsFile = async (e) => {
  //   let uploadUserFile = e.target.files[0];
  //   if (uploadUserFile) {
  //     let formData = new FormData();
  //     formData.append('datafile', uploadUserFile);
  //     try {
  //       const res = await apiRequest.post('trip/createTripByExcel', formData);

  //       if (res?.data?.success) {
  //         toast.success("File uploaded Successfully");
  //       } else {
  //         toast.error('Error');
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.message) {
  //         toast.error(error.response.data.message);
  //       } else {
  //         toast.error('An error occurred while uploading the file.');
  //       }
  //     }
  //   }
  // };



  const handleDownloadCvsFile = async (e) => {
    fetch(`${apibasePath}trip/getTripDataSampleExcelFile`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const handleDownloadDataFile = async (e) => {
    fetch(`${apibasePath}trip/downloadTripDataExcelFile`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const TripLoadedTruckWeight = (load) => {
    if (!load || !Array.isArray(load)) {
      return;
    }
    const LoadedValue = load.find((item) => item && item.types === "loadedtruckweight");

    if (LoadedValue) {
      return LoadedValue.loadedTruckWeight;
    } else {
      return;
    }
  };

  const FuncTripNetWeight = (data) => {
    if (!data || !Array.isArray(data)) {
      return
    }
    const LoadedNetWgt = data.find((item) => item && item.types === "unloadedtruckWeight")

    if (LoadedNetWgt) {
      return Number(LoadedNetWgt.netWeight_in_Tons.toFixed(2))
    } else {
      return
    }
  }


  return (
    <div className='TripAdminSection'>
      <Row>
        {tripLoader && <LoaderComponent />}
        <Col lg={5}>
          <ul className="nav ProjectAdmin_tabs ">
            {TripsTab &&
              TripsTab?.map((steps, stepsIndex) => (
                <li className="nav-item d-flex" key={stepsIndex}>
                  <a
                    className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                      }`}
                    active="true"
                    onClick={() => {
                      setDataValue(stepsIndex);
                      setPagination({ pageNo: 1, pageSize: 6 })
                    }}
                  >
                    {steps}
                  </a>
                </li>
              ))}
          </ul>
        </Col>
        <Col lg={7}>
          <div className="FilterItemSec">
            {/* <div className='back_import'> */}
            <div className='UploadAndSampleButton col-md-6'>
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
              <Button variant="" onClick={handleDownloadCvsFile} className="border_btn">
                <span className='importbtn'><img src="/images/import_icon.svg" alt="" class="img-fluid" /></span>Sample .xlsx
              </Button>

              <Button variant="" onClick={handleDownloadDataFile} className="border_btn">
                <span className='importbtn'><img src="/images/import_icon.svg" alt="" class="img-fluid" /></span>Download Data
              </Button>
            </div>
            {/* </div> */}

            <div className='FlexAndAlign col-md-6 gap-2'>
              <input
                type="search"
                placeholder="Search Trip by Id or location"
                className="form-control "
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Form className="FlexAndAlign">


                <DatePickerComp onDateRangeSet={onDateRangeSet} />

                <Dropdown className="filter_icon_main">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <span className="filter_icon_">
                      <img src="/images/filter_icon.svg" alt="" />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleFilter('tripIdAsc')}>TripIdAsc</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('tripIdDesc')}>TripIdDesc</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('dateAToZ')}>DateAToZ</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('dateZToA')}>DateZToA</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
            </div>
          </div>
        </Col>
      </Row>

      {dataValue === 0 && (
        <div className='AllTripsTab'>
          <Row>
            {tripDetailsList?.length > 0 ? tripDetailsList.map((item, index) => (
              <Col lg={4} md={6} className='d-flex'>
                <div key={index} className='TripAdminSectionInnerTab m-2'>
                  {
                    <div className='TripsInnerCol'>
                      <div className='TripsInnerColSecOne'>
                        <div className='TripsId'>
                          <h4>Trip ID: {item.id < 10 ? `0${item.id}` : `${item.id}`}</h4>
                          <div className='d-flex gap-2'>
                            <span onClick={() => handleImageClick(item?.id)}>
                              <Image width={15} height={15} src="/images/clock_icon.svg" alt="" />
                            </span>
                            <span className={` ${item?.TripStatus?.name == 'Completed' ? 'TripStatuscompleted' : ''}`}>{item?.TripStatus?.name}</span>
                          </div>
                        </div>
                        <div className='tripFromToBtn'>
                          <div className='trip_from_to'>
                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`} className='m-0'>
                                    {item?.LoadingPointsDetails?.loadingAddress}
                                  </Tooltip>
                                }
                              >
                                <div>
                                  {/* <h3>{`${item?.LoadingPointsDetails?.loadingAddress.substring(0, 10)}...`}</h3> */}
                                  <h3>Start </h3>
                                </div>
                              </OverlayTrigger>
                              {/* <p>{formatDate(item?.createdAt.split('T')[0])}</p>
                              <p>{formatTime(item?.createdAt.split('T')[1])}</p> */}
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatDate(item.loadingPointDatas.loadingpoint[0]?.createdAt?.split('T')[0]) :
                                    // item.loadingPointDatas.loadingpoint[0]?.loadingDate :
                                    "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatTime(item.loadingPointDatas.loadingpoint[0]?.createdAt) :
                                    "-"
                                }
                              </p>
                            </div>

                            <div className='trip_from_to_inner mt-1' style={{ width: '170px' }}>
                              <ProgressBar percent={progressBar(item.loadingPointDatas, item.unloadingPointDatas)} filledBackground="#50b282">
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                              </ProgressBar>
                            </div>

                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top2"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top2`}>
                                    {item?.UnoadingPointsDetails?.unloadingAddress}
                                  </Tooltip>
                                }>
                                <div>
                                  {/* <h3>{`${item?.UnoadingPointsDetails?.unloadingAddress.substring(0, 10)}...`}</h3> */}
                                  <h3>End </h3>
                                </div>
                              </OverlayTrigger>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatDate(item.unloadingPointDatas.signedchallan[0]?.createdAt?.split('T')[0])
                                    // item.unloadingPointDatas.unloadingpoint[0]?.unloadingDate
                                    : "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatTime(item.unloadingPointDatas.signedchallan[0]?.createdAt) : "-"
                                }
                              </p>
                            </div>
                          </div>
                          <div className='tripFromToInnerBtn'>
                            <Button variant="primary" onClick={() => handleShow(item?.id)}><img src='/images/Arrow Right.svg' /></Button>
                          </div>
                          <Modal show={show} onHide={handleClose}
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            className='TripAdminModal'
                          >
                            <Modal.Body>
                              <div className='modal_header'>
                                <Button onClick={handleClose}> <img src='/images/back_icon.svg' /> Back</Button>
                              </div>
                              <div className='TripsModalBody'>
                                {/* <span className='Running_span'>{item?.TripStatus?.name}</span> */}

                                <Tripmodel />
                              </div>
                            </Modal.Body>

                          </Modal>
                        </div>
                      </div>
                      <div className='TripsInnerColSectwo'>
                        <div className='TripsInnertabel'>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project ID   </span>
                              <p>{item?.projectId < 10 ? `#0${item?.projectId}` : `#${item?.projectId}`}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Weight</span>
                              <p>{FuncTripNetWeight(item.UnloadedTruckWeights) ? `${FuncTripNetWeight(item.UnloadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Diesel Issued  </span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.dieselAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.dieselAtPetrolPump ? `${elem.dieselAtPetrolPump}L` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project name</span>
                              <p>{item?.ProjectNames?.projectName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Commodity</span>
                              <p>{item?.MaterialNames?.displayName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Distance</span>
                              <p>{`${haversine(
                                item.LoadingPointsDetails.loadingLatitude,
                                item.LoadingPointsDetails.loadingLongitude,
                                item.UnoadingPointsDetails.unloadingLatitude,
                                item.UnoadingPointsDetails.unloadingLongitude)
                                .toFixed(2)} km`}
                              </p>
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Load</span>
                              <p>{TripLoadedTruckWeight(item.LoadedTruckWeights) ? `${TripLoadedTruckWeight(item.LoadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Cash</span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.cashAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.cashAtPetrolPump ? `₹${elem.cashAtPetrolPump}` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </Col>
            )) : <NoDataPage />}
          </Row>

          {tripsCount > 0 ?
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={tripDetailsList}
              count={tripsCount}
            />
            : ''}

          <div >
            <AuditLogModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              columnContents={getAuditLogsDetails}
            />
          </div>
        </div>
      )}

      {dataValue === 1 && (
        <div className='AllTripsTab'>
          <Row>
            {tripDetailsList?.length > 0 ? tripDetailsList.map((item, index) => (
              <Col lg={4} md={6} className="d-flex">
                <div key={index} className='TripAdminSectionInnerTab m-2'>
                  {
                    <div className='TripsInnerCol'>
                      <div className='TripsInnerColSecOne'>
                        <div className='TripsId'>
                          <h4>Trip ID: {item.id < 10 ? `0${item.id}` : `${item.id}`}</h4>
                          <div className='d-flex gap-2'>
                            <span onClick={() => handleImageClick(item?.id)}>
                              <Image width={15} height={15} src="/images/clock_icon.svg" alt="" />
                            </span>
                            <span>{item?.TripStatus?.name}</span>
                          </div>
                        </div>
                        <div className='tripFromToBtn'>
                          <div className='trip_from_to'>
                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`} className='m-0'>
                                    {item?.LoadingPointsDetails?.loadingAddress}
                                  </Tooltip>
                                }
                              >
                                {/* <h3>{`${item?.LoadingPointsDetails?.loadingAddress.substring(0, 10)}...`}</h3> */}
                                <h3>Start</h3>
                              </OverlayTrigger>
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatDate(item.loadingPointDatas.loadingpoint[0]?.createdAt?.split('T')[0]) :
                                    // item.loadingPointDatas.loadingpoint[0]?.loadingDate :
                                    "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatTime(item.loadingPointDatas.loadingpoint[0]?.createdAt) :
                                    "-"
                                }
                              </p>
                              {/* <p>{formatTime(item?.createdAt.split('T')[1])}</p> */}
                            </div>
                            <div className='trip_from_to_inner mt-1' style={{ width: '200px' }}>
                              <ProgressBar percent={progressBar(item.loadingPointDatas, item.unloadingPointDatas)} filledBackground="#50b282">
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                              </ProgressBar>
                            </div>
                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top2"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top2`}>
                                    {item?.UnoadingPointsDetails?.unloadingAddress}
                                  </Tooltip>
                                }>
                                {/* <h3>{`${item?.UnoadingPointsDetails?.unloadingAddress.substring(0, 10)}...`}</h3> */}
                                <h3>End</h3>
                              </OverlayTrigger>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatDate(item.unloadingPointDatas.signedchallan[0]?.createdAt?.split('T')[0])
                                    // item.unloadingPointDatas.unloadingpoint[0]?.unloadingDate
                                    : "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatTime(item.unloadingPointDatas.signedchallan[0]?.createdAt) : "-"
                                }
                              </p>
                            </div>
                          </div>
                          <div className='tripFromToInnerBtn'>
                            <Button variant="primary" onClick={() => handleShow(item?.id)}><img src='/images/Arrow Right.svg' /></Button>
                          </div>
                          <Modal show={show} onHide={handleClose}
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            className='TripAdminModal'
                          >
                            <Modal.Body>
                              <div className='modal_header'>
                                <Button onClick={handleClose}> <img src='/images/back_icon.svg' /> Back</Button>
                              </div>
                              <div className='TripsModalBody'>
                                {/* <span className='Running_span'>{item?.TripStatus?.name}</span> */}

                                <Tripmodel />
                              </div>
                            </Modal.Body>

                          </Modal>
                        </div>
                      </div>
                      <div className='TripsInnerColSectwo'>
                        <div className='TripsInnertabel'>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project ID   </span>
                              <p>{item?.projectId < 10 ? `#0${item?.projectId}` : `#${item?.projectId}`}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Weight</span>
                              <p>{FuncTripNetWeight(item.UnloadedTruckWeights) ? `${FuncTripNetWeight(item.UnloadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Diesel Issued  </span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.dieselAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.dieselAtPetrolPump ? `${elem.dieselAtPetrolPump}L` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project name</span>
                              <p>{item?.ProjectNames?.projectName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Commodity</span>
                              <p>{item?.MaterialNames?.displayName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Distance</span>
                              <p>{`${haversine(
                                item.LoadingPointsDetails.loadingLatitude,
                                item.LoadingPointsDetails.loadingLongitude,
                                item.UnoadingPointsDetails.unloadingLatitude,
                                item.UnoadingPointsDetails.unloadingLongitude)
                                .toFixed(2)} km`}
                              </p>
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Load</span>
                              <p>{TripLoadedTruckWeight(item.LoadedTruckWeights) ? `${TripLoadedTruckWeight(item.LoadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Cash</span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.cashAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.cashAtPetrolPump ? `₹${elem.cashAtPetrolPump}` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </Col>
            )) : <NoDataPage />}
          </Row>

          {tripsCount > 0 ?
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={tripDetailsList}
              count={tripsCount}
            />
            : ''}

          <div >
            <AuditLogModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              columnContents={getAuditLogsDetails}
            />
          </div>
        </div>
      )}

      {dataValue === 2 && (
        <div className='AllTripsTab'>
          <Row>
            {tripDetailsList?.length > 0 ? tripDetailsList.map((item, index) => (
              <Col lg={4} md={6} className='d-flex'>
                <div key={index} className='TripAdminSectionInnerTab m-2'>
                  {
                    <div className='TripsInnerCol'>
                      <div className='TripsInnerColSecOne'>
                        <div className='TripsId'>
                          <h4>Trip ID: {item.id < 10 ? `0${item.id}` : `${item.id}`}</h4>
                          <div className='d-flex gap-2'>
                            <span onClick={() => handleImageClick(item?.id)}>
                              <Image width={15} height={15} src="/images/clock_icon.svg" alt="" />
                            </span>
                            <span className={` ${item?.TripStatus?.name == 'Completed' ? 'TripStatuscompleted' : ''}`}>{item?.TripStatus?.name}</span>
                          </div>
                        </div>
                        <div className='tripFromToBtn'>
                          <div className='trip_from_to'>
                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`} className='m-0'>
                                    {item?.LoadingPointsDetails?.loadingAddress}
                                  </Tooltip>
                                }
                              >
                                {/* <h3>{`${item?.LoadingPointsDetails?.loadingAddress.substring(0, 10)}...`}</h3> */}
                                <h3>Start</h3>
                              </OverlayTrigger>
                              {/* <p>{formatDate(item?.createdAt.split('T')[0])}</p> */}
                              {/* <p>{formatTime(item?.createdAt.split('T')[1])}</p> */}
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatDate(item.loadingPointDatas.loadingpoint[0]?.createdAt?.split('T')[0]) :
                                    // item.loadingPointDatas.loadingpoint[0]?.loadingDate :
                                    "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.loadingPointDatas?.loadingpoint && Object.keys(item.loadingPointDatas.loadingpoint).length > 0 ?
                                    formatTime(item.loadingPointDatas.loadingpoint[0]?.createdAt) :
                                    "-"
                                }
                              </p>
                            </div>
                            <div className='trip_from_to_inner mt-1' style={{ width: '200px' }}>
                              <ProgressBar percent={progressBar(item.loadingPointDatas, item.unloadingPointDatas)} filledBackground="#50b282">
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                                <Step>
                                  {({ accomplished, index }) => (
                                    <>
                                      <div
                                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                      >
                                        {accomplished && <div style={{ color: 'white' }}><BsCheck /> </div>}
                                      </div>
                                    </>
                                  )}
                                </Step>
                              </ProgressBar>
                            </div>
                            <div className='trip_from_to_inner'>
                              <OverlayTrigger
                                className=""
                                key={"top2"}
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top2`}>
                                    {item?.UnoadingPointsDetails?.unloadingAddress}
                                  </Tooltip>
                                }>
                                {/* <h3>{`${item?.UnoadingPointsDetails?.unloadingAddress.substring(0, 10)}...`}</h3> */}
                                <h3>End</h3>
                              </OverlayTrigger>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatDate(item.unloadingPointDatas.signedchallan[0]?.createdAt?.split('T')[0])
                                    // item.unloadingPointDatas.unloadingpoint[0]?.unloadingDate
                                    : "-"
                                }
                              </p>
                              <p>
                                {
                                  item?.unloadingPointDatas?.signedchallan && Object.keys(item.unloadingPointDatas.signedchallan).length > 0 ?
                                    formatTime(item.unloadingPointDatas.signedchallan[0]?.createdAt) : "-"
                                }
                              </p>
                            </div>
                          </div>
                          <div className='tripFromToInnerBtn'>
                            <Button variant="primary" onClick={() => handleShow(item?.id)}><img src='/images/Arrow Right.svg' /></Button>
                          </div>
                          <Modal show={show} onHide={handleClose}
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            className='TripAdminModal'
                          >
                            <Modal.Body>
                              <div className='modal_header'>
                                <Button onClick={handleClose}> <img src='/images/back_icon.svg' /> Back</Button>
                              </div>
                              <div className='TripsModalBody'>
                                {/* <span className='Running_span'>{item?.TripStatus?.name}</span> */}

                                <Tripmodel />
                              </div>
                            </Modal.Body>

                          </Modal>
                        </div>
                      </div>
                      <div className='TripsInnerColSectwo'>
                        <div className='TripsInnertabel'>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project ID   </span>
                              <p>{item?.projectId < 10 ? `#0${item?.projectId}` : `#${item?.projectId}`}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Weight</span>
                              <p>{FuncTripNetWeight(item.UnloadedTruckWeights) ? `${FuncTripNetWeight(item.UnloadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Diesel Issued  </span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.dieselAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.dieselAtPetrolPump ? `${elem.dieselAtPetrolPump}L` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Project name</span>
                              <p>{item?.ProjectNames?.projectName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Commodity</span>
                              <p>{item?.MaterialNames?.displayName}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Distance</span>
                              <p>{`${haversine(
                                item.LoadingPointsDetails.loadingLatitude,
                                item.LoadingPointsDetails.loadingLongitude,
                                item.UnoadingPointsDetails.unloadingLatitude,
                                item.UnoadingPointsDetails.unloadingLongitude)
                                .toFixed(2)} km`}
                              </p>
                            </div>
                          </div>
                          <div className='TripsInnertabelRow'>
                            <div className='TripsInnertabelData'>
                              <span>Load</span>
                              <p>{TripLoadedTruckWeight(item.LoadedTruckWeights) ? `${TripLoadedTruckWeight(item.LoadedTruckWeights)} tons` : '-'}</p>
                            </div>
                            <div className='TripsInnertabelData'>
                              <span>Cash</span>
                              {item?.LoadedTruckWeights?.map((elem) => {
                                if (elem?.types === 'petrolpump' && elem?.cashAtPetrolPump !== undefined) {
                                  return (
                                    <p>{elem.cashAtPetrolPump ? `₹${elem.cashAtPetrolPump}` : "-"}</p>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </Col>
            )) : <NoDataPage />}
          </Row>

          {tripsCount > 0 ?
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={tripDetailsList}
              count={tripsCount}
            />
            : ''}

          <div >
            <AuditLogModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              columnContents={getAuditLogsDetails}
            />
          </div>
        </div>
      )}

    </div>

  )
}

export default TripAdmin