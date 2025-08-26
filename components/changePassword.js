
import { createNewPassword } from "@/redux/actions/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ChangePasswordAdminPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [data, setData] = useState({ email: '', password: '', confirmpassword: '' })
    const [visibleData, setVisibleData] = useState({ password: '', showPassword: false })
    const [visibleData1, setVisibleData1] = useState({ password: '', showPassword: false })

    const toggleVisibilePassword = () => {
        setVisibleData({ ...visibleData, showPassword: !visibleData.showPassword })
    }

    const toggleVisibilePassword1 = () => {
        setVisibleData1({ ...visibleData1, showPassword: !visibleData1.showPassword })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNewPassword({ email: data.email, password: data.password, confirmPassword: data.confirmpassword })).then((res) => {
            if (res?.payload?.success) {
                toast.success(res?.payload?.message?.default)
                router.push('/')
            } else {
                toast.error('Error')
            }
        })
    }

    return (
        <>
            <div className='login-user_main bg_image'>
                <Container>
                    <Row className='align-items-center'>
                        <Col className="item_center" md={12}>
                            <div className="login_form">
                                <div className='logo_login_main'>
                                    <div class="text-center">
                                        <Image width={65} height={65} src="/images/infraPrimeLogo.svg" alt="" class="img-fluid login_logo_img" />
                                        <h1>InfraPrime Logistics Login</h1>
                                        <p className="mb-0">This is a secure site. Please enter your information to enter.</p>
                                    </div>

                                    <div className='login_form_main'>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email Id</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email id"
                                                    value={data.email}
                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                                                <Form.Label>Create Password</Form.Label>
                                                <Form.Control
                                                    type={visibleData.showPassword ? 'text' : "password"}
                                                    placeholder="Create New Password"
                                                    value={data.password}
                                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                                />
                                                <span className='password_visiable position-absolute' onClick={toggleVisibilePassword}>
                                                    <Image width={20} height={30} src="/images/visibility_icon.svg" alt="" class="img-fluid" />
                                                </span>
                                            </Form.Group>
                                            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                                                <Form.Label>Confirm Password </Form.Label>
                                                <Form.Control
                                                    type={visibleData1.showPassword ? 'text' : "password"}
                                                    placeholder="Confirm Password"
                                                    value={data.confirmpassword}
                                                    onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
                                                />
                                                <span className='password_visiable position-absolute' onClick={toggleVisibilePassword1}>
                                                    <Image width={20} height={30} src="/images/visibility_icon.svg" alt="" class="img-fluid" />
                                                </span>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className='w-100 form_login_btn'>
                                                Login
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ChangePasswordAdminPage