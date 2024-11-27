import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FranchiseLayout from '../layout/FranchiseLayout';

const PayFee = () => {
    const location = useLocation();
    
    const initialData = location.state?.data || {
        name: '',
        studentId: '',
        amountpaid: '',
        cy: '',
        yearlyfee: ''
    };
    const [data, setData] = useState(initialData);
    console.log(data)
    useEffect(() => {
        if (location.state?.data) {
            // setData(location.state.data);
        }
    }, [location.state]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData(prev=>({...prev,[name]:value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", data);
        // Submit the form data to your API or backend
    };

    return (
        <FranchiseLayout>
            <div className="w-full bg-slate-300 p-4 overflow-y-auto relative">
                <div className="flex flex-col mb-4 p-4 border rounded-md bg-blue-500  shadow-md">
                    <h1 className="text-white  text-2xl font-serif font-bold">
                        Student Fee Submission
                    </h1>
                </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='grid grid-cols-3 gap-3grid lg:grid-cols-4 md:grid-col-3 sm:grid-cols-2 gap-4  px-2'>

                        
                        <div>
                            <label htmlFor="name" className="text-lg mb-2">Student Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="SId" className="text-lg mb-2">Student ID:</label>
                            <input
                                type="text"
                                id="SId"
                                name="SId"
                                value={data.SId}
                                readOnly
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="yearlyfee" className="text-lg mb-2">Yearly Fee:</label>
                            <input
                                type="number"
                                id="yearlyfee"
                                name="yearlyfee"
                                value={data.yearlyfee}
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="amountpaid" className="text-lg mb-2">Amount Paid:</label>
                            <input
                                type="number"
                                id="amountpaid"
                                name="amountpaid"
                                value={data.amountpaid}
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="cy" className="text-lg mb-2">Update Current Year:</label>
                            <input
                                type="number"
                                id="cy"
                                name="cy"
                                value={data.cy}
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="payingyearfee" className="text-lg mb-2">Paying Fee Year:</label>
                            <input
                                type="number"
                                id="payingyearfee"
                                name="payingyearfee"
                                value={data.payingyearfee}
                                onChange={handleChange}
                                className="w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1"
                            />
                        </div>
                   
                        </div>
                        <div className='flex flex-row justify-center'>
                            <button type='submit' className='transition-shadow w-40 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 text-xl' style={{
                                background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 0%, rgba(0,172,255,1) 100%)'
                            }}>Submit</button>

                        </div>
                    </form>
                </div>
        </FranchiseLayout>
    );
};

export default PayFee;
