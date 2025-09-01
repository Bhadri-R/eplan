import React from "react";

import './style.css'
const InvestmentTable = () => {
    const investments = [
        { client: "Paul", type: "Savings Account", account: "Home", allocation: "Bank", balance: "$75,000", contributions: "$0.00" },
        { client: "Paul", type: "Checking Account", account: "Bank of America", allocation: "Bank", balance: "$25,000", contributions: "$1,000.00" },
        { client: "Paul", type: "ROtd", account: "National Life", allocation: "Protected", balance: "$20,000", contributions: "$500.00" },
        { client: "Paul", type: "401k", account: "Fidelity", allocation: "Wall Street", balance: "$373,000", contributions: "$950.00" },
        { client: "Paul", type: "Stocks", account: "TD Ameritrade", allocation: "Wall Street", balance: "$15,000", contributions: "$800.00" },
        { client: "Barb", type: "401k", account: "United", allocation: "Wall Street", balance: "$130,000", contributions: "$500.00" },
        { client: "Barb", type: "Checking Account", account: "Citizens", allocation: "Bank", balance: "$23,000", contributions: "$0.00" }
    ];

    return (
        <div>

            <table className=" w-100 assets-info-table mb-4">
                <thead  >
                    <tr>
                        <td colSpan={2}><b>Real Estate</b></td>
                        <td colSpan={1}> $350,000</td>
                        <td colSpan={2}><b>Total Investable Assets</b></td>
                        <td colSpan={1}>$508,000</td>

                    </tr>
                    <tr>
                        <td>Client</td>
                        <td>Type</td>
                        <td>Account</td>
                        <td>Allocation/Risk</td>
                        <td>Current Balance</td>
                        <td>Contributions</td>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment, index) => (
                        <tr key={index}>
                            <td>{investment.client}</td>
                            <td>{investment.type}</td>
                            <td>{investment.account}</td>
                            <td>{investment.allocation}</td>
                            <td>{investment.balance}</td>
                            <td><b>{investment.contributions}</b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvestmentTable;
