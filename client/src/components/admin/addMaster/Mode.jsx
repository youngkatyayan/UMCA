import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const Mode = () => {

    const [mode, setMode] = useState([])
    const [formdata, setData] = useState({
        coursemode: ''
    })


    const accessmode = async () => {
        const { data } = await axios.get('/api/v1/get-mode')
        if (data.success) {
            setMode(data.result)
        }
    }
    useEffect(() => { accessmode();}, [])
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/add-mode', formdata)
            if (data.success) {
                toast.success(data.message)
                setData({ coursemode: "" })
                accessmode()
            }
            else {
                toast.error('error')
            }
        } catch (error) {
            toast.error("Error in Submitting Mode")
        }
    }

    const handleStatus = async (item, stat) => {
        const UpdateCmStatus = { ...item, cmstatus: stat };
        try {
            const { data } = await axios.post('api/v1/updatecmstatus', UpdateCmStatus)
            if (data.success) {
                toast(data.message)
                accessmode()
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
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Course Mode</h1>
                </div>

                <form onSubmit={handleSubmit} className='  px-4 rounded-md border-2  relative '>

                    <div className='border-2 rounded-sm flex flex-col items-center mt-4'>

                        <div className='w-full flex flex-col items-center '>
                            <label htmlFor="coursemode" className=' text-2xl font-serif'> Course Mode</label>
                            <input
                                required
                                type="text"
                                name='coursemode'
                                value={formdata.coursemode}
                                onChange={handleChange}
                                placeholder='Enter Course Mode'
                                className='w-2/4 p-2 rounded-md my-4 shadow-md'
                            />

                        </div>

                        <div className='flex flex-row-1 justify-center'>

                            <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 w-40'>ADD MODE</button>
                        </div>
                    </div>
                </form>

                <div className='flex flex-wrap w-full overflow-x-scroll'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>Mode Id </th>
                                <th className='p-2 border-2'> Mode</th>
                                <th className='p-2 border-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {mode.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.Cmid}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.coursemode}</td>
                                  
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.cmstatus && item.cmstatus == '1' ? (
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
                                    

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </SuperAdminLayout>
    )
}

export default Mode