import React, { useState, useEffect } from "react"; 
import ReactApexChart from "react-apexcharts";
import { Row, Card, CardBody, CardHeader, Col } from 'reactstrap';
import CountUp from "react-countup";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from '../../utils/config';

const PortfolioProgress = ({ dataColors }) => {

    const [chartData, setChartData] = useState([]);
    const [xAxisCategories, setXAxisCategories] = useState([]);
    const [incomeGap, setIncomeGap] = useState(0);
    const [retirementIncome, setRetirementIncome] = useState(0);
    const [incomeGoal, setIncomeGoal] = useState(0);

    // ✅ Fetch Data from API
    const fetchChartData = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                // toast.error("Authentication failed! Please log in again.");
                return;
            }

            const response = await axios.get(`${BASE_URL}/api/graph/financial-projection/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("Financial Projection API Response:", response);

            if (response && Array.isArray(response)) {
                const years = response.map(item => item.year);
                const incomeGapData = response.map(item => item.income_gap);
                const retirementIncomeData = response.map(item => item.total_income);
                const incomeGoalData = response.map(item => item.income_goal);

                setXAxisCategories(years);
                setChartData([
                    { name: "Income Gap", data: incomeGapData },
                    { name: "Retirement Income", data: retirementIncomeData },
                    { name: "Income Goal", data: incomeGoalData }
                ]);

                // ✅ Set the latest values for the CountUp display
                if (response.length > 0) {
                    const latestData = response[response.length - 1];
                    setIncomeGap(latestData.income_gap);
                    setRetirementIncome(latestData.total_income);
                    setIncomeGoal(latestData.income_goal);
                }
            } else {
                // toast.error("Invalid response from server!");
            }
        } catch (error) {
            console.error("Error fetching financial projection data:", error);
            // toast.error("Failed to fetch financial projection data!");
        }
    };

    useEffect(() => {
        fetchChartData(); // ✅ Fetch data on component mount
    }, []);

    // ✅ Chart Options
    const chartOptions = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#f06548", "#45cb85", "#4b38b3"],
        xaxis: {
            categories: xAxisCategories, // ✅ Dynamic x-axis based on year
            labels: {
                style: {
                    colors: '#888',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (value) => `$${value.toLocaleString()}`
            }
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true
        },
        grid: {
            borderColor: "#f1f1f1",
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Portfolio Progress</h4>
                    </CardHeader>
                    <CardBody>
                        <ReactApexChart
                            options={chartOptions}
                            series={chartData}
                            type="line"
                            height={350}
                            className="apex-charts"
                        />

                        {/* ✅ Summary Row */}
                        <Row className="g-0 text-center">
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={incomeGap} decimals={2} suffix={'$'} duration={4} />
                                    </h5>
                                    <p className="text-muted mb-0">Income Gap</p>
                                </div>
                            </Col>
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={retirementIncome} decimals={2} suffix={'$'} duration={4} />
                                    </h5>
                                    <p className="text-muted mb-0">Retirement Income</p>
                                </div>
                            </Col>
                            <Col sm={4} className="col-6">
                                <div className="p-3 border border-dashed border-end-0">
                                    <h5 className="mb-1">
                                        <CountUp start={0} end={incomeGoal} decimals={2} suffix={'$'} duration={4} />
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
