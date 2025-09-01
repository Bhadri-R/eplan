import React, { useState,useEffect  } from 'react';
import { Row, Container, CardHeader, Card, CardBody, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Widgets from './MyNethworthTop'
import PortfolioProgress from "../Graph/PortfolioProgress";
import RetirementIncomeGap from "../Graph/RetirementIncomeGap";
import EnterPriseUserPie from '../Graph/EnterpriseUserPieChart/EnterPriseUserPie'
import NormalUserPie from '../Graph/NormalUserPieChart/NormalUserPie'
// import EnterPriseUserPie from '../Graph/EnterpriseUserPieChart/'
import ProfileComp from '../Profile/CreateProfile'
import ClientOverallDetails from "../RuleOfHundred/ClientOverallDetails";
import FinancialCalculation from '../RuleOfHundred/FinancialCalculation'
import ProfileListDashboard from '../Admin-View/ProfileListDashboard'
import CallToAction from '../RuleOfHundred/CallToAction'
const NethWorth = () => {

    document.title = "Dashboard | ePlan";
    const [rightColumn, setRightColumn] = useState(true);
    const toggleRightColumn = () => {
        setRightColumn(!rightColumn);
    };
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        const userData = sessionStorage.getItem("authUser");
        if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.name);
            console.log(user.name);
            setUserRole(user.role);

        }
    }, []);



    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <Row>
                        <Col>
                            <Card className="p-0 pb-2">
                                <CardHeader className=" ">


                                    <Row>
                                        <Col md={6} className='d-flex align-items-center'>  <h4 className="mb-0">My Networth</h4></Col>
                                        <Col md={6} className='d-flex justify-content-end align-items-center'> <button className='btn btn-primary btn-sm '> <Link to='/rule-of-hundred' className='text-white'> Next </Link></button></Col>
                                    </Row>


                                </CardHeader>
                            </Card>
                            <Widgets />
                        </Col>
                    </Row>

                    <div>

                        {userRole === "Normal" ? (
                            <div>
                                <>
                                    <div >

                                        <Row>
                                            <Col>
                                                <div className="h-100">
                                                    <>

                                                        <NormalUserPie />
                                                        <CallToAction />


                                                    </>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </>
                            </div>
                        )
                            : userRole === "Enterprise" ? (
                                <>
                                    <div className="page-content">

                                        <Row>
                                            <Col>
                                                <div className="h-100">
                                                    <>
                                                        {/* <PortfolioProgress /> */}
                                                        <EnterPriseUserPie />
                                                        <RetirementIncomeGap />
                                                        <ClientOverallDetails />

                                                    </>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </>
                            ) : (<></>)}

                    </div >
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NethWorth;