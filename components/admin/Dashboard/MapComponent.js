import {
  allProjectWiseDetails,
  getProjectNameList,
} from "@/redux/actions/project/projectData";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";

function MapComponent() {
  const [selectMaterial, setSelectMaterial] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const projectList = useSelector(
    (state) => state?.projectSlice?.getProjectNameList?.data
  );
  const projectwise = useSelector(
    (state) => state?.projectSlice?.projectdetails
  );

  console.log(projectwise, "pj");
  useEffect(() => {
    dispatch(getProjectNameList());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectMaterial(selectedOption);

    if (selectedOption) {
      setLoading(true);

      dispatch(allProjectWiseDetails({ projectId: selectedOption.value }))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
          setLoading(false);
        });
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [""],
    datasets: [
      {
        label: " Dispatched Weight",
        data: [projectwise?.totalWeight],
        backgroundColor: "#50CD89",
        barThickness: 100,
        maxBarThickness: 30,
      },
      {
        label: "Pending Weight",
        data: [projectwise?.pendingWeight],
        backgroundColor: "#165DFF",
        barThickness: 40,
        maxBarThickness: 30,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        // display: true,
        // text: 'Total vs Pending Orders',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: 'Order Status'
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          // text: 'Weight'
        },
      },
    },
  };

  //   useEffect(() => {
  //     const initializeMap = () => {
  //       if (!window.google || !window.google.maps) {
  //         setTimeout(initializeMap, 100);
  //         return;
  //       }
  //       if (projectwise) {
  //         toast.info("inter");
  //         let locations = [];
  //         projectwise &&
  //           projectwise?.loadingLocation?.length > 0 &&
  //           projectwise?.loadingLocation.map((e) => {
  //             locations.push({
  //               latlng: {
  //                 lat: Number(e?.Latitude),
  //                 lng: Number(e?.Longitude),
  //               },
  //             });
  //           });
  //         const mapElement = document.getElementById("map");
  //         const map =
  //           mapElement &&
  //           new window.google.maps.Map(mapElement, {
  //             zoom: 5,
  //             center: new google.maps.LatLng(20.5937, 78.9629),
  //             mapTypeId: window.google.maps.MapTypeId.ROADMAP,
  //           });

  //         projectwise &&
  //           projectwise?.loadingLocation?.forEach((location) => {
  //             const marker = new window.google.maps.Marker({
  //               position: {
  //                 lat: parseFloat(location.Latitude),
  //                 lng: parseFloat(location.Longitude),
  //               },
  //               map: map,
  //             });

  //             window.google.maps.event.addListener(marker, "click", function (e) {
  //               mapMarkerClick(Number(this.customInfo));
  //             });
  //           });

  //         projectwise &&
  //           projectwise.unloadingLocation?.forEach((location) => {
  //             const marker = new window.google.maps.Marker({
  //               position: {
  //                 lat: parseFloat(location.Latitude),
  //                 lng: parseFloat(location.Longitude),
  //               },
  //               map: map,
  //             });

  //             window.google.maps.event.addListener(marker, "click", function (e) {
  //               mapMarkerClick(Number(this.customInfo));
  //             });
  //             setLoading(false);
  //           });

  //         return () => {
  //           map && map.setMap(null);
  //         };
  //       }
  //     };

  //     initializeMap();
  //   }, [projectwise]);

  useEffect(() => {
    const staticLocations = [
      { name: "Delhi", lat: 28.6139, lng: 77.209 },
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    ];

    const initializeMap = () => {
      if (!window.google || !window.google.maps) {
        setTimeout(initializeMap, 100);
        return;
      }
      const mapElement = document.getElementById("map");
      const map =
        mapElement &&
        new window.google.maps.Map(mapElement, {
          zoom: 5,
          center: new window.google.maps.LatLng(22.9734, 78.6569),
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

      staticLocations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });
      });
    };

    initializeMap();
  }, []);
  return (
    <div className="MapComponentSection">
      <Row>
        <Col xl={4} lg={6} md={6}>
          <div className="TotalPendingOrder">
            <h3>Total Vs Pending</h3>
            <Bar options={options} data={data} width={50} height={50} />
          </div>
        </Col>
        <Col xl={4} lg={6} md={6}>
          <div className="ProjectWiseDetails">
            <h3>Project Wise Details</h3>
            <div className="ProjectWiseDetailsInner">
              <Row className="align-items-center">
                <Col md={5}>
                  <label>Project Name</label>
                </Col>
                <Col md={7}>
                  <Select
                    // {...input}
                    classNamePrefix="SelectWorkOrder"
                    placeholder="Select Project Name"
                    value={selectMaterial}
                    onChange={handleSelectChange}
                    options={projectList?.map((item) => ({
                      value: item.id,
                      label: item.projectName,
                    }))}
                  />
                </Col>
              </Row>
            </div>

            <Row>
              <Col lg={6}>
                <div className="ProjectWiseDetailsFlexcol">
                  <span>Completed Trips</span>
                  <p>
                    {projectwise?.completedTripCount
                      ? projectwise?.completedTripCount
                      : 0}
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="ProjectWiseDetailsFlexcol">
                  <span>Available Vehicles</span>
                  <p>
                    {projectwise?.vehicleAvailableCount
                      ? projectwise?.vehicleAvailableCount
                      : 0}
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="ProjectWiseDetailsFlexcol">
                  <span>On Going Trips</span>
                  <p>
                    {projectwise?.ongoingTripCount
                      ? projectwise?.ongoingTripCount
                      : 0}
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="ProjectWiseDetailsFlexcol">
                  <span>Vehicles In Use</span>
                  <p>
                    {projectwise?.vehicleInUseCount
                      ? projectwise?.vehicleInUseCount
                      : 0}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xl={4} lg={6} md={6}>
          <div className="MapImgSec">
            {loading && (
              <div
                className="loader"
                style={{
                  position: "relative",
                  height: "384px",
                  width: "100%",
                  textAlign: "center",
                  lineHeight: "384px",
                  backgroundColor: "#f0f0f0",
                }}>
                Loading...
              </div>
            )}
            <div
              id="map"
              style={{
                height: "384px",
                width: "100%",
                display: loading ? "none" : "block",
              }}></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MapComponent;
