import React, { useEffect, useState } from 'react';
import SuperAdminLayout from '../../layout/SuperAdminLayout';
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';

const PaidUnpaidList = () => {
    const [branchOptions, setbranchOptions] = useState([])
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        branchName: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/filter-dataofstudent-byadmin', formData)
            console.log(data)

        } catch (error) {
            console.log(error.message)
        }

    };
    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const { data } = await axios.get('/api/v1/get-franchise')
                if (data.success) {
                    setbranchOptions(data.result)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchFranchise()
    }, [])
    const statusOptions = ["Paid", "Unpaid"];

    return (
        <SuperAdminLayout>
            <div className="w-full bg-slate-300 p-6 overflow-y-auto relative">
                <div
                    className="flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative text-white"
                    style={{ backgroundImage: `url(${AddCollege})` }}
                >
                    <h1 className="text-2xl m-4 p-2 font-serif font-bold bg-black/50">
                        Paid-Unpaid Franchisewise Student
                    </h1>
                </div>

                <div className=" p-2 rounded-md shadow-md  w-full">

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Franchise Name</label>
                            <select
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Franchise</option>
                                {branchOptions.map((branch, index) => (
                                    <option key={index} value={branch.cmmob}>
                                        {branch.cmname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select status</option>
                                {statusOptions.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="max-w-[8rem] mx-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 col-span-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>


            </div>
        </SuperAdminLayout>
    );
};

export default PaidUnpaidList;
