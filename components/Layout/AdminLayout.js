import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LeftMenuPage from "../admin/LeftMenu";
import Header from "./Header";
import { usePathname } from "next/navigation";
import AdminLogin from "../admin/AdminLogin";
// import { getLocalData } from '../../lib/localdata'

// export async function getStaticProps() {
//   const adminNavBar = await getLocalData()

//   return {
//     props: { adminNavBar }
//   }
// }


export default function AdminLayout({ children }) {
  const pathname = usePathname();
  return (
    <div>
      {pathname?.startsWith("/login") ? (
        <Container fluid>
          <Row>
            <Col>
              <AdminLogin />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <LeftMenuPage />
            <Col lg={10}>
              <Row>
                <Col md={12} className="p-0 TopStickyHeader">
                  <Header />
                </Col>
                <Col md={12}>{children}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
