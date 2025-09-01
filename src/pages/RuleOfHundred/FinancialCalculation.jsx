import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from '../../utils/config'
const FinancialCalculation = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                // toast.error("Authentication failed! Please log in again.");
                setLoading(false);
                return;
            }


            const response = await axios.get(
                `${BASE_URL}/api/finance/financial/`,
                {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            console.log("Response Data:", response);
            setTableData(response);

        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row className="mt-4">
            <Col>
                <h4> Financial Summary </h4>
                {loading ? (
                    <div>Loading data...</div>
                ) : tableData?.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className=" text-nowrap text-center">
                                <tr>
                                    <th>Year</th>
                                    <th>Client Age</th>
                                    <th>Retirement <br /> Age</th>
                                    <th>Spouse Age</th>
                                    <th>Spouse  <br />  Retirement Age</th>
                                    <th>Total Income</th>
                                    <th>Income Goal</th>
                                    <th>Income Gap</th>
                                    <th>Client  <br />  SOC Income</th>
                                    <th>Client  <br />  Pension Income</th>
                                    <th>Client   <br /> Salary Income</th>
                                    <th>Client  <br />  Other Income</th>
                                    <th>Client  <br />  401k Balance</th>
                                    <th>Client  <br />  Roth Balance</th>
                                    <th>Spouse  <br />  SOC Income</th>
                                    <th>Spouse  <br />  Pension Income</th>
                                    <th>Spouse  <br />  Salary Income</th>
                                    <th>Spouse  <br />  Other Income</th>
                                    <th>Spouse  <br />  401k Balance</th>
                                    <th>Spouse  <br /> Roth Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.year}</td>
                                        <td>{data.client_age}</td>
                                        <td>{data.retirement_age}</td>
                                        <td>{data.spouse_age}</td>
                                        <td>{data.spouse_retirement_age}</td>
                                        <td>{data.total_income?.toFixed(2)}</td>
                                        <td>{data.income_goal?.toFixed(2)}</td>
                                        <td>{data.income_gap?.toFixed(2)}</td>
                                        <td>{data.client_soc_income}</td>
                                        <td>{data.client_pension_income}</td>
                                        <td>{data.client_salary_income}</td>
                                        <td>{data.client_other_income}</td>
                                        <td>{data.client_401k_balance?.toFixed(2)}</td>
                                        <td>{data.client_roth_balance?.toFixed(2)}</td>
                                        <td>{data.spouse_soc_income}</td>
                                        <td>{data.spouse_pension_income}</td>
                                        <td>{data.spouse_salary_income}</td>
                                        <td>{data.spouse_other_income}</td>
                                        <td>{data.spouse_401k_balance?.toFixed(2)}</td>
                                        <td>{data.spouse_roth_balance?.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div></div>
                )}
            </Col>
        </Row>
    );
};

export default FinancialCalculation;
