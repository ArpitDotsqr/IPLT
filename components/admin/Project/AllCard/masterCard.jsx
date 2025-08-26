import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row, Table } from 'react-bootstrap'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import NoDataPage from '@/components/comman_component/NoDataPage';
import LoaderComponent from '@/components/comman_component/Loader';
import Pagination from '../../Pagination';
import { getTripDetailPerProject } from '@/redux/actions/project/projectData';
import AuditLogModal from '@/components/comman_component/AuditLogModal';
import { getAuditLogsDetail } from '@/redux/actions/auditlogs/auditlogsdata';

const MasterCard = ({ pagination, setPagination }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  // const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 3 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDetailList = useSelector((state) => state.projectSlice.allprojectDetailList?.rows)
  const projectDetailCount = useSelector((state) => state.projectSlice.allprojectDetailList?.count)
  const projectLoader = useSelector((state) => state.projectSlice.isLoading)
  const projectTripDetail = useSelector((state) => state.projectSlice.allProjectTripDetail)

  const getAuditLogsDetails = useSelector((state) => state.auditLogsSlice.auditLogsListData)

  const allTripProjGraphData = useSelector((state) => state.projectSlice.allTripProjectGraphData)
  const completedTripProjGraphData = useSelector((state) => state.projectSlice.allCompletedTripGraphData)
  const ongoingTripProjGraphData = useSelector((state) => state.projectSlice.allOngingTripGraphData)

  useEffect(() => {
    if (router.query.id) {
      dispatch(getTripDetailPerProject({ projectId: router.query.id }))
    }
  }, [router.query.id])

  const capitalizeWord = (name) => {
    if (name) {
      return name[0].toUpperCase() + name.slice(1)
    }
  }

  const groupedServiceTypes = {};
  projectDetailList && projectDetailList?.map(item => {
    item.ServiceDetailIds?.map(service => {
      const { id } = item
      const { displayName } = service.serviceTypeIds;
      if (!groupedServiceTypes[id]) {
        groupedServiceTypes[id] = displayName;
      } else {
        groupedServiceTypes[id] += ' | ' + displayName;
      }
    });
  });

  // const executiveArray = [
  //   { id: 1, displayName: "Project Manager", value: true },
  //   { id: 2, displayName: "Loading", value: projectDetailList && projectDetailList?.some((elem) => elem.id && elem.fieldExecutiveTypeIdss[0]?.isFieldExecutiveLoading === true) },
  //   { id: 3, displayName: "Weighment", value: projectDetailList && projectDetailList[0]?.fieldExecutiveTypeIdss[0]?.isFieldExecutiveWeighment === true },
  //   { id: 4, displayName: "Petrol Pump", value: projectDetailList && projectDetailList[0]?.fieldExecutiveTypeIdss[0]?.isFieldExecutiveFuelPump === true },
  //   { id: 5, displayName: "Unloading", value: projectDetailList && projectDetailList[0]?.fieldExecutiveTypeIdss[0]?.isFieldExecutiveUnloading === true }
  // ];

  // const groupedExecutiveTypes = {};
  // executiveArray.forEach((executive) => {
  //   const { id, displayName } = executive;
  //   if (!groupedExecutiveTypes[id] && executive.value) {
  //     groupedExecutiveTypes[id] = displayName;
  //   }
  // });
  // const combinedExecutiveTypes = Object.values(groupedExecutiveTypes).join(' | ');

  const handleImageClick = (id) => {
    dispatch(getAuditLogsDetail({ projectId: id }))
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // function NetWeightTrip(elem) {
  //   let num = 0;
  //   const hasNonEmptyUnloadingWeightData = elem.TripData?.some(trip => trip.UnloadingWeightData.length > 0);
  //   if (hasNonEmptyUnloadingWeightData) {
  //     num = elem.TripData.reduce((acc, trip) => {
  //       trip.UnloadingWeightData.forEach(item => {
  //         acc += item.netWeight_in_Tons;
  //       });
  //       return acc;
  //     }, 0);
  //   }
  //   return num;
  // }

  const getTripDetail = (projectId) => {
    if (projectId) {
      return projectTripDetail.find(trip => trip.id === projectId);
    }
  };


  return (
    <>
      {projectLoader && <LoaderComponent />}
      <Row >
        <Col md={12}>
          {projectDetailList?.length > 0 ? projectDetailList?.map((projdata, index) => {
            return (
              <div className='project_all_card' key={`projectData_${index}`}>
                <div className="project_id_or_view_details">
                  <p className='project_id'>ProjectID : <span>{projdata?.id < 10 ? `#PRJ0${projdata?.id}` : `#PRJ${projdata?.id}`}</span></p>
                  <div className='d-flex gap-3'>
                    <span onClick={() => handleImageClick(projdata?.id)}>
                      <Image width={15} height={15} src="/images/clock_icon.svg" alt="" />
                    </span>
                    <Button onClick={() => router.push(`/admin/project/details/${projdata.id}`)}>View Details</Button>
                  </div>
                </div>
                <div className="default_card_table border-0  ProjectTopHeading">
                  <h2 className='d-flex align-items-center'>{capitalizeWord(projdata.projectName)} </h2>
                  <div className="Material"> <h6 className='m-0'>Material :</h6>
                    <span className='MaterialType'>{projdata.materialIds.displayName}</span></div>
                </div>
                <div className='manager_edit_detail_inner'>
                  <div className="ManageUserTabal">
                    <div className="ManageUserTabalRow">
                      <span>Client Name</span>
                      <p>{projdata?.clientDetailIds.clientName}</p>
                    </div>

                    <div className="ManageUserTabalRow">
                      <span>PO No.</span>
                      <p>{projdata.PurchaseOrderDetailIds.length > 0 ? projdata.PurchaseOrderDetailIds[0]?.purchaseOrderNumber : '-'}</p>

                    </div>
                    <div className="ManageUserTabalRow">
                      <span>Project start month</span>
                      <p>{projdata.PurchaseOrderDetailIds.length > 0 ? projdata.PurchaseOrderDetailIds[0]?.purchaseOrderStartMonth : '-'}</p>
                    </div>

                    <div className="ManageUserTabalRow">
                      <span>Project end month</span>
                      <p>{projdata.PurchaseOrderDetailIds[projdata.PurchaseOrderDetailIds.length - 1]?.purchaseOrderEndMonth}</p>
                    </div>

                  </div>
                </div>
                <div className="ManageUserTabal">
                  <div className="ManageUserTabalRow">
                    <span>Service type</span>
                    <p>{groupedServiceTypes[projdata.id] ? groupedServiceTypes[projdata.id] : '-'}</p>
                  </div>
                  {/* <div className="ManageUserTabalRow">
                    <span>Vendor type</span>
                    <p>Transporter | Excavator | Petrol Pump</p>
                  </div> */}
                  <div className="ManageUserTabalRow">
                    <span>Vendor type</span>
                    {(projdata.VendorTransporterIds.length > 0 ||
                      projdata.VendorPetrolPumpIds.length > 0 ||
                      projdata.VendorExcavatorIds.length > 0) && (
                        <p>
                          {projdata.VendorTransporterIds.length > 0 && "Transporter | "}
                          {projdata.VendorExcavatorIds.length > 0 && "Excavator | "}
                          {projdata.VendorPetrolPumpIds.length > 0 && "Petrol Pump"}
                        </p>
                      )}
                  </div>
                  <div className="ManageUserTabalRow">
                    <span>Executive details</span>
                    <p>
                      {`Project Manager${projdata.fieldExecutiveTypeIdss[0]?.isFieldExecutiveLoading ? ' | Loading' : ''}
                     ${projdata.fieldExecutiveTypeIdss[0]?.isFieldExecutiveUnloading ? ' | Unloading' : ''}
                     ${projdata.fieldExecutiveTypeIdss[0]?.isFieldExecutiveWeighment ? ' | Weighment' : ''}
                     ${projdata.fieldExecutiveTypeIdss[0]?.isFieldExecutiveFuelPump ? ' | Petrol Pump' : ''}`}
                    </p>
                  </div>
                </div>

                <div className="Total_trips" >
                  <div className="all_trips">
                    <div>
                      <h4>Total weight</h4>
                      <span>{`${getTripDetail(projdata.id)?.totalWeight.toFixed(2)}`}</span> <span style={{ fontSize: 'medium' }}>Metric tons</span>
                    </div>
                    <div>
                      <p>All Trips</p>
                      <span>{getTripDetail(projdata.id)?.AllTripCount}</span>
                    </div>
                    <div>
                      <p>On-going Trips</p>
                      <span>{getTripDetail(projdata.id)?.OnGoingTripCount}</span>
                    </div>
                    <div className='border-0'>
                      <p>Completed Trips</p>
                      <span>{getTripDetail(projdata.id)?.CompletedTripCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }) : <NoDataPage />}
        </Col>

        <Col md={12} className='mt-3' >
          {projectDetailCount > 0 ?
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={projectDetailList}
              count={projectDetailCount}
            />
            : ''}
        </Col>

        <div >
          <AuditLogModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            columnContents={getAuditLogsDetails}
          />
        </div>
      </Row>
    </>
  )
}

export default MasterCard
