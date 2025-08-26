import { setActiveNav } from "@/redux/reducers/user/userSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminNavBar } from "./leftmenuData";
import Image from "next/image";
import { setCookies } from "@/components/utils";
import { routePath } from "@/redux/actions/user/userActions";
// const adminNavBar = require("../../../public/leftmenuData.json");

const LeftMenuPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;

  const activeNavItem = useSelector((state) => state.userSlice.activeNavItem);
  const routeDetail = useSelector((state) => state.userSlice.pathnameDetail)

  useEffect(() => {
    const checkRoute = () => {
      routeDetail?.forEach((navitem) => {
        navitem.other.forEach((element) => {
          if (pathname.includes(element)) {
            dispatch(setActiveNav(navitem.name));
          }
        });
      });
    };
    checkRoute();
  }, [pathname, routeDetail, dispatch]);

  useEffect(() => {
    dispatch(routePath())
  }, [activeNavItem, `${router}`])



  const handleActive = (path) => {
    // document.querySelector(".navbar-toggler").click();
    router.push(`/admin${path}`);
  };

  return (
    <>
      <Col lg={2} md={12} className="left_menu_coloum">
        <div className="left_menu_tech_stack_logo desktop_nav">
          <img
            src={"/images/infraPrimeLogo2.svg"}
            alt="infraPrimeLogo"
            className="img-fluid infraPrimeLogo"
          />
          <h2>
            <span>InfraPrime Logistics</span>
          </h2>
        </div>
        <Navbar expand="lg">
          <Navbar.Brand className="tech_stak_logo_or_name" href="#home">
            <div className="left_menu_tech_stack_logo mobile_nav">
              <img
                src={"/images/infraPrimeLogo2.svg"}
                alt="infraPrimeLogo"
                className="img-fluid infraPrimeLogo"
              />
              <h2>
                Infraprime
              </h2>
            </div></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="leftmenu_list_tab">
              {routeDetail &&
                routeDetail?.map((navItem, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        onClick={() => handleActive(navItem.path)}
                        className={navItem.name === activeNavItem ? "active" : ""}
                      >
                        <span className=""><Image width={24} height={24} className="img-fluid" src={navItem.logo} alt={navItem.name} /></span> {navItem.name}{" "}
                      </li>
                    </>
                  );
                })}
              <li className="nav_Logout_item" onClick={() => {
                localStorage.clear();
                setCookies(-1);
                router.push('/'),
                  toast.success('Logout Successfully')
              }}>
                <span><img src="/images/log_out_icon.svg" /></span>  Log Out
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>

        {/* <div className="login_dash_boad">
          <ul>
            <li>
              <div className="login_dashbord_inner">
                <a>
                  <span><img src="/images/log_out_icon.svg" /></span>
                  <div className="log_out_nav"
                    onClick={() => {
                      router.push('/login'),
                        toast.success('Logout Successfully')
                    }}
                  >Log Out</div>
                </a>
              </div>
            </li>
          </ul>
        </div> */}
      </Col>
    </>
  );
};

export default LeftMenuPage;
