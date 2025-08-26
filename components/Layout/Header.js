import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {
  getNoficationData,
  notificationStatus,
} from "@/redux/actions/user/userActions";
import NoDataPage from "../comman_component/NoDataPage";
import { apibasePath } from "@/config";
import { getDetailUser } from "@/redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();

  // const currentUserData = useSelector((state) => state.userSlice.getUserList)
  const currentUserData = useSelector((e) => e.userSlice.loginUserData);
  const activeNavItem = useSelector((state) => state.userSlice.activeNavItem);
  const notificationData = useSelector(
    (state) => state.userSlice.getNotificationList
  );

  useEffect(() => {
    const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");

      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };
    const loggedInId = getCookie("LoggedInId");
    if (loggedInId !== null) {
      dispatch(getDetailUser({ id: Number(loggedInId) }));
    }
  }, []);

  useEffect(() => {
    dispatch(getNoficationData());
  }, []);

  const handleNotificationStatus = (item, type) => {
    if (type === "readperNotification") {
      dispatch(notificationStatus({ id: item?.id })).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getNoficationData());
        }
      });
    } else {
      if (notificationData.length > 0) {
        dispatch(notificationStatus({ isAllRead: true })).then((res) => {
          if (res?.payload?.data?.success) {
            dispatch(getNoficationData());
          }
        });
      }
    }
  };

  // function formatTime(timeData) {
  //   const timePart = timeData.split(':')
  //   let hour = parseInt(timePart[0])
  //   const minute = timePart[1]
  //   const ampmFormat = hour >= 12 ? 'PM' : 'AM'
  //   hour = hour % 12 || 12
  //   const hourMinute = `${hour}:${minute} ${ampmFormat}`
  //   return hourMinute
  // }

  function formatTime(timeData) {
    let date = new Date(timeData);
    const istDateString = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const x = istDateString.split(", ")[1].trim();

    let timeComponents = x.split(":");
    let hours = timeComponents[0];
    let minutes = timeComponents[1];
    let am_pm = x.split(" ")[1];

    const hourMinute = `${hours}:${minutes} ${am_pm}`;

    return hourMinute;
  }

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

  return (
    <div className="project_header">
      <div className="header_title">
        <h4>{activeNavItem}</h4>
      </div>
      <div className="Admin_profile">
        <Dropdown as={ButtonGroup} drop={"down-centered"}>
          <Dropdown.Toggle id="dropdown-basic" className="NotificationButton ">
            <div className="notification_icon">
              {/* {currentUserData?.image ? (
                <Image
                  height={40}
                  width={40}
                  src={`${apibasePath}documents/profile/${currentUserData?.image}`}
                  className="rounded-circle"
                  alt=""
                />
              ) : */}
              {/* ( */}
              <Image
                height={40}
                width={40}
                src={"/images/notificition-icon.svg"}
                alt=""
              />
              {/* )} */}
              {notificationData?.length > 0 && (
                <div className="notification_iconDot"></div>
              )}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ maxHeight: "500px", width: "500px", overflowY: "scroll" }}>
            <div className="p-1">
              <div className="m-lg-1 d-flex justify-content-between">
                {" "}
                <h6>Notifications</h6>{" "}
                <h6
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNotificationStatus()}>
                  Mark All Read
                </h6>
              </div>
              {notificationData?.length > 0 ? (
                notificationData?.map((item, index) => (
                  <Dropdown.Item href="" key={index}>
                    <p
                      onClick={() =>
                        handleNotificationStatus(item, "readperNotification")
                      }
                      className="DropDownNotificationStatus">
                      <Image
                        width={35}
                        height={35}
                        src={"/images/man 1.svg"}
                        alt=""
                      />
                      <div>
                        <span>{item?.title}</span>
                        <div className="fontSIzeClass">
                          {formatDate(item?.createdAt.split("T")[0])} |{" "}
                          {formatTime(item?.createdAt.split("T"))}
                        </div>
                      </div>
                    </p>
                    <hr style={{ margin: "5px 0" }} />
                  </Dropdown.Item>
                ))
              ) : (
                <NoDataPage name={"Notification"} />
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <div className="Admin_name">
          <img src={"/images/man 1.svg"} alt="" />
          <div>
            <p>{currentUserData?.Role?.title}</p>
            <span>{currentUserData?.Role?.key}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
