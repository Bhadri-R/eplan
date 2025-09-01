import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody, CardHeader } from "reactstrap";
import PortfolioProgress from "../Graph/PortfolioProgress";
import RetirementIncomeGap from "../Graph/RetirementIncomeGap";
import EnterPriseUserPie from '../Graph/EnterpriseUserPieChart/EnterPriseUserPie'
import NormalUserPie from '../Graph/NormalUserPieChart/NormalUserPie'
// import EnterPriseUserPie from '../Graph/EnterpriseUserPieChart/'
import ProfileComp from '../Profile/CreateProfile'
import ClientOverallDetails from "./ClientOverallDetails";
import FinancialCalculation from './FinancialCalculation'
import ProfileListDashboard from '../Admin-View/ProfileListDashboard'
import CallToAction from './CallToAction'
const DashboardEcommerce = () => {
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

            <Container fluid>

                {userRole === "Normal" ? (
                    <div>
                        <>
                            <div className="page-content">

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

            </Container >
        </React.Fragment >
    );
};

export default DashboardEcommerce; 
