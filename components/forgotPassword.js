import { forgotPassword } from '@/redux/actions/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Image from "next/image";

const ForgotPassword = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [forgotEmail, setForgotEmail] = useState({ email: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword({ email: forgotEmail.email })).then((res) => {
            if (res?.payload?.success) {
                toast.success(res?.payload?.message)
            }
        })
    }

    return (
        <>

            <div className="login-user_main bg_image">
                <Container>
                    <Row className="align-items-center">
                        <Col className="item_center" md={12}>
                        <div className="login_form">
                            <div className="logo_login_main">
                                <div class="text-center">
                                <Image width={65} height={65} src="/images/infraPrimeLogo.svg" alt="" class="img-fluid login_logo_img" />
                                    <h1>Forgot Password</h1>
                                <p>
                                    No worries, we'll send you reset instructions on your email.
                                </p>
                                </div>
                                
                                <div className="login_form_main">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-0" controlId="formBasicEmail">
                                            <Form.Label>Email ID </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email ID"
                                                value={forgotEmail.email}
                                                onChange={(e) => setForgotEmail({ ...forgotEmail, email: e.target.value })}
                                            />
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="w-100 form_login_btn"
                                        >
                                            Reset Password
                                        </Button>
                                        <Button variant="" className="back_btn_login" onClick={() => router.push('/login')}>
                                            <span className="back_icon">
                                                <img src="/images/back_icon.svg" />
                                            </span>
                                            Back to Login
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            </div>
                        </Col>
                        {/* <Col md={6}> */}
                            {/* <div className="left_side_layer"> */}
                                {/* <img src="/images/bg-road.svg" /> */}
                            {/* </div> */}
                        {/* </Col> */}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ForgotPassword