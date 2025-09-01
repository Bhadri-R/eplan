const LiabilitiesTable = () => {
    const liabilities = [
        { client: "Joint", type: "Real Estate", account: "Primary Home", description: "", monthlyPayment: "$1,299", balance: "$250,000" },
        { client: "Barb", type: "Student Loan", account: "University", description: "", monthlyPayment: "$199", balance: "$10,000" },
        { client: "Barb", type: "Car Loan", account: "GMC Auto", description: "Jeep", monthlyPayment: "$199", balance: "$2,200" },
        { client: "Barb", type: "Credit Card Debt", account: "W-M Credit", description: "Walmart", monthlyPayment: "$100", balance: "$7,000" },
        { client: "Paul", type: "Credit Card Debt", account: "C!-Credit", description: "Capital One", monthlyPayment: "$100", balance: "$2,500" },
    ];

    return (
        <div >

            <table className=" w-100  mb-4">
                <tbody>
                    <tr className="  ">
                        <td className="p-2  " colSpan={4}> <b>Barbara and Paul Higgins</b></td>
                        <td className="p-2  ">  <b>Total Liabilities </b> </td>
                        <td className="p-2  ">-$271,700</td>

                    </tr>
                    <tr className="  ">
                        <td className="p-2  " colSpan={4}> <b>Liabilities</b></td>
                        <td className="p-2  "> <b>Monthly Obligation</b></td>
                        <td className="p-2  ">-$1,897</td>

                    </tr>
                    <tr className="">
                        <td className="p-2  "><b>Client</b></td>
                        <td className="p-2  "><b>Type</b></td>
                        <td className="p-2  "><b>Account</b></td>
                        <td className="p-2  "><b>Description</b></td>
                        <td className="p-2  "><b>Monthly Payment</b></td>
                        <td className="p-2  "><b>Balance</b></td>
                    </tr>


                    {liabilities.map((item, index) => (
                        <tr key={index} className=" ">
                            <td className="p-2  ">{item.client}</td>
                            <td className="p-2  ">{item.type}</td>
                            <td className="p-2  ">{item.account}</td>
                            <td className="p-2  ">{item.description}</td>
                            <td className="p-2  ">{item.monthlyPayment}</td>
                            <td className="p-2  ">{item.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LiabilitiesTable;
