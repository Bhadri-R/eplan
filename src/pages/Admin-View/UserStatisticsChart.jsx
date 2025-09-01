import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import ProjectsOverviewCharts from './UserOverView';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserStatisticsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [enterpriseUsers, setEnterpriseUsers] = useState(0);
    const [freeUsers, setFreeUsers] = useState(0);

    // Fetch live user growth data from the API
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                toast.error("Authentication failed! Please log in again.");
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/userchart/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("Full API Response:", response);

            // Extract the data array directly from the response (not response.data)
            const responseData = response.data || [];

            // Calculate totals for the statistics
            const totalUsersSum = responseData.reduce((sum, item) => sum + item.total_users, 0);
            const enterpriseUsersSum = responseData.reduce((sum, item) => sum + item.enterprise_users, 0);
            const freeUsersSum = responseData.reduce((sum, item) => sum + item.free_users, 0);

            // Update state with the totals
            setTotalUsers(totalUsersSum);
            setEnterpriseUsers(enterpriseUsersSum);
            setFreeUsers(freeUsersSum);

            // Format data for ProjectsOverviewCharts
            const formattedChartData = [
                { id: 1, name: "Number of Users", value: totalUsersSum },
                { id: 2, name: "Number of Enterprise Users", value: enterpriseUsersSum },
                { id: 3, name: "Number of Free Users", value: freeUsersSum },
            ];

            setChartData(formattedChartData);
            console.log("Formatted Chart Data:", formattedChartData);
        } catch (error) {
            console.error("Error fetching user growth data:", error);
            toast.error(error.response?.message );
            // Reset to default values on error
            setTotalUsers(0);
            setEnterpriseUsers(0);
            setFreeUsers(0);
            setChartData([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                {/* <ToastContainer autoClose={3000} /> */}
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader className="border-0 align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Overall User Statistics</h4>
                                <div className="d-flex gap-1">
                                    <button type="button" className="btn btn-soft-secondary btn-sm shadow-none">
                                        ALL
                                    </button>
                                    <button type="button" className="btn btn-soft-secondary btn-sm shadow-none">
                                        1M
                                    </button>
                                    <button type="button" className="btn btn-soft-secondary btn-sm shadow-none">
                                        6M
                                    </button>
                                    <button type="button" className="btn btn-soft-primary btn-sm shadow-none">
                                        1Y
                                    </button>
                                </div>
                            </CardHeader>

                            <CardHeader className="p-0 border-0 bg-light-subtle">
                                {loading ? (
                                    <Row className="g-0 text-center">
                                        <Col xs={12}>
                                            <p className="text-muted mb-0">Loading user statistics...</p>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row className="g-0 text-center">
                                        <Col xs={6} sm={4}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1">
                                                    <CountUp start={0} end={totalUsers} separator="," duration={4} />
                                                </h5>
                                                <p className="text-muted mb-0">Number of Users</p>
                                            </div>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1 text-primary">
                                                    <CountUp start={0} end={enterpriseUsers} separator="," duration={4} />
                                                </h5>
                                                <p className="text-muted mb-0">Number of Enterprise Users</p>
                                            </div>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1 text-danger">
                                                    <CountUp start={0} end={freeUsers} separator="," duration={4} />
                                                </h5>
                                                <p className="text-muted mb-0">Number of Free Users</p>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </CardHeader>

                            <CardBody className="p-0 pb-2">
                                <div>
                                    <ProjectsOverviewCharts
                                        series={chartData}
                                        dataColors='["--vz-primary", "--vz-warning", "--vz-success"]'
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default UserStatisticsChart;