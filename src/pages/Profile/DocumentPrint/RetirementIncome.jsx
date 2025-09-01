const RetirementIncome = () => {
    const incomeData = [
        { client: "Barb", type: "Social Security", account: "Social Security", description: "Social Security", amount: "$28,000" },
        { client: "Paul", type: "Social Security", account: "Social Security", description: " Social Security", amount: "$34,000" },
        { client: "Paul", type: "Other", account: "Rental Property", description: "Rental Propety", amount: "$15,000" },
        { client: "Paul", type: "Pension", account: "Pension", description: "Pension", amount: "$75,000" },
        { client: "Barb", type: "Pension", account: "Pension", description: "Pension", amount: "$20,000" },
    ];

    return (
        <div>
            <table className="w-100   mb-4">
                <tbody>
                 
                    <tr>
                        <td className="p-2"><b>Client</b></td>
                        <td className="p-2"><b>Type</b></td>

                        <td className="p-2"><b>Description</b></td>
                        <td className="p-2"><b>Amount</b></td>
                    </tr>

                    
                    {incomeData.map((item, index) => (
                        <tr key={index}>
                            <td className="p-2">{item.client}</td>
                            <td className="p-2">{item.type}</td>

                            <td className="p-2">{item.description}</td>
                            <td className="p-2">{item.amount}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="p-2" colSpan={2}><b>Total Income</b></td>
                        <td className="p-2" colSpan={2}><b>$85,000</b></td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RetirementIncome;
