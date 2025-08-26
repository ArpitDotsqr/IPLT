import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import MasterCard from "./AllCard/masterCard";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  getAllProjectDetails,
  getProjectDetails,
} from "@/redux/actions/project/projectData";
import debounce from "debounce";

const ProjectAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 3 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      dispatch(getProjectDetails({ projectId: router.query.id }));
    }
    // dispatch(getAllProjectDetails({
    //   ...pagination,
    //   ...router.query
    // }))
  }, [dispatch, pagination, router.query]);

  useEffect(() => {
    dispatch(
      getAllProjectDetails({
        ...pagination,
        ...router.query,
      })
    );
  }, [pagination, router.query]);

  const handleSearch = debounce((searchItem) => {
    dispatch(getAllProjectDetails({ search: searchItem }));
  }, 400);

  const handleFilter = (type) => {
    const { [type]: filter, ...currentQuery } = router.query;
    const newQuery = filter ? currentQuery : { [type]: true };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="ProjectAdmin">
      <Row className="justify-content-end">
        <Col md={6} className="text-end">
          <button
            onClick={() => router.push("/admin/project/createproject")}
            className="create_new_project_btn mt-0">
            Create new project <img src="/images/plus.svg" />
          </button>
        </Col>
      </Row>
      <Col md={4}>
        <div className="FlexAndAlign">
          <input
            type="search"
            placeholder="Search Project"
            className="form-control"
            aria-label="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <div className="FilterItemSec">
            <Form>
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
      <div>
        <MasterCard pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
};

export default ProjectAdmin;
