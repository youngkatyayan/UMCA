
import React, { useEffect, useState } from 'react';
import FranchiseLayout from '.././layout/FranchiseLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const PaidStudent = () => {
    const [allResult, setAllResult] = useState(null);

    let mobile = localStorage.getItem('uid');
    const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;

    const fetchData = async () => {
        try {
            if (decryptedMobile) {
                const { data } = await axios.post('/api/v1/get-student-unpaid-data', { decryptedMobile });
                if (data.success) {
                    setAllResult(data.result);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <FranchiseLayout>
            <div className="w-full bg-slate-300 p-4 overflow-y-auto relative">
                <div className="flex flex-col mb-4 p-4 border rounded-md bg-white shadow-md">
                    <h1 className="text-black text-2xl font-serif font-bold">
                        Student Fee Statement
                    </h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-sm md:text-base">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Mobile</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Course Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Payment</th>
                                {/* <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Action</th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {allResult &&
                                allResult.map((el, index) => (
                                    el.status === 'Paid' && (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                } hover:bg-gray-100 transition-all duration-200`}
                                        >
                                            <td className="border border-gray-300 px-4 py-2">{el.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{el.mobno}</td>
                                            <td className="border border-gray-300 px-4 py-2">{el.cr}</td>
                                            <td className="border border-gray-300 text-green-900 font-semibold px-4 py-2 text-center">
                                                {el.status}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {el.payment}
                                            </td>
                                           
                                        </tr>
                                    )
                                  
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </FranchiseLayout>
    );
};

export default PaidStudent;
