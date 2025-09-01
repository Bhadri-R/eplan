import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Createliabilities = () => {
    const [liabilitiesData, setliabilitiesData] = useState({
        clientName: '',
        type: '',
        account: '',

        monthlyPayment: '',
        currentBalance: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setliabilitiesData({ ...liabilitiesData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(liabilitiesData).forEach((key) => {
            const error = validateField(key, liabilitiesData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateliabilities = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Validation Errors: ", errors);
            return;
        }

        setLoading(true);
        console.log("Submitting Data: ", liabilitiesData); // Debugging Log

        try {
            toast.success('Liabilities created successfully!');
            setTimeout(() => {
                setliabilitiesData({
                    clientName: '',
                    type: '',
                    account: '',

                    monthlyPayment: '',
                    currentBalance: ''
                });
                setErrors({});
                setLoading(false);
                console.log("Form Reset Successfully");
            }, 1000);
        } catch (error) {
            console.error("Submission Error: ", error);
            toast.error('Error submitting data.');
        }
    };

    const handleReset = () => {
        setAssetData({
            clientName: '',
            type: '',
            account: '',
            monthlyPayment: '',
            currentBalance: ''
        });
        setErrors({});

    };


    return (
        <React.Fragment>
            <div className=" ">
                <ToastContainer />
                <Container fluid>
                    <Row>
                        <Col>

                            <form onSubmit={handleCreateliabilities} className='mb-3'>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Client Name</Label>
                                            <Input type="select" name="clientName" value={liabilitiesData.clientName} onChange={handleChange} invalid={!!errors.clientName}>
                                                <option value="">Select Client</option>
                                                <option value="Client A">Client A</option>
                                                <option value="Client B">Client B</option>
                                            </Input>
                                            <FormFeedback>{errors.clientName}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Type</Label>
                                            <Input type="select" name="type" value={liabilitiesData.type} onChange={handleChange} invalid={!!errors.type}>
                                                <option value="">Select Type</option>
                                                <option value="Equity">Equity</option>
                                                <option value="Bond">Bond</option>
                                            </Input>
                                            <FormFeedback>{errors.type}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Account</Label>
                                            <Input type="text" name="account" value={liabilitiesData.account} onChange={handleChange} invalid={!!errors.account} />
                                            <FormFeedback>{errors.account}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Monthly Balance</Label>
                                            <Input type="text" name="monthlyPayment" value={liabilitiesData.monthlyPayment} onChange={handleChange} invalid={!!errors.monthlyPayment} />
                                            <FormFeedback>{errors.monthlyPayment}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Current Balance</Label>
                                            <Input type="text" name="currentBalance" value={liabilitiesData.currentBalance} onChange={handleChange} invalid={!!errors.currentBalance} />
                                            <FormFeedback>{errors.currentBalance}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button type="submit" color="primary" disabled={loading}>
                                            {loading ? "Submitting..." : "Submit"}
                                        </Button>

                                        <Button type="button" color="danger" onClick={handleReset} className='ms-3'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </form>

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Createliabilities;