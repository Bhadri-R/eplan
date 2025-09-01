import React, { useState, useEffect } from "react";
import { Row, Container, CardHeader, Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../utils/config'
// Label mapping for Legend and Tooltip
const labels = {
    totalUsers: "Total Users",
    enterpriseUsers: "Total Enterprise Users",
    freeUsers: "Total Free Users",
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: "white", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <p><strong>{label}</strong></p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {labels[entry.dataKey] || entry.dataKey}: {entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const StackedBarChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch live user growth data from the API
  // Fetch live user growth data from the API
const fetchUserData = async () => {
    setLoading(true);
    try {
        const authUser = JSON.parse(sessionStorage.getItem("authUser"));
        if (!authUser || !authUser.accessToken) {
            console.error("No authentication token found!");
            // toast.error("Authentication failed! Please log in again.");
            return;
        }

        const response = await axios.get(`${BASE_URL}/api/userchart/`, {
            headers: {
                Authorization: `Bearer ${authUser.accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        console.log("Full API Response:", response);

        // Extract the data array from response.data.data (since axios wraps the response in response.data)
        const responseData = response.data || [];

        // Map the API response to the format expected by the BarChart
        const formattedData = responseData.map(item => ({
            date: item.month,
            totalUsers: item.total_users,
            enterpriseUsers: item.enterprise_users,
            freeUsers: item.free_users,
        }));

        setChartData(formattedData);
        console.log("Formatted Chart Data:", formattedData);
    } catch (error) {
        console.error("Error fetching user growth data:", error);
        // toast.error(error.response?.message);
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
        <div>
            <ToastContainer autoClose={3000} />
            <Row>
                <Col>
                    <Card className="p-0 pb-2">
                        <CardHeader>
                            <Row>
                                <Col md={6} className='d-flex align-items-center'>
                                    <h4 className="mb-0">User Growth Analysis</h4>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {loading ? (
                                <div className="text-center">
                                    <p>Loading user growth data...</p>
                                </div>
                            ) : chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                        <Legend
                                            verticalAlign="bottom"
                                            align="center"
                                            iconType="square"
                                            formatter={(value) => <span style={{ color: "#333" }}>{labels[value] || value}</span>}
                                        />
                                        <Bar dataKey="totalUsers" fill="#4b38b3" barSize={10} name="Total Users" />
                                        <Bar dataKey="enterpriseUsers" fill="#28a745" barSize={10} name="Total Enterprise Users" />
                                        <Bar dataKey="freeUsers" fill="#f44336" barSize={10} name="Total Free Users" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center">
                                    <p>No data available.</p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StackedBarChart;