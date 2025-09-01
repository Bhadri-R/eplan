import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  CardHeader,
  Form,
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
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor - Before:", response.data);
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    _401k_balance: "",
    _401k_contributions: "",
    _401k_opt_in_age: "",
    _401k_rate_of_return: "",
    _401k_withdrawal_rate: "",
    _401k_inflation: "",
    _401k_cola: "",
    _401k_tax_rate: "",
    _401k_rmd_rate: "",
    _401k_rmd_age: "",
    _401k_flat_rate: "",
    _401k_flat_rate_age: "",
    _401k_bonus: "",
    _401k_lump_sum: "",
    _401k_lump_sum_age: "",
    roth_balance: "",
    roth_contributions: "",
    roth_opt_in_age: "",
    roth_rate_of_return: "",
    roth_withdrawal_rate: "",
    roth_inflation: "",
    roth_cola: "",
    roth_tax_rate: "",
    roth_rmd_rate: "",
    roth_rmd_age: "",
    roth_flat_rate: "",
    roth_flat_rate_age: "",
    roth_bonus: "",
    roth_lump_sum: "",
    roth_lump_sum_age: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = `${BASE_URL}/api/default/default-parameters/`;

  useEffect(() => {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    console.log("Auth User:", authUser);
    if (!authUser || !authUser.accessToken || authUser.role !== "Admin") {
      navigate("/login");
    } else if (authUser && authUser.accessToken) {
      fetchDefaultParameters();
    }
  }, [navigate]);

  const fetchDefaultParameters = async () => {
    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      console.log("Fetching with token:", authUser.accessToken);
      const response = await axiosInstance.get(`${API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        validateStatus: false,
        timeout: 10000,
        maxRedirects: 5,
        responseType: "json",
      });
      console.log("Raw Response:", response);
      if (!response) {
        throw new Error(
          "No response received from server (request failed to complete)"
        );
      }
      let responseData = response.data;
      console.log("Initial Response Data:", responseData);
      if (typeof responseData === "undefined" && response.status === 200) {
        try {
          responseData = JSON.parse(response.config.data || "{}");
          console.log("Parsed Response Data from Config:", responseData);
        } catch (parseError) {
          responseData = response.data;
          console.log("Failed to parse, using original data:", responseData);
        }
      }
      if (typeof responseData === "undefined") {
        throw new Error("Server returned no data (response data is undefined)");
      }
      console.log("Processed Response Data:", responseData);

      if (
        response.status >= 200 &&
        response.status < 300 &&
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData)
      ) {
        let data = responseData.default_parameters;
        if (!data) {
          throw new Error("default_parameters not found in response");
        }
        setFormData({
          _401k_balance: data._401k_balance || "",
          _401k_contributions: data._401k_contributions || "",
          _401k_opt_in_age: data._401k_opt_in_age || "",
          _401k_rate_of_return: data._401k_rate_of_return || "",
          _401k_withdrawal_rate: data._401k_withdrawal_rate || "",
          _401k_inflation: data._401k_inflation || "",
          _401k_cola: data._401k_cola || "",
          _401k_tax_rate: data._401k_tax_rate || "",
          _401k_rmd_rate: data._401k_rmd_rate || "",
          _401k_rmd_age: data._401k_rmd_age || "",
          _401k_flat_rate: data._401k_flat_rate || "",
          _401k_flat_rate_age: data._401k_flat_rate_age || "",
          _401k_bonus: data._401k_bonus || "",
          _401k_lump_sum: data._401k_lump_sum || "",
          _401k_lump_sum_age: data._401k_lump_sum_age || "",
          roth_balance: data.roth_balance || "",
          roth_contributions: data.roth_contributions || "",
          roth_opt_in_age: data.roth_opt_in_age || "",
          roth_rate_of_return: data.roth_rate_of_return || "",
          roth_withdrawal_rate: data.roth_withdrawal_rate || "",
          roth_inflation: data.roth_inflation || "",
          roth_cola: data.roth_cola || "",
          roth_tax_rate: data.roth_tax_rate || "",
          roth_rmd_rate: data.roth_rmd_rate || "",
          roth_rmd_age: data.roth_rmd_age || "",
          roth_flat_rate: data.roth_flat_rate || "",
          roth_flat_rate_age: data.roth_flat_rate_age || "",
          roth_bonus: data.roth_bonus || "",
          roth_lump_sum: data.roth_lump_sum || "",
          roth_lump_sum_age: data.roth_lump_sum_age || "",
        });
        console.log("Fetch Success - Processed Data:", data);
      } else {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Fetch Error:", {
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: error.config,
        request: error.request,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}`,
        {
          _401k_balance: formData._401k_balance || null,
          roth_balance: formData.roth_balance || null,
          _401k_contributions: formData._401k_contributions || null,
          roth_contributions: formData.roth_contributions || null,
          _401k_opt_in_age: formData._401k_opt_in_age || null,
          roth_opt_in_age: formData.roth_opt_in_age || null,
          _401k_rate_of_return: formData._401k_rate_of_return || null,
          roth_rate_of_return: formData.roth_rate_of_return || null,
          _401k_withdrawal_rate: formData._401k_withdrawal_rate || null,
          roth_withdrawal_rate: formData.roth_withdrawal_rate || null,
          _401k_inflation: formData._401k_inflation || null,
          roth_inflation: formData.roth_inflation || null,
          _401k_cola: formData._401k_cola || null,
          roth_cola: formData.roth_cola || null,
          _401k_tax_rate: formData._401k_tax_rate || null,
          roth_tax_rate: formData.roth_tax_rate || null,
          _401k_rmd_rate: formData._401k_rmd_rate || null,
          roth_rmd_rate: formData.roth_rmd_rate || null,
          _401k_rmd_age: formData._401k_rmd_age || null,
          roth_rmd_age: formData.roth_rmd_age || null,
          _401k_flat_rate: formData._401k_flat_rate || null,
          roth_flat_rate: formData.roth_flat_rate || null,
          _401k_flat_rate_age: formData._401k_flat_rate_age || null,
          roth_flat_rate_age: formData.roth_flat_rate_age || null,
          _401k_bonus: formData._401k_bonus || null,
          roth_bonus: formData.roth_bonus || null,
          _401k_lump_sum: formData._401k_lump_sum || null,
          roth_lump_sum: formData.roth_lump_sum || null,
          _401k_lump_sum_age: formData._401k_lump_sum_age || null,
          roth_lump_sum_age: formData.roth_lump_sum_age || null,
          // Include created_at and updated_at if your API expects them
          // created_at: formData.created_at || null,
          // updated_at: formData.updated_at || null,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          response.message || "Default parameters updated successfully!"
        );
      } else {
        toast.error(response.message );
      }
    } catch (error) {
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card className="p-0 pb-2">
                <CardHeader>
                  <Row>
                    <Col md={6} className="d-flex align-items-center">
                      <h4 className="mb-0">Default Parameter</h4>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Balance ($)</Label>
                          <Input
                            type="number"
                            name="_401k_balance"
                            value={formData._401k_balance}
                            onChange={handleChange}
                            invalid={!!errors._401k_balance}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_balance}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Contributions ($)</Label>
                          <Input
                            type="number"
                            name="_401k_contributions"
                            value={formData._401k_contributions}
                            onChange={handleChange}
                            invalid={!!errors._401k_contributions}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors._401k_contributions}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Opt-In Age</Label>
                          <Input
                            type="number"
                            name="_401k_opt_in_age"
                            value={formData._401k_opt_in_age}
                            onChange={handleChange}
                            invalid={!!errors._401k_opt_in_age}
                            min="0"
                          />
                          <FormFeedback>{errors._401k_opt_in_age}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Rate of Return (%)</Label>
                          <Input
                            type="number"
                            name="_401k_rate_of_return"
                            value={formData._401k_rate_of_return}
                            onChange={handleChange}
                            invalid={!!errors._401k_rate_of_return}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors._401k_rate_of_return}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Withdrawal Rate (%)</Label>
                          <Input
                            type="number"
                            name="_401k_withdrawal_rate"
                            value={formData._401k_withdrawal_rate}
                            onChange={handleChange}
                            invalid={!!errors._401k_withdrawal_rate}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors._401k_withdrawal_rate}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Inflation (%)</Label>
                          <Input
                            type="number"
                            name="_401k_inflation"
                            value={formData._401k_inflation}
                            onChange={handleChange}
                            invalid={!!errors._401k_inflation}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_inflation}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K COLA (%)</Label>
                          <Input
                            type="number"
                            name="_401k_cola"
                            value={formData._401k_cola}
                            onChange={handleChange}
                            invalid={!!errors._401k_cola}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_cola}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Tax Rate (%)</Label>
                          <Input
                            type="number"
                            name="_401k_tax_rate"
                            value={formData._401k_tax_rate}
                            onChange={handleChange}
                            invalid={!!errors._401k_tax_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_tax_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K RMD Rate (%)</Label>
                          <Input
                            type="number"
                            name="_401k_rmd_rate"
                            value={formData._401k_rmd_rate}
                            onChange={handleChange}
                            invalid={!!errors._401k_rmd_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_rmd_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K RMD Age</Label>
                          <Input
                            type="number"
                            name="_401k_rmd_age"
                            value={formData._401k_rmd_age}
                            onChange={handleChange}
                            invalid={!!errors._401k_rmd_age}
                            min="0"
                          />
                          <FormFeedback>{errors._401k_rmd_age}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Flat Rate ($)</Label>
                          <Input
                            type="number"
                            name="_401k_flat_rate"
                            value={formData._401k_flat_rate}
                            onChange={handleChange}
                            invalid={!!errors._401k_flat_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_flat_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Flat Rate Age</Label>
                          <Input
                            type="number"
                            name="_401k_flat_rate_age"
                            value={formData._401k_flat_rate_age}
                            onChange={handleChange}
                            invalid={!!errors._401k_flat_rate_age}
                            min="0"
                          />
                          <FormFeedback>
                            {errors._401k_flat_rate_age}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Bonus ($)</Label>
                          <Input
                            type="number"
                            name="_401k_bonus"
                            value={formData._401k_bonus}
                            onChange={handleChange}
                            invalid={!!errors._401k_bonus}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_bonus}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Lump Sum ($)</Label>
                          <Input
                            type="number"
                            name="_401k_lump_sum"
                            value={formData._401k_lump_sum}
                            onChange={handleChange}
                            invalid={!!errors._401k_lump_sum}
                            step="0.01"
                          />
                          <FormFeedback>{errors._401k_lump_sum}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>401K Lump Sum Age</Label>
                          <Input
                            type="number"
                            name="_401k_lump_sum_age"
                            value={formData._401k_lump_sum_age}
                            onChange={handleChange}
                            invalid={!!errors._401k_lump_sum_age}
                            min="0"
                          />
                          <FormFeedback>
                            {errors._401k_lump_sum_age}
                          </FormFeedback>
                        </FormGroup>
                      </Col>

                      {/* Roth Fields */}
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Balance ($)</Label>
                          <Input
                            type="number"
                            name="roth_balance"
                            value={formData.roth_balance}
                            onChange={handleChange}
                            invalid={!!errors.roth_balance}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_balance}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Contributions ($)</Label>
                          <Input
                            type="number"
                            name="roth_contributions"
                            value={formData.roth_contributions}
                            onChange={handleChange}
                            invalid={!!errors.roth_contributions}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors.roth_contributions}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Opt-In Age</Label>
                          <Input
                            type="number"
                            name="roth_opt_in_age"
                            value={formData.roth_opt_in_age}
                            onChange={handleChange}
                            invalid={!!errors.roth_opt_in_age}
                            min="0"
                          />
                          <FormFeedback>{errors.roth_opt_in_age}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Rate of Return (%)</Label>
                          <Input
                            type="number"
                            name="roth_rate_of_return"
                            value={formData.roth_rate_of_return}
                            onChange={handleChange}
                            invalid={!!errors.roth_rate_of_return}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors.roth_rate_of_return}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Withdrawal Rate (%)</Label>
                          <Input
                            type="number"
                            name="roth_withdrawal_rate"
                            value={formData.roth_withdrawal_rate}
                            onChange={handleChange}
                            invalid={!!errors.roth_withdrawal_rate}
                            step="0.01"
                          />
                          <FormFeedback>
                            {errors.roth_withdrawal_rate}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Inflation (%)</Label>
                          <Input
                            type="number"
                            name="roth_inflation"
                            value={formData.roth_inflation}
                            onChange={handleChange}
                            invalid={!!errors.roth_inflation}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_inflation}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth COLA (%)</Label>
                          <Input
                            type="number"
                            name="roth_cola"
                            value={formData.roth_cola}
                            onChange={handleChange}
                            invalid={!!errors.roth_cola}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_cola}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Tax Rate (%)</Label>
                          <Input
                            type="number"
                            name="roth_tax_rate"
                            value={formData.roth_tax_rate}
                            onChange={handleChange}
                            invalid={!!errors.roth_tax_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_tax_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth RMD Rate (%)</Label>
                          <Input
                            type="number"
                            name="roth_rmd_rate"
                            value={formData.roth_rmd_rate}
                            onChange={handleChange}
                            invalid={!!errors.roth_rmd_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_rmd_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth RMD Age</Label>
                          <Input
                            type="number"
                            name="roth_rmd_age"
                            value={formData.roth_rmd_age}
                            onChange={handleChange}
                            invalid={!!errors.roth_rmd_age}
                            min="0"
                          />
                          <FormFeedback>{errors.roth_rmd_age}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Flat Rate ($)</Label>
                          <Input
                            type="number"
                            name="roth_flat_rate"
                            value={formData.roth_flat_rate}
                            onChange={handleChange}
                            invalid={!!errors.roth_flat_rate}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_flat_rate}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Flat Rate Age</Label>
                          <Input
                            type="number"
                            name="roth_flat_rate_age"
                            value={formData.roth_flat_rate_age}
                            onChange={handleChange}
                            invalid={!!errors.roth_flat_rate_age}
                            min="0"
                          />
                          <FormFeedback>
                            {errors.roth_flat_rate_age}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Bonus ($)</Label>
                          <Input
                            type="number"
                            name="roth_bonus"
                            value={formData.roth_bonus}
                            onChange={handleChange}
                            invalid={!!errors.roth_bonus}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_bonus}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Lump Sum ($)</Label>
                          <Input
                            type="number"
                            name="roth_lump_sum"
                            value={formData.roth_lump_sum}
                            onChange={handleChange}
                            invalid={!!errors.roth_lump_sum}
                            step="0.01"
                          />
                          <FormFeedback>{errors.roth_lump_sum}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Roth Lump Sum Age</Label>
                          <Input
                            type="number"
                            name="roth_lump_sum_age"
                            value={formData.roth_lump_sum_age}
                            onChange={handleChange}
                            invalid={!!errors.roth_lump_sum_age}
                            min="0"
                          />
                          <FormFeedback>
                            {errors.roth_lump_sum_age}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      {/* <Button
                                                type="submit"
                                                name="PUT"
                                                color="primary"
                                                disabled={loading}
                                            >
                                                {loading ? "Updating..." : "Update"}
                                            </Button> */}
                      <Button
                        type="submit"
                        name="POST"
                        color="success"
                        className="ms-2"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update"}
                      </Button>
                    </div>
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
