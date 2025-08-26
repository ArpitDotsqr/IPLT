import React, { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'
import Image from 'next/image';

const DatePickerComp = ({ onDateRangeSet }) => {

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
        return () => {
            document.removeEventListener("keydown", hideOnEscape, true);
            document.removeEventListener("click", hideOnClickOutside, true);
        };
    }, []);

    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const hideOnClickOutside = (e) => {
        if (e.target.closest(".calendarWrap") === null) {
            setOpen(false);
        }
    };

    const handleDateChange = (item) => {
        setRange([item.selection]);
        onDateRangeSet(format(range[0].startDate, "dd/MM/yyyy"), format(range[0].endDate, "dd/MM/yyyy"));
    };

    return (
        <>
            <div className="calendarWrap">
                <span className="filter_icon_" onClick={() => setOpen(!open)} style={{ 'cursor': 'pointer' }}>
                    <Image width={30} height={25} src="/images/calender_icon.svg" alt="" />
                </span>
                {open && (
                    <div className="calendarElement">
                        <input
                            value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
                            readOnly
                            className="inputBox"
                            onClick={() => setOpen(!open)}
                            hidden
                        />
                        <DateRange
                            // onChange={item => setRange([item.selection])}
                            onChange={handleDateChange}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            months={1}
                            direction="horizontal"
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default DatePickerComp