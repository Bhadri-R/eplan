import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Widgets from './MyNethworthTop'
const NethWorth = () => {

    return (
        <React.Fragment>
            <div className=" ">

                <Container fluid>
                    <Row>
                        <Col>

                            <Widgets />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NethWorth;