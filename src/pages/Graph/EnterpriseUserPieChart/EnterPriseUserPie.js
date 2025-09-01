import React from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import AssestsAllocationGraph from "./AssestsAllocationGraph";
import RuleOf100AllocationGraph from "./RuleOf100AllocationGraph"; // ✅ Correct Import
import EplanGraph from "./EplanGraph";
import "./style.css";

const EnterPriseUserPie = () => {
    return (
        <>
            <Row>
                {/* Current Asset Allocation */}
                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Current Asset Allocation</h4>
                        </CardHeader>
                        <CardBody>
                            <AssestsAllocationGraph />
                        </CardBody>
                    </Card>
                </Col>

                {/* Rule of 100 Allocation */}
                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Rule of 100 Asset Allocation</h4>
                        </CardHeader>
                        <CardBody>
                            <RuleOf100AllocationGraph /> {/* ✅ Fixed Import */}
                        </CardBody>
                    </Card>
                </Col>

                {/* My ePlan Asset Allocation */}
                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">My ePlan Asset Allocation</h4>
                        </CardHeader>
                        <CardBody>
                            <EplanGraph />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default EnterPriseUserPie;
