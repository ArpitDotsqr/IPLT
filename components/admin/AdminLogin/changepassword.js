
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// const ChangePassword = ({ handleState }) => {
//     const router = useRouter()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         router.push('/admin/dashboard')
//         handleState('')
//     }

//     return (
//         <>
//             <div className='login-user_main'>
//                 <Container>
//                     <Row className='align-items-center'>
//                         <Col md={6}>
//                             <div className='logo_login_main'>
//                                 <div class="login_logo_img">
//                                     <Image width={65} height={65} src="/images/logo_login.png" alt="" class="img-fluid" />
//                                 </div>
//                                 <h1>Tech Stack Login</h1>
//                                 <p className="mb-0">This is a secure site. Please enter your information to enter.</p>
//                                 <div className='login_form_main'>
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                                             <Form.Label>Email Id</Form.Label>
//                                             <Form.Control type="email" placeholder="Enter email id" />
//                                             <Form.Text className="text-muted">
//                                             </Form.Text>
//                                         </Form.Group>
//                                         <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
//                                             <Form.Label>Create Password</Form.Label>
//                                             <Form.Control type="password" placeholder="Create New Password" />
//                                             <span className='password_visiable position-absolute'><Image width={20} height={30} src="/images/visibility_icon.svg" alt="" class="img-fluid" /></span>
//                                         </Form.Group>
//                                         <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
//                                             <Form.Label>Confirm Password </Form.Label>
//                                             <Form.Control type="password" placeholder="Confirm Password" />
//                                         </Form.Group>
//                                         <Form.Group className="remember_pass d-flex justify-content-between" controlId="formBasicCheckbox">
//                                             <div className='d-flex '>
//                                                 <Form.Check type="checkbox" className='d-flex align-items-center ' />
//                                                 <label className='d-flex align-items-center ps-2'>Remember me</label>
//                                             </div>
//                                         </Form.Group>
//                                         <Button variant="primary" type="submit" className='w-100 form_login_btn'>
//                                             Login
//                                         </Button>
//                                     </Form>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col md={6}>
//                             <div className='left_side_layer'>
//                                 <img src='/images/login_bg.jpg' />
//                             </div>
//                         </Col>

//                     </Row>

//                 </Container>
//             </div>
//         </>
//     )
// }

// export default ChangePassword