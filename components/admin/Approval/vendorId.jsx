import ModalDoc from '@/components/comman_component/ModalDoc'
import { getVendorDataById, vendorApprovalBySuperadmin } from '@/redux/actions/vendor/vendorActions'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineAttachment } from "react-icons/md";
import { toast } from 'react-toastify'
import LoaderComponent from '@/components/comman_component/Loader'


const VendorApprovePage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const tableHead = ["Vehicle No", "Vehicle Type", "Wheels", "Volume", "Vehicle Age", "Capacity", "Insurance", "Driver Name", "Documents"]

    const [commentShow, setComments] = useState(true)
    const [comments, setCommentsValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedFileData, setSelectedFileData] = useState('');

    const vendorDataById = useSelector((state) => state.vendorSlice.particularVendorData)
    const LoaderVendorData = useSelector((state) => state.vendorSlice.isLoading)
    const currentUserData = useSelector((state) => state.userSlice.getUserList)

    useEffect(() => {
        if (router.query.id)
            dispatch(getVendorDataById({ id: Number(router.query.id) }))
    }, [router.query.id])

    const handleView = (fileData) => {
        setSelectedFileData(fileData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFileData('');
    };

    const handleApproval = (id) => {
        dispatch(vendorApprovalBySuperadmin({
            status: "approved",
            userId: id
        })).then((res) => {
            if (res?.payload?.data?.success) {
                router.push('/admin/approvals')
                toast.success(res?.payload?.data?.message)
            }
        })
    }

    const handleReject = (id) => {
        if (comments.trim() === '') {
            setComments(false)
            toast.info('Please, add comments before rejecting')
        } else {
            dispatch(vendorApprovalBySuperadmin({
                status: "rejected",
                userId: id
            })).then((res) => {
                if (res?.payload?.data?.success) {
                    router.push('/admin/approvals')
                    toast.success(res?.payload?.data?.message)
                }
            })
        }
    }

    return (
        <div className='ProjectAdmin'>
            {LoaderVendorData && <LoaderComponent />}
            <div class="back_btn_all pt-0"><p><span class="back_icon"><img src="/images/back_icon.svg" alt="" class="img-fluid" /></span>Back</p></div>
            {vendorDataById && vendorDataById.map((vendordata, ind) => (
                <>
                    <div className='manger_edit_details_main approval_main_inner' key={ind}>
                        <div class="vendors_edit_detail_inner"><h3>Vendor Details</h3>
                            <div className='vendorsDetailsTable  '>
                                <div className='vendorsDetailsTable  '>
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

                        <div class="vendors_edit_detail_inner"><h3>Communication Address</h3>
                            <div className='vendorsDetailsTable  '>
                                <div className="vendorsDetailsTableRow">
                                    <span>Address</span>
                                    <p>{vendordata?.communicationAddress?.communicationStreetAddress}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>State</span>
                                    <p>{vendordata?.communicationAddress?.communicationState}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>City</span>
                                    <p>{vendordata?.communicationAddress?.communicationCity}</p>
                                </div>
                            </div>
                        </div>

                        <div class="vendors_edit_detail_inner"><h3>Registred Address</h3>
                            <div className='vendorsDetailsTable  '>
                                <div className="vendorsDetailsTableRow">
                                    <span>Address</span>
                                    <p>{vendordata?.registeredAddress?.registeredStreetAddress}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>State</span>
                                    <p>{vendordata?.registeredAddress?.registeredState}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>City</span>
                                    <p>{vendordata?.registeredAddress?.registeredCity}</p>
                                </div>
                            </div>
                        </div>
                        <div class="vendors_edit_detail_inner border-0"><h3>Contact Details</h3>
                            {vendordata.VendorContactDetail?.map((item, ind) => (
                                <div className='vendorsDetailsTable' key={ind}>
                                    <div className="vendorsDetailsTableRow">
                                        <span>Contact no.</span>
                                        <p>{item?.mobile}</p>
                                    </div>
                                    <div className="vendorsDetailsTableRow">
                                        <span>Email ID</span>
                                        <p>{item?.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="vendors_edit_detail_inner border-0"><h3>Documents</h3>
                            <div className='vendorsDetailsTable'>
                                <div className="vendorsDetailsTableRow">
                                    <span>PAN No.</span>
                                    <p>{vendordata?.UserDetail?.pan ? vendordata?.UserDetail?.pan : '_'}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>GST No.</span>
                                    <p>{vendordata?.UserDetail?.gstNumber ? vendordata?.UserDetail?.gstNumber : '_'}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>Account Details</span>
                                    <p>{vendordata?.UserDocuments?.cancelChequeImage}</p>
                                </div>

                            </div>
                        </div>
                        <div class="vendors_edit_detail_inner border-0"><h3>Asset details</h3>
                            <div className='vendorsDetailsTable'>
                                <div className="vendorsDetailsTableRow">
                                    <span>Owned</span>
                                    <p>{vendordata?.UserDetail?.ownedVehicles ? vendordata?.UserDetail?.ownedVehicles : '-'}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>Rented</span>
                                    <p>{vendordata?.UserDetail?.rentedVehicles ? vendordata?.UserDetail?.rentedVehicles : '-'}</p>
                                </div>
                                <div className="vendorsDetailsTableRow">
                                    <span>Mobilization time</span>
                                    <p>{vendordata?.UserDetail?.moblizationTime ? vendordata?.UserDetail?.moblizationTime : '-'}</p>
                                </div>
                            </div>
                            <div className="Vendor_Capability_table">
                                <div className="table-responsive">
                                    <Table className='table' >
                                        <thead>
                                            <tr>
                                                {tableHead.map((item, index) => (
                                                    <th key={index} >{item}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendordata?.UserAssets?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.vehicleNumber ? item?.vehicleNumber : '-'}</td>
                                                    <td>{item?.vehicleTypeIds?.displayName ? item?.vehicleTypeIds?.displayName : '-'}</td>
                                                    <td>{item?.vehicleWheels ? item?.vehicleWheels : '-'}</td>
                                                    <td>{item?.vehicleCapacity ? item?.vehicleCapacity : '-'} Metric Ton</td>
                                                    <td>{item?.registrationDate ? item?.registrationDate : '-'}</td>
                                                    <td>{item?.vehicleTareWeight ? item?.vehicleTareWeight : '-'}</td>
                                                    <td>{item.insuranceValidity ? item.insuranceValidity : '-'}</td>
                                                    <td>{item.driverName ? item.driverName : '-'}</td>
                                                    <td onClick={() => handleView(item.rcImageFront)}>
                                                        <span className='password_visiable'>
                                                            <Image width={20} height={30} src="/images/visibility_icon.svg" alt="" class="img-fluid" />
                                                        </span> View
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
                    <div className='manger_edit_details_main'>
                        <div class="vendors_edit_detail_inner border-0"><h3>Attachments</h3>
                            <div className='vendorsDetailsTable project_manger_details vender_edit_delt'>
                                {vendordata.UserDocuments.cancelChequeImage && (
                                    <div className="vendorsDetailsTableRow">
                                        <p>Cancel Cheque</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {vendordata.UserDocuments.cancelChequeImage}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {vendordata.UserDocuments.createdAt.split('T')[0]}</p>
                                    </div>
                                )}
                                {vendordata.UserDocuments.panCardFrontImage && (
                                    <div className="vendorsDetailsTableRow">
                                        <p>Pan Card Front</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {vendordata.UserDocuments.panCardFrontImage}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {vendordata.UserDocuments.createdAt.split('T')[0]}</p>
                                    </div>
                                )}
                                {vendordata.UserDocuments.panCardBackImage && (
                                    <div className="vendorsDetailsTableRow">
                                        <p>Pan Card Back</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {vendordata.UserDocuments.panCardBackImage}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {vendordata.UserDocuments.createdAt.split('T')[0]}</p>
                                    </div>
                                )}
                            </div>
                            {vendordata.UserAssets.length > 0 && vendordata.UserAssets.map((item, index) => (
                                <div className='vendorsDetailsTable project_manger_details vender_edit_delt'>
                                    <div className="vendorsDetailsTableRow" key={index}>
                                        <p>RC Front</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {item.rcImageFront}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {item.createdAt.split('T')[0]}</p>
                                    </div>

                                    <div className="vendorsDetailsTableRow" key={index}>
                                        <p>RC Back</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {item.rcImageBack}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {item.createdAt.split('T')[0]}</p>
                                    </div>

                                    <div className="vendorsDetailsTableRow" key={index}>
                                        <p>Driving License</p>
                                        <div className='approval_attachment_main'>
                                            <div className='icon'>
                                                <MdOutlineAttachment className='attachmentIcon' />
                                            </div>
                                            {item.drivingLicenseImage}
                                        </div>
                                        <div className='d-flex'>
                                            <span>Uploaded by:</span><p className='ps-2'>{vendordata.name}</p>
                                        </div>
                                        <p>on {item.createdAt.split('T')[0]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ModalDoc
                        showModal={showModal}
                        handleClose={handleCloseModal}
                        fileData={selectedFileData}
                    />

                    <div className='manger_edit_details_main'>
                        <h4>Comment</h4>
                        <textarea
                            placeholder=''
                            id="w3review"
                            name="w3review"
                            className='text_area'
                            disabled={commentShow}
                            value={comments}
                            onChange={(e) => setCommentsValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-end approval_page_btn'>
                        {vendordata.Status.key !== 'rejected' && (
                            <div className="reject_btn">
                                <Button type='submit'
                                    disabled={currentUserData.roleId === 2 ? true : currentUserData.roleId === 1 && false}
                                    onClick={() => handleReject(vendordata?.id)}
                                >
                                    <span> <img src={'/images/reject_icon.svg'} alt="" /></span>
                                    Reject
                                </Button>
                            </div>
                        )}
                        <div className="approve_btn">
                            <Button
                                type='submit'
                                disabled={currentUserData.roleId === 2 ? true : currentUserData.roleId === 1 && false}
                                onClick={() => handleApproval(vendordata?.id)}
                            >
                                <span> <img src={'/images/approve_icon.svg'} alt="" /></span>
                                Approve
                            </Button>
                        </div>
                    </div>
                </>
            ))}

        </div>
    )
}

export default VendorApprovePage