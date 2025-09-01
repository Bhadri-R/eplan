

import React, { useState, useEffect } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import CreateAsset from './CreateAssets';
import AssetsTable from './AssetsTable';
const AssetsWrapper = () => {

    const [refresh, setRefresh] = useState(false);

    const handleFetchAssets = () => setRefresh((prev) => !prev);



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>


                            <CreateAsset fetchAssetsData={handleFetchAssets} />
                            <AssetsTable refresh={refresh} />


                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default AssetsWrapper;