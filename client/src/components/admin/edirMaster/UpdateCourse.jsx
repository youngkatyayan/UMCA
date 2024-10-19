import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
const UpdateCourse = () => {


    const [formdata, setData] = useState({ group: '' })
    const [course, setCourse] = useState([])

    const accessdata = async () => {
        const { data } = await axios.get('/api/v1/get-course')
        if (data.success) {
            setCourse(data.result)
        }
    }

    useEffect(() => {
        accessdata();

    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formdata)
            const { data } = await axios.post('/api/v1/add-group', formdata)
            if (data.success) {
                toast.success(data.message)
                setData({ group: "" })
            }
            else {
                console.log('error')
            }
        } catch (error) {
            console.log("error")
        }
    }
    return (
        <SuperAdminLayout>
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Course Details</h1>
                </div>

                <form onSubmit={handleSubmit} className='   rounded-md border-2  relative mb-4'>

                    <div className='border-2 rounded-sm grid grid-rows-1 items-center '>

                        <div className='px-5 w-full flex flex-cols items-center justify-start'>
                            <label htmlFor="group" className=' text-2xl font-serif'> Search Course </label>
                            <input
                                required
                                type="text"
                                name='group'
                                value={formdata.group}
                                onChange={handleChange}
                                placeholder='Enter Course Name'
                                className='w-1/3 p-2 rounded-lg my-2 mx-3 shadow-md'
                            />
                            <button type='submit' className='transition-shadow hover:border-2 bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-3xl px-4 py-2 items-center hover:shadow-md hover:shadow-amber-950 w-28 flex justify-center '
                            ><FaSearch className=' m-1' />
                            </button>
                        </div>
                    </div>


                </form>
                <div className='flex flex-wrap w-full overflow-x-scroll'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white'>
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-1 border-2'>Course Name</th>
                                <th className='p-1 border-2 '>Category Name</th>
                                <th className='p-1 border-2'>Course Mode</th>
                                <th className='p-1 border-2'>Duration</th>
                                <th className='p-1 border-2'>Application Fee</th>
                                <th className='p-1 border-2'>Exam Fee</th>
                                <th className='p-1 border-2'>Yearly Fee</th>
                                <th className='p-1 border-2'>Description</th>
                                <th className='p-1 border-2'>Eligibility</th>
                                <th className='p-1 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {course.map((item, index) => (
                                <tr key={index} >
                                    <td className='p-1 border-2 border-black'>{item.coursename}</td>
                                    <td className='p-1 border-2 border-black'>{item.categoryname}</td>
                                    <td className='p-1 border-2 border-black'>{item.coursemode}</td>
                                    <td className='p-1 border-2 border-black'>{item.duration}</td>
                                    <td className='p-1 border-2 border-black'>{item.applicationfee}</td>
                                    <td className='p-1 border-2 border-black'>{item.examfee}</td>
                                    <td className='p-1 border-2 border-black'>{item.yearlyfee}</td>
                                    <td className='p-1 border-2 border-black'>{item.description}</td>
                                    <td className='p-1 border-2 border-black'>{item.eligibility}</td>
                                    <td className='p-1 border-2 border-black'>
                                        <button className='p-2 translate-x-1 shadow-md rounded-full text-lg hover:bg-green-500 hover:border hover:shadow-md hover:shadow-green-400 hover:text-white bg-white' onClick={() => handleEdit(item)}>
                                            <MdEdit />
                                        </button>
                                        <button className='p-2 shadow-md rounded-full  text-lg hover:bg-red-500 hover:border hover:shadow-md hover:shadow-red-400 text-red bg-white hover:text-white' onClick={() => handleDelete(item)}>
                                            <MdDelete />
                                        </button>
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

export default UpdateCourse