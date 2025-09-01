import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

// Import components
import Profile from './CreateProfile';
import CreateIncome from './CreateIncome';
import Liability from './CreateLiabilities';
import Asset from './CreateAssest';
import Networth from '../Networth-wizard/NetWorth';
import RuleOf100 from './CreatePlanning';

defineElement(loadAnimation);

const steps = [
  { id: 1, label: "Asset" },
  { id: 2, label: "Income" },
  { id: 3, label: "Liability" },
  { id: 4, label: "Profile" }, // Changed to Profile as per your tab components
  { id: 5, label: "Net Worth" },
  { id: 6, label: "Rule of 100" },
  { id: 7, label: "Success" },
];

const FormWizard = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [passedSteps, setPassedSteps] = useState([1]);
    const [validForms, setValidForms] = useState({});
    const [visibleTabs, setVisibleTabs] = useState(3);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const updateTabs = () => {
            if (window.innerWidth <= 576) {
                setVisibleTabs(2);
            } else if (window.innerWidth <= 768) {
                setVisibleTabs(3);
            } else {
                setVisibleTabs(steps.length);
            }
        };
        window.addEventListener("resize", updateTabs);
        updateTabs();
        return () => window.removeEventListener("resize", updateTabs);
    }, []);

    const toggleTab = (tab) => {
        if (validForms[activeTab]) {
            setActiveTab(tab);
            setPassedSteps([...new Set([...passedSteps, tab])]);
        }
    };

    const handleFormValidation = (tab, isValid) => {
        setValidForms((prev) => ({ ...prev, [tab]: isValid }));
    };

    return (
        <React.Fragment>
            <div className="w-100">
                <Container fluid>
                    <Row>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">ePlan Profile Setup</h4>
                            </CardHeader>
                            <CardBody className="form-steps">
                                <Form onSubmit={(e) => e.preventDefault()}>
                                    <div className="step-arrow-nav mb-4 d-flex align-items-center w-100">
                                        <Nav className="nav-pills custom-nav nav-justified w-100" role="tablist">
                                            {steps.map((step) => (
                                                <NavItem key={step.id}>
                                                    <NavLink
                                                        href="#"
                                                        className={classnames("text-nowrap", {
                                                            active: activeTab === step.id,
                                                            done: passedSteps.includes(step.id),
                                                        })}
                                                        onClick={() => toggleTab(step.id)}
                                                    >
                                                        {step.label}
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </div>

                                    <TabContent activeTab={activeTab}>
                                        {[1, 2, 3, 4, 5, 6].map((id) => (
                                            <TabPane key={id} tabId={id}>
                                                {id === 1 && <Asset onFormValid={(isValid) => handleFormValidation(1, isValid)} />}
                                                {id === 2 && <CreateIncome onFormValid={(isValid) => handleFormValidation(2, isValid)} />}
                                                {id === 3 && <Liability onFormValid={(isValid) => handleFormValidation(3, isValid)} />}
                                                {id === 4 && <Profile onFormValid={(isValid) => handleFormValidation(4, isValid)} />}
                                                {id === 5 && <Networth onFormValid={(isValid) => handleFormValidation(5, isValid)} />}
                                                {id === 6 && <RuleOf100 onFormValid={(isValid) => handleFormValidation(6, isValid)} />}
                                                
                                                <div className="d-flex justify-content-between flex-wrap mt-4">
                                                    {id > 1 && (
                                                        <button className="btn btn-light mb-2" onClick={() => toggleTab(id - 1)}>Back</button>
                                                    )}
                                                    {id < 6 && (
                                                        <button className="btn btn-success mb-2" onClick={() => toggleTab(id + 1)} disabled={!validForms[id]}>Next</button>
                                                    )}
                                                </div>
                                            </TabPane>
                                        ))}

                                        <TabPane tabId={7}>
                                            <div className="text-center mt-5">
                                                <h5>Well Done!</h5>
                                                <p className="text-muted">You have Successfully Completed the Setup</p>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </Form>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormWizard;