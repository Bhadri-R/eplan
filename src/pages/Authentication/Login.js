import React, { useState } from 'react';
import AuthSlider from './authCarousel';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import eplanLogo from '../../assets/images/eplan-logo.png';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';

const CoverSignIn = () => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validation = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email").email("Invalid Email Format"),
            password: Yup.string().required("Please Enter Your Password"),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg(null);

            try {
                console.log("Sending request to:", `${BASE_URL}/api/login/`);

                const response = await fetch(`${BASE_URL}/api/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                });

                const responseData = await response.json();
                console.log("Full API Response:", responseData);

                if (!response.ok) {
                    // Extract and show error message from API
                    const errorMessage = responseData.message || responseData.detail || "Invalid email or password";
                    throw new Error(errorMessage);
                }

                const {
                    access_token,
                    role,
                    super: isSuperUser,
                    username,
                    message,
                    expires_in // Added expires_in
                } = responseData;

                if (!expires_in) throw new Error("Login again");

                const authUser = {
                    email: values.email,
                    name: username || values.email,
                    role: role || 'User',
                    isSuperUser: isSuperUser || false,
                    accessToken: access_token,
                    expires_in: expires_in, // Added expiry time
                };

                console.log("Constructed authUser:", authUser);

                sessionStorage.setItem("authUser", JSON.stringify(authUser));

                const successMessage = message || "Login Successful!";
                toast.success(successMessage);

                // Redirect to dashboard after success
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);

            } catch (error) {
                console.error("Login Error:", error);
                const errorMessage = error.message;
                setErrorMsg(errorMessage);
                // toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    });

    document.title = "Eplan | Signin";

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <Col className="d-flex justify-content-center mb-3">
                                                    <div><img src={eplanLogo} width="200px" alt="Eplan Logo" /></div>
                                                </Col>
                                                {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                                                <div className="mt-4">
                                                    <Form onSubmit={validation.handleSubmit} className="p-2 mt-4">
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">Email</Label>
                                                            <Input
                                                                name="email"
                                                                placeholder="Enter email"
                                                                type="email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email}
                                                                invalid={validation.touched.email && Boolean(validation.errors.email)}
                                                            />
                                                            {validation.touched.email && validation.errors.email && (
                                                                <FormFeedback>{validation.errors.email}</FormFeedback>
                                                            )}
                                                        </div>

                                                        <div className="mb-3">
                                                            <Label htmlFor="password-input" className="form-label">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name="password"
                                                                    placeholder="Enter Password"
                                                                    type={passwordShow ? "text" : "password"}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.password}
                                                                    invalid={validation.touched.password && Boolean(validation.errors.password)}
                                                                />
                                                                {validation.touched.password && validation.errors.password && (
                                                                    <FormFeedback>{validation.errors.password}</FormFeedback>
                                                                )}
                                                                <button
                                                                    className="btn btn-link position-absolute top-0 text-decoration-none text-muted eyeBtn"
                                                                    type="button"
                                                                    style={{ right: "16px" }}
                                                                    onClick={() => setPasswordShow(!passwordShow)}
                                                                >
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <Row className="mb-0">
                                                            <Col className="text-end">
                                                                <p className="mb-0">
                                                                    <Link to="/forgot-password" className="text-end">Forgot Password?</Link>
                                                                </p>
                                                            </Col>
                                                        </Row>

                                                        <div className="mt-4">
                                                            <Button
                                                                color="success"
                                                                className="w-100"
                                                                type="submit"
                                                                disabled={loading}
                                                            >
                                                                {loading ? "Signing In..." : "Sign In"}
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">
                                                        Don’t have an account?{' '}
                                                        <Link to="/register" className="fw-semibold text-primary text-decoration-underline">
                                                            Signup
                                                        </Link>
                                                    </p>
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
                                    <p className="mb-0 text-primary">© {new Date().getFullYear()} Eplan. Developed by IdeauxTech</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverSignIn;