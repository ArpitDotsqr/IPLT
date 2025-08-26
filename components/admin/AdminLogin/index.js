import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import EmailRegister from "./emailreg";
import Image from "next/image";
import { verifyEmail } from "@/redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChangePassword from "./changepassword";
import LoaderComponent from "@/components/comman_component/Loader";


const AdminLogin = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const [defaultPage, setDefaultPage] = useState(0)
    const [emailError, setEmailError] = useState('')

    const LoaderEmailVerify = useSelector((state) => state.userSlice.isLoading)

    const validateForm = () => {
        if (!loginDetails.email) {
            setEmailError(toast.info('Please enter your email'))
            return false
        }
        setEmailError('')
        return true
    }

    const handleSubmit = (e) => {
        debugger
        e.preventDefault()

        if (validateForm()) {
           
            dispatch(verifyEmail({ email: loginDetails.email })).then((res) => {
                 debugger;
                if (res?.payload?.success && res?.payload?.isFindUser) {
                    setDefaultPage(1)
                } else if (res?.payload?.success === false && res?.payload?.isFindUser === false) {
                    toast.info(res?.payload?.message)
                }
                else if (res?.payload?.success === false) {
                    toast.info(res?.payload?.message)
                } else if (res?.payload?.success && res?.payload?.isFindUser === false) {
                    // setDefaultPage(2)
                    toast.info("Please, check your email")
                } else if (res?.payload?.success) {
                    toast.info(res?.payload?.message)
                }
            })
        }
    }


    return (
        <>
            {/* start page - first  register with email only  */}
            {LoaderEmailVerify && <LoaderComponent />}
            {defaultPage === 0 && (
                <div className="login-user_main bg_image">
                    <Container>
                        <Row className="align-items-center">

                            <Col className="item_center" md={12}>
                                <div className="login_form">
                                    <div className="logo_login_main">
                                        <div class="text-center">
                                            <Image width={65} height={65} src="/images/infraPrimeLogo.svg" alt="" class="img-fluid login_logo_img" />
                                            <h1>InfraPrime Logistics Login</h1>
                                            <p className="mb-0">
                                                This is a secure site. Please enter your information.
                                            </p>
                                        </div>

                                        <div className="login_form_main">
                                            <Form onSubmit={handleSubmit} >
                                                <Form.Group className="mb-0" controlId="formBasicEmail">
                                                    <Form.Label>Email ID</Form.Label>
                                                    <Form.Control type="email"
                                                        value={loginDetails.email}
                                                        onChange={(e) => {
                                                            setLoginDetails({ ...loginDetails, email: e.target.value })
                                                        }}
                                                        placeholder="Enter Email ID" />
                                                    {/* <Form.Text className="text-muted">{emailError}</Form.Text> */}
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="w-100 form_login_btn mb-0"
                                                >
                                                    Next
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="left_side_layer"> */}
                                {/* <img src="/images/login_bg.jpg" /> */}
                                {/* <img className="" src="/images/bg-road.svg" /> */}
                                {/* </div> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}

            {/* second page - User will enter email and email generated password */}
            {defaultPage === 1 && <EmailRegister setLoginDetails={setLoginDetails} loginDetails={loginDetails} />}
            {/* {defaultPage === 2 && <ChangePassword />} */}

        </>
    );
};

export default AdminLogin;
