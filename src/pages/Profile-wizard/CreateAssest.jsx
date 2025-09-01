import React, { useState } from 'react';
import { Row, Container, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAsset = ({ onFormValid }) => {
    const [assetData, setAssetData] = useState({
        clientName: '',
        type: '',
        account: '',
        risk: '',
        currentBalance: '',
        contribution: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validate a single field
    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        }
        return error;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setAssetData({ ...assetData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: error }));
        // Validate the entire form on change
        onFormValid(validateForm());
    };

    // Validate the entire form
    const validateForm = () => {
        const newErrors = {};
        Object.keys(assetData).forEach((key) => {
            const error = validateField(key, assetData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Reset the form
    const handleReset = () => {
        setAssetData({
            clientName: '',
            type: '',
            account: '',
            risk: '',
            currentBalance: '',
            contribution: ''
        });
        setErrors({});
        onFormValid(false);
    };

    // Handle form submission
    const handleCreateAsset = async (e) => {
        e.preventDefault(); // Prevent form refresh
        const isFormValid = validateForm(); // Validate the form on submit

        if (!isFormValid) {
            toast.error('Please fill all required fields.'); // Show error if form is invalid
            return;
        }

        setLoading(true);
        try {
            // Simulate an API call or form submission
            toast.success('Asset created successfully!');
            setTimeout(() => {
                setAssetData({
                    clientName: '',
                    type: '',
                    account: '',
                    risk: '',
                    currentBalance: '',
                    contribution: ''
                });
                setErrors({});
                setLoading(false);
                onFormValid(true); // Notify parent component that the form is valid
            }, 1000);
        } catch (error) {
            toast.error('Error submitting data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="">
                <ToastContainer />
                <Container fluid>
                    <Row>
                        <Col>
                            <form onSubmit={handleCreateAsset} className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Client Name</Label>
                                            <Input
                                                type="select"
                                                name="clientName"
                                                value={assetData.clientName}
                                                onChange={handleChange}
                                                invalid={!!errors.clientName}
                                            >
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
                                            <Input
                                                type="select"
                                                name="type"
                                                value={assetData.type}
                                                onChange={handleChange}
                                                invalid={!!errors.type}
                                            >
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
                                            <Input
                                                type="text"
                                                name="account"
                                                value={assetData.account}
                                                onChange={handleChange}
                                                invalid={!!errors.account}
                                            />
                                            <FormFeedback>{errors.account}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Risk</Label>
                                            <Input
                                                type="select"
                                                name="risk"
                                                value={assetData.risk}
                                                onChange={handleChange}
                                                invalid={!!errors.risk}
                                            >
                                                <option value="">Select Risk</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </Input>
                                            <FormFeedback>{errors.risk}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Current Balance</Label>
                                            <Input
                                                type="text"
                                                name="currentBalance"
                                                value={assetData.currentBalance}
                                                onChange={handleChange}
                                                invalid={!!errors.currentBalance}
                                            />
                                            <FormFeedback>{errors.currentBalance}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Contribution</Label>
                                            <Input
                                                type="text"
                                                name="contribution"
                                                value={assetData.contribution}
                                                onChange={handleChange}
                                                invalid={!!errors.contribution}
                                            />
                                            <FormFeedback>{errors.contribution}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button type="submit" color="primary" disabled={loading}>
                                            {loading ? "Submitting..." : "Submit"}
                                        </Button>
                                        <Button type="button" color="danger" onClick={handleReset} className="ms-3">
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

export default CreateAsset;