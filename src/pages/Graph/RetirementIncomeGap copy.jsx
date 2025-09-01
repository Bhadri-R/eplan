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
import { BASE_URL } from '../../utils/config'
const data = [
    { year: "2025", incomeGoal: 50000, incomeGap: 60000, totalIncome: 70000 },
    { year: "2027", incomeGoal: 30000, incomeGap: 80000, totalIncome: -100000 },
    { year: "2029", incomeGoal: 20000, incomeGap: -120000, totalIncome: 140000 },
    { year: "2031", incomeGoal: 15000, incomeGap: 140000, totalIncome: 160000 },
    { year: "2033", incomeGoal: 10000, incomeGap: 180000, totalIncome: 190000 },
    { year: "2035", incomeGoal: 20000, incomeGap: 200000, totalIncome: 250000 },
    { year: "2037", incomeGoal: 25000, incomeGap: -220000, totalIncome: 270000 },
    { year: "2039", incomeGoal: -28000, incomeGap: -230000, totalIncome: 290000 },
    { year: "2041", incomeGoal: -30000, incomeGap: -250000, totalIncome: -320000 },
    { year: "2043", incomeGoal: -32000, incomeGap: 270000, totalIncome: 350000 },
    { year: "2045", incomeGoal: 35000, incomeGap: 290000, totalIncome: 380000 },
    { year: "2047", incomeGoal: 37000, incomeGap: 300000, totalIncome: 400000 },
    { year: "2049", incomeGoal: 39000, incomeGap: 320000, totalIncome: -420000 },
    { year: "2051", incomeGoal: 41000, incomeGap: 340000, totalIncome: 440000 },
    { year: "2053", incomeGoal: 43000, incomeGap: 350000, totalIncome: 460000 },
    { year: "2055", incomeGoal: 45000, incomeGap: 360000, totalIncome: 480000 },
    { year: "2057", incomeGoal: 47000, incomeGap: 380000, totalIncome: 500000 },
    { year: "2059", incomeGoal: 49000, incomeGap: 400000, totalIncome: 520000 },
    { year: "2061", incomeGoal: 50000, incomeGap: 420000, totalIncome: 540000 }
];

const RetirementIncomeGap = () => {
    return (
        <Row>
            <Col xxl={12}>
                <Card className="p-0 pb-2" >

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
