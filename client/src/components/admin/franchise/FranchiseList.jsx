import React, { useState, useEffect } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

const FranchiseList = () => {

    const [searchco, SetSearchco] = useState({ franchisename: '' })
    const [franchise, SetFranchise] = useState([])


    const accessfranchise = async () => {
        const { data } = await axios.get('/api/v1/get-franchise')
        if (data.success) {
            SetFranchise(data.result)
        }
    }
    useEffect(() => {
        accessfranchise();
    }, [])
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    
    const handleStatus = async (item, stat) => {
        const UpdateStatus = { ...item, status: stat };

        try {
            const { data } = await axios.post('api/v1/updatefrstatus', UpdateStatus)
            if (data.success) {
                toast(data.message)
                accessfranchise()
            } else {
                toast("Failed to update status")
            }
        } catch (error) {
            toast("An error occurred while updating the status");
        }

    }

    return (
        <SuperAdminLayout>
            <ToastContainer/>
            <div className='w-full  bg-gray-200 p-2 h-auto '>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Franchise List</h1>
                </div>

                <form onSubmit={handleSubmit} className='   rounded-md border-2  relative mb-4'>

                    <div className='border-2 rounded-sm grid grid-rows-1 items-center '>

                        <div className='px-5 w-full flex flex-cols items-center justify-start'>
                            <label htmlFor="group" className=' text-2xl font-serif'> Search Franchise </label>
                            <input
                                required
                                type="text"
                                name='group'
                                value={searchco.franchisename}
                                onChange={handleChange}
                                placeholder='Enter Franchise Name'
                                className='w-1/3 p-2 rounded-lg my-2 mx-3 shadow-md'
                            />
                            <button type='submit' className='transition-shadow hover:border-2 bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-3xl px-4 py-2 items-center hover:shadow-md hover:shadow-amber-950 w-28 flex justify-center '
                            ><FaSearch className=' m-1' />
                            </button>
                        </div>
                    </div>


                </form>

                <div className='w-full  overflow-x-scroll '>
                    <table className='min-w-full border-collapse border border-gray-300 bg-gray-200 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>Center Manager Name </th>
                                <th className='p-2 border-2 '>Manager E-mail</th>
                                <th className='p-2 border-2 '> Manager Mobile</th>
                                <th className='p-2 border-2 '>Owner Name</th>
                                <th className='p-2 border-2'> Owner E-mail</th>
                                <th className='p-2 border-2'> Owner Mobile</th>
                                <th className='p-2 border-2'>Address</th>
                                <th className='p-2 border-2'>City</th>
                                <th className='p-2 border-2'>State</th>
                                <th className='p-2 border-2'>Pincode</th>
                                <th className='p-2 border-2'>Status</th>
                                <th className='p-2 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {franchise.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.cmname}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.cmemail}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.cmmob}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.owname}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.ownemail}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.ownmob}</td>
                                    <td className='px-3 border-2 border-gray-400  whitespace-nowrap overflow-hidden text-ellipsis '>{item.address}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.city}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.state}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.pincode}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.applicantfor}</td>
                                    <td className='px-3 border-2 border-gray-400 '>

                                        {item.status && item.status == '1' ? (
                                            <div className='flex  space-x-2 justify-center items-center'>
                                                <button type='submit' className='transition-shadow  cursor-default     bg-green-700 border-1 text-white rounded-2xl px-4 py-2 items-center  w-24 flex justify-center '

                                                >Active
                                                </button>
                                                <button type='submit' className='transition-shadow hover:border-1     border border-red-500 hover:font-serif hover:text-md hover:text-red-500      text-red-500 rounded-2xl px-4 py-2 items-center hover:shadow-md hover:shadow-amber-950 w-24 flex justify-center '
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
                                    {/* <td className=''>

                                        <div className="px-3  flex space-x-2 m-2 justify-center items-center">
                                            <Link to={{
                                                pathname: `/course-details/update-course/${item.CoId}`,
                                                state: { coursedetails: item },
                                            }}
                                                className='p-2 shadow-md rounded-full text-lg text-green-500 hover:bg-green-500 hover:border hover:shadow-md hover:shadow-green-400 hover:text-white bg-white '
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdEdit />
                                            </Link>

                                        </div>
                                    </td> */}

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


            </div>
        </SuperAdminLayout>
    )
}

export default FranchiseList