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
    { id: 1, label: "Profile" },
    { id: 2, label: "Income" },
    { id: 3, label: "Liability" },
    { id: 4, label: "Asset" },
    { id: 5, label: "Net Worth" },
    { id: 6, label: "Rule of 100" },
    { id: 7, label: "Success" },
];

const FormWizard = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [passedSteps, setPassedSteps] = useState([1]);
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

    function toggleTab(tab) {
        if (activeTab !== tab) {
            const updatedSteps = [...passedSteps, tab];
            if (tab >= 1 && tab <= 7) {
                setActiveTab(tab);
                setPassedSteps(updatedSteps);
            }
        }
    }

    const handleNext = () => {
        if (startIndex + visibleTabs < steps.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
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
                                    <div className="text-center pt-3 pb-4 mb-1 d-flex justify-content-center"></div>

                                    {/* Step Navigation */}
                                    <div className="step-arrow-nav mb-4 d-flex align-items-center w-100">
                                        <button className="btn btn-light me-2" onClick={handlePrev} disabled={startIndex === 0}>◀</button>
                                        <Nav className="nav-pills custom-nav nav-justified w-100" role="tablist">
                                            {steps.slice(startIndex, startIndex + visibleTabs).map((step) => (
                                                <NavItem key={step.id}>
                                                    <NavLink
                                                        href="#"
                                                        className={classnames("text-nowrap", {
                                                            active: activeTab === step.id,
                                                            done: activeTab > step.id,
                                                        })}
                                                        onClick={() => toggleTab(step.id)}
                                                    >
                                                        {step.label}
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                        <button className="btn btn-light ms-2" onClick={handleNext} disabled={startIndex + visibleTabs >= steps.length}>▶</button>
                                    </div>

                                    {/* Step Content */}
                                    <TabContent activeTab={activeTab}>
                                        {[
                                            { id: 1, component: <Profile /> },
                                            { id: 2, component: <CreateIncome /> },
                                            { id: 3, component: <Liability /> },
                                            { id: 4, component: <Asset /> },
                                            { id: 5, component: <Networth /> },
                                            { id: 6, component: <RuleOf100 /> },
                                        ].map(({ id, component }) => (
                                            <TabPane key={id} tabId={id}>
                                                {component}
                                                <div className="d-flex justify-content-between flex-wrap mt-4">
                                                    {id > 1 && (
                                                        <button className="btn btn-light mb-2" onClick={() => toggleTab(id - 1)}>Back</button>
                                                    )}
                                                    {id < 6 && (
                                                        <button className="btn btn-success mb-2" onClick={() => toggleTab(id + 1)}>Next</button>
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
