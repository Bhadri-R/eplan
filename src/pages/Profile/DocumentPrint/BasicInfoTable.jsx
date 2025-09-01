import React from 'react'
import './style.css'
const BasicInfoTable = () => {
    const formattedDate = new Date("2025-01-17").toLocaleDateString("en-US");

    return (


        <table className=" w-100 basic-info-table mb-4">
            <tbody>
                <tr className=" ">
                    <td className="p-2  highlight-pink" colSpan={2}>Create Date:</td>
                    <td className="p-2 highlight-pink " colSpan={2}>{formattedDate}</td>

                </tr>
                <tr className=" ">
                    <td className="p-2  " colSpan={2}>Prepared By:</td>
                    <td className="p-2" colSpan={2}>Matthew Dunn</td>

                </tr>
                <tr className=" ">
                    <td className="p-2  " colSpan={4}>Prepared For : </td>


                </tr>
                <tr className=" ">
                    <td className="p-2  ">Client Name:</td>
                    <td className="p-2 ">Paul Higgins</td>
                    <td className="p-2  ">Spouse Name:</td>
                    <td className="p-2 ">Barbara Higgins</td>
                </tr>
                <tr className=" ">
                    <td className="p-2  ">Age:</td>
                    <td className="p-2 ">64</td>
                    <td className="p-2  ">Age:</td>
                    <td className="p-2 ">65</td>
                </tr>
                <tr className=" ">
                    <td className="p-2  ">Retirement Age:</td>
                    <td className="p-2 ">68</td>
                    <td className="p-2  ">Retirement Age:</td>
                    <td className="p-2 ">65</td>
                </tr>
                <tr className=" ">
                    <td className="p-2  ">Filing Status:</td>
                    <td className="p-2 " colSpan="3">Married</td>
                </tr>
            </tbody>
        </table>

    );
};

export default BasicInfoTable;

