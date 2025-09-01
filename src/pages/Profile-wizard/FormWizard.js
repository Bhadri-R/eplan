import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Progress,
} from "reactstrap";
//Import images
 

import classnames from "classnames";
 
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
// register lottie and define custom element
defineElement(loadAnimation);

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [activeArrowTab, setactiveArrowTab] = useState(4);
  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);

   
  function toggleArrowTab(tab) {
    if (activeArrowTab !== tab) {
      var modifiedSteps = [...passedarrowSteps, tab];

      if (tab >= 4 && tab <= 7) {
        setactiveArrowTab(tab);
        setPassedarrowSteps(modifiedSteps);
      }
    }
  }

   

 
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
 
          <Row>


            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Arrow Nav Steps</h4>
                </CardHeader>
                <CardBody className="form-steps">
                  <Form>
                    <div className="text-center pt-3 pb-4 mb-1 d-flex justify-content-center">
                      
                    </div>
                    <div className="step-arrow-nav mb-4">
                      <Nav
                        className="nav-pills custom-nav nav-justified"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            href="#"
                            id="steparrow-gen-info-tab"
                            className={classnames({
                              active: activeArrowTab === 4,
                              done: activeArrowTab <= 6 && activeArrowTab > 3,
                            })}
                            onClick={() => {
                              toggleArrowTab(4);
                            }}
                          >
                            General
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            id="steparrow-gen-info-tab"
                            className={classnames({
                              active: activeArrowTab === 5,
                              done: activeArrowTab <= 6 && activeArrowTab > 4,
                            })}
                            onClick={() => {
                              toggleArrowTab(5);
                            }}
                          >
                            Description
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            id="steparrow-gen-info-tab"
                            className={classnames({
                              active: activeArrowTab === 6,
                              done: activeArrowTab <= 6 && activeArrowTab > 5,
                            })}
                            onClick={() => {
                              toggleArrowTab(6);
                            }}
                          >
                            Finish
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>

                    <TabContent activeTab={activeArrowTab}>
                      <TabPane id="steparrow-gen-info" tabId={4}>
                        <div>
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="steparrow-gen-info-email-input"
                                >
                                  Email
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="steparrow-gen-info-email-input"
                                  placeholder="Enter Email"
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="steparrow-gen-info-username-input"
                                >
                                  User Name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="steparrow-gen-info-username-input"
                                  placeholder="Enter User Name"
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="steparrow-gen-info-password-input"
                            >
                              Password
                            </Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="steparrow-gen-info-password-input"
                              placeholder="Enter Password"
                            />
                          </div>
                          <div>
                            <Label
                              className="form-label"
                              htmlFor="steparrow-gen-info-confirm-password-input"
                            >
                              Confirm Password
                            </Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="steparrow-gen-info-confirm-password-input"
                              placeholder="Enter Confirm Password"
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            onClick={() => {
                              toggleArrowTab(activeArrowTab + 1);
                            }}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Go to more info
                          </button>
                        </div>
                      </TabPane>

                      <TabPane id="steparrow-description-info" tabId={5}>
                        <div>
                          <div className="mb-3">
                            <Label htmlFor="formFile" className="form-label">
                              Upload Image
                            </Label>
                            <Input
                              className="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                          <div>
                            <Label
                              className="form-label"
                              htmlFor="des-info-description-input"
                            >
                              Description
                            </Label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Description"
                              id="des-info-description-input"
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-light btn-label previestab"
                            onClick={() => {
                              toggleArrowTab(activeArrowTab - 1);
                            }}
                          >
                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                            Back to General
                          </button>
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            onClick={() => {
                              toggleArrowTab(activeArrowTab + 1);
                            }}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Submit
                          </button>
                        </div>
                      </TabPane>

                      <TabPane id="pills-experience" tabId={6}>
                        <div className="text-center">
                          <div className="avatar-md mt-5 mb-4 mx-auto">
                            <div className="avatar-title bg-light text-success display-4 rounded-circle">
                              <i className="ri-checkbox-circle-fill"></i>
                            </div>
                          </div>
                          <h5>Well Done !</h5>
                          <p className="text-muted">
                            You have Successfully Signed Up
                          </p>
                        </div>
                      </TabPane>
                    </TabContent>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container >
      </div >
    </React.Fragment >
  );
};

export default FormWizard;
