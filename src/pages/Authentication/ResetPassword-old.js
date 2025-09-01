import React from 'react';
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

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please Enter Your Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please Confirm Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        // Extract uid and token from the URL
        const pathParts = window.location.pathname.split("/"); // Split URL by "/"
        const uid = pathParts[2]; // Get 'NzI' from "/reset-password/NzI/"
        const token = pathParts[3]; // Get 'cm8w7u-...' from "/reset-password/NzI/cm8w7u-..."

        // Prepare data to send
        const requestData = {
          uid: uid,
          token: token,
          new_password: values.password, // Only send the new password
        };

        console.log("Submitting new password:", requestData);

        // Send request to backend
        const response = await axios.post(`${BASE_URL}/api/reset-password/`, requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        navigate("/login");
        console.log("Full Response:", response);
        toast.success("Password reset successful! Redirecting to login...");

      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("Failed to reset password. Please try again.");
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
                            {/* Password Field */}
                            <div className="mb-4">
                              <Label className="form-label">New Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter new password"
                                name="password"
                                value={validation.values.password}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.password && validation.touched.password}
                              />
                              {validation.errors.password && validation.touched.password && (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                              )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4">
                              <Label className="form-label">Confirm Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Re-enter new password"
                                name="confirmPassword"
                                value={validation.values.confirmPassword}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.confirmPassword && validation.touched.confirmPassword}
                              />
                              {validation.errors.confirmPassword && validation.touched.confirmPassword && (
                                <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                              )}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center mt-4">
                              <Button color="success" className="w-100" type="submit">
                                Reset Password
                              </Button>
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