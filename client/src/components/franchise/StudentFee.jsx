import React, { useEffect, useState } from 'react';
import FranchiseLayout from '.././layout/FranchiseLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

const StudentFee = () => {
    const [allResult, setAllResult] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [data, setData] = useState({
        mobile: '',
        status: '',
        payment: '',
        courseId: '',
        cr: '',
        amountpaid: '',
    });
    let mobile = localStorage.getItem('uid');
    const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;

    const fetchData = async () => {
        try {
            if (decryptedMobile) {
                const { data } = await axios.post('/api/v1/get-student-unpaid-data', { decryptedMobile });
                if (data.success) {

                    const unpaidResults = data.result.filter(item => item.status !== "paid");

                    setAllResult(unpaidResults);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePayment = (value) => {
        setData({
            ...data,
            mobile: value.mobno,
            cr: value.cr,
            yearlyfee: value.yearlyfee,
            amountpaid: value.amountpaid || '0',
            courseId: value.CoId,
            status: value.status
        })
        setPopUp(true);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const uptillfee = parseInt(data.amountpaid)
        const payingamount = parseInt(data.payment)
        const Yearlyfees = parseInt(data.yearlyfee)
        const updatefee = uptillfee + payingamount;
        console.log(uptillfee, payingamount, updatefee)
        if (updatefee > Yearlyfees) {
            return toast.error("Amount can not be greater than YearlyFees")
        }
        const updatedData = {
            ...data,
            amountpaid: updatefee,
            status: updatefee === Yearlyfees ? "paid" : data.status
        };
        try {


            console.log(updatedData)
            const response = await axios.post('/api/v1/submit-student-payment', updatedData)
            if (response.data.success) {
                toast.success(response.data.message)
                setPopUp(false)
                setData({})
                fetchData();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <FranchiseLayout>
            <div className="w-full bg-slate-300 p-4 overflow-y-auto relative">
                <div className="flex flex-col mb-4 p-4 border rounded-md bg-blue-500  shadow-md">
                    <h1 className="text-white  text-2xl font-serif font-bold">
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
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Course Duration</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Current Year</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">yearly Payment</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Total Paid</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {allResult &&
                                allResult.map((el, index) => (

                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-gray-100 transition-all duration-200`}
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{el.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{el.mobno}</td>
                                        <td className="border border-gray-300 px-4 py-2">{el.cr}</td>
                                        <td className="border border-gray-300 px-4 py-2">{el.duration}</td>
                                        <td className="border border-gray-300 px-4 py-2"> {parseInt(el.cy )== 1 ? '1st Year' :
                                            el.currentyear === 2 ? '2nd Year' :
                                                el.currentyear === 3 ? '3rd Year' :
                                                    el.currentyear === 4 ? '4th Year' :
                                                        '5th Year'}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{el.yearlyfee || 'Unpaid'}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{el.amountpaid || '0'}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {el.status || 'unpaid'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {el && el.status == 'paid' ? <button

                                                className="bg-blue-600 w-24 text-white px-3 py-1 rounded-md shadow-md hover:cursor-not-allowed  transition-all duration-200"
                                            >
                                                Paid
                                            </button> : <button
                                                onClick={() => handlePayment(el)}
                                                className="bg-green-600 w-24 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-700 transition-all duration-200"
                                            >
                                                Update
                                            </button>}

                                        </td>
                                    </tr>

                                ))}
                        </tbody>
                    </table>
                </div>


                {popUp && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Student Fee Form
                            </h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div>
                                        <label
                                            htmlFor="cr"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Course Name
                                        </label>
                                        <input onChange={handleChange}
                                            required
                                            type="text"
                                            id="cr"
                                            name='cr'
                                            readOnly
                                            value={data.cr}
                                            placeholder="Enter course name"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="courseId"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Course ID
                                        </label>
                                        <input onChange={handleChange}
                                            required
                                            type="text"
                                            id="courseId"
                                            name='courseId'
                                            readOnly
                                            value={data.courseId}
                                            placeholder="Enter course ID"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="yearlyfee"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Yearly Fee
                                        </label>
                                        <input onChange={handleChange}
                                            required
                                            type="text"
                                            id="yearlyfee"
                                            name='yearlyfee'
                                            readOnly
                                            value={data.yearlyfee}
                                            placeholder="Yearly Fee"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="mobile"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Student Mobile
                                        </label>
                                        <input onChange={handleChange}
                                            required
                                            type="tel"
                                            id="mobile"
                                            name='mobile'
                                            value={data.mobile}
                                            readOnly
                                            placeholder="Enter student mobile number"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="amountpaid"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Amount Paid
                                        </label>
                                        <input onChange={handleChange}
                                            required
                                            type="text"
                                            id="amountpaid"
                                            name='amountpaid'
                                            readOnly
                                            value={data.amountpaid}
                                            placeholder="Paid Fee"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>



                                    {/* <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Fee Status
                                    </label>
                                    <select
                                        onChange={handleChange}
                                        id="status"
                                        name='status'
                                        value={data.status}
                                        required
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Paid">Paid</option>

                                    </select>
                                </div>
                                 */}
                                    <div>
                                        <label
                                            htmlFor="payment"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Payment Amount
                                        </label>
                                        <input onChange={handleChange}
                                            type="number"
                                            id="payment"
                                            required
                                            name='payment'
                                            maxLength={10}
                                            value={data.payment}
                                            placeholder="Enter payment amount"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>



                                </div>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => { setPopUp(false); setData({}) }}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </FranchiseLayout>
    );
};

export default StudentFee;
