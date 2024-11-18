import React, { useState, useEffect } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout.jsx'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

import { MdEdit } from 'react-icons/md';

const CreateCommission = () => {

    const [formdata, setData] = useState({
        startdate: '',
        groupname: '',
        commissionper: "",
        enddate: '',
        totalcommission:''
    })
    const [commission, setCommission] = useState([])
    const [category, setCategory] = useState([])

    const [group, setGroup] = useState([])
    const [updateC, setUpdateC] = useState(false)
    const accessdata = async () => {
        try {
            const { data } = await axios.get('/api/v1/get-group')

            if (data.success) {
                if (data.result) {
                    setGroup(data.result)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const accesscommission = async () => {
        const { data } = await axios.get('/api/v1/get-commission')
        if (data.success) {
            setCommission(data.result)
            console.log(data.result)
        }
    }
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
            console.log(data.result)
            console.log(category)
        }
    }

    useEffect(() => {
        accessdata();
        accesscommission();
        accesscategory();
    }, [])



    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

        if(name==='categoryname'){
            const totalcomm=category.find(item=>value===item.categoryname)
            const Totalcomm=totalcomm.totalcommission
            console.log(Totalcomm)
            
            
            setData(prevData => ({ ...prevData, totalcommission: Totalcomm }))
        }

        if(name==='groupname'){
            
            const {data}=await axios.post('/api/v1/get-grouponcatery',{value})
            setCategory(data.result)


        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/add-commission', formdata);
            if (data.success) {
                setTimeout(() => toast.success(data.message), 0);
                setData({
                    category: '',
                    groupname: '',
                    description: '',
                });
                accesscategory();
                accesscommission();
            } else {
                toast.error('Failed to add commission');
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleEdit = async (item) => {
        setUpdateC(true)
        const formattedstartDate = item.startdate ? new Date(item.startdate).toISOString().split('T')[0] : '';
        const formattedendDate = item.enddate ? new Date(item.enddate).toISOString().split('T')[0] : '';

        setData({
            ...formdata,
            commissionper: item.commissionper || '',
            groupname: item.groupname || '',
            CMId: item.CMId || '',
            categoryname:item.categoryname || '',
            totalcommission:item.totalcommission ||'',
            startdate: formattedstartDate,
            enddate: formattedendDate
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            console.log(formdata)
            const { data } = await axios.post('/api/v1/update-commission', formdata)
            if (data.success) {
                toast.success(data.message);
                setData({
                    category: '',
                    groupname: '',
                    description: ''
                })
                accesscategory()
                setUpdateC(false)
            }
            else {
                console.log('error')
            }
        } catch (error) {
            console.log("error catch")
        }
    }

    return (

        <SuperAdminLayout>
            <div className='h-auto bg-gray-200 p-2 overflow-y-auto '>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>{updateC ? 'Update Commission' : 'Add New Commission'}</h1>
                </div>

                <div className='m-4 bg-white rounded-md p-2 px-4'>
                    <form onSubmit={updateC ? handleUpdate : handleSubmit} className=' m-4'>

                        <div className=' rounded-sm  grid grid-cols-1 md:grid-cols-3   lg:grid-cols-4  gap-4 items-center mt-6'>
                            <div>
                                <label htmlFor="groupname" className=' mb-2  font-serif'> Select Group : </label>
                                <select
                                    name='groupname'
                                    value={formdata.groupname}
                                    onChange={handleChange}
                                    required
                                    className='w-full border border-blue-400 p-1 rounded-md my-2 shadow-md'
                                >
                                    <option value="">Select Group</option>
                                    {group.map((item, index) => (
                                        <option key={index} value={item.groupname}>{item.groupname}</option>
                                    )
                                    )}
                                </select>

                            </div>
                            <div>
                                <label htmlFor="categoryname" className=' mb-2  font-serif'> Select Category : </label>
                                <select
                                    name='categoryname'
                                    value={formdata.categoryname}
                                    onChange={handleChange}
                                    required
                                    className='w-full border border-blue-400 p-1 rounded-md my-2 shadow-md'
                                >
                                    <option value="">Select Category</option>
                                    {category.map((item, index) => (
                                        <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                    )
                                    )}
                                </select>

                            </div>
                            <div>
                                <label htmlFor="totalcommission" className=' mb-2  font-serif'> Total Commission :  </label>
                                <input
                                    type="text"
                                    name='totalcommission'
                                    value={formdata.totalcommission}
                                    onChange={handleChange}
                                    readOnly
                                    placeholder='Enter Commission Percentage '
                                    className='w-full border border-blue-400 text-sm p-1 rounded-md my-2 shadow-md'
                                />

                            </div>
                            <div>
                                <label htmlFor="commissionper" className=' mb-2  font-serif'> Center Commission ( % )<sup className='text-red-600'>*</sup> :  </label>
                                <input
                                    type="number"
                                    name='commissionper'
                                    value={formdata.commissionper}
                                    onChange={handleChange}
                                    required
                                    placeholder='Enter Commission Percentage '
                                    className='w-full border border-blue-400 text-sm p-1 rounded-md my-2 shadow-md'
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield',
                                      }}
                                />

                            </div>
                            <div>
                                <label htmlFor="startdate" className=' mb-2  font-serif'> Start Date <sup className='text-red-600'>*</sup> :  </label>
                                <input
                                    type="date"
                                    name='startdate'
                                    value={formdata.startdate}
                                    onChange={handleChange}
                                    required
                                    className='w-full border border-blue-400 text-sm p-1  rounded-md my-2 shadow-md'
                                />

                            </div>
                            <div>
                                <label htmlFor="enddate" className=' mb-2  font-serif'> End Date  :  </label>
                                <input
                                    type="date"
                                    name='enddate'
                                    value={formdata.enddate}
                                    onChange={handleChange}
                                    className='w-full border border-blue-400 text-sm p-1  rounded-md my-2 shadow-md'
                                />

                            </div>

                        </div>

                        <div className='flex flex-row-1 justify-center'>

                            <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 w-48'>{updateC ? "Update Commission" : "Add Commission"}</button>
                        </div>
                    </form>
                </div>
                                    
                <div className='bg-gray-100  p-4 m-4   rounded-md   overflow-x-scroll '>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600  text-white ' >
                            <tr className='font-serif whitespace-nowrap '>
                                <th className='p-2 sm:text-base text-sm border-2'>Commisson Id </th>
                                <th className='p-2 sm:text-base text-sm border-2'> Total Commisson  </th>
                                <th className='p-2 sm:text-base text-sm border-2 '>Center Commission </th>
                                <th className='p-2 sm:text-base text-sm border-2 '>Category </th>
                                <th className='p-2 sm:text-base text-sm border-2'>Group Name </th>
                                <th className='p-2 sm:text-base text-sm border-2 '>Start Date </th>
                                <th className='p-2 sm:text-base text-sm border-2'>End Date</th>
                                <th className='p-2 sm:text-base text-sm border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {commission.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.CMId}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.totalcommission}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.commissionper}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.categoryname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.groupname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>
                                        {new Date(item.startdate).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                        })}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>
                                        {new Date(item.enddate).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                        })}
                                    </td>

                                    {/* <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.status && item.status == '1' ? (
                                            <div className='flex  space-x-2 justify-center items-center'>
                                                <button type='submit' className='transition-shadow  cursor-default  bg-green-700 border-1 text-white rounded-2xl px-4 py-2 items-center  w-24 flex justify-center '

                                                >Active
                                                </button>
                                                <button type='submit' className='transition-shadow hover:border-1 border border-red-500 hover:font-serif hover:text-md hover:text-red-500  text-red-500 rounded-2xl px-4 py-2 items-center hover:shadow-md hover:shadow-amber-950 w-24 flex justify-center '
                                                    onClick={() => handleStatus(item, 0)}
                                                >Deactiuve
                                                </button>
                                            </div>

                                        )
                                            : (
                                                <div className='flex  space-x-2 justify-center items-center'>
                                                    <button type='submit' className='transition-shadow hover:border-1 border border-green-700  border-1 hover:font-serif hover:text-md hover:text-green-600 text-green-700 rounded-2xl px-4 py-2 items-center hover:shadow-md hover:shadow-amber-950 w-24 flex justify-center '
                                                        onClick={() => handleStatus(item, 1)}
                                                    >Active
                                                    </button>
                                                    <button type='submit' className='transition-shadow   hover:bg-red-800 border bg-red-800 text-white border-red-500  cursor-default  rounded-2xl px-4 py-2 items-center hover:shadow-md w-24 flex justify-center '
                                                    >Deactiuve
                                                    </button>
                                                </div>

                                            )

                                        }


                                    </td> */}
                                    <td className=''>

                                        <div className="px-3  flex space-x-2 m-2 justify-center items-center">
                                            <button
                                                className='p-2 shadow-md rounded-full text-lg text-green-500 hover:bg-green-500 hover:border hover:shadow-md hover:shadow-green-400 hover:text-white bg-white '
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdEdit />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </SuperAdminLayout>
    )
}

export default CreateCommission