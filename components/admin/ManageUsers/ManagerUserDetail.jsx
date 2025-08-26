import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldExecutiveTripDetail, getManagerUserDataById } from '@/redux/actions/manageuser/manageruserlist'
import LoaderComponent from '@/components/comman_component/Loader'
import { updateUser } from '@/redux/actions/user/userActions'
import { toast } from 'react-toastify'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getTripDataById, getTripDetails } from '@/redux/actions/trip/tripDetail'
import Tripmodel from '../Trips/Tripmodel'
import NoDataPage from '@/components/comman_component/NoDataPage'
import Pagination from '../Pagination'
import UserDataModal from '@/components/comman_component/UserDataModal'

const ManagerUserDetailPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });
    const [isUpdated, setIsUpdated] = useState({});
    const [activeFilter, setActiveFilter] = useState('');
    const [graphFilter, setGraphFilter] = useState('')
    const [dropDownModal, setDropDownModal] = useState(false)
    const [tripIds, setTripId] = useState(null)
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedFileData, setSelectedFileData] = useState('');

    const managerUserDataById = useSelector((state) => state.managerUserSlice?.particularmanagerUserData)
    const LoaderManageUser = useSelector((state) => state.managerUserSlice.isLoading)

    const allTripExeGraphCount = useSelector((state) => state.managerUserSlice.allTripExecutiveGraphCount)
    const completedTripExeCount = useSelector((state) => state.managerUserSlice.completedExecutiveGraphCount)
    const ongoingTripExeCount = useSelector((state) => state.managerUserSlice.ongoingExecutiveGraphCount)

    const manageUserCountData = useSelector((state) => state.tripSlice?.tripCount)
    const tripDetailsList = useSelector((state) => state.tripSlice.allTripDetails)
    const tripDataById = useSelector((state) => state.tripSlice.particularTripData)

    useEffect(() => {
        if (router.query.id)
            dispatch(getManagerUserDataById({ id: Number(router.query.id) }))
        dispatch(getFieldExecutiveTripDetail({ "userId": Number(router.query.id), filter: graphFilter }))
        if (dropDownModal) {
            dispatch(getTripDetails({ tripStatus: `${dropDownModal}`, "userId": Number(router.query.id), filter: graphFilter, ...pagination }))
        }
        if (tripIds) {
            dispatch(getTripDataById({ 'tripId': tripIds }))
        }
    }, [router.query.id, graphFilter, dropDownModal, tripIds, pagination])


    const formattedDate = () => {
        const inputDate = managerUserDataById?.UserDetail?.dob
        if (inputDate) {
            const dateObject = new Date(inputDate)

            const date = dateObject.getDate().toString()
            const month = (dateObject.getMonth() + 1).toString()
            const year = dateObject.getFullYear()

            return `${date}/${month}/${year}`
        }
    }

    const handleActive = (userid, currentStatus, removal) => {
        let formdata = new FormData();
        if (formdata) {
            const nextStatus = currentStatus === "active" ? 6 : 7

            if (removal) {
                let removalList = { ...isUpdated };
                delete removalList[userid]
                setIsUpdated(removalList)
            } else {
                setIsUpdated({ ...isUpdated, [userid]: currentStatus })
            }

            formdata.append('detailData', JSON.stringify({ statusId: nextStatus, id: userid }));
            dispatch(updateUser(formdata)).then((res) => {
                if (res?.payload?.success) {
                    const message = nextStatus === 6 ? 'User is Active' : 'User is Inactive';
                    toast.success(message);
                }
            });
        }
    }

    ChartJS.register(ArcElement, Tooltip, Legend);
    const FuncData = (label, graphdata, backgroundColor) => ({
        labels: [],
        datasets: [
            {
                label: label,
                data: graphdata,
                backgroundColor: backgroundColor,
                width: '20px',
                cutout: "70%"
            },
        ],
    })

    const allTripExeData = FuncData('', [ongoingTripExeCount, completedTripExeCount], ['#165DFF', ' #50CD89'])
    const onGoingTripsExeData = FuncData('', [ongoingTripExeCount, completedTripExeCount], ['#165DFF', '#F2F2F2'])
    const completedTripsExeData = FuncData('', [ongoingTripExeCount, completedTripExeCount], ['#F2F2F2', '#50CD89'])

    const handleFilterChange = (val) => {
        setGraphFilter(val)
        setActiveFilter(val);
    }

    const handleDropDownBtn = (type) => {
        setDropDownModal(prevState => prevState === type ? null : type);
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setTripId(id)
    };


    const handleView = (fileData) => {
        setSelectedFileData(fileData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFileData('');
    };

    return (
        <>
            {LoaderManageUser && <LoaderComponent />}
            <div className='manageUser_Section ManageUserDetailsSection'>
                <div class="back_btn_all">
                    <p onClick={() => router.push('/admin/manageusers')}><span class="back_icon"><img src="/images/back_icon.svg" alt="" class="img-fluid" /></span>Back</p>
                </div>
                <div className='manger_edit_details_main manger_user_main'>
                    <div className='edit_manger_active d-flex justify-content-end '>
                        {/* <Form>
                            <Form.Check type="switch"
                                id={`custom-switch-${managerUserDataById?.id}`}
                                onClick={() => {
                                    if (isUpdated[managerUserDataById?.id]) {
                                        if (isUpdated[managerUserDataById?.id] === 'active') {
                                            handleActive(managerUserDataById?.id, 'inactive', 'remove')
                                        } else {
                                            handleActive(managerUserDataById?.id, 'active', 'remove');
                                        }
                                    } else {
                                        if (managerUserDataById?.Status?.key === 'active') {
                                            handleActive(managerUserDataById?.id, 'inactive');
                                        } else if (managerUserDataById?.Status?.key === 'inactive') {
                                            handleActive(managerUserDataById?.id, 'active');
                                        }
                                    }
                                }}
                                checked={isUpdated[managerUserDataById?.id] ? (isUpdated[managerUserDataById?.id] === "active" ? true : false) : (managerUserDataById?.Status?.key === 'active')}
                            />
                        </Form>
                        <span class="field_active">Active</span> */}
                        {managerUserDataById.Status && managerUserDataById.Status.key === 'pending' ? (
                            <div className="user_data_left d-flex align-items-center">
                                <span className="filed_admin_text">{managerUserDataById.Status.key}</span>
                            </div>
                        ) : (
                            <>
                                <Form>
                                    <Form.Check type="switch"
                                        id={`custom-switch-${managerUserDataById?.id}`}
                                        onClick={() => {
                                            if (isUpdated[managerUserDataById?.id]) {
                                                if (isUpdated[managerUserDataById?.id] === 'active') {
                                                    handleActive(managerUserDataById?.id, 'inactive', 'remove')
                                                } else {
                                                    handleActive(managerUserDataById?.id, 'active', 'remove');
                                                }
                                            } else {
                                                if (managerUserDataById?.Status?.key === 'active') {
                                                    handleActive(managerUserDataById?.id, 'inactive');
                                                } else if (managerUserDataById?.Status?.key === 'inactive') {
                                                    handleActive(managerUserDataById?.id, 'active');
                                                }
                                            }
                                        }}
                                        checked={isUpdated[managerUserDataById?.id] ? (isUpdated[managerUserDataById?.id] === "active" ? true : false) : (managerUserDataById?.Status?.key === 'active')}
                                    />
                                </Form>
                                <span className="field_active">Active</span>
                            </>
                        )}
                        <Button variant="" className="pt-0"
                            onClick={() => router.push(`/admin/manageusers/edit/${managerUserDataById?.id}`)}>
                            Edit Details
                        </Button>
                    </div>
                    <div className='manager_edit_detail_inner'>
                        <h3>User Details</h3>
                        <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                                <span>{managerUserDataById?.Role?.title} ID:</span>
                                <p>{`#TECH 0${managerUserDataById?.id}`}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Full name</span>
                                <p>{managerUserDataById?.name}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Mobile Number</span>
                                <p>{managerUserDataById?.mobile}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Alternate Mobile Number</span>
                                <p>{managerUserDataById?.UserDetail?.alternateMobile ? managerUserDataById?.UserDetail?.alternateMobile : '-'}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Email ID</span>
                                <p>{managerUserDataById?.email}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Date of Birth</span>
                                <p>{formattedDate()}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span></span>
                                <p></p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span >Aadhar Card number</span>
                                <p>
                                    {managerUserDataById?.UserDetail?.aadhaar
                                        ? managerUserDataById.UserDetail.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
                                        : '-'}
                                </p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Pan No.</span>
                                <p>{managerUserDataById?.UserDetail?.pan}</p>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner"><h3>Documents</h3>
                        <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                                <span >Aadhar Card</span>
                                <p className='spanDecoration' style={{ cursor: 'pointer' }} onClick={() => handleView(managerUserDataById?.UserDocuments?.aadhaar)}>
                                    {managerUserDataById?.UserDocuments?.aadhaar ? managerUserDataById?.UserDocuments?.aadhaar : '-'}
                                </p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Pan No.</span>
                                <p className='spanDecoration' style={{ cursor: 'pointer' }} onClick={() => handleView(managerUserDataById?.UserDocuments?.panCardFrontImage)}>
                                    {managerUserDataById?.UserDocuments?.panCardFrontImage ? managerUserDataById?.UserDocuments?.panCardFrontImage : '-'}
                                </p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Bank details</span>
                                <p className='spanDecoration' style={{ cursor: 'pointer' }} onClick={() => handleView(managerUserDataById?.UserDocuments?.cancelChequeImage)}>
                                    {managerUserDataById?.UserDocuments?.cancelChequeImage ? managerUserDataById?.UserDocuments?.cancelChequeImage : '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <UserDataModal
                        showModal={showModal}
                        handleClose={handleCloseModal}
                        fileData={selectedFileData}
                    />


                    <div class="manager_edit_detail_inner"><h3>Base Address</h3>
                        <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                                <span>Street address</span>
                                <p>{managerUserDataById?.UserDetail?.streetAddress}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Zip code</span>
                                <p>{managerUserDataById?.UserDetail?.zipCode}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>City</span>
                                <p>{managerUserDataById?.UserDetail?.city}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>State</span>
                                <p>{managerUserDataById?.UserDetail?.state}</p>
                            </div>
                        </div>
                    </div>
                    <div class="manager_edit_detail_inner"><h3>Project handle</h3>
                        <div className="ManageUserTabal">
                            {managerUserDataById.ProjectStaffData?.length > 0 ?
                                managerUserDataById.ProjectStaffData.reduce((uniqueProjects, item) => {
                                    if (!uniqueProjects.find(project => project.ProjectData.id === item.ProjectData.id)) {
                                        uniqueProjects.push(item);
                                    }
                                    return uniqueProjects;
                                }, []).map((item, index) => (
                                    <div className="ManageUserTabalRow" key={index}>
                                        <span>Project ID: #{item.ProjectData.id}</span>
                                        <p>{item.ProjectData.projectName}</p>
                                    </div>
                                ))
                                : "-"}
                        </div>
                    </div>
                </div >

                <div className='manger_edit_details_main trip_edit_main'>
                    {/* {ongoingTripExeCount !== 0 || allTripExeGraphCount !== 0 || completedTripExeCount !== 0 ? (
                        <> */}
                    <div className='manger_edit_details_trip Executive_Trip_details'>
                        <h2 className='mb-0'>Executive Trip details</h2>
                        <div className='manger_edit_details_trip_inner d-flex'>
                            <p className='mb-0'>
                                <Button
                                    className={`manger_edit_details_trip_inner ${activeFilter === '' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('')}
                                >
                                    All
                                </Button>
                            </p>
                            <p className='mb-0'>
                                <Button
                                    className={`manger_edit_details_trip_inner ${activeFilter === 'day' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('day')}
                                >
                                    Day
                                </Button>
                            </p>
                            <p className='mb-0'>
                                <Button
                                    className={`manger_edit_details_trip_inner ${activeFilter === 'week' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('week')}
                                >
                                    Week
                                </Button>
                            </p>
                            <p className='mb-0'>
                                <Button
                                    className={`manger_edit_details_trip_inner ${activeFilter === 'month' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('month')}
                                >
                                    Month
                                </Button>
                            </p>
                        </div>
                    </div>
                    <div className='manger_edit_details_trip_item'>
                        <div className='manger_trip_details_ '>
                            <div className='manger_edit_image_bar_main row'>
                                <div className='manger_edit_image_bar_main row justify-content-around'>

                                    <div className='manger_edit_image_bar_inner col-sm-2'>
                                        <Doughnut data={allTripExeData} />
                                        <div className="m-4">
                                            <h5>All Trips</h5>
                                            <h2>{allTripExeGraphCount < 10 ? `0${allTripExeGraphCount}` : `${allTripExeGraphCount}`}</h2>
                                        </div>
                                    </div>

                                    <div className='manger_edit_image_bar_inner col-sm-2'>
                                        <Doughnut data={onGoingTripsExeData} />
                                        <div className="m-4">
                                            <h5> <span className="m-lg-1">On-going Trips</span><Image onClick={() => handleDropDownBtn("ongoing")} height={15} width={15} src={'/images/down-arrow-black.svg'} /></h5>
                                            <h2>{ongoingTripExeCount < 10 ? `0${ongoingTripExeCount}` : `${ongoingTripExeCount}`}</h2>
                                        </div>
                                    </div>

                                    <div className='manger_edit_image_bar_inner col-sm-2'>
                                        <Doughnut data={completedTripsExeData} />
                                        <div className="m-4">
                                            <h5><span className="m-1">Completed Trips</span><Image onClick={() => handleDropDownBtn("completed")} height={15} width={15} src={'/images/down-arrow-black.svg'} /></h5>
                                            <h2>{completedTripExeCount < 10 ? `0${completedTripExeCount}` : `${completedTripExeCount}`}</h2>
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
                    <div className='manger_edit_details_main trip_edit_main'>
                        <div className='manger_edit_details_trip d-flex justify-content-between'>
                            <h2 className='mb-0'>{dropDownModal} trips</h2>
                            <div className='completed_trip_content d-flex'>
                                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Control
                                                required type="text" placeholder="Enter Trip ID..." defaultValue="" />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </Form> */}
                                {/* <Button className='loding_site_btn'><Image width={20} height={20} src='/images/upload-icon.svg' alt="" />Export Report</Button> */}
                            </div>
                        </div>
                        <div className="manageUserCompletedTripsTable">
                            <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Trip ID</th>
                                            {/* <th>Truck No.</th> */}
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
                                        {tripDetailsList?.length > 0 && tripDetailsList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.id < 10 ? `#0${item?.id}` : `#${item?.id}`}</td>
                                                <td>{item.createdAt.split('T')[0]}</td>
                                                <td>{item.MaterialNames.displayName}</td>
                                                <td>{item.diesel}</td>
                                                <td>₹{item.cash}</td>
                                                <td>{item.UnoadingPointsDetails.unloadingAddress}</td>
                                                <td>-</td>
                                                <td><Button onClick={() => handleShow(item?.id)}>View details</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                )}

                {
                    dropDownModal &&
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        list={tripDetailsList}
                        count={manageUserCountData}
                    />
                }
            </div >
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

                        <Tripmodel
                            tripDataById={tripDataById}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ManagerUserDetailPage