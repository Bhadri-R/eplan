import React from 'react'
import './style.css'
const NetWorthTable = () => {
    const formattedDate = new Date("2025-01-17").toLocaleDateString("en-US");

    return (


        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className=" w-100 basic-info-table mb-4">
                        <tbody>
                            <tr className=" ">
                                <td className="p-2 "><b>Net Worth :</b></td>
                                <td className="p-2 highlight-blue-bg " colSpan={2}><b>$508,000</b></td>
                            </tr>
                        </tbody>
                    </table >
                </div>
            </div>
        </div>

    );
};

export default NetWorthTable;

