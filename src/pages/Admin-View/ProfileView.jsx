import React, { useState, useEffect } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_URL } from '../../utils/config'

const ProfileView = () => {

    const { id } = useParams(); // Get the user ID from the URL

    useEffect(() => {
        console.log("User ID:", id); // Print ID in the console
    }, [id]);


    const API_URL = `${BASE_URL}/api/default/default-parameters/ruleof100/?user_id=${id}`;
    const [formData, setFormData] = useState({
        clientDetails: {
            name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
            socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

            balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
            withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
            rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
            bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
            balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',
            balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
            colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
        },

        spouseDetails: {
            name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
            socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

            balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
            withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
            rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
            bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
            balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',

            balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
            colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
        }
    });

    useEffect(() => {
        fetchDefaultParams();
    }, []);

    const fetchDefaultParams = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                toast.error("Authentication failed! Please log in again.");
                return;
            }

            const response = await axios.get(`${BASE_URL}/api/default/default-parameters/ruleof100/?user_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("API Response:", response);
            console.log("API Response Data:", response.data);

            const data = response;
            const defaultParams = data.default_parameters;
            const financialDetails = data.financial_details;

            setFormData((prevData) => ({
                ...prevData,
                clientDetails: {
                    ...prevData.clientDetails,
                    name: financialDetails.Name || "",
                    age: financialDetails.Age || "",
                    retirementAge: financialDetails["Retirement Age"] || "",
                    totalInvestableAssets: financialDetails["Total Investable Assets"] || "",
                    incomeGoal: financialDetails["Income Goal"] || "",
                    year: financialDetails.Year || "",

                    // Income details for client
                    PensionIncome: financialDetails.Income?.clientPension || "",
                    otherIncome: financialDetails.Income?.clientOthers || "",
                    salaryIncome: financialDetails.Income?.clientSalary || "",
                    socIncome: financialDetails.Income?.clientSOC || "",

                    // 401k and Roth details
                    balancefidility401k: defaultParams._401k_balance || "",
                    contributionfidility401k: defaultParams._401k_contributions || "",
                    optinAgefidility401k: defaultParams._401k_opt_in_age || "",
                    rorfidility401k: defaultParams._401k_rate_of_return || "",
                    withdrawnRatefidility401k: defaultParams._401k_withdrawal_rate || "",
                    inflationfidility401k: defaultParams._401k_inflation || "",
                    colafidility401k: defaultParams._401k_cola || "",
                    taxRatefidility401k: defaultParams._401k_tax_rate || "",
                    rmdRatefidility401k: defaultParams._401k_rmd_rate || "",
                    rmdAgefidility401k: defaultParams._401k_rmd_age || "",
                    flatRatefidility401k: defaultParams._401k_flat_rate || "",
                    flatRateAgefidility401k: defaultParams._401k_flat_rate_age || "",
                    bonusfidility401k: defaultParams._401k_bonus || "",
                    balanceLumpSumfidility401k: defaultParams._401k_lump_sum || "",
                    lumpSumfidility401k: defaultParams._401k_lump_sum || "",
                    lumpSumAgefidility401k: defaultParams._401k_lump_sum_age || "",

                    balanceRoth: defaultParams.roth_balance || "",
                    contributionRoth: defaultParams.roth_contributions || "",
                    optinAgeRoth: defaultParams.roth_opt_in_age || "",
                    rorRoth: defaultParams.roth_rate_of_return || "",
                    withdrawnRateRoth: defaultParams.roth_withdrawal_rate || "",
                    inflationRoth: defaultParams.roth_inflation || "",
                    colaRoth: defaultParams.roth_cola || "",
                    taxRateRoth: defaultParams.roth_tax_rate || "",
                    rmdRateRoth: defaultParams.roth_rmd_rate || "",
                    rmdAgeRoth: defaultParams.roth_rmd_age || "",
                    flatRateRoth: defaultParams.roth_flat_rate || "",
                    flatRateAgeRoth: defaultParams.roth_flat_rate_age || "",
                    bonusRoth: defaultParams.roth_bonus || "",
                    lumpSumRoth: defaultParams.roth_lump_sum || "",
                    lumpSumOptInAgeRoth: defaultParams.roth_lump_sum_age || "",
                },

                spouseDetails: {
                    ...prevData.spouseDetails,
                    name: financialDetails["Spouse Name"] || "",
                    age: financialDetails["Spouse Age"] || "",
                    retirementAge: financialDetails["Spouse Retirement Age"] || "",

                    // Income details for spouse
                    PensionIncome: financialDetails.Income?.spousePension || "",
                    otherIncome: financialDetails.Income?.spouseOthers || "",
                    salaryIncome: financialDetails.Income?.spouseSalary || "",
                    socIncome: financialDetails.Income?.spouseSOC || "",
                },
            }));
        } catch (error) {
            console.error("Error fetching default parameters:", error);
            toast.error("Failed to fetch default parameters.");
        }
    };
    // setFormData((prevData) => ({
    //     ...prevData,
    //     clientDetails: {
    //         ...prevData.clientDetails,
    //         balancefidility401k: defaultParams._401k_balance || "",
    //         balanceRoth: defaultParams.roth_balance || "",
    //         contributionfidility401k: defaultParams._401k_contributions || "",
    //     },
    // }));


    useEffect(() => {
        console.log("Fetching default parameters...");
        fetchDefaultParams();
    }, []);
    useEffect(() => {
        console.log("Updated State:", formData);
    }, [formData]);


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Function to validate a single field
    const validateField = (name, value) => {
        return !value.trim() ? `${name.replace(/([A-Z])/g, ' $1').trim()} is required.` : '';
    };

    const handleChange = (e, section) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value
            }
        }));

        // Update validation live
        setErrors((prevErrors) => ({
            ...prevErrors,
            [section]: {
                ...prevErrors[section],
                [name]: validateField(name, value)
            }
        }));
    };


    const validateForm = () => {
        const newErrors = { clientDetails: {}, spouseDetails: {} };

        // Validate client details
        Object.keys(formData.clientDetails).forEach((key) => {
            const error = validateField(key, formData.clientDetails[key]);
            if (error) newErrors.clientDetails[key] = error;
        });

        // Validate spouse details
        Object.keys(formData.spouseDetails).forEach((key) => {
            const error = validateField(key, formData.spouseDetails[key]);
            if (error) newErrors.spouseDetails[key] = error;
        });

        setErrors(newErrors);

        return Object.keys(newErrors.clientDetails).length === 0 && Object.keys(newErrors.spouseDetails).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors before submitting.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            toast.success('Form submitted successfully!');

            setFormData({
                clientDetails: {
                    name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
                    socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

                    balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
                    withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
                    rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
                    bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
                    balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',

                    balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
                    colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
                },

                spouseDetails: {
                    name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
                    socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

                    balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
                    withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
                    rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
                    bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
                    balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',

                    balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
                    colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
                }
            });

            setErrors({});
        }, 1000);
    };

    const handleReset = () => {
        setFormData({
            clientDetails: {
                name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
                socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

                balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
                withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
                rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
                bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
                balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',

                balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
                colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
            },

            spouseDetails: {
                name: '', age: '', retirementAge: '', totalInvestableAssets: '', incomeGoal: '', year: '',
                socIncome: '', otherIncome: '', PensionIncome: '', epension: '', salaryIncome: '',

                balancefidility401k: '', contributionfidility401k: '', optinAgefidility401k: '', rorfidility401k: '',
                withdrawnRatefidility401k: '', inflationfidility401k: '', colafidility401k: '', taxRatefidility401k: '',
                rmdRatefidility401k: '', rmdAgefidility401k: '', rmdAgeRoth: '',
                bonusfidility401k: '', flatRatefidility401k: '', flatRateAgefidility401k: '', flatRateAgeRoth: '',
                balanceLumpSumfidility401k: '', lumpSumfidility401k: '', lumpSumAgefidility401k: '', lumpSumOptInAgeRoth: '',

                balanceRoth: '', contributionRoth: '', optinAgeRoth: '', rorRoth: '', withdrawnRateRoth: '', inflationRoth: '',
                colaRoth: '', taxRateRoth: '', rmdRateRoth: '', bonusRoth: '', flatRateRoth: '', lumpSumRoth: '',
            }
        });
        setErrors({});


    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <Card className="p-0 pb-2">

                                <CardHeader className="align-items-center d-flex">
                                    <Row>
                                        <Col md={12} className='d-flex align-items-center'>  <h4 className="mb-0">Client Details </h4></Col>

                                    </Row>
                                </CardHeader>

                                <CardBody>

                                    <form className='mb-3'>
                                        <Row>
                                            {/* Client Details */}
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Name</Label>
                                                    <Input type="text" name="name" value={formData.clientDetails.name}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.name} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.name}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Age</Label>
                                                    <Input type="text" name="age" value={formData.clientDetails.age}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.age} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.age}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Retirement Age</Label>
                                                    <Input type="text" name="retirementAge" value={formData.clientDetails.retirementAge}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.retirementAge} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.retirementAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Total Investable Assets</Label>
                                                    <Input type="text" name="totalInvestableAssets" value={formData.clientDetails.totalInvestableAssets}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.totalInvestableAssets} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.totalInvestableAssets}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Income Goal</Label>
                                                    <Input type="text" name="incomeGoal" value={formData.clientDetails.incomeGoal}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.incomeGoal} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.incomeGoal}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            {/* <Col md={4}>
                                                                          <FormGroup>
                                                                              <Label>Year</Label>
                                                                              <Input type="text" name="year" value={formData.clientDetails.year}
                                                                                  onChange={(e) => handleChange(e, "clientDetails")}
                                                                                  invalid={!!errors.clientDetails?.year} />
                                                                              <FormFeedback className="text-capitalize">{errors.clientDetails?.year}</FormFeedback>
                                                                          </FormGroup>
                                                                      </Col> */}

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>SOC Income</Label>
                                                    <Input type="text" name="socIncome" value={formData.clientDetails.socIncome}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.socIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.socIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Other Income</Label>
                                                    <Input type="text" name="otherIncome" value={formData.clientDetails.otherIncome}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.otherIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.otherIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Pension Income</Label>
                                                    <Input type="text" name="PensionIncome" value={formData.clientDetails.PensionIncome}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.PensionIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.PensionIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Salary Income</Label>
                                                    <Input type="text" name="salaryIncome" value={formData.clientDetails.salaryIncome}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.salaryIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.salaryIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>







                                            <h3 className='text-center my-4'>401 K </h3>


                                            {/*   Fields */}
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>  401k Balance</Label>
                                                    <Input type="text" name="balancefidility401k" value={formData.clientDetails.balancefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.balancefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.balancefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Contribution</Label>
                                                    <Input type="text" name="contributionfidility401k" value={formData.clientDetails.contributionfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.contributionfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.contributionfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Opt-in Age </Label>
                                                    <Input type="text" name="optinAgefidility401k" value={formData.clientDetails.optinAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.optinAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.optinAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Rate of Return </Label>
                                                    <Input type="text" name="rorfidility401k" value={formData.clientDetails.rorfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rorfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rorfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Withdrawal Rate</Label>
                                                    <Input type="text" name="withdrawnRatefidility401k" value={formData.clientDetails.withdrawnRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.withdrawnRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.withdrawnRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Inflation Rate</Label>
                                                    <Input type="text" name="inflationfidility401k" value={formData.clientDetails.inflationfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.inflationfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.inflationfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>COLA  </Label>
                                                    <Input type="text" name="colafidility401k" value={formData.clientDetails.colafidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.colafidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.colafidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Tax Rate  </Label>
                                                    <Input type="text" name="taxRatefidility401k" value={formData.clientDetails.taxRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.taxRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.taxRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Rate  </Label>
                                                    <Input type="text" name="rmdRatefidility401k" value={formData.clientDetails.rmdRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Age  </Label>
                                                    <Input type="text" name="rmdAgefidility401k" value={formData.clientDetails.rmdAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Bonus  </Label>
                                                    <Input type="text" name="bonusfidility401k" value={formData.clientDetails.bonusfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.bonusfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.bonusfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate  </Label>
                                                    <Input type="text" name="flatRatefidility401k" value={formData.clientDetails.flatRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Age  </Label>
                                                    <Input type="text" name="flatRateAgefidility401k" value={formData.clientDetails.flatRateAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum  </Label>
                                                    <Input type="text" name="lumpSumfidility401k" value={formData.clientDetails.lumpSumfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Age  </Label>
                                                    <Input type="text" name="lumpSumAgefidility401k" value={formData.clientDetails.lumpSumAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <h3 className='text-center my-4'>Roth</h3>


                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Balance </Label>
                                                    <Input
                                                        type="text"
                                                        name="balanceRoth"
                                                        value={formData.clientDetails.balanceRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.balanceRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.balanceRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Contribution </Label>
                                                    <Input
                                                        type="text"
                                                        name="contributionRoth"
                                                        value={formData.clientDetails.contributionRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.contributionRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.contributionRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Opt-in Age </Label>
                                                    <Input
                                                        type="text"
                                                        name="optinAgeRoth"
                                                        value={formData.clientDetails.optinAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.optinAgeRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.optinAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Rate of Return </Label>
                                                    <Input
                                                        type="text"
                                                        name="rorRoth"
                                                        value={formData.clientDetails.rorRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rorRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rorRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Withdrawal Rate </Label>
                                                    <Input
                                                        type="text"
                                                        name="withdrawnRateRoth"
                                                        value={formData.clientDetails.withdrawnRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.withdrawnRateRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.withdrawnRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Inflation </Label>
                                                    <Input
                                                        type="text"
                                                        name="inflationRoth"
                                                        value={formData.clientDetails.inflationRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.inflationRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.inflationRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>COLA </Label>
                                                    <Input
                                                        type="text"
                                                        name="colaRoth"
                                                        value={formData.clientDetails.colaRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.colaRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.colaRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Tax Rate </Label>
                                                    <Input
                                                        type="text"
                                                        name="taxRateRoth"
                                                        value={formData.clientDetails.taxRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.taxRateRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.taxRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Rate </Label>
                                                    <Input
                                                        type="text"
                                                        name="rmdRateRoth"
                                                        value={formData.clientDetails.rmdRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdRateRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Age </Label>
                                                    <Input
                                                        type="text"
                                                        name="rmdAgeRoth"
                                                        value={formData.clientDetails.rmdAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdAgeRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Bonus </Label>
                                                    <Input
                                                        type="text"
                                                        name="bonusRoth"
                                                        value={formData.clientDetails.bonusRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.bonusRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.bonusRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate </Label>
                                                    <Input
                                                        type="text"
                                                        name="flatRateRoth"
                                                        value={formData.clientDetails.flatRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Age </Label>
                                                    <Input
                                                        type="text"
                                                        name="flatRateAgeRoth"
                                                        value={formData.clientDetails.flatRateAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateAgeRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum </Label>
                                                    <Input
                                                        type="text"
                                                        name="lumpSumRoth"
                                                        value={formData.clientDetails.lumpSumRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Opt-In Age </Label>
                                                    <Input
                                                        type="text"
                                                        name="lumpSumOptInAgeRoth"
                                                        value={formData.clientDetails.lumpSumOptInAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumOptInAgeRoth}
                                                        disabled
                                                    />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumOptInAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            {/* Spouse Details */}
                                            <Row>
                                                <Col>
                                                    <Card>
                                                        <CardHeader className="align-items-center d-flex">
                                                            <h2  >Spouse Details</h2>
                                                        </CardHeader>
                                                    </Card></Col>
                                            </Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Name</Label>
                                                    <Input type="text" name="name" value={formData.spouseDetails.name}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.name} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.name}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Age</Label>
                                                    <Input type="number" name="age" value={formData.spouseDetails.age}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.age} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.age}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Retirement Age</Label>
                                                    <Input type="number" name="retirementAge" value={formData.spouseDetails.retirementAge}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.retirementAge} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.retirementAge}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Total Investable Assets</Label>
                                                    <Input type="number" name="totalInvestableAssets" value={formData.clientDetails.totalInvestableAssets}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.clientDetails?.totalInvestableAssets} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.totalInvestableAssets}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Income Goal</Label>
                                                    <Input type="number" name="incomeGoal" value={formData.clientDetails.incomeGoal}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.clientDetails?.incomeGoal} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.incomeGoal}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            {/* 
                                                                      <Col md={4}>
                                                                          <FormGroup>
                                                                              <Label>Year</Label>
                                                                              <Input type="number" name="year" value={formData.spouseDetails.year}
                                                                                  onChange={(e) => handleChange(e, "spouseDetails")}
                                                                                  invalid={!!errors.spouseDetails?.year} disabled />
                                                                              <FormFeedback className="text-capitalize">{errors.spouseDetails?.year}</FormFeedback>
                                                                          </FormGroup>
                                                                      </Col> */}

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Social Income</Label>
                                                    <Input type="number" name="socIncome" value={formData.spouseDetails.socIncome}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.socIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.socIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Other Income</Label>
                                                    <Input type="number" name="otherIncome" value={formData.spouseDetails.otherIncome}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.otherIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.otherIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Pension Income</Label>
                                                    <Input type="number" name="PensionIncome" value={formData.spouseDetails.PensionIncome}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.PensionIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.PensionIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            {/* <Col md={4}>
                                                                          <FormGroup>
                                                                              <Label>E Pension</Label>
                                                                              <Input type="number" name="epension" value={formData.spouseDetails.epension}
                                                                                  onChange={(e) => handleChange(e, "spouseDetails")}
                                                                                  invalid={!!errors.spouseDetails?.epension} disabled />
                                                                              <FormFeedback className="text-capitalize">{errors.spouseDetails?.epension}</FormFeedback>
                                                                          </FormGroup>
                                                                      </Col> */}
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Salary Income</Label>
                                                    <Input type="text" name="epension" value={formData.spouseDetails.salaryIncome}
                                                        onChange={(e) => handleChange(e, "spouseDetails")}
                                                        invalid={!!errors.spouseDetails?.salaryIncome} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.spouseDetails?.salaryIncome}</FormFeedback>
                                                </FormGroup>
                                            </Col>




                                            <h3 className='text-center my-4'>401K </h3>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Balance  </Label>
                                                    <Input type="text" name="balancefidility401k" value={formData.clientDetails.balancefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.balancefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.balancefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Contribution  </Label>
                                                    <Input type="text" name="contributionfidility401k" value={formData.clientDetails.contributionfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.contributionfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.contributionfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Opt-in Age  </Label>
                                                    <Input type="text" name="optinAgefidility401k" value={formData.clientDetails.optinAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.optinAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.optinAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Rate of Return  </Label>
                                                    <Input type="text" name="rorfidility401k" value={formData.clientDetails.rorfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rorfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rorfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Withdrawal Rate  </Label>
                                                    <Input type="text" name="withdrawnRatefidility401k" value={formData.clientDetails.withdrawnRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.withdrawnRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.withdrawnRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Inflation  </Label>
                                                    <Input type="text" name="inflationfidility401k" value={formData.clientDetails.inflationfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.inflationfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.inflationfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>COLA  </Label>
                                                    <Input type="text" name="colafidility401k" value={formData.clientDetails.colafidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.colafidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.colafidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Tax Rate  </Label>
                                                    <Input type="text" name="taxRatefidility401k" value={formData.clientDetails.taxRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.taxRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.taxRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Rate  </Label>
                                                    <Input type="text" name="rmdRatefidility401k" value={formData.clientDetails.rmdRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Age  </Label>
                                                    <Input type="text" name="rmdAgefidility401k" value={formData.clientDetails.rmdAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Bonus  </Label>
                                                    <Input type="text" name="bonusfidility401k" value={formData.clientDetails.bonusfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.bonusfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.bonusfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate  </Label>
                                                    <Input type="text" name="flatRatefidility401k" value={formData.clientDetails.flatRatefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRatefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRatefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Age  </Label>
                                                    <Input type="text" name="flatRateAgefidility401k" value={formData.clientDetails.flatRateAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum  </Label>
                                                    <Input type="text" name="lumpSumfidility401k" value={formData.clientDetails.lumpSumfidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumfidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumfidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Age  </Label>
                                                    <Input type="text" name="lumpSumAgefidility401k" value={formData.clientDetails.lumpSumAgefidility401k}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumAgefidility401k} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumAgefidility401k}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <h3 className='text-center my-4'>Roth</h3>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Balance </Label>
                                                    <Input type="text" name="balanceRoth" value={formData.clientDetails.balanceRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.balanceRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.balanceRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Contribution </Label>
                                                    <Input type="text" name="contributionRoth" value={formData.clientDetails.contributionRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.contributionRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.contributionRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Opt-in Age </Label>
                                                    <Input type="text" name="optinAgeRoth" value={formData.clientDetails.optinAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.optinAgeRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.optinAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Rate of Return </Label>
                                                    <Input type="text" name="rorRoth" value={formData.clientDetails.rorRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rorRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rorRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Withdrawal Rate </Label>
                                                    <Input type="text" name="withdrawnRateRoth" value={formData.clientDetails.withdrawnRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.withdrawnRateRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.withdrawnRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Inflation </Label>
                                                    <Input type="text" name="inflationRoth" value={formData.clientDetails.inflationRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.inflationRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.inflationRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>COLA </Label>
                                                    <Input type="text" name="colaRoth" value={formData.clientDetails.colaRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.colaRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.colaRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Tax Rate </Label>
                                                    <Input type="text" name="taxRateRoth" value={formData.clientDetails.taxRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.taxRateRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.taxRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Rate </Label>
                                                    <Input type="text" name="rmdRateRoth" value={formData.clientDetails.rmdRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdRateRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>RMD Age </Label>
                                                    <Input type="text" name="rmdAgeRoth" value={formData.clientDetails.rmdAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.rmdAgeRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.rmdAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Bonus </Label>
                                                    <Input type="text" name="bonusRoth" value={formData.clientDetails.bonusRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.bonusRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.bonusRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate </Label>
                                                    <Input type="text" name="flatRateRoth" value={formData.clientDetails.flatRateRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Flat Rate Age </Label>
                                                    <Input type="text" name="flatRateAgeRoth" value={formData.clientDetails.flatRateAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.flatRateAgeRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.flatRateAgeRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum </Label>
                                                    <Input type="text" name="lumpSumRoth" value={formData.clientDetails.lumpSumRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumRoth}</FormFeedback>
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label>Lump Sum Opt-in Age </Label>
                                                    <Input type="text" name="lumpSumOptInAgeRoth" value={formData.clientDetails.lumpSumOptInAgeRoth}
                                                        onChange={(e) => handleChange(e, "clientDetails")}
                                                        invalid={!!errors.clientDetails?.lumpSumOptInAgeRoth} disabled />
                                                    <FormFeedback className="text-capitalize">{errors.clientDetails?.lumpSumOptInAgeRoth}</FormFeedback>
                                                </FormGroup>
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

export default ProfileView;
