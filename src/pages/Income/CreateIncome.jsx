import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { BASE_URL } from "../../utils/config";

const CreateIncome = ({ fetchIncomeData }) => {
  const [clients, setClients] = useState([]);
  const [loadingClient, setLoadingClient] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Add state to track fetching status
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));

  // Single incomeGoal state (not part of incomeDetails array)
  const [incomeGoal, setIncomeGoal] = useState("");
  const [incomeDetails, setIncomeDetails] = useState([
    {
      source: "",
      type: "",
      description: "",
      amount: "",
    },
  ]);
  const [errors, setErrors] = useState([{ incomeGoal: "" }]);
  const [loading, setLoading] = useState(false);

  // Fetch clients
  const fetchClients = async () => {
    setLoadingClient(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/myprofile/source/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.data) {
        const { clientName, spouseName } = response.data;
        const data = [clientName, spouseName].filter(Boolean);
        setClients(data);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      toast.error(error.response?.message || "Failed to fetch clients.");
    } finally {
      setLoadingClient(false);
    }
  };

  // Fetch existing income goal
  const fetchIncomeGoal = async () => {
    setIsFetching(true); // Set fetching to true
    try {
      const response = await axios.get(`${BASE_URL}/api/income/income/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Log the entire response object to inspect its structure
      console.log("Full Axios Response:", response);

      // Log response.data to confirm its structure
      console.log("response.data:", response.data);

      // Check if response.data exists and has incomeGoal
      const data = response.data; // Access response.data directly
      if (data && typeof data === "object" && "incomeGoal" in data) {
        console.log("data.incomeGoal:", data.incomeGoal);
        if (data.incomeGoal != null) {
          // Convert the number to a string for the input field
          const goal = data.incomeGoal.toString();
          console.log("Setting incomeGoal to:", goal);
          setIncomeGoal(goal);
        } else {
          console.log("incomeGoal is null or undefined in the response");
          setIncomeGoal("");
        }
      } else {
        // If response.data does not contain incomeGoal, try accessing response directly
        console.log("response.data does not contain incomeGoal, trying response directly:", response);
        if (response && typeof response === "object" && "incomeGoal" in response) {
          console.log("response.incomeGoal:", response.incomeGoal);
          if (response.incomeGoal != null) {
            const goal = response.incomeGoal.toString();
            console.log("Setting incomeGoal to:", goal);
            setIncomeGoal(goal);
          } else {
            console.log("incomeGoal is null or undefined in the response");
            setIncomeGoal("");
          }
        } else {
          console.log("Neither response.data nor response contains incomeGoal:", response);
          setIncomeGoal("");
        }
      }
    } catch (error) {
      console.error("Error fetching income goal:", error);
      toast.error(error.response?.message || "Error fetching income goal.");
      setIncomeGoal("");
    } finally {
      setIsFetching(false); // Set fetching to false
    }
  };

  useEffect(() => {
    fetchClients();
    fetchIncomeGoal(); // Fetch existing income goal on mount
  }, []);

  // Debug the incomeGoal state
  useEffect(() => {
    console.log("incomeGoal state updated:", incomeGoal);
  }, [incomeGoal]);

  // Validate incomeGoal whenever it changes
  useEffect(() => {
    const newErrors = [...errors];
    newErrors[0].incomeGoal = validateIncomeGoal(incomeGoal);
    setErrors(newErrors);
  }, [incomeGoal]);

  const handleRemoveIncome = (index) => {
    const newIncomeDetails = [...incomeDetails];
    newIncomeDetails.splice(index, 1);
    setIncomeDetails(newIncomeDetails);

    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name.replace(/([A-Z])/g, " $1").trim()} is required.`;
    }
    return error;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newIncomeDetails = [...incomeDetails];
    newIncomeDetails[index][name] = value;
    setIncomeDetails(newIncomeDetails);

    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: validateField(name, value),
    };
    setErrors(newErrors);
  };

  const handleIncomeGoalChange = (e) => {
    // Remove all non-numeric characters except dots
    const value = e.target.value.replace(/[^\d.]/g, "");
    setIncomeGoal(value);

    const newErrors = [...errors];
    newErrors[0].incomeGoal = validateIncomeGoal(value);
    setErrors(newErrors);
  };

  // Format the incomeGoal for display
  const formatIncomeGoalForDisplay = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validateSource = (value) => {
    if (!value) return "Source is required.";
    if (!/^[A-Za-z ]{3,50}$/.test(value))
      return "Source must be 3-50 characters long and contain only letters.";
    return "";
  };

  const validateType = (value) => {
    if (!value) return "Type is required.";
    if (!/^[A-Za-z ]{3,30}$/.test(value))
      return "Type must be 3-30 characters long and contain only letters.";
    return "";
  };

  const validateIncomeGoal = (value) => {
    if (!value) return "Income Goal is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(value))
      return "Income Goal must be a valid number.";
    if (parseFloat(value) <= 0) return "Income Goal must be greater than 0.";
    return "";
  };

  const validateAmount = (value) => {
    if (!value) return "Amount is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(value))
      return "Amount must be a valid number.";
    if (parseFloat(value) <= 0) return "Amount must be greater than 0.";
    return "";
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = incomeDetails.map((detail) => ({
      source: validateSource(detail.source),
      type: validateType(detail.type),
      amount: validateAmount(detail.amount),
    }));
    newErrors[0].incomeGoal = validateIncomeGoal(incomeGoal);

    setErrors(newErrors);

    if (newErrors.some((err) => Object.values(err).some((msg) => msg))) {
      isValid = false;
    }

    return isValid;
  };

  const handleCreateIncome = async (e) => {
    e.preventDefault();

    if (isFetching) {
      console.log("Still fetching income goal, please wait...");
      return;
    }

    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    setLoading(true);

    try {
      const payload = incomeDetails.map((detail) => ({
        ...detail,
        incomeGoal: parseFloat(incomeGoal), // Add common incomeGoal to each entry
      }));

      const response = await axios.post(
        `${BASE_URL}/api/income/income/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      toast.success("Income details created successfully!");
      if (fetchIncomeData) {
        fetchIncomeData();
      }

      setIncomeDetails([
        {
          source: "",
          type: "",
          description: "",
          amount: "",
        },
      ]);
      // Keep incomeGoal as is (don’t reset it)
      setErrors([{ incomeGoal: "" }]);
    } catch (error) {
      console.error("Error submitting income data:", error);
      toast.error(error.response?.message || "Failed to create income.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIncomeDetails([
      {
        source: "",
        type: "",
        description: "",
        amount: "",
      },
    ]);
    setIncomeGoal(""); // Reset incomeGoal as well
    setErrors([{ incomeGoal: "" }]);
  };

  const handleAddIncome = () => {
    setIncomeDetails([
      ...incomeDetails,
      {
        source: "",
        type: "",
        description: "",
        amount: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  return (
    <Row>
      <Col>
        <Card className="p-0 pb-2">
          <CardHeader>
            <Row>
              <Col md={6} className="d-flex align-items-center">
                <h4 className="mb-0">Create Income</h4>
              </Col>
              <Col md={6} className="d-flex justify-content-end align-items-center">
                <button className="btn btn-primary btn-sm">
                  <Link to="/create-liabilities" className="text-white">
                    Next
                  </Link>
                </button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleCreateIncome} className="mb-3">
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      Income Goal<span className="text-danger"> *</span>
                    </Label>
                    <Input
                      type="text"
                      name="incomeGoal"
                      value={incomeGoal}
                      onChange={handleIncomeGoalChange}
                      invalid={!!errors[0]?.incomeGoal}
                      placeholder="Enter income goal"
                      disabled={isFetching} // Disable input while fetching
                    />
                    <FormFeedback className="text-capitalize">
                      {errors[0]?.incomeGoal}
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              {incomeDetails.map((detail, index) => (
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
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {clients.length > 0 ? (
                          clients.map((client, clientIndex) => (
                            <option key={clientIndex} value={client}>
                              {client}
                            </option>
                          ))
                        ) : (
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
                        <option value="Salary">Salary</option>
                        <option value="Pension">Pension</option>
                        <option value="ePlan Pension">ePlan Pension</option>
                        <option value="Social Security">Social Security</option>
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
                        Amount<span className="text-danger"> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="amount"
                        value={detail.amount}
                        onChange={(e) => handleChange(e, index)}
                        invalid={!!errors[index]?.amount}
                      />
                      <FormFeedback className="text-capitalize">
                        {errors[index]?.amount}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Income Source Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        value={detail.description}
                        onChange={(e) => handleChange(e, index)}
                        invalid={!!errors[index]?.description}
                        style={{ height: "15px" }}
                      />
                    </FormGroup>
                  </Col>
                  {index > 0 && (
                    <Col md={1} className="d-flex align-items-center">
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => handleRemoveIncome(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                  <Col sm={12}>
                    <hr />
                  </Col>
                </Row>
              ))}
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    type="button"
                    color="success"
                    onClick={handleAddIncome}
                    className="me-3"
                  >
                    Add More Income
                  </Button>
                  <Button type="submit" color="primary" disabled={loading || isFetching}>
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
  );
};

export default CreateIncome;