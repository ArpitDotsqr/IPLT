import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendorsList } from "@/redux/actions/vendor/vendorActions";
import LoaderComponent from "@/components/comman_component/Loader";
import NoDataPage from "@/components/comman_component/NoDataPage";
import Pagination from "@/components/admin/Pagination";

const FormSteps = ["All", "Transporter", "Excavators", "Petrol Pump"];

const VendorsAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 });

  const getAllVendorLists = useSelector(
    (state) => state.vendorSlice.vendorList?.rows
  );
  const getAllVendorListCount = useSelector(
    (state) => state.vendorSlice.vendorList?.count
  );
  const vendorLoaderData = useSelector((state) => state.vendorSlice?.isLoading);

  useEffect(() => {
    let filters = { vendorType: [], ...pagination };
    let vendorFilter = {};

    if (dataValue === 0) {
      filters.vendorType = ["transporter", "excavator", "petrolpump"];
    } else if (dataValue === 1) {
      filters.vendorType = ["transporter"];
    } else if (dataValue === 2) {
      filters.vendorType = ["excavator"];
    } else {
      filters.vendorType = ["petrolpump"];
    }

    if (searchQuery) {
      filters.search = searchQuery;
    }
    if (router.query) {
      vendorFilter = router.query;
    }
    const payload = { ...vendorFilter, ...filters };

    dispatch(getAllVendorsList(payload));
  }, [dispatch, dataValue, searchQuery, pagination, router.query]);

  const handleFilter = (type) => {
    const { [type]: filter, ...currentQuery } = router.query;
    const newQuery = filter ? currentQuery : { [type]: true };
    router.push({ pathname: router.pathname, query: newQuery });
  };

  return (
    <>
      <div className="manageUser_Section">
        <Row className="justify-content-end create_project_main">
          <Col md={6} className="text-end">
            <button
              onClick={() => router.push("/admin/vendors/vendorproject")}
              className="create_new_project_btn">
              Create new vendor <img src="/images/plus.svg" />
            </button>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <ul className="nav ProjectAdmin_tabs ">
              {FormSteps &&
                FormSteps?.map((steps, stepsIndex) => (
                  <li className="nav-item d-flex" key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${
                        dataValue === stepsIndex && "head-active"
                      }`}
                      active="true"
                      onClick={() => {
                        setDataValue(stepsIndex);
                        setPagination({ pageNo: 1, pageSize: 6 });
                      }}>
                      {steps}
                    </a>
                  </li>
                ))}
            </ul>
          </Col>
          <Col md={4}>
            <div className="FlexAndAlign">
              <input
                type="search"
                placeholder="Search Vendor"
                className="form-control"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="FilterItemSec">
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
            </div>
          </Col>
        </Row>

        <div className="manger_user_main">
          {dataValue === 0 && (
            <div>
              <Row>
                {vendorLoaderData ? (
                  <LoaderComponent />
                ) : getAllVendorLists?.length > 0 ? (
                  getAllVendorLists?.map((item, index) => (
                    <Col md={6}>
                      <div key={index}>
                        {
                          <div className="manger_user_inner vender_main">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="field_exe_text">
                                Vendor ID:
                                <span className="field_id_name">
                                  {item?.id < 10
                                    ? `#TECH 0${item?.id}`
                                    : `#TECH ${item?.id}`}
                                </span>
                              </div>
                              <div className="field_right_content d-flex align-items-center">
                                <div className="field_btn">
                                  {" "}
                                  <Button
                                    variant=""
                                    onClick={() =>
                                      router.push(`/admin/vendors/${item?.id}`)
                                    }>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="inner_user_data">
                              <div className="user_data_left d-flex align-items-center">
                                <h2>{item.name}</h2>
                                <span className="filed_admin_text">
                                  {item?.UserDetail?.vendorTypes?.displayName}
                                </span>
                              </div>
                              <div className=" vender_data_content">
                                <div class="user_inner_data">
                                  <div className="vendors_difault_tabal">
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Organization Type
                                      </span>
                                      <p className="tableData">
                                        {
                                          item?.UserDetail?.orgTypes
                                            ?.displayName
                                        }
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">GST No.</span>
                                      <p className="tableData">
                                        {item?.UserDetail?.gstNumber
                                          ? item?.UserDetail?.gstNumber
                                          : "-"}
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Total Vehicle
                                      </span>
                                      <p className="tableData">
                                        {item?.UserAssets?.length}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  ))
                ) : (
                  <NoDataPage />
                )}
              </Row>
              {getAllVendorLists?.length > 0 &&
                (pagination.pageSize >=
                getAllVendorListCount ? null : vendorLoaderData ? (
                  ""
                ) : (
                  <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    list={getAllVendorLists}
                    count={getAllVendorListCount}
                  />
                ))}
            </div>
          )}

          {dataValue === 1 && (
            <div>
              <Row>
                {vendorLoaderData ? (
                  <LoaderComponent />
                ) : getAllVendorLists?.length > 0 ? (
                  getAllVendorLists?.map((item, index) => (
                    <Col md={6}>
                      <div key={index}>
                        {
                          <div className="manger_user_inner vender_main">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="field_exe_text">
                                Vendor ID:
                                <span className="field_id_name">
                                  {item?.id < 10
                                    ? `#TECH 0${item?.id}`
                                    : `#TECH ${item?.id}`}
                                </span>
                              </div>
                              <div className="field_right_content d-flex align-items-center">
                                <div className="field_btn">
                                  {" "}
                                  <Button
                                    variant=""
                                    onClick={() =>
                                      router.push(`/admin/vendors/${item?.id}`)
                                    }>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="inner_user_data">
                              <div className="user_data_left d-flex align-items-center">
                                <h2>{item.name}</h2>
                                <span className="filed_admin_text">
                                  {item?.UserDetail?.vendorTypes?.displayName}
                                </span>
                              </div>
                              <div className=" vender_data_content">
                                <div class="user_inner_data">
                                  <div className="vendors_difault_tabal">
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Organization Type
                                      </span>
                                      <p className="tableData">
                                        {
                                          item?.UserDetail?.orgTypes
                                            ?.displayName
                                        }
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">GST No.</span>
                                      <p className="tableData">
                                        {item?.UserDetail?.gstNumber}
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Total Vehicle
                                      </span>
                                      <p className="tableData">
                                        {item?.UserAssets?.length}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  ))
                ) : (
                  <NoDataPage />
                )}
              </Row>
              {getAllVendorLists?.length > 0 &&
                (pagination.pageSize >=
                getAllVendorListCount ? null : vendorLoaderData ? (
                  ""
                ) : (
                  <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    list={getAllVendorLists}
                    count={getAllVendorListCount}
                  />
                ))}
            </div>
          )}

          {dataValue === 2 && (
            <div>
              <Row>
                {vendorLoaderData ? (
                  <LoaderComponent />
                ) : getAllVendorLists?.length > 0 ? (
                  getAllVendorLists?.map((item, index) => (
                    <Col md={6}>
                      <div key={index}>
                        {
                          <div className="manger_user_inner vender_main">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="field_exe_text">
                                Vendor ID:
                                <span className="field_id_name">
                                  {item?.id < 10
                                    ? `#TECH 0${item?.id}`
                                    : `#TECH ${item?.id}`}
                                </span>
                              </div>
                              <div className="field_right_content d-flex align-items-center">
                                <div className="field_btn">
                                  {" "}
                                  <Button
                                    variant=""
                                    onClick={() =>
                                      router.push(`/admin/vendors/${item?.id}`)
                                    }>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="inner_user_data">
                              <div className="user_data_left d-flex align-items-center">
                                <h2>{item.name}</h2>
                                <span className="filed_admin_text">
                                  {item?.UserDetail?.vendorTypes?.displayName}
                                </span>
                              </div>
                              <div className=" vender_data_content">
                                <div class="user_inner_data">
                                  <div className="vendors_difault_tabal">
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Organization Type
                                      </span>
                                      <p className="tableData">
                                        {
                                          item?.UserDetail?.orgTypes
                                            ?.displayName
                                        }
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">GST No.</span>
                                      <p className="tableData">
                                        {item?.UserDetail?.gstNumber}
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Total Vehicle
                                      </span>
                                      <p className="tableData">
                                        {item?.UserAssets?.length}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  ))
                ) : (
                  <NoDataPage />
                )}
              </Row>
              {getAllVendorLists?.length > 0 &&
                (pagination.pageSize >=
                getAllVendorListCount ? null : vendorLoaderData ? (
                  ""
                ) : (
                  <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    list={getAllVendorLists}
                    count={getAllVendorListCount}
                  />
                ))}
            </div>
          )}

          {dataValue === 3 && (
            <div>
              <Row>
                {vendorLoaderData ? (
                  <LoaderComponent />
                ) : getAllVendorLists?.length > 0 ? (
                  getAllVendorLists?.map((item, index) => (
                    <Col md={6}>
                      <div key={index}>
                        {
                          <div className="manger_user_inner vender_main">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="field_exe_text">
                                Vendor ID:
                                <span className="field_id_name">
                                  {item?.id < 10
                                    ? `#TECH 0${item?.id}`
                                    : `#TECH ${item?.id}`}
                                </span>
                              </div>
                              <div className="field_right_content d-flex align-items-center">
                                <div className="field_btn">
                                  {" "}
                                  <Button
                                    variant=""
                                    onClick={() =>
                                      router.push(`/admin/vendors/${item?.id}`)
                                    }>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="inner_user_data">
                              <div className="user_data_left d-flex align-items-center">
                                <h2>{item.name}</h2>
                                <span className="filed_admin_text">
                                  {item?.UserDetail?.vendorTypes?.displayName}
                                </span>
                              </div>
                              <div className=" vender_data_content">
                                <div class="user_inner_data">
                                  <div className="vendors_difault_tabal">
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Organization Type
                                      </span>
                                      <p className="tableData">
                                        {
                                          item?.UserDetail?.orgTypes
                                            ?.displayName
                                        }
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">GST No.</span>
                                      <p className="tableData">
                                        {item?.UserDetail?.gstNumber}
                                      </p>
                                    </div>
                                    <div className="vendoer_table_col">
                                      <span className="tableHead">
                                        Total Vehicle
                                      </span>
                                      <p className="tableData">
                                        {item?.UserAssets?.length}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  ))
                ) : (
                  <NoDataPage />
                )}
              </Row>
              {getAllVendorLists?.length > 0 &&
                (pagination.pageSize >=
                getAllVendorListCount ? null : vendorLoaderData ? (
                  ""
                ) : (
                  <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    list={getAllVendorLists}
                    count={getAllVendorListCount}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorsAdmin;
