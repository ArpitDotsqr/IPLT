import { avgTripByTransporter, getAllTransporterList, overAllPerformanceOfFleet, tripByTransporter } from '@/redux/actions/project/projectData'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import DatePickerComp from '../Trips/DatePickerComp'


function TripPerformence() {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [selectTransporter, setSelectTransporter] = useState("")
    const [selectedTransport, setSelectedTransport] = useState("")
    const transporterList = useSelector((state) => state?.projectSlice?.TransporterList?.data)
    const tripTransporter = useSelector((state) => state?.projectSlice?.tripTransporter)
    const avgTripbyTransporter = useSelector((state) => state?.projectSlice?.avgtripTransporter)
    const overAllPerformance = useSelector((state) => state?.projectSlice?.overAllPerformance)


    useEffect(() => {
        dispatch(getAllTransporterList())
        dispatch(overAllPerformanceOfFleet())
    }, [dispatch])


    const handleSelectChange = (selectOption) => {
        setSelectTransporter(selectOption)
        if (selectOption) {
            dispatch(avgTripByTransporter({ id: selectOption.value }))
        }
    };


    const handleSelectedTransporter = (selectOption) => {
        setSelectedTransport(selectOption)

        if (selectOption) {
            dispatch(tripByTransporter({
                id: selectOption.value,

            }))
        }

    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const handleDatestartChange = (event) => {
        const selectedDate = event.target.value;
        setStartDate(selectedDate);
    };

    const handleEndDateChange = (event) => {
        const selectedDate = event.target.value;
        setEndDate(selectedDate);

        const payload = {
            id: selectedTransport ? selectedTransport.value : "",
            startDate: formatDate(startDate),
            endDate: formatDate(selectedDate)
        };

        if (selectedTransport) {
            payload.id = selectedTransport.value;
            dispatch(tripByTransporter(payload));
            dispatch(avgTripByTransporter(payload));
        }

        dispatch(overAllPerformanceOfFleet({
            startDate: formatDate(startDate),
            endDate: formatDate(selectedDate)
        }));
    };


    // const handleDateRangeSet = (start, end) => {
    //     setStartDate(start);
    //     setEndDate(end);

    //     if (start && end) {
    //         const payload = {
    //             startDate: start,
    //             endDate: end,
    //         };

    //         if (selectedTransport) {
    //             payload.id = selectedTransport.value;
    //             dispatch(tripByTransporter(payload));
    //             dispatch(avgTripByTransporter(payload));
    //         }

    //         dispatch(overAllPerformanceOfFleet({
    //             startDate: start,
    //             endDate: end
    //         }));
    //     }
    // };


    return (
        <div className='TripPerformenceSection'>
            <Row>
                <Col lg={4} md={6}>
                    <div className='TripPerformenceColoumn'>
                        <div>
                            <h3 className='mb-3'>Over all Performance of Fleet</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        {/* <DatePickerComp onDateRangeSet={handleDateRangeSet} /> */}
                                        <div className="col-md-3 col-2">
                                            <span>From:</span>
                                        </div>

                                        <div className="col-md-9 col-10">
                                            <input placeholder='SELECT DATE' className='form-control' type='Date' value={startDate} onChange={handleDatestartChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='row align-items-center'>
                                        <div className="col-md-2 col-2 text-center p-0">
                                            <span>To:</span>
                                        </div>
                                        <div className="col-md-10 col-10">
                                            <input placeholder='SELECT DATE' className="form-control" type='Date' value={endDate} onChange={handleEndDateChange} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='PerformanceofFleet'>


                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. Trip/Day</span>
                                <p>{overAllPerformance?.avgTripPerDay ? overAllPerformance?.avgTripPerDay : 0}</p>
                            </div>
                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. weight/Trip</span>
                                <p>{overAllPerformance?.averageWeight ? `${overAllPerformance?.averageWeight?.toFixed(2)} MT` : 0}</p>

                            </div>
                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. Time/Trip</span>
                                <p>
                                    {isNaN(overAllPerformance?.averageHoursPerTrip)
                                        ? 0
                                        : `${overAllPerformance?.averageHoursPerTrip} Hr`}

                                </p>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={6}>
                    <div className='TripPerformenceColoumn'>
                        <div className="">
                            <h3 className='mb-3'>Vendor Wise Fleet Performance </h3>


                            <Select
                                // {...input}
                                classNamePrefix="SelectWorkOrder"
                                placeholder="Select Transporter"
                                value={selectTransporter}
                                onChange={handleSelectChange}
                                options={transporterList?.map((item) => ({
                                    value: item?.id,
                                    label: item?.name,


                                }))}
                            />
                        </div>
                        <div className='PerformanceofFleet'>
                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. Trip/Day</span>
                                <p>{avgTripbyTransporter?.AvgTripPerDay ? avgTripbyTransporter?.AvgTripPerDay : 0}</p>
                            </div>
                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. weight/Trip</span>
                                <p>{avgTripbyTransporter?.AvgWeightPerTrip ? `${avgTripbyTransporter?.AvgWeightPerTrip?.toFixed(2)} MT` : 0}</p>
                            </div>
                            <div className='PerformanceofFleetFlex'>
                                <span>Avg. Time/Trip</span>


                                <p>{isNaN(avgTripbyTransporter?.averageHoursPerTrip) ? 0 : `${avgTripbyTransporter?.averageHoursPerTrip} Hr`}  </p>


                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={6}>
                    <div className='TripPerformenceColoumn'>
                        <div className="">
                            <h3 className='mb-3'>Transporter Wise Trips and Weight</h3>
                            <Select
                                // {...input}
                                classNamePrefix="SelectWorkOrder"
                                placeholder="Select Transporter"
                                value={selectedTransport}
                                onChange={handleSelectedTransporter}
                                options={transporterList?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </div>
                        <Row className='TripPerformenceRow'>
                            <Col md={6}>
                                <div className='PerformanceofFleetFlexGap'>
                                    <span>Trips made</span>
                                    <p>{tripTransporter?.tripMadeCount ? tripTransporter?.tripMadeCount : 0}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='PerformanceofFleetFlexGap'>
                                    <span>Active Vehicles</span>
                                    <p>{tripTransporter?.ActiveVehicle ? tripTransporter?.ActiveVehicle : 0}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='PerformanceofFleetFlexGap'>
                                    <span>Inactive Vehicles</span>
                                    <p>{tripTransporter?.Inactive_vehicles ? tripTransporter?.Inactive_vehicles : 0}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='PerformanceofFleetFlexGap'>
                                    <span>Weight carried</span>
                                    <p>{tripTransporter?.Weight_carried ? `${tripTransporter?.Weight_carried?.toFixed(2)} MT` : 0}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TripPerformence
