import React, { useState } from 'react';
import { Row, Container, CardHeader, Form , Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const CreateProfile = () => {
    const [formData, setFormData] = useState({
        balance: "",
        rmd: "",
        contributions: "",
        rmdAge: "",
        ror: "",
        flatRateAmount: "",
        withdrawalRate: "",
        flatRateOptInAge: "",
        bonus: "",
        lumpSumAmount: "",
        optInAge: "",
        lumpSumOptInAge: "",
        cola: "",
        inflation: "",
        saveTaxes: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (!value) {
            setErrors({ ...errors, [name]: "This field is required" });
        } else {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                validationErrors[key] = "This field is required";
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("Form submitted successfully:", formData);
    };
    return (
        <React.Fragment>
            <div className=" ">
                <ToastContainer />
                <Container fluid>
                    <Row>
                        <Col>
                            <Card className="p-0 pb-2">
                                <CardHeader className=" ">
                                    <Row>
                                        <Col md={6}>  <h3 className=" ">Default Parameter</h3></Col>
                                      
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>401K Balance ($)</Label>
                                                    <Input type="number" name="balance" value={formData.balance} onChange={handleChange} invalid={!!errors.balance} />
                                                    <FormFeedback>{errors.balance}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD (%)</Label>
                                                    <Input type="number" name="rmd" value={formData.rmd} onChange={handleChange} invalid={!!errors.rmd} />
                                                    <FormFeedback>{errors.rmd}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Contributions ($)</Label>
                                                    <Input type="number" name="contributions" value={formData.contributions} onChange={handleChange} invalid={!!errors.contributions} />
                                                    <FormFeedback>{errors.contributions}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Age</Label>
                                                    <Input type="number" name="rmdAge" value={formData.rmdAge} onChange={handleChange} invalid={!!errors.rmdAge} />
                                                    <FormFeedback>{errors.rmdAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Rate of Return (%)</Label>
                                                    <Input type="number" name="ror" value={formData.ror} onChange={handleChange} invalid={!!errors.ror} />
                                                    <FormFeedback>{errors.ror}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Amount ($)</Label>
                                                    <Input type="number" name="flatRateAmount" value={formData.flatRateAmount} onChange={handleChange} invalid={!!errors.flatRateAmount} />
                                                    <FormFeedback>{errors.flatRateAmount}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Withdrawal Rate (%)</Label>
                                                    <Input type="number" name="withdrawalRate" value={formData.withdrawalRate} onChange={handleChange} invalid={!!errors.withdrawalRate} />
                                                    <FormFeedback>{errors.withdrawalRate}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Opt-In Age</Label>
                                                    <Input type="number" name="flatRateOptInAge" value={formData.flatRateOptInAge} onChange={handleChange} invalid={!!errors.flatRateOptInAge} />
                                                    <FormFeedback>{errors.flatRateOptInAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Bonus ($)</Label>
                                                    <Input type="number" name="bonus" value={formData.bonus} onChange={handleChange} invalid={!!errors.bonus} />
                                                    <FormFeedback>{errors.bonus}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Amount ($)</Label>
                                                    <Input type="number" name="lumpSumAmount" value={formData.lumpSumAmount} onChange={handleChange} invalid={!!errors.lumpSumAmount} />
                                                    <FormFeedback>{errors.lumpSumAmount}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Opt-In Age</Label>
                                                    <Input type="number" name="optInAge" value={formData.optInAge} onChange={handleChange} invalid={!!errors.optInAge} />
                                                    <FormFeedback>{errors.optInAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Opt-In Age</Label>
                                                    <Input type="number" name="lumpSumOptInAge" value={formData.lumpSumOptInAge} onChange={handleChange} invalid={!!errors.lumpSumOptInAge} />
                                                    <FormFeedback>{errors.lumpSumOptInAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>COLA (%)</Label>
                                                    <Input type="number" name="cola" value={formData.cola} onChange={handleChange} invalid={!!errors.cola} />
                                                    <FormFeedback>{errors.cola}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Inflation (%)</Label>
                                                    <Input type="number" name="inflation" value={formData.inflation} onChange={handleChange} invalid={!!errors.inflation} />
                                                    <FormFeedback>{errors.inflation}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Save Taxes (%)</Label>
                                                    <Input type="number" name="saveTaxes" value={formData.saveTaxes} onChange={handleChange} invalid={!!errors.saveTaxes} />
                                                    <FormFeedback>{errors.saveTaxes}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Button color="primary" type="submit">Submit</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateProfile;
