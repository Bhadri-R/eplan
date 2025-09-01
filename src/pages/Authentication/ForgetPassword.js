import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Form, FormFeedback, Label, Input } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthSlider from './authCarousel';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import eplanLogo from '../../assets/images/eplan-logo.png'
import { BASE_URL } from '../../utils/config'
const CoverPasswReset = () => {
  document.title = "Reset Password | Eplan";
  const navigate = useNavigate();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
    }),

    onSubmit: async (values) => {
      try {
        console.log("Sending email for password reset:", values);
        

        const response = await axios.post(`${BASE_URL}/api/forgot-password/`, values, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log("Full Response:", response);

        toast.success(response.message);
        navigate("/login"); // Redirect after success
      } catch (error) {
        console.error("Error sending password reset email:", error);
        toast.error(response.message);
      }
    }

  });

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">


                        <Col className='d-flex justify-content-center mb-3'>
                          <div> <img src={eplanLogo} width='200px' /></div>
                        </Col>
                        {/* <h5 className="text-primary">Forgot Password?</h5> */}


                        {/* <div className="mt-2 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#0ab39c"
                                                        className="avatar-xl"
                                                        style={{ width: "120px", height: "120px" }}>
                                                    </lord-icon>
                                                </div>
*/}
                        {/* <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                          Enter your email and instructions will be sent to you!
                        </div> */}
                        <div className="p-2">
                          <Form onSubmit={validation.handleSubmit}>
                            <div className="mb-4">
                              <Label className="form-label">Email</Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email address"
                                name="email"
                                value={validation.values.email}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.email && validation.touched.email ? true : false}
                              />
                              {validation.errors.email && validation.touched.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="text-center mt-4">
                              <Button color="success" className="w-100" type="submit">Send Reset Link</Button>
                            </div>
                          </Form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">Remembered your password? <Link to="/login" className="fw-bold text-primary text-decoration-underline"> Login here </Link></p>
                        </div>

                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <footer className="footer">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <p className="mb-0 text-primary">&copy; {new Date().getFullYear()} Eplan. Developed by IdeauxTech </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CoverPasswReset;