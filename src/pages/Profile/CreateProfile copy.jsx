import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  CardHeader,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const CreateProfile = () => {
  const [spouseErrors, setSpouseErrors] = useState({});
  const [profileData, setProfileData] = useState({
    clientName: "",
    clientAge: "",
    clientRetirementAge: "",
    clientMobile: "",
    spouseName: "",
    spouseAge: "",
    spouseRetirementAge: "",
    spouseMobile: "",
    clientEmail: "",
    spouseEmail: "",
    children: "",
  });
  const [profileId, setProfileId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showChildrenInputs, setShowChildrenInputs] = useState(false);

  const API_URL = `${BASE_URL}/api/myprofile/profile/`;

  const handleReset = () => {
    setProfileData({
      clientName: "",
      clientAge: "",
      clientRetirementAge: "",
      clientMobile: "",
      spouseName: "",
      spouseAge: "",
      spouseRetirementAge: "",
      spouseMobile: "",
      clientEmail: "",
      spouseEmail: "",
      children: "",
    });
    setErrors({});
    setSpouseErrors({});
    setShowChildrenInputs(false);
    setProfileId(null);
  };

  const validateField = (name, value, isRequired = false) => {
    let error = "";
    const regexPatterns = {
      clientName: /^[A-Za-z ]{3,50}$/,
      clientAge: /^\d{1,3}$/,
      clientRetirementAge: /^\d{1,3}$/,
      clientMobile: /^\d{10}$/,
      spouseName: /^[A-Za-z ]{3,50}$/,
      spouseAge: /^\d{1,3}$/,
      clientEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      spouseEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      spouseRetirementAge: /^\d{1,3}$/,
      spouseMobile: /^\d{10}$/,
    };

    if (isRequired && !value) {
      error = `${name.replace(/([A-Z])/g, " $1").trim()} is required.`;
    } else if (value && regexPatterns[name] && !regexPatterns[name].test(value)) {
      error = `Invalid ${name.replace(/([A-Z])/g, " $1").trim()} format.`;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const spouseFields = [
      "spouseName",
      "spouseAge",
      "spouseRetirementAge",
      "spouseMobile",
      "spouseEmail",
    ];
    const clientFields = [
      "clientName",
      "clientAge",
      "clientRetirementAge",
      "clientMobile",
      "clientEmail",
    ];

    setProfileData({ ...profileData, [name]: value });

    if (spouseFields.includes(name)) {
      let error = validateField(name, value, false);
      setSpouseErrors((prev) => ({ ...prev, [name]: error }));
    } else if (clientFields.includes(name)) {
      // Only clientEmail is required
      let error = validateField(name, value, name === "clientEmail");
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = Array.isArray(profileData.children)
      ? [...profileData.children]
      : [];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };

    setProfileData((prevData) => ({
      ...prevData,
      children: updatedChildren,
    }));
  };

  const addChild = () => {
    setShowChildrenInputs(true);
    setProfileData((prevData) => ({
      ...prevData,
      children: Array.isArray(prevData.children)
        ? [...prevData.children, { name: "", age: "" }]
        : [{ name: "", age: "" }],
    }));
  };

  const removeChild = (index) => {
    setProfileData((prevData) => ({
      ...prevData,
      children: prevData.children.filter((_, i) => i !== index),
    }));
    if (profileData.children.length === 1) {
      setShowChildrenInputs(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Only validate clientEmail as required
    const requiredFields = ["clientEmail"];

    requiredFields.forEach((key) => {
      const error = validateField(key, profileData[key], true);
      if (error) newErrors[key] = error;
    });

    // Optional validation for other fields (format only, not required)
    const optionalFields = [
      "clientName",
      "clientAge",
      "clientRetirementAge",
      "clientMobile",
    ];
    optionalFields.forEach((key) => {
      const error = validateField(key, profileData[key], false);
      if (error) newErrors[key] = error;
    });

    if (Array.isArray(profileData.children)) {
      profileData.children.forEach((child, index) => {
        Object.keys(child).forEach((field) => {
          const error = validateField(field, child[field], false);
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchProfileData = async () => {
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        return;
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      const fetchedData = response.data[0] || response.data;

      if (fetchedData && fetchedData.id) {
        setProfileId(fetchedData.id);
        setProfileData({
          ...fetchedData,
          children: fetchedData.children || "",
        });

        if (fetchedData.children && fetchedData.children.length > 0) {
          setShowChildrenInputs(true);
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        toast.error("Authentication failed! Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.put(`${API_URL}${id}/`, profileData, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data?.message || "Profile updated successfully!");
      fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        toast.error("Authentication failed! Please log in again.");
        setLoading(false);
        return;
      }

      if (profileId) {
        await handleUpdate(profileId);
      } else {
        const response = await axios.post(API_URL, profileData, {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        toast.success(response.data?.message || "Profile created successfully!");
        setProfileId(response.data.id);
        fetchProfileData();
      }

      setErrors({});
      setSpouseErrors({});
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardHeader className=" ">
                  <Row>
                    <Col md={6} className="d-flex align-items-center">
                      <h4>Create Profile</h4>
                    </Col>
                    <Col
                      md={6}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <button className="btn btn-primary btn-sm">
                        <Link to="/create-income" className="text-white">
                          Next
                        </Link>
                      </button>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <form onSubmit={handleCreateProfile} className="mb-3">
                    <Row>
                      <Col md={12}>
                        <h2 className="card-title flex-grow-1 mb-3">
                          Client Details
                        </h2>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            type="text"
                            name="clientName"
                            value={profileData.clientName}
                            onChange={handleChange}
                            invalid={!!errors.clientName}
                          />
                          <FormFeedback className="text-capitalize">
                            {errors.clientName}
                          </FormFeedback>
                        </FormGroup>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label>Age</Label>
                          <Input
                            type="text"
                            name="clientAge"
                            value={profileData.clientAge}
                            onChange={handleChange}
                            invalid={!!errors.clientAge}
                          />
                          <FormFeedback className="text-capitalize">
                            {errors.clientAge}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Retirement Age</Label>
                          <Input
                            type="text"
                            name="clientRetirementAge"
                            value={profileData.clientRetirementAge}
                            onChange={handleChange}
                            invalid={!!errors.clientRetirementAge}
                          />
                          <FormFeedback className="text-capitalize">
                            {errors.clientRetirementAge}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <hr />
                      </Col>
                      <Col md={12}>
                        <h2 className="card-title flex-grow-1 mb-3">
                          Contact Details
                        </h2>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label>Mobile Number</Label>
                          <Input
                            type="text"
                            name="clientMobile"
                            value={profileData.clientMobile}
                            onChange={handleChange}
                            invalid={!!errors.clientMobile}
                          />
                          <FormFeedback className="text-capitalize">
                            {errors.clientMobile}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>
                            Email<span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="email"
                            name="clientEmail"
                            value={profileData.clientEmail}
                            onChange={handleChange}
                            invalid={!!errors.clientEmail}
                          />
                          <FormFeedback className="text-capitalize">
                            {errors.clientEmail}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <hr />
                      </Col>
                      <Col md={12}>
                        <h2 className="card-title flex-grow-1 my-3">
                          Spouse Details
                        </h2>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label for="spouseName">Name</Label>
                          <Input
                            type="text"
                            name="spouseName"
                            value={profileData.spouseName}
                            onChange={handleChange}
                            invalid={!!spouseErrors.spouseName}
                          />
                          <FormFeedback className="text-capitalize">
                            {spouseErrors.spouseName}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="spouseAge">Age</Label>
                          <Input
                            type="text"
                            name="spouseAge"
                            value={profileData.spouseAge}
                            onChange={handleChange}
                            invalid={!!spouseErrors.spouseAge}
                          />
                          <FormFeedback className="text-capitalize">
                            {spouseErrors.spouseAge}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="spouseRetirementAge">Retirement Age</Label>
                          <Input
                            type="text"
                            name="spouseRetirementAge"
                            value={profileData.spouseRetirementAge}
                            onChange={handleChange}
                            invalid={!!spouseErrors.spouseRetirementAge}
                          />
                          <FormFeedback className="text-capitalize">
                            {spouseErrors.spouseRetirementAge}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Mobile Number</Label>
                          <Input
                            type="text"
                            name="spouseMobile"
                            value={profileData.spouseMobile}
                            onChange={handleChange}
                            invalid={!!spouseErrors.spouseMobile}
                          />
                          <FormFeedback className="text-capitalize">
                            {spouseErrors.spouseMobile}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="spouseEmail"
                            value={profileData.spouseEmail}
                            onChange={handleChange}
                            invalid={!!spouseErrors.spouseEmail}
                          />
                          <FormFeedback className="text-capitalize">
                            {spouseErrors.spouseEmail}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                      <Col md={12}>
                        <h2 className="card-title flex-grow-1 mb-2">
                          Children Details
                        </h2>
                        <Button
                          color="success"
                          type="button"
                          onClick={addChild}
                          className="mb-3"
                        >
                          <IoAddCircleSharp /> Add
                        </Button>
                      </Col>
                    </Row>

                    {showChildrenInputs &&
                      profileData.children.map((child, index) => (
                        <Row key={index} className="align-items-center">
                          <Col md={4}>
                            <FormGroup>
                              <Label>Child Name</Label>
                              <Input
                                type="text"
                                value={child.name}
                                onChange={(e) =>
                                  handleChildChange(index, "name", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label>Child Age</Label>
                              <Input
                                type="text"
                                value={child.age}
                                onChange={(e) =>
                                  handleChildChange(index, "age", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                          <Col md={2} className="d-flex justify-content-center">
                            <div>
                              <Button
                                color="danger"
                                onClick={() => removeChild(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <Button type="submit" color="primary" disabled={loading}>
                          {loading ? "Submitting..." : "Submit"}
                        </Button>

                        <Button
                          type="button"
                          color="danger"
                          onClick={handleReset}
                          className="ms-3"
                        >
                          Reset All
                        </Button>
                      </Col>
                    </Row>
                  </form>
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