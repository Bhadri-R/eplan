

import React, { useState, useEffect } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import CreateIncome from './CreateIncome';
import IncomeTable from './IncomeTable';
const IncomeWrapper = () => {

    const [refresh, setRefresh] = useState(false);

    const handleFetchIncome = () => setRefresh((prev) => !prev);



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>


                            <CreateIncome fetchIncomeData={handleFetchIncome} />
                            <IncomeTable refresh={refresh} />


                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default IncomeWrapper;