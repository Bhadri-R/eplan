import React from "react";
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
const data = [
    { year: "2025", income1: 50000, income2: 60000, total: 70000 },
    { year: "2027", income1: 30000, income2: 80000, total: -100000 },
    { year: "2029", income1: 20000, income2: -120000, total: 140000 },
    { year: "2031", income1: 15000, income2: 140000, total: 160000 },
    { year: "2033", income1: 10000, income2: 180000, total: 190000 },
    { year: "2035", income1: 20000, income2: 200000, total: 250000 },
    { year: "2037", income1: 25000, income2: -220000, total: 270000 },
    { year: "2039", income1: -28000, income2: -230000, total: 290000 },
    { year: "2041", income1: -30000, income2: -250000, total: -320000 },
    { year: "2043", income1: -32000, income2: 270000, total: 350000 },
    { year: "2045", income1: 35000, income2: 290000, total: 380000 },
    { year: "2047", income1: 37000, income2: 300000, total: 400000 },
    { year: "2049", income1: 39000, income2: 320000, total: -420000 },
    { year: "2051", income1: 41000, income2: 340000, total: 440000 },
    { year: "2053", income1: 43000, income2: 350000, total: 460000 },
    { year: "2055", income1: 45000, income2: 360000, total: 480000 },
    { year: "2057", income1: 47000, income2: 380000, total: 500000 },
    { year: "2059", income1: 49000, income2: 400000, total: 520000 },
    { year: "2061", income1: 50000, income2: 420000, total: 540000 }
];

const StackedBarChart = () => {
    return (
        <Row>
            <Col xxl={12}>
                <Card className="p-0 pb-2" >
                    {/* 
                            <CardHeader className="border-0 align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Marketplace</h4>
                            </CardHeader> */}
                    <CardBody  >
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} />
                                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="income1" stackId="a" fill="#5B9E3D" name="Income" />
                                <Bar dataKey="income2" stackId="a" fill="#FF3030" name="Income" />
                                <Bar dataKey="total" stackId="b" fill="#3B88E6" name="Total" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default StackedBarChart;
