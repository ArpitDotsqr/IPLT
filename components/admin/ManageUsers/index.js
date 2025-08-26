import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllManagerUser } from "@/redux/actions/manageuser/manageruserlist";
import LoaderComponent from "@/components/comman_component/Loader";
import NoDataPage from "@/components/comman_component/NoDataPage";
import Pagination from "@/components/admin/Pagination";
import { updateUser } from "@/redux/actions/user/userActions";
import { toast } from "react-toastify";
import { apibasePath } from "@/config";
import Image from "next/image";

const ManageUserStep = ["All", "Project Manager", "Field Executive", "MIS"];

const ManageUsersAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState(0);
  const [isUpdated, setIsUpdated] = useState({});
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });
  const [searchQuery, setSearchQuery] = useState("");

  const getManagerUserData = useSelector(
    (state) => state.managerUserSlice?.managerUserList.rows
  );
  const countUserData = useSelector(
    (state) => state.managerUserSlice?.countUser
  );
  const LoaderData = useSelector((state) => state.managerUserSlice?.isLoading);

  useEffect(() => {
    let filters = { user: [], ...pagination };
    let dataFilters = {};

    if (UserData === 0) {
      filters.user = ["projectmanager", "fieldexecutive", "mis"];
    } else if (UserData === 1) {
      filters.user = ["projectmanager"];
    } else if (UserData === 2) {
      filters.user = ["fieldexecutive"];
    } else {
      filters.user = ["mis"];
    }

    if (searchQuery) {
      filters.search = searchQuery;
    }
    if (router.query) {
      dataFilters = router.query;
    }

    const payload = { ...dataFilters, ...filters };

    dispatch(getAllManagerUser(payload));
  }, [dispatch, UserData, searchQuery, pagination, router.query]);

  const handleActive = (userid, currentStatus, removal) => {
    let formdata = new FormData();
    if (formdata) {
      const nextStatus = currentStatus === "active" ? 6 : 7;
      if (removal) {
        let removalList = { ...isUpdated };
        delete removalList[userid];
        setIsUpdated(removalList);
      } else {
        setIsUpdated({ ...isUpdated, [userid]: currentStatus });
      }

      formdata.append(
        "detailData",
        JSON.stringify({ statusId: nextStatus, id: userid })
      );
      dispatch(updateUser(formdata)).then((res) => {
        if (res?.payload?.success) {
          const message =
            nextStatus === 6 ? "User is Active" : "User is Inactive";
          toast.success(message);
        }
      });
    }
  };

  // const calculateAge = (birthdate) => {
  //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!dateRegex.test(birthdate)) {
  //     const [day, month, year] = birthdate?.split('-').map(component => component.replace(/\D/g, ''));

  //     const birthdateObj = new Date(year, month - 1, day);
  //     if (isNaN(birthdateObj)) {
  //       console.log("Invalid birthdate format");
  //     } else {
  //       const currentdateObj = new Date();
  //       let age = currentdateObj.getFullYear() - birthdateObj.getFullYear();
  //       if (
  //         currentdateObj.getMonth() < birthdateObj.getMonth() ||
  //         (currentdateObj.getMonth() === birthdateObj.getMonth() &&
  //           currentdateObj.getDate() < birthdateObj.getDate())
  //       ) {
  //         age--;
  //       }
  //       return age;
  //     }
  //   } else {
  //     const currentdateObj = new Date();
  //     const birthdateObj = new Date(birthdate);

  //     let age = currentdateObj.getFullYear() - birthdateObj.getFullYear();
  //     if (currentdateObj.getMonth() < birthdateObj.getMonth() || (currentdateObj.getMonth() === birthdateObj.getMonth() && currentdateObj.getDate() < birthdateObj.getDate())) {
  //       age--;
  //     }
  //     return age
  //   }
  // }
  const calculateAge = (birthdate) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the birthdate matches the expected format
    if (dateRegex.test(birthdate)) {
      const birthdateObj = new Date(birthdate);
      const currentdateObj = new Date();

      let age = currentdateObj.getFullYear() - birthdateObj.getFullYear();
      if (
        currentdateObj.getMonth() < birthdateObj.getMonth() ||
        (currentdateObj.getMonth() === birthdateObj.getMonth() &&
          currentdateObj.getDate() < birthdateObj.getDate())
      ) {
        age--;
      }
      return age;
    } else if (birthdate) {
      // Handle case where the birthdate is not in the expected format
      const parts = birthdate.split("-");
      if (parts.length === 3) {
        const [day, month, year] = parts.map((component) =>
          component.replace(/\D/g, "")
        );

        if (day && month && year) {
          const birthdateObj = new Date(year, month - 1, day);
          if (!isNaN(birthdateObj)) {
            const currentdateObj = new Date();
            let age = currentdateObj.getFullYear() - birthdateObj.getFullYear();
            if (
              currentdateObj.getMonth() < birthdateObj.getMonth() ||
              (currentdateObj.getMonth() === birthdateObj.getMonth() &&
                currentdateObj.getDate() < birthdateObj.getDate())
            ) {
              age--;
            }
            return age;
          } else {
            console.log("Invalid birthdate format");
          }
        }
      }
    } else {
      console.log("Birthdate is null or undefined");
    }

    return null; // Return null if the birthdate is invalid
  };

  const handleFilter = (type) => {
    const { [type]: filter, ...currentQuery } = router.query;
    const newQuery = filter ? currentQuery : { [type]: true };
    router.push({ pathname: router.pathname, query: newQuery });
  };

  return (
    <div className="manageUser_Section">
      <Row className="justify-content-end">
        <Col md={6} className="text-end">
          <button
            onClick={() => router.push("/admin/manageusers/manageuserproject")}
            className="create_new_project_btn">
            Create new user <img src="/images/plus.svg" />
          </button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={9}>
          <ul className="nav ProjectAdmin_tabs ">
            {ManageUserStep &&
              ManageUserStep?.map((steps, stepsIndex) => (
                <li className="nav-item d-flex" key={stepsIndex}>
                  <a
                    className={`nav-link admin_tabs_name ${
                      UserData === stepsIndex && "head-active"
                    }`}
                    active="true"
                    onClick={() => {
                      setPagination({ pageNo: 1, pageSize: 6 });
                      setUserData(stepsIndex);
                    }}>
                    {steps}
                  </a>
                </li>
              ))}
          </ul>
        </Col>
        <Col md={3} className="align-items-center">
          <div className="FlexAndAlign">
            <input
              type="search"
              placeholder="Search User"
              className="form-control"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Form className="FlexAndAlign">
              <Dropdown className="filter_icon_main">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <span className="filter_icon_">
                    <img src="/images/filter_icon.svg" alt="" />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFilter("newlyadded")}>
                    Newly Added
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilter("nameAToZ")}>
                    name A To Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilter("nameZToA")}>
                    name Z To A
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilter("dateAToZ")}>
                    date A To Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilter("dateZToA")}>
                    date Z To A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </div>
        </Col>
      </Row>

      {UserData === 0 && (
        <div className="manger_user_main">
          <Row>
            {LoaderData ? (
              <LoaderComponent />
            ) : getManagerUserData?.length > 0 ? (
              getManagerUserData?.map((manageruser, index) => (
                <Col md={6} className="d-flex">
                  <div className="manger_user_inner" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="field_exe_text">
                        {manageruser.Role.title} ID:
                        <span className="field_id_name">
                          {manageruser?.id < 10
                            ? `#TECH 0${manageruser?.id}`
                            : `#TECH ${manageruser?.id}`}
                        </span>
                      </div>
                      <div className="field_right_content d-flex align-items-center">
                        {manageruser.Status.key === "pending" ? (
                          <div className="user_data_left d-flex align-items-center">
                            <span className="filed_admin_text">
                              {manageruser.Status.key}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Form>
                              <Form.Check
                                type="switch"
                                id={`custom-switch-${manageruser?.id}`}
                                onClick={() => {
                                  if (isUpdated[manageruser?.id]) {
                                    if (
                                      isUpdated[manageruser?.id] === "active"
                                    ) {
                                      handleActive(
                                        manageruser?.id,
                                        "inactive",
                                        "remove"
                                      );
                                    } else {
                                      handleActive(
                                        manageruser?.id,
                                        "active",
                                        "remove"
                                      );
                                    }
                                  } else {
                                    if (manageruser?.Status?.key === "active") {
                                      handleActive(manageruser?.id, "inactive");
                                    } else if (
                                      manageruser?.Status?.key === "inactive"
                                    ) {
                                      handleActive(manageruser?.id, "active");
                                    }
                                  }
                                }}
                                checked={
                                  isUpdated[manageruser?.id]
                                    ? isUpdated[manageruser?.id] === "active"
                                      ? true
                                      : false
                                    : manageruser?.Status?.key === "active"
                                }
                              />
                            </Form>
                            <span className="field_active">Active</span>
                          </>
                        )}

                        <div className="field_btn">
                          <Button
                            variant=""
                            onClick={() =>
                              router.push(
                                `/admin/manageusers/${manageruser.id}`
                              )
                            }>
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="inner_user_data manageUserCustomerDetail">
                      <div className="user_img_">
                        <div>
                          {manageruser?.image ? (
                            <Image
                              height={40}
                              width={40}
                              src={`${apibasePath}documents/profile/${manageruser.image}`}
                              className="rounded-circle"
                              alt=""
                            />
                          ) : (
                            <Image
                              height={40}
                              width={40}
                              src="/images/user_img.svg"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div className="user_text_data w-100">
                        <div className="user_data_left d-flex align-items-center">
                          <h2>{manageruser?.name}</h2>
                          <span className="filed_admin_text">
                            {manageruser.Role.title}
                          </span>
                        </div>
                        <div class="user_inner_data">
                          <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                              <span>Age:</span>
                              <p>
                                {calculateAge(manageruser?.UserDetail?.dob)}
                              </p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Mobile No:</span>
                              <p>{manageruser?.mobile}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Email ID:</span>
                              <p>{manageruser?.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <NoDataPage />
            )}
          </Row>

          {pagination.pageSize >= countUserData ? null : LoaderData ? (
            ""
          ) : (
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={getManagerUserData}
              count={countUserData}
            />
          )}
        </div>
      )}

      {UserData === 1 && (
        <div className="manger_user_main">
          <Row>
            {LoaderData ? (
              <LoaderComponent />
            ) : getManagerUserData?.length > 0 ? (
              getManagerUserData?.map((manageruser, index) => (
                <Col md={6}>
                  <div className="manger_user_inner" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="field_exe_text">
                        {manageruser.Role.title} ID:
                        <span className="field_id_name">
                          {manageruser?.id < 10
                            ? `#TECH 0${manageruser?.id}`
                            : `#TECH ${manageruser?.id}`}
                        </span>
                      </div>
                      <div className="field_right_content d-flex align-items-center">
                        {manageruser.Status.key === "pending" ? (
                          <div className="user_data_left d-flex align-items-center">
                            <span className="filed_admin_text">
                              {manageruser.Status.key}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Form>
                              <Form.Check
                                type="switch"
                                id={`custom-switch-${manageruser?.id}`}
                                onClick={() => {
                                  if (isUpdated[manageruser?.id]) {
                                    if (
                                      isUpdated[manageruser?.id] === "active"
                                    ) {
                                      handleActive(
                                        manageruser?.id,
                                        "inactive",
                                        "remove"
                                      );
                                    } else {
                                      handleActive(
                                        manageruser?.id,
                                        "active",
                                        "remove"
                                      );
                                    }
                                  } else {
                                    if (manageruser?.Status?.key === "active") {
                                      handleActive(manageruser?.id, "inactive");
                                    } else if (
                                      manageruser?.Status?.key === "inactive"
                                    ) {
                                      handleActive(manageruser?.id, "active");
                                    }
                                  }
                                }}
                                checked={
                                  isUpdated[manageruser?.id]
                                    ? isUpdated[manageruser?.id] === "active"
                                      ? true
                                      : false
                                    : manageruser?.Status?.key === "active"
                                }
                              />
                            </Form>
                            <span className="field_active">Active</span>
                          </>
                        )}
                        <div className="field_btn">
                          <Button
                            variant=""
                            onClick={() =>
                              router.push(
                                `/admin/manageusers/${manageruser.id}`
                              )
                            }>
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="inner_user_data manageUserCustomerDetail">
                      <div className="user_img_">
                        <div>
                          {manageruser?.image ? (
                            <Image
                              height={40}
                              width={40}
                              src={`${apibasePath}documents/profile/${manageruser.image}`}
                              className="rounded-circle"
                              alt=""
                            />
                          ) : (
                            <Image
                              height={40}
                              width={40}
                              src="/images/user_img.svg"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div className="user_text_data w-100">
                        <div className="user_data_left d-flex align-items-center">
                          <h2>{manageruser?.name}</h2>
                          <span className="filed_admin_text">
                            {manageruser.Role.title}
                          </span>
                        </div>
                        <div class="user_inner_data">
                          <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                              <span>Age:</span>
                              <p>
                                {calculateAge(manageruser?.UserDetail?.dob)}
                              </p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Mobile No:</span>
                              <p>{manageruser?.mobile}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Email ID:</span>
                              <p>{manageruser?.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <NoDataPage />
            )}
          </Row>
          {pagination.pageSize >= countUserData ? null : LoaderData ? (
            ""
          ) : (
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={getManagerUserData}
              count={countUserData}
            />
          )}
        </div>
      )}

      {UserData === 2 && (
        <div className="manger_user_main">
          <Row>
            {LoaderData ? (
              <LoaderComponent />
            ) : getManagerUserData?.length > 0 ? (
              getManagerUserData?.map((manageruser, index) => (
                <Col md={6}>
                  <div className="manger_user_inner" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="field_exe_text">
                        {manageruser.Role.title} ID:
                        <span className="field_id_name">
                          {manageruser?.id < 10
                            ? `#TECH 0${manageruser?.id}`
                            : `#TECH ${manageruser?.id}`}
                        </span>
                      </div>
                      <div className="field_right_content d-flex align-items-center">
                        {manageruser.Status.key === "pending" ? (
                          <div className="user_data_left d-flex align-items-center">
                            <span className="filed_admin_text">
                              {manageruser.Status.key}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Form>
                              <Form.Check
                                type="switch"
                                id={`custom-switch-${manageruser?.id}`}
                                onClick={() => {
                                  if (isUpdated[manageruser?.id]) {
                                    if (
                                      isUpdated[manageruser?.id] === "active"
                                    ) {
                                      handleActive(
                                        manageruser?.id,
                                        "inactive",
                                        "remove"
                                      );
                                    } else {
                                      handleActive(
                                        manageruser?.id,
                                        "active",
                                        "remove"
                                      );
                                    }
                                  } else {
                                    if (manageruser?.Status?.key === "active") {
                                      handleActive(manageruser?.id, "inactive");
                                    } else if (
                                      manageruser?.Status?.key === "inactive"
                                    ) {
                                      handleActive(manageruser?.id, "active");
                                    }
                                  }
                                }}
                                checked={
                                  isUpdated[manageruser?.id]
                                    ? isUpdated[manageruser?.id] === "active"
                                      ? true
                                      : false
                                    : manageruser?.Status?.key === "active"
                                }
                              />
                            </Form>
                            <span className="field_active">Active</span>
                          </>
                        )}

                        <div className="field_btn">
                          <Button
                            variant=""
                            onClick={() =>
                              router.push(
                                `/admin/manageusers/${manageruser.id}`
                              )
                            }>
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="inner_user_data manageUserCustomerDetail">
                      <div className="user_img_">
                        <div>
                          {manageruser?.image ? (
                            <Image
                              height={40}
                              width={40}
                              src={`${apibasePath}documents/profile/${manageruser.image}`}
                              className="rounded-circle"
                              alt=""
                            />
                          ) : (
                            <Image
                              height={40}
                              width={40}
                              src="/images/user_img.svg"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div className="user_text_data w-100">
                        <div className="user_data_left d-flex align-items-center">
                          <h2>{manageruser?.name}</h2>
                          <span className="filed_admin_text">
                            {manageruser.Role.title}
                          </span>
                        </div>
                        <div class="user_inner_data">
                          <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                              <span>Age:</span>
                              <p>
                                {calculateAge(manageruser?.UserDetail?.dob)}
                              </p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Mobile No:</span>
                              <p>{manageruser?.mobile}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Email ID:</span>
                              <p>{manageruser?.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <NoDataPage />
            )}
          </Row>
          {pagination.pageSize >= countUserData ? null : LoaderData ? (
            ""
          ) : (
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={getManagerUserData}
              count={countUserData}
            />
          )}
        </div>
      )}

      {UserData === 3 && (
        <div className="manger_user_main">
          <Row>
            {LoaderData ? (
              <LoaderComponent />
            ) : getManagerUserData?.length > 0 ? (
              getManagerUserData?.map((manageruser, index) => (
                <Col md={6}>
                  <div className="manger_user_inner" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="field_exe_text">
                        {manageruser.Role.title} ID:
                        <span className="field_id_name">
                          {manageruser?.id < 10
                            ? `#TECH 0${manageruser?.id}`
                            : `#TECH ${manageruser?.id}`}
                        </span>
                      </div>
                      <div className="field_right_content d-flex align-items-center">
                        {manageruser.Status.key === "pending" ? (
                          <div className="user_data_left d-flex align-items-center">
                            <span className="filed_admin_text">
                              {manageruser.Status.key}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Form>
                              <Form.Check
                                type="switch"
                                id={`custom-switch-${manageruser?.id}`}
                                onClick={() => {
                                  if (isUpdated[manageruser?.id]) {
                                    if (
                                      isUpdated[manageruser?.id] === "active"
                                    ) {
                                      handleActive(
                                        manageruser?.id,
                                        "inactive",
                                        "remove"
                                      );
                                    } else {
                                      handleActive(
                                        manageruser?.id,
                                        "active",
                                        "remove"
                                      );
                                    }
                                  } else {
                                    if (manageruser?.Status?.key === "active") {
                                      handleActive(manageruser?.id, "inactive");
                                    } else if (
                                      manageruser?.Status?.key === "inactive"
                                    ) {
                                      handleActive(manageruser?.id, "active");
                                    }
                                  }
                                }}
                                checked={
                                  isUpdated[manageruser?.id]
                                    ? isUpdated[manageruser?.id] === "active"
                                      ? true
                                      : false
                                    : manageruser?.Status?.key === "active"
                                }
                              />
                            </Form>
                            <span className="field_active">Active</span>
                          </>
                        )}

                        <div className="field_btn">
                          <Button
                            variant=""
                            onClick={() =>
                              router.push(
                                `/admin/manageusers/${manageruser.id}`
                              )
                            }>
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="inner_user_data manageUserCustomerDetail">
                      <div className="user_img_">
                        <div>
                          {manageruser?.image ? (
                            <Image
                              height={40}
                              width={40}
                              src={`${apibasePath}documents/profile/${manageruser.image}`}
                              className="rounded-circle"
                              alt=""
                            />
                          ) : (
                            <Image
                              height={40}
                              width={40}
                              src="/images/user_img.svg"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div className="user_text_data w-100">
                        <div className="user_data_left d-flex align-items-center">
                          <h2>{manageruser?.name}</h2>
                          <span className="filed_admin_text">
                            {manageruser.Role.title}
                          </span>
                        </div>
                        <div class="user_inner_data">
                          <div className="ManageUserTabal">
                            <div className="ManageUserTabalRow">
                              <span>Age:</span>
                              <p>
                                {calculateAge(manageruser?.UserDetail?.dob)}
                              </p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Mobile No:</span>
                              <p>{manageruser?.mobile}</p>
                            </div>
                            <div className="ManageUserTabalRow">
                              <span>Email ID:</span>
                              <p>{manageruser?.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <NoDataPage />
            )}
          </Row>
          {pagination.pageSize >= countUserData ? null : LoaderData ? (
            ""
          ) : (
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={getManagerUserData}
              count={countUserData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsersAdmin;
