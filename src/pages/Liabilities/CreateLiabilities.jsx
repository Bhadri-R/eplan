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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Createliabilities = ({ fetchLiabilitiesData }) => {
  const [clients, setClients] = useState([]);
  const API_URL = `${BASE_URL}/api/myprofile/source/`;
  const [loadingClient, setLoadingClient] = useState(false);

  const [liabilitiesDetails, setLiabilitiesDetails] = useState([
    {
      source: "",
      type: "",
      account: "",
      monthlyPayment: "",
      currentBalance: "",
      interestRate: "", // New field added
      description: "",
    },
  ]);
  const [errors, setErrors] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoadingClient(true);

    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/myprofile/source/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Full API Response:", response);

      if (response.data) {
        const { clientName, spouseName } = response.data;
        const data = [clientName, spouseName].filter(Boolean);
        setClients(data);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      toast.error(error.response?.message || "Error fetching clients.");
    } finally {
      setLoadingClient(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRemoveIncome = (index) => {
    const newLiabilitiesDetails = [...liabilitiesDetails];
    newLiabilitiesDetails.splice(index, 1);
    setLiabilitiesDetails(newLiabilitiesDetails);

    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  const validateField = (name, value) => {
    let error = "";

    const patterns = {
      source: /.+/,
      type: /.+/,
      account: /^.*$/,
      monthlyPayment: /^[0-9]+(\.[0-9]+)?$/,
      currentBalance: /^[0-9]+(\.[0-9]+)?$/,
      interestRate: /^[0-9]+(\.[0-9]+)?$/, // Pattern for interest rate (numbers with optional decimals)
    };

    if (!value) {
      error = `${name.replace(/([A-Z])/g, " $1").trim()} is required.`;
    } else if (patterns[name] && !patterns[name].test(value)) {
      switch (name) {
        case "account":
          error = "Enter a valid account (3-20 characters allowed).";
          break;
        case "monthlyPayment":
          error = "Enter a valid payment amount (only numbers allowed).";
          break;
        case "currentBalance":
          error = "Enter a valid balance (only numbers allowed).";
          break;
        case "interestRate":
          error = "Enter a valid interest rate (only numbers allowed).";
          break;
        default:
          error = `Invalid input for ${name.replace(/([A-Z])/g, " $1").trim()}.`;
          break;
      }
    }

    return error;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newLiabilitiesDetails = [...liabilitiesDetails];
    newLiabilitiesDetails[index][name] = value;
    setLiabilitiesDetails(newLiabilitiesDetails);

    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: validateField(name, value),
    };
    setErrors(newErrors);
  };

  const validateClientName = (value) => {
    if (!value) return "Client name is required";
    return "";
  };

  const validateType = (value) => {
    if (!value) return "Type is required";
    return "";
  };

  const validateAccountName = (value) => {
    if (!value) return "Account name is required";
    return "";
  };

  const validateMonthlyPayment = (value) => {
    if (!value) return "Monthly Payment is required";
    if (isNaN(value)) return "Monthly Payment must be a number";
    return "";
  };

  const validateCurrentBalance = (value) => {
    if (!value) return "Current balance is required";
    if (isNaN(value)) return "Current balance must be a number";
    return "";
  };

  const validateInterestRate = (value) => {
    if (!value) return "Interest rate is required";
    if (isNaN(value)) return "Interest rate must be a number";
    if (parseFloat(value) < 0) return "Interest rate cannot be negative";
    return "";
  };

  const validateForm = () => {
    let isValid = true;

    const newErrors = liabilitiesDetails.map((detail) => {
      const detailErrors = {};

      detailErrors.source = validateClientName(detail.source);
      detailErrors.type = validateType(detail.type);
      detailErrors.account = validateAccountName(detail.account);
      detailErrors.monthlyPayment = validateMonthlyPayment(detail.monthlyPayment);
      detailErrors.currentBalance = validateCurrentBalance(detail.currentBalance);
      detailErrors.interestRate = validateInterestRate(detail.interestRate); // Validation for new field

      if (
        detailErrors.source ||
        detailErrors.type ||
        detailErrors.account ||
        detailErrors.monthlyPayment ||
        detailErrors.currentBalance ||
        detailErrors.interestRate
      ) {
        isValid = false;
      }

      return detailErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateliabilities = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    setLoading(true);

    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        toast.dismiss();
        setLoading(false);
        return;
      }

      console.log("Sending liabilities data:", liabilitiesDetails);

      const response = await axios.post(
        `${BASE_URL}/api/liability/liability/`,
        liabilitiesDetails,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Response Data:", response);

      toast.dismiss();
      const successMessage = response.message || "Liability details created successfully!";
      toast.success(successMessage, { toastId: "liability-success" });

      if (fetchLiabilitiesData) {
        fetchLiabilitiesData();
      }

      setLiabilitiesDetails([
        {
          source: "",
          type: "",
          account: "",
          monthlyPayment: "",
          currentBalance: "",
          interestRate: "", // Reset new field
          description: "",
        },
      ]);
      setErrors([{}]);
    } catch (error) {
      console.error("Error creating liability:", error);
      const errorMessage = error.response?.message || "Error creating liability.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLiabilitiesDetails([
      {
        source: "",
        type: "",
        account: "",
        monthlyPayment: "",
        currentBalance: "",
        interestRate: "", // Reset new field
        description: "",
      },
    ]);
    setErrors([{}]);
  };

  const handleAddLiabilities = () => {
    setLiabilitiesDetails([
      ...liabilitiesDetails,
      {
        source: "",
        type: "",
        account: "",
        monthlyPayment: "",
        currentBalance: "",
        interestRate: "", // Add new field to new entries
        description: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  return (
    <Card className="p-0 pb-2">
      <CardHeader className=" ">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <h4 className="mb-0">Create Liabilities</h4>
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <button className="btn btn-primary btn-sm">
              <Link to="/create-assets" className="text-white">
                Next
              </Link>
            </button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleCreateliabilities} className="mb-3">
          {liabilitiesDetails.map((detail, index) => (
            <Row key={index}>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Client Name<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="select"
                    name="source"
                    value={detail.source}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.source}
                    disabled={loadingClient}
                  >
                    <option value="" disabled>
                      {loadingClient ? "Loading clients..." : "Select"}
                    </option>
                    {!loadingClient && clients.length > 0
                      ? clients.map((client, clientIndex) => (
                          <option key={clientIndex} value={client}>
                            {client}
                          </option>
                        ))
                      : !loadingClient && (
                          <option disabled>No clients available</option>
                        )}
                  </Input>
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.source}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Type<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="select"
                    name="type"
                    value={detail.type}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.type}
                  >
                    <option value="">Select Type</option>
                    <option value="Loan">Loan</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Credit Card Dept">Credit Card Dept</option>
                    <option value="Other">Other</option>
                  </Input>
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.type}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Account Name<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="text"
                    name="account"
                    value={detail.account}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.account}
                  />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.account}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Monthly Payment<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="text"
                    name="monthlyPayment"
                    value={detail.monthlyPayment}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.monthlyPayment}
                  />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.monthlyPayment}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Current Balance<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="text"
                    name="currentBalance"
                    value={detail.currentBalance}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.currentBalance}
                  />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.currentBalance}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Interest Rate (%)<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    type="text"
                    name="interestRate"
                    value={detail.interestRate}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.interestRate}
                  />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.interestRate}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={detail.description}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.description}
                  />
                </FormGroup>
              </Col>
              {index > 0 && (
                <Col md={1} className="d-flex align-items-end">
                  <Button
                    type="button"
                    color="danger"
                    onClick={() => handleRemoveIncome(index)}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
          ))}

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button
                type="button"
                color="success"
                onClick={handleAddLiabilities}
                className="me-3"
              >
                Add More Liabilities
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
              <Button
                type="reset"
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
  );
};

export default Createliabilities;