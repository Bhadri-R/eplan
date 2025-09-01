import React, { useState } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Widgets from './MyNethworthTop'
const NetwothWorth = () => {
    const financialData = {
        assets: 500000, // Example assets
        liabilities: 150000, // Example liabilities
        netWorth: 350000 // Net Worth (Assets - Liabilities)
    };
    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <Row>
                        <Col>
                            <Card className="p-0 pb-2">
                                <CardHeader className=" ">
                                    <Row>
                                        <Col md={6}>  <h2 className="card-title mb-0 flex-grow-1">My Networth</h2></Col>
                                        <Col md={6} className='d-flex justify-content-end'> <button className='btn btn-primary'> <Link to='/create-liabilities' className='text-white'> Next </Link></button></Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                <Widgets 
                assets={financialData.assets} 
                liabilities={financialData.liabilities} 
                netWorth={financialData.netWorth} 
            />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NetwothWorth;