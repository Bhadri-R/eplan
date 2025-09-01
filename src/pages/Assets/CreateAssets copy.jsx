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
import AssetsTable from "./AssetsTable";
import { BASE_URL } from "../../utils/config";
const CreateAsset = ({ fetchAssetsData }) => {
  const [assetData, setAssetData] = useState([
    {
      source: "",
      type: "",
      account: "",
      risk: "",
      currentBalance: "",
      contribution: "",
    },
  ]);

  const [errors, setErrors] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState([]);
  const API_URL = `${BASE_URL}/api/myprofile/source/`;
  const [loadingClient, setLoadingClient] = useState(false);
  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name.replace(/([A-Z])/g, " $1").trim()} is required.`;
    }
    return error;
  };

  const fetchClients = async () => {
    setLoadingClient(true); // ✅ Start loading

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

      console.log("Full API Response:", response); // Debugging

      // ✅ Correctly extract data from `response.data`
      if (response.data) {
        const { clientName, spouseName } = response.data;
        const data = [clientName, spouseName].filter(Boolean); // Remove empty values
        setClients(data); // ✅ Set fetched data correctly
      } else {
        setClients([]); // ✅ Set empty array if no data
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      toast.error(error.response?.message);
    } finally {
      setLoadingClient(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRemoveAssets = (index) => {
    const newAssetData = [...assetData];
    newAssetData.splice(index, 1);
    setAssetData(newAssetData); // ✅ Correct state update

    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  const typeRiskMapping = {
    "401k": "Wall Street",
    "403b": "Wall Street",
    Stocks: "Wall Street",
    "ePlan Pension": "Protected",
    "Checking Account": "Bank",
    "Savings Account": "Bank",
    ROTH: "Protected",
    Bonds: "Protected",
    Other: "Protected",
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    // Map the type to risk if applicable
    const riskValue =
      name === "type" ? typeRiskMapping[value] || "" : assetData[index].risk;

    // Copy the existing state
    const newAssetData = [...assetData];

    // Update the specific asset
    newAssetData[index] = {
      ...newAssetData[index],
      [name]: value,
      risk: riskValue, // Auto-update risk if type changes
    };

    setAssetData(newAssetData);

    // Validate input field
    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: validateField(name, value),
    };

    setErrors(newErrors);
  };

  const handleAddAssets = () => {
    setAssetData([
      ...assetData,
      {
        source: "",
        type: "",
        account: "",
        risk: "",
        currentBalance: "",
        contribution: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const validateForm = () => {
    let isValid = true; // ✅ Define isValid at the beginning

    const newErrors = assetData.map((detail, index) => {
      const detailErrors = {};
      Object.keys(detail).forEach((key) => {
        const error = validateField(key, detail[key], index);
        if (error) {
          detailErrors[key] = error;
          isValid = false; // Set isValid to false if any error exists
        }
      });
      return detailErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleReset = () => {
    setAssetData([
      {
        source: "",
        type: "",
        account: "",
        risk: "",
        currentBalance: "",
        contribution: "",
      },
    ]);
    setErrors([{}]); // Keep it as an array of objects
  };

  const handleCreateAsset = async (e) => {
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
        setLoading(false);
        return;
      }

      console.log("Sending assets data:", assetData);

      const response = await axios.post(
        `${BASE_URL}/api/assets/assets/`,
        assetData,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Full API Response:", response);

      // ✅ Extract message directly from response (handling plain responses)
      const successMessage =
        response.data?.message ||
        response.message ||
        "Asset created successfully!";
      toast.success(successMessage);

      // ✅ Success aana odane fetchAssetsData() call panna
      if (fetchAssetsData) {
        fetchAssetsData();
      }
      // Reset form fields after successful creation
      setAssetData([
        {
          source: "",
          type: "",
          account: "",
          risk: "",
          currentBalance: "",
          contribution: "",
        },
      ]);
      setErrors([{}]);
    } catch (error) {
      console.error("Error submitting asset data:", error);

      // ✅ Handle cases where API sends message directly in the response
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-0 pb-2">
      <CardHeader className=" ">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            {" "}
            <h4 className="mb-0">Create Assets</h4>
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            {" "}
            <button className="btn btn-primary btn-sm ">
              {" "}
              <Link to="/networth" className="text-white">
                {" "}
                Next{" "}
              </Link>
            </button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleCreateAsset} className="mb-3">
          {assetData.map((detail, index) => (
            <Row key={index}>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Client Name<span class="text-danger"> *</span>{" "}
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
                    Type<span class="text-danger"> *</span>{" "}
                  </Label>
                  <Input
                    type="select"
                    name="type"
                    value={detail.type}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.type}
                  >
                    <option value="">Select Type</option>
                    <option value="401k">401k</option>
                    <option value="403b">403b</option>
                    <option value="Stocks">Stocks</option>
                    <option value="ePlan Pension">ePlan Pension</option>
                    <option value="Checking Account">Checking Account</option>
                    <option value="Savings Account">Savings Account</option>
                    <option value="ROTH">ROTH</option>
                    <option value="Bonds">Bonds</option>
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
                    Account Name<span class="text-danger"> *</span>{" "}
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
                    Risk<span class="text-danger"> *</span>{" "}
                  </Label>
                  <Input type="text" name="risk" value={detail.risk} readOnly />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.risk}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>
                    Current Balance<span class="text-danger"> *</span>{" "}
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
                    Contribution<span class="text-danger"> *</span>{" "}
                  </Label>
                  <Input
                    type="text"
                    name="contribution"
                    value={detail.contribution}
                    onChange={(e) => handleChange(e, index)}
                    invalid={!!errors[index]?.contribution}
                  />
                  <FormFeedback className="text-capitalize">
                    {errors[index]?.contribution}
                  </FormFeedback>
                </FormGroup>
              </Col>
              {index > 0 && (
                <Col md={1} className="d-flex align-items-end">
                  <Button
                    type="button"
                    color="danger"
                    onClick={() => handleRemoveAssets(index)}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
          ))}

          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                type="button"
                color="success"
                onClick={handleAddAssets}
                className="me-3"
              >
                Add More Assets
              </Button>
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
  );
};

export default CreateAsset;
