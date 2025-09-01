import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, FormFeedback, Input, Button, Form } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthSlider from './authCarousel';
import eplanLogo from '../../assets/images/eplan-logo.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../utils/config'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CoverSignUp = () => {

    const navigate = useNavigate();
    document.title = "Eplan | Signup";
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const validation = useFormik({
        initialValues: {
            name: '', 
            email: '',
            password: '',
            confirmPassword: ''
        }
        ,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Name must be at least 3 characters")
                .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
                .required("Please enter your name"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Please enter your email"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/.*[a-z].*/, "At least one lowercase letter")
                .matches(/.*[A-Z].*/, "At least one uppercase letter")
                .matches(/.*[0-9].*/, "At least one number")
                .matches(/.*[!@#$%^&*(),.?\":{}|<>].*/, "At least one special character")
                .required("Please enter your password"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Please confirm your password"),
        }),

        onSubmit: async (values) => {

            try {

                const { confirmPassword, ...userData } = values;
                console.log("Sending registration data:", userData);
                const response = await axios.post(`${BASE_URL}/api/register/`, userData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },

                });
                const successMessage = response?.message || response?.statusText || "Registration successful!";
                toast.success(successMessage, {
                    toastId: "register-success",
                    autoClose: 2000, 
                    onClose: () => {
                        setTimeout(() => {
                            navigate("/login"); 

                        }, 500);  

                    },

                });

            } catch (error) {
                console.error("Error during registration:", error);
                let errorMessage = "User Already Exists";
                if (error.response) {
                    errorMessage = error.response.data?.message || error.response.statusText ;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                console.error("Error Message:", errorMessage);

                toast.error(errorMessage);

            }

        }


    });



    return (
        <React.Fragment>
            {/* <ToastContainer autoClose={600} />          */}
               <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <Col className='d-flex justify-content-center mb-3'>
                                                    <img src={eplanLogo} width='200px' alt="Eplan Logo" />
                                                </Col>
                                                <Form onSubmit={validation.handleSubmit} noValidate>

                                                    <div className="mb-3">
                                                        <label className="form-label">Name <span className="text-danger">*</span></label>
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Enter name"
                                                            value={validation.values.name} // Match with initialValues
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={!!(validation.touched.name && validation.errors.name)}
                                                        />


                                                        <FormFeedback>{validation.errors.username}</FormFeedback>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email <span className="text-danger">*</span></label>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Enter email address"
                                                            value={validation.values.email}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={validation.touched.email && validation.errors.email}
                                                        />
                                                        <FormFeedback>{validation.errors.email}</FormFeedback>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Password</label>
                                                        <div className="position-relative auth-pass-inputgroup">
                                                            <Input
                                                                type={passwordShow ? "text" : "password"}
                                                                name="password"
                                                                placeholder="Enter password"
                                                                value={validation.values.password}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                invalid={validation.touched.password && validation.errors.password}
                                                            />
                                                            <Button color="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-muted password-addon">
                                                                <i className="ri-eye-fill align-middle"></i>
                                                            </Button>
                                                            <FormFeedback>{validation.errors.password}</FormFeedback>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Confirm Password</label>
                                                        <div className="position-relative auth-pass-inputgroup">
                                                            <Input
                                                                type={confirmPasswordShow ? "text" : "password"}
                                                                name="confirmPassword"
                                                                placeholder="Confirm password"
                                                                value={validation.values.confirmPassword}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                invalid={validation.touched.confirmPassword && validation.errors.confirmPassword}
                                                            />
                                                            <Button color="link" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)} className="position-absolute end-0 top-0 text-muted password-addon">
                                                                <i className="ri-eye-fill align-middle"></i>
                                                            </Button>
                                                            <FormFeedback>{validation.errors.confirmPassword}</FormFeedback>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button type="submit" color="success" className="w-100">Sign Up</Button>
                                                    </div>
                                                </Form>
                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Already have an account? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Sign in</Link></p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CoverSignUp;