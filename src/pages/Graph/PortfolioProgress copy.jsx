import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import CountUp from "react-countup";

import { BASE_URL } from '../../utils/config'
const PortfolioProgress = ({ dataColors }) => {

    const [chartData, setChartData] = useState([
        {
            name: "Income Gap",
            data: [20, 150, 20, 250, 30, 350, 40, 450, 50]
        },
        {
            name: "Retirement Income",
            data: [50, 200, 50, 300, 60, 400, 70, 500, 80]
        },
        {
            name: "Income Goal",
            data: [10, 170, 10, 270, 20, 370, 30, 470, 40]
        }
    ]);


    const chartOptions = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 5 },
        colors: ["#f06548", "#45cb85", "#4b38b3"],
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",] },
    };

    return (

        <Row >
            <Col>
                <Card  >
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Portfolio Progress</h4>
                    </CardHeader>
                    <CardBody  >
                        <ReactApexChart
                            dir="ltr"
                            options={chartOptions}
                            series={chartData}
                            type="line"
                            height="350"
                            className="apex-charts"
                        />
                        <Row className="g-0 text-center">
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={3600} decimals={2} suffix={'$'} duration={4} />
                                    </h5>
                                    <p className="text-muted mb-0">Income Gap</p>
                                </div>
                            </Col>
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={9200} decimals={2} suffix={'$'} duration={4} />
                                    </h5>
                                    <p className="text-muted mb-0">Retirement Income</p>
                                </div>
                            </Col>
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-end-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={800} decimals={2} suffix={'$'} duration={4} />
                                    </h5>
                                    <p className="text-muted mb-0">Income Goal</p>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>

    );
};

export default PortfolioProgress;
