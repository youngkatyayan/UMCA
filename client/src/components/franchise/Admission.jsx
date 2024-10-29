import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import axios from 'axios'

const Admission = () => {


    const [category, setCategory] = useState([])
    const [session, setSession] = useState([])

    const [formdata, setData] = useState({
        categoryname: '',
        minority: "",
    })
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
        }
    }
    const accesssession = async () => {
        const { data } = await axios.get('/api/v1/get-session')
        if (data.success) {
            setSession(data.result)
        }
    }
    useEffect(() => { accesscategory(); accesssession() }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <FranchiseLayout>
            <div className='flex flex-col flex-1 overflow-auto'>
                <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-slate-400 shadow-md' >
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Admission</h1>
                </div>



                <div className='mt-6 m-4' >
                    <form >
                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Course Details</h2>
                        </div>
                        <div className='grid grid-cols-4  gap-4'>
                            <div>
                                <label htmlFor="categoryname" className='text-lg mb-2'> Select Category</label>
                                <select type='text'
                                    id="categoryname"
                                    onChange={handleChange} value={formdata.categoryname} name="categoryname" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                    <option value="">Select an option</option>
                                    {category.map((item, index) => (
                                        <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                    ))}

                                </select>
                            </div>
                            {
                                formdata.categoryname && (
                                    <div>
                                        <label htmlFor="session" className='text-lg mb-2'>Select Session</label>
                                        <select type='text' onChange={handleChange} value={formdata.session} name="session" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                            <option value="">Select an option</option>
                                            {session.map((item, index) => (
                                                <option key={index} value={item.session}>{item.session}</option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            }

                        </div>

                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Personal Details</h2>
                        </div>
                        <div className='grid grid-cols-4  gap-4'>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Full Name</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="dob" className='text-lg mb-2'>Date of Birth</label>
                                <input type='date' onChange={handleChange} value={formdata.dob} name="dob" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="gender" className='text-lg mb-2'>Gender</label>
                                <select type='text' id='gender' onChange={handleChange} value={formdata.gender} name="gender" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                    <option>select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                           
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>Category</label>
                                <div className='flex flex-row flex-wrap justify-center '>
                                    {['Gen', 'SC', 'ST', 'OBC'].map((category) => (
                                        <label key={category} className='flex justify-items-center m-1 '>
                                            <input
                                                type='radio'
                                                onChange={handleChange}
                                                name='category'
                                                className='m-1 border p-1 rounded-sm border-blue-300 shadow-md' />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>Minority</label>
                                <div className='flex flex-row justify-start '>
                                    {['Yes', 'NO'].map((minority) => (
                                        <label key={minority} className='flex justify-items-center m-2 '>
                                            <input
                                                type='radio'
                                                onChange={handleChange}
                                                name='minority'
                                                className='m-1 border p-1 rounded-sm border-blue-300 shadow-md' />
                                            {minority}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <select htmlFor="name" className='text-md mb-2 w-full'>
                                    <option>Select Father's /Husband's Name</option>
                                    <option value="father name ">Father  Name </option>
                                    <option value="husband N=name ">Husband  Name </option>
                                </select>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="mothername" className='text-lg mb-2'>Mother's Name</label>
                                <input id='mothername' type='text' onChange={handleChange} value={formdata.mothername} name="mothername" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="nationality" className='text-lg mb-2'>Nationality</label>
                                <input type='text' id='nationality' onChange={handleChange} value={formdata.nationality} name="nationality" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>



                        </div>

                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Contact Details</h2>
                        </div>

                        <div className='grid grid-cols-3  gap-4'>

                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Present Address</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Present City</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Present State</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Pemanent Address</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Pemanent City</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Pemanent State</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Mobile No. </label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Whatsapp No. </label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'> Email</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                        </div>
                        <div>
                            <h2 className='text-lg mb-5 mt-5 text-red-800 border border-b-rose-700 '>Education Details</h2>
                        </div>

                        <div className='grid grid-cols-4  gap-4'>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>High School Name</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>High School Board Name</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>High School Percent/CGPA</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>Mobile</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>Address</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>City</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>State</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            {/* <div>
                                <label htmlFor="name" className='text-lg mb-2'>City</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div>
                            <div>
                                <label htmlFor="name" className='text-lg mb-2'>City</label>
                                <input type='text' onChange={handleChange} value={formdata.name} name="city" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                            </div> */}

                        </div>
                    </form>


                </div>

            </div>
        </FranchiseLayout>
    )
}

export default Admission