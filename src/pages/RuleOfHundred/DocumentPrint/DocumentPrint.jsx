import React, { useRef } from "react";
import { CardBody, Row, Col, Card, Table, CardHeader, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './style.css'
import logoDark from "../../../assets/images/eplan-logo.png";
import BasicInfoTable from './BasicInfoTable'
import InvestmentTable from './AssetsTable'
import NetWorthTable from './NetWorthTable'
import LiabilitiesTable from './LiabilitiesTable'
import RetirementIncomeTable from './RetirementIncomeTable'
import AssestsAllocationGraph from "../../Graph/AssestsAllocationGraph";
import RetirementIncomeGap from "../../Graph/RetirementIncomeGap";
import EnterPriseUserPie from "../../Graph/EnterpriseUserPieChart/EnterPriseUserPie";
const DocumentPrint = () => {
  const invoiceRef = useRef(); // Reference for capturing invoice content
  const formattedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
  const downloadPDF = () => {
    const input = invoiceRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("document.pdf");
    });
  };





  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="justify-content-center downloadpdf ">
          <Col xxl={9}>

            <div ref={invoiceRef}>
              <Row className="justify-content-center ">
                <Col >
                  <Card id="demo" className="p-4">
                    <Row>
                      <Col lg={12}>
                        <CardBody className="p-4">
                          <div className="d-sm-flex">
                            <div className="flex-grow-1">
                              <img
                                src={logoDark}
                                className="card-logo card-logo-dark mb-3"
                                alt="logo dark"
                                height="75"
                              /> 
                         
                              <div className="">

                                <p className="text-muted mb-1" id="address-details">
                                  255 Park Ave. 10th Floor - Suite 1000 <br />
                                  Worcester MA, 01609
                                </p>
                                <div className="mt-2">
                                  <p className="eplan-heading mb-2 ">   My-ePlan Financial Review</p>
                                  <p className="currentDate mb-0">{formattedDate} </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col>
                              <p className="side-heading mt-4 mb-2">
                                Overview
                              </p>
                              <p className="contents">
                                Thank you for choosing ePlan Advisors! The following is a comprehensive overview of the strategies
                                and financial options outlined in our initial meeting. The focus of this report is primarily based on our
                                fact finding discussion. Our goal is to take a
                                holistic approach to your finances with an eye on you achieving financial success in retirement
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Basic Profile Information</p>
                              </div>
                            </Col>
                          </Row>


                          {/* Basic Profile Information */}

                          <Row>
                            <Col>
                              <BasicInfoTable />
                            </Col>
                          </Row>
                          {/* Basic Profile Information */}

                          {/* Assets */}/
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Assets</p>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <p className="contents">
                                We’ll use the information you gave regarding your assets, liabilities, and retirement to help you make some
                                educated decisions on how to best prepare
                                you for retirement by properly adjusting the asset allocation of your portfolio.
                              </p></Col>

                          </Row>
                          <Row>
                            <InvestmentTable />
                          </Row>
                          {/* Assets */}


                          {/* Liabilities */}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Liabilities</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <LiabilitiesTable />
                          </Row>
                          <Row className="mt-4">
                            <Col>
                              <p className="contents">
                                We’ll use the information you gave regarding your assets, liabilities, and retirement to help you make some
                                educated decisions on how to best prepare
                                you for retirement by properly adjusting the asset allocation of your portfolio.
                              </p></Col>

                          </Row>

                          {/* Liabilities */}

                          {/* Net Worth */}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Net Worth</p>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col> <p className="contents">
                              Your net worth is calculated by subtracting your liabilities from your assets.
                            </p></Col>

                          </Row>
                          {/* Net Worth */}



                          <Row>
                            <NetWorthTable />
                          </Row>

                          {/* Retirement Income Sources */}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Retirement Income Sources</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>  <p className="contents">
                              Retirement income can come from a number of sources with Social Security being a part
                              of most individuals' portfolios. We encourage you to visit <a href=" https://www.ssa.gov/OACT/quickcalc/">
                                https://www.ssa.gov/OACT/quickcalc/</a> in to check the status of your social security payment with the government.
                            </p></Col>
                          </Row>
                          <Row>
                            <Col>
                              <RetirementIncomeTable /></Col>
                          </Row>
                          {/* Retirement Income Sources */}


                          {/* Rule of 100 Specifications*/}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Rule of 100 Specifications</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="contents">
                                The Rule of 100 is a simple guideline for determining the
                                appropriate mix of stocks and bonds in an investment portfolio.
                                It suggests that you subtract your age from 100, and the resulting
                                number represents the percentage of your portfolio that should be allocated to stocks.
                                The remainder should be invested in bonds or other safer assets. For example, a 30-year-old investor
                                would allocate 70% of their portfolio to stocks and 30% to bonds. This rule reflects the idea that as you get older and
                                closer to retirement, you
                                typically become more risk-averse and should shift towards more conservative investments.
                              </p></Col>
                          </Row>

                          {/* Rule of 100 Specifications*/}


                          {/* Asset Allocation Charts*/}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Asset Allocation Charts</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>

                              <EnterPriseUserPie />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="contents">
                                The illustrations below represent the jointly agreed upon
                                between the advisor and the client asset allocation.
                              </p></Col>
                          </Row>
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Retirement Income Gap</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            < RetirementIncomeGap />
                          </Row>


                          {/*Asset Allocation Charts*/}
                          {/* Asset Allocation Charts*/}
                          <Row>
                            <Col className="d-flex justify-content-center mb-4">
                              <div className="heading-cont ">
                                <p className="mb-0">Disclaimers</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>

                            <Col>
                              <ol>
                                <li>
                                  The information contained herein was provided by
                                  sources we believe to be reliable but the accuracy of such cannot be guaranteed.
                                </li>
                                <li>The account values given are quoted as of {Date} and are subject to change without notice.
                                  All account values are based upon information supplied by the client. </li>
                                <li>
                                  Investing involves risk. You may lose money in
                                  investing in any mutual fund, Exchange Traded Fund (“ETF”) or variable annuity.
                                  Non-publicly traded REITs and BDCs may be illiquid and carry a high amount of risk.
                                  It is important to read the prospectus for any investment for important information
                                  and the risks associated with the investment prior to investing. Most investments
                                  are not bank products and are not protected by FDIC or any other governmental agency.
                                  Past performance is not indicative of future performance.
                                </li>
                                <li>
                                  This report is a hypothetical illustration of mathematical principles that does not predict
                                  or project the performance of any specific investment portfolio or investment strategy.
                                  All assumptions including projected rate or return, assumed inflation rate, pension inflation
                                  rate, and growth rate for Investment Principal (Retirement Savings) are for illustrative
                                  use only. All figures for social security amount, pension amount and other retirement
                                  income are provided by
                                  the client. Past performance is not indicative of future performance.
                                </li>
                                <li>
                                  Information provided is general and educational in nature, and is not intended to be,
                                  and should not be construed as, legal, tax or investment advice. ePlan Advisors and the
                                  presenter of
                                  this information does not provide legal or tax advice. Laws of a specific
                                  state or laws relevant to a particular situation may affect the applicability,
                                  accuracy or completeness of this information.Federal and state laws and regulations
                                  are complex and subject to change. ePlan Advisors makes no warranties with regard to
                                  the information or results obtained by its use. ePlan Advisors disclaims any liability
                                  arising
                                  out of agent’s use of, or reliance on, the information.
                                </li>
                                <li>
                                  This review does not constitute individualized tax or legal advice;
                                  you are encouraged to contact your own legal and tax consultants before
                                  making any decisions.This review is based upon current tax and estate planning
                                  law and upon information which you provided to us as of a particular date; we
                                  have relied upon such information in preparing this review.Any material change
                                  in the information you provided or in relevant tax and / or estate law could make
                                  this review materially inaccurate.You are encouraged
                                  to contact us if you wish to update your review.
                                </li>
                              </ol>
                            </Col>
                          </Row>

                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row >
            </div>

            {/* Download PDF Button */}
            <Card>

              <CardBody className="text-end">
                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                  <Button color="success" onClick={handlePrint}

                  >
                    <i className="ri-printer-line align-bottom me-1"></i> Print
                  </Button>
                  <Button color="primary" onClick={downloadPDF}>
                    <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                    Download
                  </Button>


                </div>

              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default DocumentPrint;
