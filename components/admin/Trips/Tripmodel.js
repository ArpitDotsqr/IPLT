import LoaderComponent from "@/components/comman_component/Loader";
import ViewModal from "@/components/comman_component/ViewDocumentModal";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import GeoCodeAddress from "./GeoCodeAddress";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

export default function Tripmodel() {

  const [showModal, setShowModal] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState();
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });

  const tripDataById = useSelector((state) => state.tripSlice.particularTripData)
  const progressBarloading = useSelector((state) => state.tripSlice.progressBarLoadingData)
  const progressBarUnloading = useSelector((state) => state.tripSlice.progressBarUnloadingData)

  const onSubmit = (values) => {
    console.log(values);
  };

  // const tripFunc = (data) => {
  //   return data.map(elem => {
  //     if (elem) {
  //       return elem.VehicleNumber.vehicleNumber + " "
  //     }
  //   })
  // }

  const tripFunc = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(elem => {
      if (elem) {
        if (elem.VehicleNumber && elem.VehicleNumber.vehicleNumber) {
          return elem.VehicleNumber.vehicleNumber + " ";
        } else {
          return '';
        }
      }
    });
  };

  const points = [
    { name: 'Loading Point', data: progressBarloading.loadingpoint },
    { name: 'Challan', data: progressBarloading.echallan },
    { name: 'Fuel Pump', data: progressBarloading.petrolpump },
    { name: 'Loaded Truck Weight', data: progressBarloading.loadedtruckweight },
    { name: 'Unloading Point', data: progressBarUnloading.unloadingpoint },
    { name: 'Tare Weight', data: progressBarUnloading.unloadedtruckWeight },
    { name: 'Signed Challan', data: progressBarUnloading.signedchallan }
  ];

  const calculateProgress = (pointData) => {
    const completedCount = pointData?.filter(point => point.image).length;
    return (completedCount / pointData?.length) * 100;
  };

  const handleView = (point) => {
    let fileData = [];

    switch (point.name) {
      case 'Loading Point':
      case 'Fuel Pump':
      case 'Challan':
      case 'Loaded Truck Weight':
      case 'Unloading Point':
      case 'Tare Weight':
      case 'Signed Challan':
        if (point.data) {
          fileData = point.data.map(item => item.image);
        } else {
          fileData = null
        }
        setShowModal(true);
        break;
    }
    setSelectedFileData(`${fileData}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFileData('');
  };
  const uploadedByInfo = points.map(point => point.data ? point.data[0]?.uploadedBy : "");
  const uploadedDate = points.map(point => point.data ? point.data[0]?.createdAt.split('T')[0] : "")
  const uploadedTime = points.map(point => point.data ? point.data[0]?.createdAt : "")

  // function formatTime(timeData) {
  //   const timePart = timeData.split(':');
  //   let hourMinute = "";
  //   if (timePart[0] && timePart[1]) {
  //     hourMinute = `${timePart[0]} : ${timePart[1]}`;
  //   }
  //   return hourMinute;
  // }

  function formatTime(timeData) {
    if (!timeData) return ""; // Return empty string if timeData is not provided

    const date = new Date(timeData);
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    return formattedTime;
  }

  useEffect(() => {
    if (selectedLocation.lat && selectedLocation.lng) {
      const map = document.getElementById("map") && new window.google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: selectedLocation.lat, lng: selectedLocation.lng },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: selectedLocation.lat, lng: selectedLocation.lng },
        map,
      });

      window.google.maps.event.addListener(marker, 'click', function (e) {
        mapMarkerClick(Number(this.customInfo));
      });
    }
  }, [selectedLocation]);



  const openMap = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setShowMap(true);
  }

  // let map = document.getElementById("map") && new window.google.maps.Map(document.getElementById("map"), {
  //   zoom: 8,
  //   center: { lat: lat, lng: lng },
  //   mapTypeId: window.google.maps.MapTypeId.ROADMAP,
  // });

  // var marker, i;
  // marker = new window.google.maps.Marker({
  //   position: new window.google.maps.LatLng(
  //     lat,
  //     lng
  //   ),
  //   map: map && map,
  // });

  // window.google.maps.event.addListener(marker, "click", function (e) {
  //   mapMarkerClick(Number(this.customInfo));
  // });

  // const map = new window.google.maps.Map(document.getElementById('map'), {
  //   center: { lat: lat, lng: lng },
  //   zoom: 10,
  // });

  // const latitude = 37.7749;
  // const longitude = -122.4194;
  { console.log(points, "asdasdasdasdasd") }


  return (
    <>
      {tripDataById?.TripStatus?.name == "Ongoing" ?
        <span className='Running_span'>{tripDataById?.TripStatus?.name}</span> :
        <img src="/images/SuccessIcon.svg" />
      }
      {/* <GeoCodeAddress latitude={latitude} longitude={longitude} /> */}

      <div className="modalInnerForm">
        {/* {tripLoader && <LoaderComponent />}/ */}
        <Row>
          <Col md={8}>
            {tripDataById?.TripStatus?.name == "Ongoing" ?
              <h3>Your trip is on the way</h3>
              : <h3 >Trip Completed</h3>}
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Field name="firstName">
                        {({ input, meta }) => (
                          <div className="ModalField">
                            <label>Transporter Firm Name</label>
                            <input
                              type="text"
                              placeholder=""
                              value={tripDataById?.TransporterIdForName?.TransporterNames?.name ||
                                (tripDataById?.OtherVehicleDetail && tripDataById.OtherVehicleDetail[0]?.vendorName)}
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={6}>
                      <Field name="lastName">
                        {({ input, meta }) => (
                          <div className="ModalField" >
                            <label>Loading Type</label>
                            <input
                              {...input}
                              type="text"
                              placeholder=""
                              value={tripDataById?.MaterialNames?.displayName}
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={6}>
                      {tripDataById?.VehicleData?.length > 0 ?
                        <Field name="age">
                          {({ input, meta }) => (
                            <div className="ModalField">
                              <label>Vehicle Number</label>
                              <input
                                type="text"
                                placeholder=""
                                value={(tripFunc(tripDataById?.VehicleData).length === 0 ? '-' : tripFunc(tripDataById?.VehicleData))}
                              />
                            </div>
                          )}
                        </Field>
                        :
                        <Field name="age">
                          {({ input, meta }) => (
                            <div className="ModalField">
                              <label>Vehicle Number</label>
                              <input
                                type="text"
                                placeholder=""
                                // value={(tripDataById?.OtherVehicleDetail[0]?.vehicleNumber)}
                                value={(tripDataById?.OtherVehicleDetail && tripDataById.OtherVehicleDetail[0]?.vehicleNumber)}
                              />
                            </div>
                          )}
                        </Field>
                      }
                    </Col>
                    {tripDataById?.LoadedTruckWeights?.map((elem) => {
                      if (elem?.types === 'petrolpump' && elem?.dieselAtPetrolPump !== undefined) {
                        return (
                          <Col md={6}>
                            <Field name="lastName">
                              {({ input, meta }) => (
                                <div className="ModalField">
                                  <label>Diesel</label>
                                  <input
                                    {...input}
                                    type="text"
                                    placeholder=""
                                    value={`${elem.dieselAtPetrolPump}L`}
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                        );
                      }
                    })}

                    {tripDataById?.LoadedTruckWeights?.map((elem) => {
                      if (elem?.types === 'petrolpump' && elem?.cashAtPetrolPump !== undefined) {
                        return (
                          <Col md={6}>
                            <Field name="age">
                              {({ input, meta }) => (
                                <div className="ModalField">
                                  <label>Cash</label>
                                  <input
                                    {...input}
                                    type="text"
                                    placeholder=""
                                    value={`₹${elem.cashAtPetrolPump}`}
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                        );
                      }
                    })}


                    <Col md={12}>
                      <Field name="firstName">
                        {({ input, meta }) => (
                          <div className="ModalField">
                            <label>Loading address</label>
                            <input
                              {...input}
                              type="text"
                              placeholder=""
                              value={tripDataById?.LoadingPointNames?.loadingAddress}
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col md={12}>
                      <Field name="firstName">
                        {({ input, meta }) => (
                          <div className="ModalField">
                            <label>Un-loading address</label>
                            <input
                              {...input}
                              type="text"
                              placeholder=""
                              value={tripDataById?.UnloadingPointNames?.unloadingAddress}
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                </form>
              )}
            />
          </Col>
          <Col md={4}>
            <div className="ModalRightSideSection">
              {points.map((point, index) => (
                <div key={index} className="ModalRightSideSectionInner">
                  {console.log(points, "qweqweqweqweqwe")}
                  <div className="ModalRightSideSectionDetails">
                    {point.data && point.data.length > 0 && (
                      <span className="ModalRightSideSectionInnerSpan" style={{ cursor: 'pointer' }}
                        onClick={() => openMap(parseFloat(point.data[0].latitude), parseFloat(point.data[0].longitude))}
                      >
                        {point.name}
                        <FaLocationDot />
                      </span>
                    )}
                    <div className="ProgressBar d-flex">
                      <div className={`ProgressBarDot ${calculateProgress(point.data) > 0 ? 'completed' : ''}`}>
                        {index !== 0 && <div className="ProgressBarLineSegment"></div>}
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <Button onClick={() => handleView(point)} className="TripViewAttachmentsBtn">View Attachments</Button>
                    <div className="ModalRightSideSectionAboutCustomer">
                      <p>Uploaded by:  <span>{uploadedByInfo[index]}</span></p>
                      {formatTime(uploadedTime[index]) && <p><span>{formatTime(uploadedTime[index])}</span> / <span>{uploadedDate[index]}</span></p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <div className="modal-dialog modal-xl">
        <Modal show={showMap} onHide={() => setShowMap(false)} >
          <Modal.Header closeButton>
            <Modal.Title>Location Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(selectedLocation.lat && selectedLocation.lng) ? (
              <div id="map" style={{ height: '500px', width: '100%' }}></div>
            ) : (
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <Image
                  width={200}
                  height={100}
                  src={"/images/no-image.png"}
                  alt=''
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>

      <ViewModal
        showModal={showModal}
        handleClose={handleCloseModal}
        fileData={selectedFileData}
      />
    </>
  );
}
