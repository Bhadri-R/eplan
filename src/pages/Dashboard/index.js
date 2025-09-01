import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody, CardHeader } from "reactstrap";
import Widget from "./Widgets";
import Greeting from "./Greeting";
import PortfolioProgress from "../Graph/PortfolioProgress";
import RetirementIncomeGap from "../Graph/RetirementIncomeGap";
import AdPopup from "./AdPopup"; // Import the ad popup
import EnterPriseUserPie from '../Graph/EnterpriseUserPieChart/EnterPriseUserPie'
import ProfileComp from '../Profile/CreateProfile'
import UserBarGraph from '../Graph/UserBarGraph'
import ProfileList from '../Admin-View/ProfileList'
import ProfileListDashboard from '../Admin-View/ProfileListDashboard'
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
          <div  >

            <>
              <Row>
                <Col>
                  <>

                    <ProfileComp />
                  </>

                </Col>
              </Row>
              <AdPopup />
            </>
          </div>
        )
          : userRole == "Enterprise" ? (
            <>
              <div className="page-content">

                <Row>
                  <Col>
                    <div className="h-100">
                      <>
                        <Greeting rightClickBtn={toggleRightColumn} />
                        <Row>
                          <Widget />
                        </Row>

                        {/* <PortfolioProgress /> */}

                        <EnterPriseUserPie />

                        <RetirementIncomeGap />
                      </>
                    </div>
                  </Col>
                </Row>
              </div>

            </>
          ) : userRole === "Admin" ? (
            <div className="page-content">
              <>
                <Greeting rightClickBtn={toggleRightColumn} />
                <UserBarGraph />

                <ProfileListDashboard />
              </>
            </div >
          ) : (<></>)}

      </Container >
    </React.Fragment >
  );
};

export default DashboardEcommerce;
