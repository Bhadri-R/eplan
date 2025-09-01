import React, { useEffect, useState } from "react"; 
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Card, Row, CardBody, CardHeader, Col } from 'reactstrap';
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from '../../utils/config';

const RetirementIncomeGap = () => {
    const [data, setData] = useState([]);

    const fetchIncomeData = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
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
    
            console.log("Full API Response:", response);
    
            // ✅ Directly map response since data is not inside response.data
            if (response && Array.isArray(response)) {
                const incomeData = response.map(item => ({
                    year: item.year,
                    incomeGoal: item.income_goal,
                    incomeGap: item.income_gap,
                    totalIncome: item.total_income
                }));
    
                console.log("Mapped Data:", incomeData);
    
                setData(incomeData);
            } else {
                console.error("Invalid response format:", response);
                // toast.error("Invalid response from server!");
            }
        } catch (error) {
            console.error("Error fetching income data:", error);
            // toast.error("Failed to fetch income data!");
        }
    };
    
    console.log("Auth User:", JSON.parse(sessionStorage.getItem("authUser")));


    useEffect(() => {
        fetchIncomeData();
    }, []);

    return (
        <Row>
            <Col xxl={12}>
                <Card className="p-0 pb-2">
                    <CardHeader className="border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Retirement Income Gap</h4>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} />
                                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="incomeGoal" stackId="a" fill="#5B9E3D" name="Income Goal" barSize={12} />
                                <Bar dataKey="incomeGap" stackId="a" fill="#FF3030" name="Income Gap" barSize={12} />
                                <Bar dataKey="totalIncome" stackId="b" fill="#3B88E6" name="Total Income" barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default RetirementIncomeGap;
