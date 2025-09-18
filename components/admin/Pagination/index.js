import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";
import previousArrow from "../../../public/images/Arrow-left.svg";
import forwardArrow from "../../../public/images/Arrow-right.svg";

function Pagination({ pagination, list, setPagination, count }) {
  let listCount = count ? count : list?.count;
  const handlePagination = (e) => {
    let page = {
      ...pagination,
    };
    if (e.target.name === "previous") {
      page.pageNo = pagination.pageNo - 1;
    }
    if (e.target.name === "next") {
      page.pageNo = pagination.pageNo + 1;
    }
    setPagination(page);
  };
  return (
    <div className="item_justify mb-3">
      <div className="table_footer_start">
        <h6>
          Showing {(pagination.pageNo - 1) * pagination.pageSize + 1} -{" "}
          {pagination.pageNo * pagination.pageSize < listCount
            ? pagination.pageNo * pagination.pageSize
            : listCount}{" "}
          profiles of {listCount} profiles
        </h6>
      </div>
      <div className="">
        {pagination.pageNo !== 1 && (
          <Button
            style={{
              color: "#0061F6",
              background: "transparent",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className=" me-3"
            name="previous"
            onClick={(e) => handlePagination(e)}>
            <Image
              width={20}
              height={20}
              className="me-2 mb-1"
              src={previousArrow}
              name="previous"
            />
            Previous
          </Button>
        )}
        {pagination.pageNo * pagination.pageSize < listCount && (
          <Button
            style={{ fontSize: "14px", fontWeight: "500" }}
            className="border_btn green"
            name="next"
            onClick={(e) => handlePagination(e)}>
            Next
            <Image
              width={20}
              height={20}
              className="ms-2"
              src={forwardArrow}
              name="next"
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
