import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/actions/auth';
import { setCookies } from '@/components/utils';
import { userRoles } from '@/utils/helpler';
import { toast } from 'react-toastify';
import LoaderComponent from '@/components/comman_component/Loader';


const EmailRegister = (props) => {
  const { loginDetails, setLoginDetails } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({ password: '', showPassword: false })
  const [rememberMe, setRememberMe] = useState(false);

  const loaderState = useSelector((state) => state.loginUser.isLoading)

  const handleLogin = () => {

    if (rememberMe) {
      localStorage.setItem('rememberMe', true);
      localStorage.setItem('email', loginDetails.email);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('rememberMe')
    }

    //   dispatch(login(loginDetails)).then((res) => {
    //     if (res.payload.success) {
    //       setCookies(10, res.payload.data.token, res.payload.data.userData.Role.key, res.payload.data.userData.id)
    //       localStorage.setItem("token", res.payload.data.token)
    //       toast.success("Successfully Logged In")
    //       if (res.payload.data.userData.Role.key === userRoles.superadmin) {
    //         router.push('/admin/dashboard')
    //       }
    //       if (res.payload.data.userData.Role.key === userRoles.admin) {
    //         router.push('/admin/dashboard')
    //       }
    //     } else {
    //       toast.error(res.payload.message.user ? res.payload.message.user : res.payload.message.password ? res.payload.message.password : "An Error Occured")
    //     }
    //   })
    // }
    dispatch(login(loginDetails)).then((res) => {
      if (res.payload.success) {
        setCookies(10, res.payload.data.token, res.payload.data.userData.Role.key, res.payload.data.userData.id)
        localStorage.setItem("token", res.payload.data.token)
        toast.success("Successfully Logged In")
        let userRole = res.payload.data.userData.Role.key;
       
        if (userRole === userRoles.superadmin || userRole === userRoles.admin || userRole === userRoles.mis) {

          window.location.href = '/admin/dashboard';
        } else {
          // Handle other user roles here if needed
        }
      } else {
        let errorMessage = res.payload.message.user ? res.payload.message.user : res.payload.message.password ? res.payload.message.password : "An Error Occurred";
        toast.error(errorMessage);
      }
    }).catch((error) => {
      // Handle errors here if needed
      console.error("Error:", error);
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // setUserlogin(true)
  }

  const togglePasswordVisibility = () => {
    setLoginData({ ...loginData, showPassword: !loginData.showPassword })
  }

  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe') === true
    if (storedRememberMe) {
      const storedEmail = localStorage.getItem('email')
      setRememberMe(true)
      setLoginDetails({ ...loginDetails, email: storedEmail })
    }
  }, [])

  return (
    <>
      {loaderState && <LoaderComponent />}
      {
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
                          <Form.Control type="email"
                            placeholder="Enter email id"
                            value={loginDetails.email}
                            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                          />
                          <Form.Text className="text-muted">
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type={loginData.showPassword ? 'text' : "password"}
                            placeholder="Enter Password"
                            value={loginDetails.password}
                            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                          />
                          <span className='password_visiable position-absolute' onClick={togglePasswordVisibility}>
                            <Image width={20} height={30} src="/images/visibility_icon.svg" alt="" class="img-fluid" />
                          </span>
                        </Form.Group>
                        <Form.Group className="remember_pass d-flex justify-content-between" controlId="formBasicCheckbox">
                          <div className='d-flex '>
                            {/* <Form.Check type="checkbox" className='d-flex align-items-center ' />
                          <label className='d-flex align-items-center ps-2'>Remember me</label> */}

                            <input
                              type="checkbox"
                              className=""
                              id="rememberMe"
                              name="rememberMe"
                              checked={rememberMe || localStorage.getItem('email') !== null}
                              onChange={(event) =>
                                setRememberMe(event.target.checked)
                              }
                            />
                            <label
                              className='d-flex align-items-center ps-2'
                              htmlFor="rememberMe"
                            >
                              Remember me
                            </label>

                          </div>
                          <span className='forgot_password' style={{ 'cursor': 'pointer' }} onClick={() => router.push('/forgotpassword')}>Forgot Password?</span>
                        </Form.Group>
                        <Button variant="primary"
                          type="submit"
                          className='w-100 form_login_btn mb-0'
                          onClick={handleLogin}
                        >
                          Login here
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col md={6} >
                <div className='left_side_layer'>
                <img src="/images/bg-road.svg"/>
                </div>
              </Col> */}
            </Row>

          </Container>
        </div>
      }
    </>
  )
}

export default EmailRegister