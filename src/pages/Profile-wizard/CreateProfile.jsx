import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const CreateProfile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        age: '',
        retirementAge: '',
        spouseName: '',
        spouseAge: '',
        spouseRetirementAge: '',
        incomeGoal: '',
        children: []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showChildrenInputs, setShowChildrenInputs] = useState(false);
    const [submittedData, setSubmittedData] = useState(null); // State to display submitted JSON

    const validateField = (name, value) => {
        let error = '';
        const regexPatterns = {
            name: /^[A-Za-z ]{3,50}$/,
            age: /^\d{1,3}$/,
            retirementAge: /^\d{1,3}$/,
            spouseName: /^[A-Za-z ]{3,50}$/,
            spouseAge: /^\d{1,3}$/,
            spouseRetirementAge: /^\d{1,3}$/,
            incomeGoal: /^\d+(\.\d{1,2})?$/
        };

        if (!value) {
            error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        } else if (regexPatterns[name] && !regexPatterns[name].test(value)) {
            error = `Invalid ${name.replace(/([A-Z])/g, ' $1').trim()} format.`;
        }

        return error;
    };
    const validateName = (value) => {
        if (!value) return "Name is required.";
        if (!/^[A-Za-z ]{3,50}$/.test(value)) return "Name must be 3-50 characters long and contain only letters.";
        return "";
    };

    const validateAge = (value) => {
        if (!value) return "Age is required.";
        if (!/^\d{1,3}$/.test(value) || value < 1 || value > 120) return "Enter a valid age (1-120).";
        return "";
    };

    const validateRetirementAge = (value) => {
        if (!value) return "Retirement Age is required.";
        if (!/^\d{1,3}$/.test(value) || value < 40 || value > 80) return "Enter a valid retirement age (40-80).";
        return "";
    };

    const validateSpouseName = (value) => {
        if (!value) return "Spouse Name is required.";
        if (!/^[A-Za-z ]{3,50}$/.test(value)) return "Spouse Name must be 3-50 characters long and contain only letters.";
        return "";
    };

    const validateSpouseAge = (value) => {
        if (!value) return "Spouse Age is required.";
        if (!/^\d{1,3}$/.test(value) || value < 18 || value > 120) return "Enter a valid spouse age (18-120).";
        return "";
    };

    const validateSpouseRetirementAge = (value) => {
        if (!value) return "Spouse Retirement Age is required.";
        if (!/^\d{1,3}$/.test(value) || value < 30 || value > 100) return "Enter a valid spouse retirement age (30-100).";
        return "";
    };

    const validateIncomeGoal = (value) => {
        if (!value) return "Income Goal is required.";
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Enter a valid income goal (numbers only, up to 2 decimal places).";
        return "";
    };

    const validateChildName = (value) => {
        if (!value) return "Child Name is required.";
        if (!/^[A-Za-z ]{3,50}$/.test(value)) return "Child Name must be 3-50 characters long and contain only letters.";
        return "";
    };

    const validateChildAge = (value) => {
        if (!value) return "Child Age is required.";
        if (!/^\d{1,2}$/.test(value) || value < 1 || value > 18) return "Enter a valid child age (1-18).";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = "";

        switch (name) {
            case "name":
                error = validateName(value);
                break;
            case "age":
                error = validateAge(value);
                break;
            case "retirementAge":
                error = validateRetirementAge(value);
                break;
            case "spouseName":
                error = validateSpouseName(value);
                break;
            case "spouseAge":
                error = validateSpouseAge(value);
                break;
            case "spouseRetirementAge":
                error = validateSpouseRetirementAge(value);
                break;
            case "incomeGoal":
                error = validateIncomeGoal(value);
                break;
            default:
                break;
        }

        setProfileData({ ...profileData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: error }));
    };


    const handleChildChange = (index, field, value) => {
        const updatedChildren = Array.isArray(profileData.children) ? [...profileData.children] : [];
        updatedChildren[index][field] = value;

        setProfileData((prevData) => ({
            ...prevData,
            children: updatedChildren
        }));

        setErrors((prev) => ({
            ...prev,
            [`child_${index}_${field}`]: validateField(field, value),
        }));
    };

    const addChild = () => {
        setShowChildrenInputs(true);
        setProfileData((prevData) => ({
            ...prevData,
            children: Array.isArray(prevData.children) ? [...prevData.children, { name: '', age: '' }] : [{ name: '', age: '' }]
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(profileData).forEach((key) => {
            if (key !== "children") {
                const error = validateField(key, profileData[key]);
                if (error) newErrors[key] = error;
            }
        });

        profileData.children.forEach((child, index) => {
            Object.keys(child).forEach((field) => {
                const error = validateField(field, child[field]);
                if (error) newErrors[`child_${index}_${field}`] = error;
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReset = () => {
        setProfileData({
            name: '',
            age: '',
            retirementAge: '',
            spouseName: '',
            spouseAge: '',
            spouseRetirementAge: '',
            incomeGoal: '',
            children: [] // Ensure children is an empty array
        });
        setErrors({});
        setShowChildrenInputs(false);
        setSubmittedData(null);
    };


    const handleCreateProfile = async (e) => {
        e.preventDefault();
        console.log("Submitting profile...");

        if (!validateForm()) {
            console.log("Validation failed:", errors);
            return;
        }

        setLoading(true);

        try {
            console.log("Sending data:", profileData);
            toast.success('Profile created successfully!');

            setTimeout(() => {
                setProfileData({
                    name: '',
                    age: '',
                    retirementAge: '',
                    spouseName: '',
                    spouseAge: '',
                    spouseRetirementAge: '',
                    incomeGoal: '',
                    children: [] // Ensure children is reset properly
                });
                setErrors({});
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error submitting:", error);
            toast.error('Error submitting data.');
        } finally {
            setLoading(false);
        }
    };

    const removeChild = (index) => {
        setProfileData((prevData) => ({
            ...prevData,
            children: prevData.children.filter((_, i) => i !== index)
        }));

        if (profileData.children.length === 1) {
            setShowChildrenInputs(false);
        }
    };

    return (
        <React.Fragment>
            <div className=" ">
                <ToastContainer />
                <Container fluid>
                    <Row>
                        <Col>


                            <form onSubmit={handleCreateProfile} className='mb-3'>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input type="text" name="name" value={profileData.name} onChange={handleChange} invalid={!!errors.name} />
                                            <FormFeedback>{errors.name}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Age</Label>
                                            <Input type="text" name="age" value={profileData.age} onChange={handleChange} invalid={!!errors.age} />
                                            <FormFeedback>{errors.age}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Retirement Age</Label>
                                            <Input type="text" name="retirementAge" value={profileData.retirementAge} onChange={handleChange} invalid={!!errors.retirementAge} />
                                            <FormFeedback>{errors.retirementAge}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="spouseName">Spouse Name</Label>
                                            <Input type="text" name="spouseName" value={profileData.spouseName} onChange={handleChange} invalid={!!errors.spouseName} />
                                            <FormFeedback>{errors.spouseName}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="spouseAge">Spouse Age</Label>
                                            <Input type="text" name="spouseAge" value={profileData.spouseAge} onChange={handleChange} invalid={!!errors.spouseAge} />
                                            <FormFeedback>{errors.spouseAge}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="spouseRetirementAge">Spouse Retirement Age</Label>
                                            <Input type="text" name="spouseRetirementAge" value={profileData.spouseRetirementAge} onChange={handleChange} invalid={!!errors.spouseRetirementAge} />
                                            <FormFeedback>{errors.spouseRetirementAge}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Income Goal</Label>
                                            <Input type="text" name="incomeGoal" value={profileData.incomeGoal} onChange={handleChange} invalid={!!errors.incomeGoal} />
                                            <FormFeedback>{errors.incomeGoal}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <hr />
                                    <Col md={6}>
                                        <h2 className="card-title  flex-grow-1 mb-2">Children Details </h2>
                                        <Button color="success" type="button" onClick={addChild} className="mb-3">
                                            <IoAddCircleSharp />  Add
                                        </Button>
                                    </Col>


                                </Row>

                                {/* {showChildrenInputs && profileData.children.map((child, index) => (
                                            <Row key={index}>
                                                <Col md={4}>
                                                    <FormGroup>
                                                        <Label>Child Name</Label>
                                                        <Input type="text" value={child.name} onChange={(e) => handleChildChange(index, 'name', e.target.value)} invalid={!!errors[`child_${index}_name`]} />
                                                        <FormFeedback>{errors[`child_${index}_name`]}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <FormGroup>
                                                        <Label>Child Age</Label>
                                                        <Input type="text" value={child.age} onChange={(e) => handleChildChange(index, 'age', e.target.value)} invalid={!!errors[`child_${index}_age`]} />
                                                        <FormFeedback>{errors[`child_${index}_age`]}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ))} */}
                                {showChildrenInputs && profileData.children.map((child, index) => (
                                    <Row key={index} className="align-items-center">
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Child Name</Label>
                                                <Input
                                                    type="text"
                                                    value={child.name}
                                                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                                                    invalid={!!errors[`child_${index}_name`]}
                                                />
                                                <FormFeedback>{errors[`child_${index}_name`]}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Child Age</Label>
                                                <Input
                                                    type="text"
                                                    value={child.age}
                                                    onChange={(e) => handleChildChange(index, 'age', e.target.value)}
                                                    invalid={!!errors[`child_${index}_age`]}
                                                />
                                                <FormFeedback>{errors[`child_${index}_age`]}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2} className='d-flex justify-content-center'>
                                            <div> <Button color="danger" onClick={() => removeChild(index)}>Remove</Button></div>
                                        </Col>
                                    </Row>
                                ))}
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

export default CreateProfile;
