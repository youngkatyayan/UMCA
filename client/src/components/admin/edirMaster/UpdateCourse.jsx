import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

const UpdateCourse = () => {

    const [mode,setMode]=useState([])
    const [category,setCategory]=useState([])
    const [session,setSession]=useState([])
    const [formdata, setData] = useState({
        session: '',
        coursemode:'',
        eligibility:'',
        categoryname:'',
        duration:"",
        description:'',
        yearlyfee:'',
        applicationfee:'',
        examfee:'',
        brochure:''
    })
    const [searchco, SetSearchco] = useState({ coursename: '' })
    const [course, setCourse] = useState([])

    const accessdata = async () => {
        const { data } = await axios.get('/api/v1/get-course')
        if (data.success) {
            setCourse(data.result)
        }
    }
    const accessmode = async () => {
        const { data } = await axios.get('/api/v1/get-mode')
        if(data.success){
            setMode(data.result)
        }
    }
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if(data.success){
            setCategory(data.result)
        }
    }
    const accesssession = async () => {
        const { data } = await axios.get('/api/v1/get-session')
        if(data.success){
            setSession(data.result)
        }
    }
    useEffect(() => {
        accessdata();
        accessmode();accesscategory();accesssession();
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(searchco)
            const { data } = await axios.post('/api/v1/search-course', searchco)
            if (data.success) {
                toast.success(data.message)
                SetSearchco({ coursename: "" })
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
            <div className='w-full bg-gray-200 p-2 min-h-screen h-auto overflow-y-auto '>
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
                                value={searchco.coursename}
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
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>Course </th>
                                <th className='p-2 border-2 '>Category </th>
                                <th className='p-2 border-2'> Mode</th>
                                <th className='p-2 border-2'>Session</th>
                                <th className='p-2 border-2'>Duration</th>
                                <th className='p-2 border-2'>Application Fee</th>
                                <th className='p-2 border-2'>Exam Fee</th>
                                <th className='p-2 border-2'>Yearly Fee</th>
                                <th className='p-2 border-2'>Description</th>
                                <th className='p-2 border-2'>Eligibility</th>
                                <th className='p-2 border-2'>Status</th>
                                <th className='p-2 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {course.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.coursename}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.categoryname}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.coursemode}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.session}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.duration}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.applicationfee}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.examfee}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.yearlyfee}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.description}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.eligibility}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.costatus && item.costatus == '1' ? (
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
                                    <td className=''>

                                        <div className="px-3  flex space-x-2 m-2 justify-center items-center">
                                            <Link to={{
                                                    pathname:`/course-details/update-course/${item.CoId}`,
                                                    state:{coursedetails:item},
                                            }}
                                                className='p-2 shadow-md rounded-full text-lg text-green-500 hover:bg-green-500 hover:border hover:shadow-md hover:shadow-green-400 hover:text-white bg-white '
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdEdit />
                                            </Link>
                                            
                                        </div>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


                
            </div>
            <ToastContainer />
        </SuperAdminLayout>
    )
}

export default UpdateCourse