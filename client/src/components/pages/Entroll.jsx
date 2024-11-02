import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Userlayout from '../layout/Userlayout';
const Entroll = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { course } = location.state || {};
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        state: '',
        promoCode: '',
        district:''
    });

    const programDetails = {
        name: 'Data Analyst',
        duration: '11 months',
        accessValidity: '335 days',
        basePrice: 52999,
        gstRate: 0.18
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const calculatePrices = () => {
        const gstAmount = course?.yearlyfee * programDetails.gstRate;
        const total = course?.yearlyfee + gstAmount;
        return {
            basePrice: course?.yearlyfee,
            gstAmount: gstAmount,
            total: total
        };
    };

    const prices = calculatePrices();

    return (
        <Userlayout>
            <div className="max-h-screen bg-blue-50 p-6">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

                    {/* Left Section - Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-t-lg">
                            <h2 className="text-white text-lg font-semibold">1. Basic Details</h2>
                        </div>

                        <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Name*"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone number<span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Phone Number*"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email ID<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Email*"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="flex-1 p-2 border rounded focus:ring-2 w-full focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="State Name*"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    District<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="flex-1 p-2 border rounded focus:ring-2 w-full focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="District Name*"
                                />
                            </div>

                            {/* <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="hasGST"
                                    checked={formData.hasGST}
                                    onChange={handleInputChange}
                                    className="rounded text-blue-500 focus:ring-blue-500"
                                />
                                <label className="text-sm text-gray-600">
                                    I have a GST Number (Optional)
                                </label>
                            </div> */}

                            <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors">
                                Proceed
                            </button>
                        </div>

                        <div className="mt-6">
                            <button className="text-blue-600 flex items-center gap-2" onClick={() => navigate(-1)}>
                                <span>←</span> Go back to program
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </span>
                                <h2 className="text-lg font-semibold">Order Summary</h2>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">{course?.coursename}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Duration: {course?.duration}</span>
                                    {/* <span>•</span>
                                    <span>Access Validity: {programDetails.accessValidity}</span> */}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span>Program Fees</span>
                                    <span>₹ {course?.yearlyfee}</span>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        name="promoCode"
                                        value={formData.promoCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter code here"
                                        className="flex-1 p-2 border rounded"
                                    />
                                    <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                                        APPLY
                                    </button>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Billing Details</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Price</span>
                                        <span>₹ {course?.yearlyfee}</span>
                                    </div>
                                    {/* <div className="flex justify-between text-gray-600">
                                        <span>GST (18.00%)</span>
                                        <span>₹ {prices.gstAmount}</span>
                                    </div> */}
                                    <div className="flex justify-between font-semibold">
                                        <span>Grand Total</span>
                                        <span>₹ {prices.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Userlayout>
    );
};

export default Entroll;
