import { getAuditLogsDetail } from "@/redux/actions/auditlogs/auditlogsdata";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import NoDataPage from "@/components/comman_component/NoDataPage";
import { useRouter } from "next/router";
import LoaderComponent from "@/components/comman_component/Loader";

const AuditHistoryAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 9 });

  const getAuditLogsDetails = useSelector(
    (state) => state.auditLogsSlice.auditLogsListData
  );
  const AuditLogsCount = useSelector(
    (state) => state.auditLogsSlice.auditLogsListCount
  );
  const LoaderAuditLogs = useSelector(
    (state) => state.auditLogsSlice.isLoading
  );

  useEffect(() => {
    // dispatch(getAuditLogsDetail({ ...pagination, ...router.query }));
    // if (searchQuery) {
    dispatch(
      getAuditLogsDetail({
        ...pagination,
        ...router.query,
        search: searchQuery,
      })
    );
    // }
  }, [dispatch, searchQuery, pagination, router.query]);

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [year, month, day] = dateString.split("-");
    const monthInWords = months[parseInt(month) - 1];
    const formattedDate = `${day}-${monthInWords}-${year}`;
    return formattedDate;
  }

  // function formatTime(timeData) {
  //     const timePart = timeData.split(':')
  //     const hourMinute = `${timePart[0]} : ${timePart[1]}`
  //     return hourMinute
  // }

  // function formatTime(timeData) {
  //     const timePart = timeData.split(':')
  //     let hour = parseInt(timePart[0])
  //     const minute = timePart[1]
  //     const ampmFormat = hour >= 12 ? 'AM' : 'PM'
  //     hour = hour % 12 || 12
  //     const hourMinute = `${hour}:${minute} ${ampmFormat}`
  //     return hourMinute
  // }

  function formatTime(dataString) {
    const date = new Date(dataString);
    const istDateString = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const time = istDateString.toString().split(", ")[1];
    const [hoursMinutes, ampm] = time.split(" ");
    const [hours, minutes] = hoursMinutes.split(":");
    return `${hours}:${minutes} ${ampm}`;
  }

  const handleFilter = (type) => {
    const { [type]: filter, ...currentQuery } = router.query;
    const newQuery = filter ? currentQuery : { [type]: true };
    router.push({ pathname: router.pathname, query: newQuery });
  };

  return (
    <>
      {LoaderAuditLogs && <LoaderComponent />}
      <div className="manageUser_Section">
        <div className="manger_edit_details_main trip_edit_main audit_logo_main">
          <div className="manger_edit_details_trip d-flex justify-content-between">
            <h2 className="mb-0">Audit Logs</h2>
            <div className="completed_trip_content AuditLogFilterButton d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPagination({ pageNo: 1, pageSize: 9 });
                }}
              />
              <Form>
                <Dropdown className="filter_icon_main">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <span className="filter_icon_">
                      <img src="/images/filter_icon.svg" alt="" />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleFilter("newlyAdded")}>
                      Newly Added
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("dateNew")}>
                      DateAToZ
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("dateOld")}>
                      DateZToA
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
            </div>
          </div>

          <div className="manageUserCompletedTripsTable">
            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>User name</th>
                    <th>Action</th>
                    <th>Type</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {getAuditLogsDetails.length > 0 ? (
                    getAuditLogsDetails.map((item, ind) => (
                      <tr key={ind}>
                        <td>
                          {item.userId < 10
                            ? `#0${item.userId}`
                            : `#${item.userId}`}
                        </td>
                        <td>
                          {item.UserData?.name || "-"}
                          <span className="audit_user_txt">
                            {item.UserData.Role.title}
                          </span>
                        </td>
                        <td>{item.action}</td>
                        <td>{item.type}</td>
                        <td>
                          {formatDate(item.createdAt?.split("T")[0])} <br></br>
                          {formatTime(item.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <NoDataPage />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {AuditLogsCount > 0 ? (
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            list={getAuditLogsDetails}
            count={AuditLogsCount}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AuditHistoryAdmin;
