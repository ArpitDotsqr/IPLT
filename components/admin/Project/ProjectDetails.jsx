import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getTripCompletedDataPerProject, getTripDetailPerProject, getTripOngoingDataPerProject, getWorkOrderDetail } from "@/redux/actions/project/projectData";
import Image from "next/image";
import { getTripDataById, getTripDetails } from "@/redux/actions/trip/tripDetail";
import Tripmodel from "../Trips/Tripmodel";
import LoaderComponent from "@/components/comman_component/Loader";
import NoDataPage from "@/components/comman_component/NoDataPage";
import WorkOrderModal from "@/components/comman_component/WorkOrder";
import Pagination from "../Pagination";


const ProjectDetails = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [graphFilter, setGraphFilter] = useState('')
    const [activeFilter, setActiveFilter] = useState('');
    const [dropDownModal, setDropDownModal] = useState(false)
    const [show, setShow] = useState(false);
    const [tripIds, setTripId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });

    useEffect(() => {
        if (router.query.id) {
            dispatch(getTripDetailPerProject({ "projectId": router.query.id, filter: graphFilter }))
        }
        if (dropDownModal) {
            if (dropDownModal) {
                dispatch(getTripDetails({ tripStatus: dropDownModal, "projectId": router.query.id, filter: graphFilter, ...pagination }))
            }
            // if (dropDownModal === 'ongoing') {
            //     dispatch(getTripOngoingDataPerProject({ "projectId": router.query.id, filter: graphFilter }))
            // }
        }
        if (tripIds) {
            dispatch(getTripDataById({ 'tripId': tripIds }))
        }

    }, [router.query.id, graphFilter, dropDownModal, tripIds, pagination])

    const tripsCount = useSelector((state) => state.tripSlice.tripCount)

    const tripOngoingProject = useSelector((state) => state.projectSlice.getOngoingProjectData)
    const tripCompletedProject = useSelector((state) => state.projectSlice.getCompletedProjectData)

    const tripDetailsList = useSelector((state) => state.tripSlice.allTripDetails)
    const countProjectTrip = useSelector((state) => state.tripSlice.tripCount)
    const tripDataById = useSelector((state) => state.tripSlice.particularTripData)

    const projectData = useSelector((state) => state.projectSlice.projectDetailList)
    const loaderProject = useSelector((state) => state.projectSlice.isLoading)

    const allTripProjGraphData = useSelector((state) => state.projectSlice.allTripProjectGraphData)
    const completedTripProjGraphData = useSelector((state) => state.projectSlice.allCompletedTripGraphData)
    const ongoingTripProjGraphData = useSelector((state) => state.projectSlice.allOngingTripGraphData)


    const executiveArray = [
        { id: 1, displayName: "Loading Point", value: projectData?.FieldExecutiveDeployment?.isFieldExecutiveLoadingg },
        { id: 2, displayName: "Unloading Point", value: projectData?.FieldExecutiveDeployment?.isFieldExecutiveUnloading },
        { id: 3, displayName: "Weighment Point", value: projectData?.FieldExecutiveDeployment?.isFieldExecutiveWeighment },
        { id: 4, displayName: "Fuel Pump", value: projectData?.FieldExecutiveDeployment?.isFieldExecutiveFuelPump },
    ];

    const groupedExecutiveTypes = {}
    executiveArray.forEach((executive) => {
        const { id, displayName } = executive
        if (!groupedExecutiveTypes[id] && executive.value) {
            groupedExecutiveTypes[id] = displayName
        }
    })

    const combinedExecutiveTypes = Object.values(groupedExecutiveTypes).join(' | ')

    const vehicleWeighmentArray = [
        { id: 1, displayName: "Loading", value: projectData?.VehicleWeighment?.isVehicleWeightLoading },
        { id: 2, displayName: "Standard Tare Weight", value: projectData?.VehicleWeighment?.isVehicleWeightTareWeight },
        { id: 3, displayName: "Twice near Unloading", value: projectData?.VehicleWeighment?.isVehicleWeightTwiceUnloading },
    ];
    const groupedVehicleWeighment = {}
    vehicleWeighmentArray.forEach((execu) => {
        const { id, displayName } = execu
        if (!groupedVehicleWeighment[id] && execu.value) {
            groupedVehicleWeighment[id] = displayName
        }
    })
    const combinedVehicleWeighmentExecutive = Object.values(groupedVehicleWeighment).join(' | ')

    const geoFencingArray = [
        { id: 1, displayName: "Loading", value: projectData?.GeoFencing?.isGeoFencingLoading },
        { id: 2, displayName: "Unloading", value: projectData?.GeoFencing?.isGeoFencingUnloading },
    ];

    const groupedGeoFencing = {}
    geoFencingArray.forEach((executive) => {
        const { id, displayName } = executive
        if (!groupedGeoFencing[id] && executive.value) {
            groupedGeoFencing[id] = displayName
        }
    })
    const combinedGeoFencingExecutive = Object.values(groupedGeoFencing).join(' | ')

    const geoTaggedArray = [
        { id: 1, displayName: "Loading", value: projectData?.GeoTaggedPictureRequirenment?.isGeoImgLoading },
        { id: 2, displayName: "Unloading", value: projectData?.GeoTaggedPictureRequirenment?.isGeoImgUnloading },
        { id: 3, displayName: "Weighment", value: projectData?.GeoTaggedPictureRequirenment?.isGeoImgWeighment },
    ];

    const groupedGeoTagged = {}
    geoTaggedArray.forEach((executive) => {
        const { id, displayName } = executive
        if (!groupedGeoTagged[id] && executive.value) {
            groupedGeoTagged[id] = displayName
        }
    })
    const combinedGeoTaggedExecutive = Object.values(groupedGeoTagged).join(' | ')

    const dieselAndTripCashArray = [
        { id: 1, displayName: 'Diesel', value: projectData?.DieselAndTripCash?.isDieselAllotted, maxAllotted: projectData?.DieselAndTripCash?.maxDieselAllotted },
        { id: 2, displayName: 'Cash', value: projectData?.DieselAndTripCash?.isCashAllotted, maxAllotted: projectData?.DieselAndTripCash?.maxCashAllotted },
    ];

    const filteredDieselAndTripCash = dieselAndTripCashArray.filter(item => item.value)
        .map(item => `${item.displayName}: ${item.maxAllotted}`)
        .join(' | ');

    const documentSubmittedArray = [
        { id: 1, displayName: "Signed Challan", value: projectData?.DocumentSubmitted?.isSignedChallan },
        { id: 2, displayName: "Weighbridge Slip", value: projectData?.DocumentSubmitted?.isWeighbridgeSlip },
    ];

    const groupedDocumentSubmit = {}
    documentSubmittedArray.forEach((executive) => {
        const { id, displayName } = executive
        if (!groupedDocumentSubmit[id] && executive.value) {
            groupedDocumentSubmit[id] = displayName
        }
    })
    const combinedDocumentSubmitted = Object.values(groupedDocumentSubmit).join(' | ')

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

    const totalWeightData = FuncData('', [allTripProjGraphData, allTripProjGraphData], ['#165DFF', ' #50CD89', '#F2F2F2']);
    const allTripData = FuncData('', [ongoingTripProjGraphData, completedTripProjGraphData], ['#165DFF', ' #50CD89'])
    const onGoingTripsData = FuncData('', [ongoingTripProjGraphData, completedTripProjGraphData], ['#165DFF', '#F2F2F2'])
    const completedTripsData = FuncData('', [ongoingTripProjGraphData, completedTripProjGraphData], ['#F2F2F2', '#50CD89'])

    const handleFilterChange = (val) => {
        setGraphFilter(val)
        setActiveFilter(val);
    }

    const handleDropDownBtn = (type) => {
        setDropDownModal(prevState => prevState === type ? null : type);
    }

    const capitalizeWord = () => {
        if (dropDownModal) {
            return dropDownModal[0].toUpperCase() + dropDownModal.slice(1)
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setTripId(id)
    };


    function renderTableRow(item, index) {
        return (
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
        );
    }

    // const tripDetailsList = useSelector((state) => state.tripSlice.allTripDetails)

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleWorkOrderPdf = async () => {
        if (router.query.id) {
            await dispatch(getWorkOrderDetail({ projectId: router.query.id }));
            setIsModalOpen(true);
        }
    };

    return (
        <>
            {loaderProject && <LoaderComponent />}
            <div className='manageUser_Section'>
                <div class="back_btn_all pb-0" onClick={() => router.push('/admin/project')}>
                    <p><span class="back_icon"><img src="/images/back_icon.svg" alt="" class="img-fluid" /></span>Back</p>
                </div>
                <div className='manger_edit_details_main project_main_details'>
                    <div className="d-flex justify-content-end">
                        <div className='edit_manger_active d-flex justify-content-end'>
                            <Button variant="" className="pt-0"
                                onClick={() => {
                                    handleWorkOrderPdf()
                                }}
                            >Work Order</Button>
                        </div>

                        <div className='edit_manger_active d-flex justify-content-end'>
                            <Button variant="" className="pt-0"
                                onClick={() => router.push(`/admin/project/edit/${projectData?.ProjectDetails?.id}`)}
                            >
                                Edit Details
                            </Button>
                        </div>
                    </div>
                    <div className='manager_edit_detail_inner ProjectInformation'>
                        <h3>Project Details</h3>
                        <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                                <span> Project ID.</span>
                                <p>{projectData?.ProjectDetails?.id < 10 ? `#PRJ0${projectData?.ProjectDetails?.id}` : `#PRJ${projectData?.ProjectDetails?.id}`}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Project Name</span>
                                <p>{projectData?.ProjectDetails?.projectName}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Material</span>
                                <p>{projectData?.ProjectDetails?.materialIds?.displayName}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Client Name</span>
                                <p>{projectData?.ProjectDetails?.clientDetailIds?.clientName}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>GST No.</span>
                                <p>{projectData?.ProjectDetails?.clientDetailIds?.gstNumber}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Client Address</span>
                                <p>{projectData?.ProjectDetails?.clientDetailIds?.clientAddress}</p>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner"><h3>PO Details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>PO No.</th>
                                            <th>PO Start Month</th>
                                            <th>PO End Month</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.PurchaseOrderDetail && projectData.PurchaseOrderDetail.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.purchaseOrderNumber}</td>
                                                <td>{item.purchaseOrderStartMonth}</td>
                                                <td>{item.purchaseOrderEndMonth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner"><h3>Service Details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Unit</th>
                                            <th>Qty</th>
                                            <th>Rate(in rs.)</th>
                                            <th>Amount(in rs.)</th>
                                            <th>GST Rate(%)</th>
                                            <th>Amount(Including GST)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.ServiceDetail && projectData.ServiceDetail.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.unitIds.displayName}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.unitRate}</td>
                                                <td>{Number(item.quantity) * Number(item.unitRate)}</td>
                                                <td>{item.gstRateIds.displayName}</td>
                                                <td>{Number(item.gstRateIds.name) === 0 ? Number(item.unitRate) * Number(item.quantity) : Number(item.unitRate) * Number(item.quantity) * Number(item.gstRateIds.name)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div class="manager_edit_detail_inner"><h3>EIC Details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Contact no.</th>
                                            <th>Email ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.EicDetails && projectData.EicDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner">
                        <h3> Loading Details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Address</th>
                                            <th>Dyke/Cello</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.LoadingPointsDetail && projectData.LoadingPointsDetail.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.loadingAddress}</td>
                                                <td>{item.dykeIdName?.displayName || item.celloIdName?.name}</td>
                                                <td>{item.loadingLongitude}</td>
                                                <td>{item.loadingLatitude}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner">
                        <h3> Un-loading Details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Address</th>
                                            <th>Chainage</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.UnloadingPointsDetail && projectData.UnloadingPointsDetail.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.unloadingAddress}</td>
                                                <td>{item.chainageNumber}</td>
                                                <td>{item.unloadingLongitude}</td>
                                                <td>{item.unloadingLatitude}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner"><h3>Staff details</h3>
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Remarks</th>
                                            <th>Conatct no.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData && projectData.StaffDetail && projectData.StaffDetail.map((item, index) => (
                                            <tr key={index}>
                                                {console.log(item, "sdfsdddddddddddd")}
                                                <td>{index + 1}</td>
                                                <td>{item.projectStaffIdDetail.name}</td>
                                                <td>{item.fieldExecutiveTypeIds && item.fieldExecutiveTypeIds.displayName}</td>
                                                <td>{item.remarks}</td>
                                                <td>{item.mobile}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div class="manager_edit_detail_inner"><h3>Special requirements</h3>
                        <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                                <span>Field Executive Deployment</span>
                                <p>{combinedExecutiveTypes}</p>
                            </div>

                            <div className="ManageUserTabalRow">
                                <span>Vehicle Pass Requirement</span>
                                <p>{projectData?.isVehiclePassRequirement?.isVehiclePassRequired ? 'Yes' : 'No'}</p>
                            </div>

                            <div className="ManageUserTabalRow">
                                <span>Vehicle Weighment</span>
                                <p>{combinedVehicleWeighmentExecutive}</p>
                            </div>

                            <div className="ManageUserTabalRow">
                                <span>Geo-fencing</span>
                                <p>{combinedGeoFencingExecutive}</p>
                            </div>

                            <div className="ManageUserTabalRow">
                                <span>Geo-tagged picture requirement</span>
                                <p>{combinedGeoTaggedExecutive ? combinedGeoTaggedExecutive : '-'}</p>
                            </div>

                            <div className="ManageUserTabalRow">
                                <span>Diesel and Trip Cash</span>
                                <p>{filteredDieselAndTripCash}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                                <span>Document submitted</span>
                                <p> {combinedDocumentSubmitted ? combinedDocumentSubmitted : '-'}</p>
                            </div>
                        </div>
                    </div>

                    <div class="manager_edit_detail_inner"><h3>Vehicle Details</h3>
                        <div className="ManageUserTabalRow">
                            <h3 className="petrol_pump_txt">Transporter</h3>
                            <div className="create_project_table">
                                <div className="table-responsive">
                                    <Table className='table' >
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Name</th>
                                                <th>Unit</th>
                                                <th>Qty</th>
                                                <th>Rate(in rs.)</th>
                                                <th>Amount(in rs.)</th>
                                                <th>GST Rate</th>
                                                <th>Amount (Inc. GST)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projectData && projectData.TransporterDetail && projectData.TransporterDetail.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.transporterIds.name}</td>
                                                    <td>{item.TransporterUnitIds.displayName}</td>
                                                    <td>{item.transporterQuantity}</td>
                                                    <td>{item.unitRateAmount}</td>
                                                    <td>{Number(item.transporterQuantity) * Number(item.unitRateAmount)}</td>
                                                    <td>{item.TransporterGstRateIds.displayName}</td>
                                                    <td>{Number(item.TransporterGstRateIds.name) === 0 ? Number(item.transporterQuantity) * Number(item.unitRateAmount) : Number(item.transporterQuantity) * Number(item.unitRateAmount) * Number(item.TransporterGstRateIds.name)}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <h3 className="petrol_pump_txt">Excavator</h3>
                            <div className="create_project_table">
                                <div className="table-responsive">
                                    <Table className='table' >
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Name</th>
                                                <th>Fixed Hrs/month</th>
                                                <th>Rate( in rs.)</th>
                                                <th>With Diesel</th>
                                                <th>Payment Terms</th>
                                                <th>GST Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projectData && projectData.ExcavatorDetail && projectData.ExcavatorDetail.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.excavatorIds.name}</td>
                                                    <td>{item.hoursPerMonth}</td>
                                                    <td>{item.ratePerHourAmount}</td>
                                                    <td>{item.diesel ? 'Yes' : 'No'}</td>
                                                    <td>{item.ExcavatorPaymentTermIds.displayName}</td>
                                                    <td>{item.ExcavatorGstRateIds.displayName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <h3 className="petrol_pump_txt">Petrol pump</h3>
                            <div className="create_project_table">
                                <div className="table-responsive">
                                    <Table className='table' >
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Name</th>
                                                <th>Contact</th>
                                                <th>Credit</th>
                                                <th>Discount</th>
                                                <th>Reconciliation Arrangement</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projectData && projectData.PetrolPumpDetail && projectData.PetrolPumpDetail.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.petrolPumpIds.name}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.totalCreditAmount}</td>
                                                    <td>{item.discountPerLiter}</td>
                                                    <td>{item.PetrolPumpReconIds.displayName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------------------------------------------------------------------------ */}
                <div className='manger_edit_details_main trip_edit_main'>
                    {/* {ongoingTripProjGraphData !== 0 || allTripProjGraphData !== 0 || completedTripProjGraphData !== 0 ? (
                        <> */}
                    <div className='manger_edit_details_trip Executive_Trip_details'>
                        <h2 className='mb-0'>Trip details</h2>
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
                                <div className='manger_edit_image_bar_inner col-sm-2'>
                                    <Doughnut data={totalWeightData} />
                                    <div className="m-3">
                                        <h5>Total weight</h5>
                                    </div>
                                </div>

                                <div className='manger_edit_image_bar_inner col-sm-2'>
                                    <Doughnut data={allTripData} />
                                    <div className="m-3">
                                        <h5>All Trips</h5>
                                        <h2>{allTripProjGraphData < 10 ? `0${allTripProjGraphData}` : `${allTripProjGraphData}`}</h2>
                                    </div>
                                </div>

                                <div className='manger_edit_image_bar_inner col-sm-2'>
                                    <Doughnut data={onGoingTripsData} />
                                    <div className="m-3">
                                        <h5> <span className="m-lg-1">On-going Trips</span><Image onClick={() => handleDropDownBtn("ongoing")} height={15} width={15} src={'/images/down-arrow-black.svg'} /></h5>
                                        <h2>{ongoingTripProjGraphData < 10 ? `0${ongoingTripProjGraphData}` : `${ongoingTripProjGraphData}`}</h2>
                                    </div>
                                </div>

                                <div className='manger_edit_image_bar_inner col-sm-2'>
                                    <Doughnut data={completedTripsData} />
                                    <div className="m-3">
                                        <h5><span className="m-1">Completed Trips</span><Image onClick={() => handleDropDownBtn("completed")} height={15} width={15} src={'/images/down-arrow-black.svg'} /></h5>
                                        <h2>{completedTripProjGraphData < 10 ? `0${completedTripProjGraphData}` : `${completedTripProjGraphData}`}</h2>
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
                            <h2 className='mb-0'>{capitalizeWord()} Trips</h2>
                            <div className='completed_trip_content d-flex'>
                                {/* <Form noValidate >
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                        <Form.Control
                                            required type="text" placeholder="Enter Trip ID..." defaultValue="" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Form> */}
                            </div>
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
                                        {/* {
                                            dropDownModal === 'ongoing' ? tripOngoingProject?.map(renderTableRow) :
                                                dropDownModal === 'completed' ? tripCompletedProject?.map(renderTableRow) : null
                                        } */}
                                        {tripDetailsList.length > 0 && tripDetailsList.map((item, index) => (
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
                    (dropDownModal && countProjectTrip > 0) &&
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        list={tripDetailsList}
                        count={countProjectTrip}
                    />
                }
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

            <div>
                <WorkOrderModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </>
    )
}

export default ProjectDetails;