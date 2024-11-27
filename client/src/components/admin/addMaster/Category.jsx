import React, { useState, useEffect } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout.jsx'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';

const Category = () => {
    const [formdata, setData] = useState({
        category: '',
        groupname: '',
        description: '',
        totcommison:''
    })
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

    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
        }
    }

    useEffect(() => {
        accessdata();
        accesscategory();
    }, [])



    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/add-category', formdata)
            if (data.success) {
                toast.success(data.message);
                setData({
                    category: '',
                    groupname: '',
                    description: ''
                })
                accesscategory()
            }
            else {
            }
        } catch (error) {
        }
    }

    const handleStatus = async (item, stat) => {
        const UpdateStatus = { ...item, costatus: stat };

        try {
            const { data } = await axios.post('api/v1/updatecostatus', UpdateStatus)
            if (data.success) {
                toast(data.message)
                accessdata()
            } else {
                toast("Failed to update status")
            }
        } catch (error) {
            toast("An error occurred while updating the status");
        }

    }

    const handleEdit = async (item) => {
        setUpdateC(true)
        setData({
            category: item.categoryname || '',
            groupname: item.groupname || '',
            Caid: item.Caid || '',
            description: item.description || "",
            totcommison: item.totalcommission || ""
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/update-category', formdata)
            if (data.success) {
                toast.success(data.message);
                setData({
                    category: '',
                    groupname: '',
                    description: '',
                    totcommison:''

                })
                accesscategory()
                setUpdateC(false)
            }
            else {
            }
        } catch (error) {
        }
    }
    return (
        <SuperAdminLayout>
            <div className='w-full  bg-gray-200 p-2 h-auto '>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>{updateC ? 'Update Category' : 'Add New Category'}</h1>
                </div>

                <form onSubmit={updateC ? handleUpdate : handleSubmit} className='  px-4 '>

                    <div className='border-2 rounded-sm  grid grid-cols-2 gap-6 items-center'>
                        <div>
                            <label htmlFor="category" className=' mb-2 text-lg font-serif'> Category <sup className='text-red-600'>*</sup> :  </label>
                            <input
                                type="text"
                                name='category'
                                value={formdata.category}
                                onChange={handleChange}
                                required
                                placeholder='Enter Category Name'
                                className='w-full p-2 rounded-md my-2 shadow-md'
                            />

                        </div>

                        <div>
                            <label htmlFor="groupname" className=' mb-2 text-lg font-serif'> Select Group : </label>
                            <select
                                name='groupname'
                                value={formdata.groupname}
                                onChange={handleChange}
                                required
                                className='w-full p-2 rounded-md my-2 shadow-md'
                            >
                                <option value="">Select Group</option>
                                {group.map((item, index) => (
                                    <option key={index} value={item.groupname}>{item.groupname}</option>
                                )
                                )}
                            </select>

                        </div>

                        <div>
                            <label htmlFor="totcommison" className=' mb-2 text-lg font-serif'>  Total Commission :  </label>
                            <input
                                type="text"
                                name='totcommison'
                                value={formdata.totcommison}
                                onChange={handleChange}
                                required
                                placeholder='Enter Total Commission '
                                className='w-full p-2 rounded-md my-2 shadow-md'
                            />

                        </div>

                        <div >
                        <label htmlFor="description" className=' flex m-1 font-serif text-lg w-full'>  Description :</label>
                        <textarea
                            required
                            name='description'
                            value={formdata.description}
                            onChange={handleChange}
                            placeholder=' Description'
                            className=' p-2 rounded-md  shadow-md w-full '
                        />
                    </div>

                    </div>
                    
                    <div className='flex flex-row-1 justify-center'>

                        <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 w-48'>{updateC ? "UPDATE CATEGORY" : "ADD CATEGORY"}</button>
                    </div>
                </form>

                <div className='bg-gray-200 w-full overflow-x-scroll'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>Group Name </th>
                                <th className='p-2 border-2 '>Category </th>
                                <th className='p-2 border-2 '>Total Commission </th>
                                <th className='p-2 border-2 '>Description </th>
                                <th className='p-2 border-2'>Status</th>
                                <th className='p-2 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {category.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.groupname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.categoryname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.totalcommission}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.description}</td>

                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

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


                                    </td>
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

export default Category