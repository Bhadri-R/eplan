import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const CreateIncome = () => {
    const [assetData, setAssetData] = useState({
        clientName: '',
        type: '',
        description: '',
        amount: '',

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
        setAssetData({ ...assetData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(assetData).forEach((key) => {
            const error = validateField(key, assetData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateIncome = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            toast.success('Asset created successfully!');
            setTimeout(() => {
                setAssetData({ clientName: '', type: '', description: '', amount: '' });
                setErrors({});
                setLoading(false);
            }, 1000);
        } catch (error) {
            toast.error('Error submitting data.');
        } finally {
            setLoading(false);
        }
    };
    const handleReset = () => {
        setAssetData({
            clientName: '',
            type: '',
            description: '',
            amount: '',
        });
        setErrors({});

    };

    return (
        <React.Fragment>
            <div className="">
                <ToastContainer />
                <Container fluid>
                    <Row>
                        <Col>

                            <form onSubmit={handleCreateIncome} className='mb-3'>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Client Name</Label>
                                            <Input type="select" name="clientName" value={assetData.clientName} onChange={handleChange} invalid={!!errors.clientName}>
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
                                            <Input type="select" name="type" value={assetData.type} onChange={handleChange} invalid={!!errors.type}>
                                                <option value="">Select Type</option>
                                                <option value="Equity">Equity</option>
                                                <option value="Bond">Bond</option>
                                            </Input>
                                            <FormFeedback>{errors.type}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Amount</Label>
                                            <Input type="text" name="amount" value={assetData.amount} onChange={handleChange} invalid={!!errors.amount} />
                                            <FormFeedback>{errors.amount}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label>Description</Label>
                                            <Input type="textarea" name="description" value={assetData.description} onChange={handleChange} invalid={!!errors.description} />
                                            <FormFeedback>{errors.description}</FormFeedback>
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

export default CreateIncome;