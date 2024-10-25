import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const Group = () => {

    const [group, setGroup] = useState([])
    const [formdata, setData] = useState({
        group: '',
        gdescription:''
    })

    const accessgroup = async () => {
        const { data } = await axios.get('/api/v1/get-group')
        if (data.success) {
            setGroup(data.result)
        }
    }
    useEffect(() => {
        accessgroup();
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
                setData({ group: "",gdescription:'' })
            }
            else {
                toast.error(data.message)
                console.log('error')
            }
        } catch (error) {
            console.log("error")
        }
    }

    const handleStatus = async (item, stat) => {
        const UpdateStatus = { ...item, gstatus: stat };

        try {
            const { data } = await axios.post('api/v1/updategrpstatus', UpdateStatus)
            if (data.success) {
                toast(data.message)
                accessgroup()
            } else {
                toast("Failed to update status")
            }
        } catch (error) {
            toast("An error occurred while updating the status");
        }

    }



    return (
        <SuperAdminLayout>
            <ToastContainer />
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Course Group</h1>
                </div>

                <form onSubmit={handleSubmit} className='  px-4  rounded-md border-2  relative '>
                    <div className='border-2 rounded-sm grid grid-cols-2 items-center gap-4 mt-4'>
                        <div >
                            <label htmlFor="group" className='flex  m-1 font-serif text-lg w-full'> Course Group</label>
                            <input
                                required
                                type="text"
                                name='group'
                                value={formdata.group}
                                onChange={handleChange}
                                placeholder='Enter Course Group'
                                className=' p-2 rounded-md my-2 shadow-md w-full'
                            />
                        </div>

                        <div >
                            <label htmlFor="gdescription" className=' flex m-1 font-serif text-lg w-full'>  Description :</label>
                            <textarea
                                // type="text"
                                name='gdescription'
                                value={formdata.gdescription}
                                onChange={handleChange}
                                placeholder=' Description'
                                className=' p-2 rounded-md my-2 shadow-md w-full'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center'>
                        <button type='submit' className='transition-shadow w-40 bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950'>ADD GROUP</button>

                    </div>
                </form>
                <div className='flex flex-wrap w-full overflow-x-scroll'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>Group Id </th>
                                <th className='p-2 border-2'>Group </th>
                                <th className='p-2 border-2'>Description </th>
                                <th className='p-2 border-2'>Status </th>
                            </tr>
                        </thead>
                        <tbody>

                            {group.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.GId}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.groupname}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.gdescription}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.gstatus && item.gstatus == '1' ? (
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

export default Group