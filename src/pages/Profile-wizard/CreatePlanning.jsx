import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RuleofHundredGraph from './RuleofHundredGraph'
import IncomeChart from './IncomeChart'
const PlanningForm = () => {
    const [formData, setFormData] = useState({
        clientDetails: {
            name: 'John Doe', age: '40', retirementAge: '65', totalInvestableAssets: '600000', incomeGoal: '700000', year: '2024',
            socIncome: '2500', otherIncome: '800', PensionIncome: '1800', epension: '100000',

            balancefidility401k: '1200', contributionfidility401k: '500', optinAgefidility401k: '45', rorfidility401k: '7', withdrawnRatefidility401k: '4', inflationfidility401k: '2.5',
            colafidility401k: '1.8', taxRatefidility401k: '22', rmdRatefidility401k: '5', rmdAgefidility401k: '72', bonusfidility401k: '1000', flatRatefidility401k: '5', flatRateAgefidility401k: '50', lumpSumfidility401k: '5000', lumpSumAgefidility401k: '65',

            balanceRoth: '1500', contributionRoth: '600', optinAgeRoth: '40', rorRoth: '6', withdrawnRateRoth: '3.5', inflationRoth: '2',
            colaRoth: '2', taxRateRoth: '18', rmdRateRoth: '4', rmdAgeRoth: '70', bonusRoth: '800', flatRateRoth: '3', flatRateAgeRoth: '48', lumpSumRoth: '4000', lumpSumOptInAgeRoth: '62',
        },

        spouseDetails: {
            name: 'Jane Doe', age: '38', retirementAge: '63', totalInvestableAssets: '450000', incomeGoal: '600000', year: '2024',
            socIncome: '2200', otherIncome: '600', PensionIncome: '1600', epension: '100000',

            balancefidility401k: '1100', contributionfidility401k: '400', optinAgefidility401k: '44', rorfidility401k: '6.5', withdrawnRatefidility401k: '3.8', inflationfidility401k: '2.2',
            colafidility401k: '1.5', taxRatefidility401k: '20', rmdRatefidility401k: '4.5', rmdAgefidility401k: '71', bonusfidility401k: '900', flatRatefidility401k: '4.5', flatRateAgefidility401k: '49', lumpSumfidility401k: '4500', lumpSumAgefidility401k: '64',

            balanceRoth: '1400', contributionRoth: '500', optinAgeRoth: '39', rorRoth: '5.8', withdrawnRateRoth: '3.2', inflationRoth: '1.8',
            colaRoth: '1.8', taxRateRoth: '17', rmdRateRoth: '3.8', rmdAgeRoth: '69', bonusRoth: '750', flatRateRoth: '2.8', flatRateAgeRoth: '47', lumpSumRoth: '3500', lumpSumOptInAgeRoth: '61',
        },
    });




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
                    name: 'John Doe', age: '40', retirementAge: '65', totalInvestableAssets: '600000', incomeGoal: '700000', year: '2024',
                    socIncome: '2500', otherIncome: '800', PensionIncome: '1800', epension: '100000',

                    balancefidility401k: '1200', contributionfidility401k: '500', optinAgefidility401k: '45', rorfidility401k: '7', withdrawnRatefidility401k: '4', inflationfidility401k: '2.5',
                    colafidility401k: '1.8', taxRatefidility401k: '22', rmdRatefidility401k: '5', rmdAgefidility401k: '72', bonusfidility401k: '1000', flatRatefidility401k: '5', flatRateAgefidility401k: '50', lumpSumfidility401k: '5000', lumpSumAgefidility401k: '65',

                    balanceRoth: '1500', contributionRoth: '600', optinAgeRoth: '40', rorRoth: '6', withdrawnRateRoth: '3.5', inflationRoth: '2',
                    colaRoth: '2', taxRateRoth: '18', rmdRateRoth: '4', rmdAgeRoth: '70', bonusRoth: '800', flatRateRoth: '3', flatRateAgeRoth: '48', lumpSumRoth: '4000', lumpSumOptInAgeRoth: '62',
                },

                spouseDetails: {
                    name: 'Jane Doe', age: '38', retirementAge: '63', totalInvestableAssets: '450000', incomeGoal: '600000', year: '2024',
                    socIncome: '2200', otherIncome: '600', PensionIncome: '1600', epension: '100000',

                    balancefidility401k: '1100', contributionfidility401k: '400', optinAgefidility401k: '44', rorfidility401k: '6.5', withdrawnRatefidility401k: '3.8', inflationfidility401k: '2.2',
                    colafidility401k: '1.5', taxRatefidility401k: '20', rmdRatefidility401k: '4.5', rmdAgefidility401k: '71', bonusfidility401k: '900', flatRatefidility401k: '4.5', flatRateAgefidility401k: '49', lumpSumfidility401k: '4500', lumpSumAgefidility401k: '64',

                    balanceRoth: '1400', contributionRoth: '500', optinAgeRoth: '39', rorRoth: '5.8', withdrawnRateRoth: '3.2', inflationRoth: '1.8',
                    colaRoth: '1.8', taxRateRoth: '17', rmdRateRoth: '3.8', rmdAgeRoth: '69', bonusRoth: '750', flatRateRoth: '2.8', flatRateAgeRoth: '47', lumpSumRoth: '3500', lumpSumOptInAgeRoth: '61',
                },
            });

            setErrors({});
        }, 1000);
    };

    const handleReset = () => {
        setFormData({
            clientDetails: {
                name: 'John Doe', age: '40', retirementAge: '65', totalInvestableAssets: '600000', incomeGoal: '700000', year: '2024',
                socIncome: '2500', otherIncome: '800', PensionIncome: '1800', epension: '100000',

                balancefidility401k: '1200', contributionfidility401k: '500', optinAgefidility401k: '45', rorfidility401k: '7', withdrawnRatefidility401k: '4', inflationfidility401k: '2.5',
                colafidility401k: '1.8', taxRatefidility401k: '22', rmdRatefidility401k: '5', rmdAgefidility401k: '72', bonusfidility401k: '1000', flatRatefidility401k: '5', flatRateAgefidility401k: '50', lumpSumfidility401k: '5000', lumpSumAgefidility401k: '65',

                balanceRoth: '1500', contributionRoth: '600', optinAgeRoth: '40', rorRoth: '6', withdrawnRateRoth: '3.5', inflationRoth: '2',
                colaRoth: '2', taxRateRoth: '18', rmdRateRoth: '4', rmdAgeRoth: '70', bonusRoth: '800', flatRateRoth: '3', flatRateAgeRoth: '48', lumpSumRoth: '4000', lumpSumOptInAgeRoth: '62',
            },

            spouseDetails: {
                name: 'Jane Doe', age: '38', retirementAge: '63', totalInvestableAssets: '450000', incomeGoal: '600000', year: '2024',
                socIncome: '2200', otherIncome: '600', PensionIncome: '1600', epension: '100000',

                balancefidility401k: '1100', contributionfidility401k: '400', optinAgefidility401k: '44', rorfidility401k: '6.5', withdrawnRatefidility401k: '3.8', inflationfidility401k: '2.2',
                colafidility401k: '1.5', taxRatefidility401k: '20', rmdRatefidility401k: '4.5', rmdAgefidility401k: '71', bonusfidility401k: '900', flatRatefidility401k: '4.5', flatRateAgefidility401k: '49', lumpSumfidility401k: '4500', lumpSumAgefidility401k: '64',

                balanceRoth: '1400', contributionRoth: '500', optinAgeRoth: '39', rorRoth: '5.8', withdrawnRateRoth: '3.2', inflationRoth: '1.8',
                colaRoth: '1.8', taxRateRoth: '17', rmdRateRoth: '3.8', rmdAgeRoth: '69', bonusRoth: '750', flatRateRoth: '2.8', flatRateAgeRoth: '47', lumpSumRoth: '3500', lumpSumOptInAgeRoth: '61',
            },
        });
        setErrors({});


    };


    return (
        <React.Fragment>
            <div  >
                <ToastContainer position="top-right" autoClose={3000} />
                <Container fluid>
                    <Row>
                        <Col>

                            <RuleofHundredGraph />
                            <IncomeChart />
                            <form onSubmit={handleSubmit} className='mb-3'>
                                <Row>
                                    {/* Client Details */}
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input type="text" name="name" value={formData.clientDetails.name}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.name} disabled />
                                            <FormFeedback>{errors.clientDetails?.name}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Age</Label>
                                            <Input type="text" name="age" value={formData.clientDetails.age}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.age} disabled />
                                            <FormFeedback>{errors.clientDetails?.age}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Retirement Age</Label>
                                            <Input type="text" name="retirementAge" value={formData.clientDetails.retirementAge}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.retirementAge} disabled />
                                            <FormFeedback>{errors.clientDetails?.retirementAge}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Total Investable Assets</Label>
                                            <Input type="text" name="totalInvestableAssets" value={formData.clientDetails.totalInvestableAssets}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.totalInvestableAssets} disabled />
                                            <FormFeedback>{errors.clientDetails?.totalInvestableAssets}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Income Goal</Label>
                                            <Input type="text" name="incomeGoal" value={formData.clientDetails.incomeGoal}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.incomeGoal} disabled />
                                            <FormFeedback>{errors.clientDetails?.incomeGoal}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Year</Label>
                                            <Input type="text" name="year" value={formData.clientDetails.year}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.year} disabled />
                                            <FormFeedback>{errors.clientDetails?.year}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>SOC Income</Label>
                                            <Input type="text" name="socIncome" value={formData.clientDetails.socIncome}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.socIncome} disabled />
                                            <FormFeedback>{errors.clientDetails?.socIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Other Income</Label>
                                            <Input type="text" name="otherIncome" value={formData.clientDetails.otherIncome}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.otherIncome} disabled />
                                            <FormFeedback>{errors.clientDetails?.otherIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Pension Income</Label>
                                            <Input type="text" name="PensionIncome" value={formData.clientDetails.PensionIncome}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.PensionIncome} disabled />
                                            <FormFeedback>{errors.clientDetails?.PensionIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>E Pension</Label>
                                            <Input type="text" name="epension" value={formData.clientDetails.epension}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.epension} disabled />
                                            <FormFeedback>{errors.clientDetails?.epension}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.balancefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Contribution</Label>
                                            <Input type="text" name="contributionfidility401k" value={formData.clientDetails.contributionfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.contributionfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.contributionfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Opt-in Age </Label>
                                            <Input type="text" name="optinAgefidility401k" value={formData.clientDetails.optinAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.optinAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.optinAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Rate of Return </Label>
                                            <Input type="text" name="rorfidility401k" value={formData.clientDetails.rorfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rorfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rorfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Withdrawal Rate</Label>
                                            <Input type="text" name="withdrawnRatefidility401k" value={formData.clientDetails.withdrawnRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.withdrawnRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.withdrawnRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Inflation Rate</Label>
                                            <Input type="text" name="inflationfidility401k" value={formData.clientDetails.inflationfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.inflationfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.inflationfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>COLA  </Label>
                                            <Input type="text" name="colafidility401k" value={formData.clientDetails.colafidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.colafidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.colafidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Tax Rate  </Label>
                                            <Input type="text" name="taxRatefidility401k" value={formData.clientDetails.taxRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.taxRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.taxRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Rate  </Label>
                                            <Input type="text" name="rmdRatefidility401k" value={formData.clientDetails.rmdRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Age  </Label>
                                            <Input type="text" name="rmdAgefidility401k" value={formData.clientDetails.rmdAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Bonus  </Label>
                                            <Input type="text" name="bonusfidility401k" value={formData.clientDetails.bonusfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.bonusfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.bonusfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate  </Label>
                                            <Input type="text" name="flatRatefidility401k" value={formData.clientDetails.flatRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate Age  </Label>
                                            <Input type="text" name="flatRateAgefidility401k" value={formData.clientDetails.flatRateAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRateAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRateAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum  </Label>
                                            <Input type="text" name="lumpSumfidility401k" value={formData.clientDetails.lumpSumfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum Age  </Label>
                                            <Input type="text" name="lumpSumAgefidility401k" value={formData.clientDetails.lumpSumAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumAgefidility401k}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.balanceRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.contributionRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.optinAgeRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.rorRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Withdrawn Rate </Label>
                                            <Input
                                                type="text"
                                                name="withdrawnRateRoth"
                                                value={formData.clientDetails.withdrawnRateRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.withdrawnRateRoth}
                                                disabled
                                            />
                                            <FormFeedback>{errors.clientDetails?.withdrawnRateRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.inflationRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.colaRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.taxRateRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.rmdRateRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.rmdAgeRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.bonusRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.flatRateRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.flatRateAgeRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.lumpSumRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.clientDetails?.lumpSumOptInAgeRoth}</FormFeedback>
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
                                            <FormFeedback>{errors.spouseDetails?.name}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Age</Label>
                                            <Input type="number" name="age" value={formData.spouseDetails.age}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.age} disabled />
                                            <FormFeedback>{errors.spouseDetails?.age}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Retirement Age</Label>
                                            <Input type="number" name="retirementAge" value={formData.spouseDetails.retirementAge}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.retirementAge} disabled />
                                            <FormFeedback>{errors.spouseDetails?.retirementAge}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Total Investable Assets</Label>
                                            <Input type="number" name="totalInvestableAssets" value={formData.spouseDetails.totalInvestableAssets}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.totalInvestableAssets} disabled />
                                            <FormFeedback>{errors.spouseDetails?.totalInvestableAssets}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Income Goal</Label>
                                            <Input type="number" name="incomeGoal" value={formData.spouseDetails.incomeGoal}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.incomeGoal} disabled />
                                            <FormFeedback>{errors.spouseDetails?.incomeGoal}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Year</Label>
                                            <Input type="number" name="year" value={formData.spouseDetails.year}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.year} disabled />
                                            <FormFeedback>{errors.spouseDetails?.year}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Social Income</Label>
                                            <Input type="number" name="socIncome" value={formData.spouseDetails.socIncome}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.socIncome} disabled />
                                            <FormFeedback>{errors.spouseDetails?.socIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Other Income</Label>
                                            <Input type="number" name="otherIncome" value={formData.spouseDetails.otherIncome}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.otherIncome} disabled />
                                            <FormFeedback>{errors.spouseDetails?.otherIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Pension Income</Label>
                                            <Input type="number" name="PensionIncome" value={formData.spouseDetails.PensionIncome}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.PensionIncome} disabled />
                                            <FormFeedback>{errors.spouseDetails?.PensionIncome}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>E Pension</Label>
                                            <Input type="number" name="epension" value={formData.spouseDetails.epension}
                                                onChange={(e) => handleChange(e, "spouseDetails")}
                                                invalid={!!errors.spouseDetails?.epension} disabled />
                                            <FormFeedback>{errors.spouseDetails?.epension}</FormFeedback>
                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Balance  </Label>
                                            <Input type="text" name="balancefidility401k" value={formData.clientDetails.balancefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.balancefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.balancefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Contribution  </Label>
                                            <Input type="text" name="contributionfidility401k" value={formData.clientDetails.contributionfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.contributionfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.contributionfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Opt-in Age  </Label>
                                            <Input type="text" name="optinAgefidility401k" value={formData.clientDetails.optinAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.optinAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.optinAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Rate of Return  </Label>
                                            <Input type="text" name="rorfidility401k" value={formData.clientDetails.rorfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rorfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rorfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Withdrawn Rate  </Label>
                                            <Input type="text" name="withdrawnRatefidility401k" value={formData.clientDetails.withdrawnRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.withdrawnRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.withdrawnRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Inflation  </Label>
                                            <Input type="text" name="inflationfidility401k" value={formData.clientDetails.inflationfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.inflationfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.inflationfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>COLA  </Label>
                                            <Input type="text" name="colafidility401k" value={formData.clientDetails.colafidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.colafidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.colafidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Tax Rate  </Label>
                                            <Input type="text" name="taxRatefidility401k" value={formData.clientDetails.taxRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.taxRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.taxRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Rate  </Label>
                                            <Input type="text" name="rmdRatefidility401k" value={formData.clientDetails.rmdRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Age  </Label>
                                            <Input type="text" name="rmdAgefidility401k" value={formData.clientDetails.rmdAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Bonus  </Label>
                                            <Input type="text" name="bonusfidility401k" value={formData.clientDetails.bonusfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.bonusfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.bonusfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate  </Label>
                                            <Input type="text" name="flatRatefidility401k" value={formData.clientDetails.flatRatefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRatefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRatefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate Age  </Label>
                                            <Input type="text" name="flatRateAgefidility401k" value={formData.clientDetails.flatRateAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRateAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRateAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum  </Label>
                                            <Input type="text" name="lumpSumfidility401k" value={formData.clientDetails.lumpSumfidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumfidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumfidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum Age  </Label>
                                            <Input type="text" name="lumpSumAgefidility401k" value={formData.clientDetails.lumpSumAgefidility401k}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumAgefidility401k} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumAgefidility401k}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <h3 className='text-center my-4'>Roth</h3>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Balance </Label>
                                            <Input type="text" name="balanceRoth" value={formData.clientDetails.balanceRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.balanceRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.balanceRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Contribution </Label>
                                            <Input type="text" name="contributionRoth" value={formData.clientDetails.contributionRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.contributionRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.contributionRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Opt-in Age </Label>
                                            <Input type="text" name="optinAgeRoth" value={formData.clientDetails.optinAgeRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.optinAgeRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.optinAgeRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Rate of Return </Label>
                                            <Input type="text" name="rorRoth" value={formData.clientDetails.rorRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rorRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.rorRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Withdrawn Rate </Label>
                                            <Input type="text" name="withdrawnRateRoth" value={formData.clientDetails.withdrawnRateRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.withdrawnRateRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.withdrawnRateRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Inflation </Label>
                                            <Input type="text" name="inflationRoth" value={formData.clientDetails.inflationRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.inflationRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.inflationRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>COLA </Label>
                                            <Input type="text" name="colaRoth" value={formData.clientDetails.colaRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.colaRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.colaRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Tax Rate </Label>
                                            <Input type="text" name="taxRateRoth" value={formData.clientDetails.taxRateRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.taxRateRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.taxRateRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Rate </Label>
                                            <Input type="text" name="rmdRateRoth" value={formData.clientDetails.rmdRateRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdRateRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdRateRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RMD Age </Label>
                                            <Input type="text" name="rmdAgeRoth" value={formData.clientDetails.rmdAgeRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.rmdAgeRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.rmdAgeRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Bonus </Label>
                                            <Input type="text" name="bonusRoth" value={formData.clientDetails.bonusRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.bonusRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.bonusRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate </Label>
                                            <Input type="text" name="flatRateRoth" value={formData.clientDetails.flatRateRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRateRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRateRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Flat Rate Age </Label>
                                            <Input type="text" name="flatRateAgeRoth" value={formData.clientDetails.flatRateAgeRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.flatRateAgeRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.flatRateAgeRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum </Label>
                                            <Input type="text" name="lumpSumRoth" value={formData.clientDetails.lumpSumRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Lump Sum Opt-in Age </Label>
                                            <Input type="text" name="lumpSumOptInAgeRoth" value={formData.clientDetails.lumpSumOptInAgeRoth}
                                                onChange={(e) => handleChange(e, "clientDetails")}
                                                invalid={!!errors.clientDetails?.lumpSumOptInAgeRoth} disabled />
                                            <FormFeedback>{errors.clientDetails?.lumpSumOptInAgeRoth}</FormFeedback>
                                        </FormGroup>
                                    </Col>


                                </Row>

                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button type="submit" color="primary" disabled={loading}>
                                            {loading ? "Submitting..." : "Submit"}
                                        </Button>


                                        <Button type="button" color="danger" onClick={handleReset} className='ms-3 mr-4'>
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" className='ms-5'  >
                                            Print
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

export default PlanningForm;
