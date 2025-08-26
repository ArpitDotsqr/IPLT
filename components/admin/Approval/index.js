import { getCancelList, getRejectedList, getTripApprovalList, getTripCompletedList } from '@/redux/actions/trip/tripDetail';
import { getAllVendorsList } from '@/redux/actions/vendor/vendorActions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import LoaderComponent from '@/components/comman_component/Loader';

// const TripsApprovelTab = [ "Trips"];

const TripsApprovalAdmin = () => {
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()
  // const [dataValue, setDataValue] = useState(0);
  const vendorType = ["transporter", "excavator", "petrolpump"];
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 9 });
  const [tripIdSearch, setTripIdSearch] = useState('')
  const [rejectSearch, setRejectedSearch] = useState('')
  const [cancelSearch, setCancelSearch] = useState('')
  const [completedSearch, setCompletedSearch] = useState('')

  const getAllVendorLists = useSelector((state) => state.vendorSlice.vendorList?.rows)
  const getApprovalTripList = useSelector((state) => state.tripSlice.tripListForApproval)
  const getApprovalTripCount = useSelector((state) => state.tripSlice.tripForApprovalCount)
  const loaderTrip = useSelector((state) => state.tripSlice.isLoading)
  const getTripRejectedList = useSelector((state) => state.tripSlice.rejectedTripList)
  const tripRejectedCount = useSelector((state) => state.tripSlice.rejectedTripCount)

  const getTripCancelledList = useSelector((state) => state.tripSlice.cancelledTripList)
  const tripCancelledCount = useSelector((state) => state.tripSlice.cancelledTripCount)

  const getTripCompletedData = useSelector((state) => state.tripSlice.completedTripList)
  const tripCompletedCount = useSelector((state) => state.tripSlice.completedTripCount)

  useEffect(() => {
    // if (dataValue === 0) {
      // dispatch(getAllVendorsList(vendorType));
    // if (dataValue === 0) {
      const requestData = { ...pagination };

      if (tripIdSearch) {
        requestData.tripId = Number(tripIdSearch);
        dispatch(getTripApprovalList(requestData));
      } else if (rejectSearch) {
        requestData.tripId = Number(rejectSearch);
        dispatch(getRejectedList(requestData));
      } else if (cancelSearch) {
        requestData.tripId = Number(cancelSearch);
        dispatch(getCancelList(requestData));
      } else if (completedSearch) {
        requestData.tripId = Number(completedSearch);
        dispatch(getTripCompletedList(requestData));
      } else {
        dispatch(getTripApprovalList(requestData));
        dispatch(getRejectedList(requestData));
        dispatch(getCancelList(requestData));
        dispatch(getTripCompletedList(requestData));
      }
    // }
    
  }, [dispatch, pagination, tripIdSearch, rejectSearch, cancelSearch, completedSearch]);


  function formatDate(dateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [year, month, day] = dateString.split('-');
    const monthInWords = months[parseInt(month) - 1];
    const formattedDate = `${day}-${monthInWords}-${year}`;

    return formattedDate;
  }


  return (
    <div className='ProjectAdmin'>
      <ul className="nav ProjectAdmin_tabs ">
        {/* {TripsApprovelTab &&
          TripsApprovelTab?.map((steps, stepsIndex) => (
            <li className="nav-item d-flex" key={stepsIndex}>
              <a
                className={`nav-link admin_tabs_name ${ stepsIndex && "head-active"
                  }`}
                active="true"
                onClick={() => {
                  setDataValue(stepsIndex);
                }}
              >
                {steps}
              </a>
            </li>
          ))} */}
      </ul>
      {/* {dataValue === 0 && (
        <>
          <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Pending approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input placeholder='Enter Project ID...' type='text' />
                    <Button> <img src='/images/upload-icon.svg' alt='' /> Export Report</Button>
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr >
                      <th>Vendor ID</th>
                      <th>Organization name</th>
                      <th>Date</th>
                      <th>Created by</th>
                      <th>Vendor type</th>
                      <th>Total Vehicle</th>
                      <th>Mobilization time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllVendorLists && getAllVendorLists?.map((item, index) => {
                      if (item.Status.key === 'pending') {
                        return (
                          <tr key={index}>
                            <td>#VE-{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.UserDetail.createdAt.split("T")[0]}</td>
                            <td>{item.createdBy.name ? item.createdBy.name : '-'}</td>
                            <td>{item.UserDetail.vendorTypes.displayName ? item.UserDetail.vendorTypes.displayName : '-'}</td>
                            <td>{item.UserAssets.length}</td>
                            <td>{item.UserDetail.moblizationTime ? item.UserDetail.moblizationTime : "-"}</td>
                            <td><button onClick={() => router.push(`/admin/approvals/vendorapp/${item.id}`)}>View details</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

          </div>
          <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Rejected approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input placeholder='Enter Project ID...' type='text' />
                    <Button> <img src='/images/upload-icon.svg' alt='' /> Export Report</Button>
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr>
                      <th>Vendor ID</th>
                      <th>Organization name</th>
                      <th>Date</th>
                      <th>Created by</th>
                      <th>Vendor type</th>
                      <th>Total Vehicle</th>
                      <th>Mobilization time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllVendorLists && getAllVendorLists?.map((item, index) => {
                      if (item.Status.key === 'rejected') {
                        return (
                          <tr key={index}>
                            <td>#VE-{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.UserDetail.createdAt.split("T")[0]}</td>
                            <td>{item.createdBy.name ? item.createdBy.name : '-'}</td>
                            <td>{item.UserDetail.vendorTypes.displayName ? item.UserDetail.vendorTypes.displayName : '-'}</td>
                            <td>{item.UserAssets.length}</td>
                            <td>{item.UserDetail.moblizationTime ? item.UserDetail.moblizationTime : "-"}</td>
                            <td><button onClick={() => router.push(`/admin/approvals/vendorapp/${item.id}`)}>Review Again</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

          </div>
        </>
      )} */}
      {/* {dataValue === 0 && ( */}
        <>
          {loaderTrip && <LoaderComponent />}

          {/* <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Completed approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input
                      placeholder='Enter Trip ID...'
                      type='text'
                      onChange={(e) => setCompletedSearch(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Truck No.</th>
                      <th>Date</th>
                      <th>Created By</th>
                      <th>Diesel Issued</th>
                      <th>Cash</th>
                      <th>Un-loading Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTripCompletedData && getTripCompletedData?.map((item, index) => {
                      if (item.approvalId === 1) {
                        return (
                          <tr key={index}>
                            <td>#TR-{item.id}</td>
                            <td>
                              {item?.VehicleData?.map((vehicle, vehicleIndex) => (
                                <div key={vehicleIndex}>{vehicle.VehicleNumber.vehicleNumber}</div>
                              ))}
                            </td>
                            <td>{formatDate(item.createdAt.split("T")[0])}</td>
                            <td>{item.CreatedBy ? item.CreatedBy.name : '-'}</td>
                            <td>{item?.diesel ? `${item?.diesel} L` : '-'}</td>
                            <td>{item?.cash ? `₹ ${item?.cash}` : '-'}</td>
                            <td className='loadingAddress'>
                              {item.UnoadingPointsDetails.unloadingAddress}
                            </td>
                            <td><button onClick={() => router.push(`/admin/approvals/${item.id}`)}>View details</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <Col md={12} className='mt-3' >
            {tripCompletedCount > 0 ?
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={getTripCompletedData}
                count={tripCompletedCount}
              />
              : ''}
          </Col> */}


          <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Pending approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input
                      placeholder='Enter Trip ID...'
                      type='text'
                      onChange={(e) => setTripIdSearch(e.target.value)}
                    />
                    {/* <Button> <img src='/images/upload-icon.svg' alt='' /> Export Report</Button> */}
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Truck No.</th>
                      <th>Date</th>
                      <th>Created By</th>
                      <th>Diesel Issued</th>
                      <th>Cash</th>
                      <th>Project</th>
                      <th>Un-loading Address</th>
                      {/* <th>Commodity</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getApprovalTripList && getApprovalTripList?.map((item, index) => {
                      if (item.approvalId === 1) {
                        return (
                          <tr key={index}>
                            <td>#TR-{item.id}</td>
                            <td>
                              {item?.VehicleData?.map((vehicle, vehicleIndex) => (
                                <div key={vehicleIndex}>{vehicle.VehicleNumber.vehicleNumber}</div>
                              ))}
                            </td>
                            <td>{formatDate(item.createdAt.split("T")[0])}</td>
                            <td>{item.CreatedBy ? item.CreatedBy.name : '-'}</td>
                            <td>{item?.diesel ? `${item?.diesel} L` : '-'}</td>
                            <td>{item?.cash ? `₹ ${item?.cash}` : '-'}</td>
                            <td className='loadingAddress'>
                              {item?.ProjectNames?.projectName}
                            </td>
                            {console.log(item, "ddddddffffffffffff")}
                            <td className='loadingAddress'>
                              {item.UnoadingPointsDetails.unloadingAddress}
                            </td>
                            {/* <td>{item.MaterialNames.displayName}</td> */}
                            <td><button onClick={() => router.push(`/admin/approvals/${item.id}`)}>View details</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <Col md={12} className='mt-3' >
            {getApprovalTripCount > 0 ?
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={getApprovalTripList}
                count={getApprovalTripCount}
              />
              : ''}
          </Col>

          <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Rejected approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input
                      placeholder='Enter Trip ID...'
                      type='text'
                      onChange={(e) => setRejectedSearch(e.target.value)}
                    />
                    {/* <Button> <img src='/images/upload-icon.svg' alt='' /> Export Report</Button> */}
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Truck No.</th>
                      <th>Date</th>
                      <th>Created By</th>
                      <th>Diesel Issued</th>
                      <th>Cash</th>
                      <th>Project</th>
                      <th>Un-loading Address</th>
                      {/* <th>Commodity</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTripRejectedList && getTripRejectedList?.map((item, index) => {
                      if (item.approvalId === 4) {
                        return (
                          <tr key={index}>
                            <td>#TR-{item.id}</td>
                            <td>
                              {item?.VehicleData?.map((vehicle, vehicleIndex) => (
                                <div key={vehicleIndex}>{vehicle.VehicleNumber.vehicleNumber}</div>
                              ))}
                            </td>
                            <td>{formatDate(item.createdAt.split("T")[0])}</td>
                            <td>{item.CreatedBy ? item.CreatedBy.name : '-'}</td>
                            <td>{item?.diesel ? `${item?.diesel} L` : '-'}</td>
                            <td>{item?.cash ? `₹ ${item?.cash}` : '-'}</td>
                            <td className='loadingAddress'>
                              {item?.ProjectNames?.projectName}
                            </td>
                            {/* <td>
                              {item.LoadingPointsDetails.loadingAddress.split(',').map((line, index) => (
                                <div key={index}>{line.trim()}</div>
                              ))}
                            </td> */}
                            <td>
                              {item.UnoadingPointsDetails.unloadingAddress.split(',').map((line, index) => (
                                <div key={index}>{line.trim()}</div>
                              ))}
                            </td>
                            {/* <td>{item.MaterialNames.displayName}</td> */}
                            <td><button onClick={() => router.push(`/admin/approvals/${item.id}`)}>Review Again</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <Col md={12} className='mt-3' >
            {tripRejectedCount > 0 ?
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={getTripRejectedList}
                count={tripRejectedCount}
              />
              : ''}
          </Col>

          <div className='approvalsPage_inner_detail'>
            <div className='approvalsPage_main_detail'>
              <Row className='align-items-center'>
                <Col md={6}>
                  <h2>Cancelled approvals</h2>
                </Col>
                <Col md={6}>
                  <div className='ProjectID'>
                    <input
                      placeholder='Enter Trip ID...'
                      type='text'
                      onChange={(e) => setCancelSearch(e.target.value)}
                    />
                    {/* <Button> <img src='/images/upload-icon.svg' alt='' /> Export Report</Button> */}
                  </div>
                </Col>
              </Row>
              <div className='table-responsive'>
                <Table>
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Truck No.</th>
                      <th>Date</th>
                      <th>Created By</th>
                      <th>Diesel Issued</th>
                      <th>Cash</th>
                      <th>Project</th>
                      <th>Un-loading Address</th>
                      {/* <th>Commodity</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTripCancelledList && getTripCancelledList?.map((item, index) => {
                      if (item.approvalId === 10) {
                        return (
                          <tr key={index}>
                            <td>#TR-{item.id}</td>
                            <td>
                              {item?.VehicleData?.map((vehicle, vehicleIndex) => (
                                <div key={vehicleIndex}>{vehicle.VehicleNumber.vehicleNumber}</div>
                              ))}
                            </td>
                            <td>{formatDate(item.createdAt.split("T")[0])}</td>
                            <td>{item.CreatedBy ? item.CreatedBy.name : '-'}</td>
                            <td>{item?.diesel ? `${item?.diesel} L` : '-'}</td>
                            <td>{item?.cash ? `₹ ${item?.cash}` : '-'}</td>
                            <td className='loadingAddress'>
                              {item?.ProjectNames?.projectName}
                            </td>
                            {/* <td>
                              {item.LoadingPointsDetails.loadingAddress.split(',').map((line, index) => (
                                <div key={index}>{line.trim()}</div>
                              ))}
                            </td> */}
                            <td>
                              {item.UnoadingPointsDetails.unloadingAddress.split(',').map((line, index) => (
                                <div key={index}>{line.trim()}</div>
                              ))}
                            </td>
                            {/* <td>{item.MaterialNames.displayName}</td> */}
                            <td><button onClick={() => router.push(`/admin/approvals/${item.id}`)}>Review Again</button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <Col md={12} className='mt-3' >
            {tripCancelledCount > 0 ?
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={getTripCancelledList}
                count={tripCancelledCount}
              />
              : ''}
          </Col>
        </>
      {/* )} */}
    </div>
  )
}

export default TripsApprovalAdmin
