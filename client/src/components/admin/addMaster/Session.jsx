import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';

const Session = () => {
    const [formdata, setData] = useState({
        session: '',
        groupname: '',
        categoryname: '',
        mode: '',
        additionalfee: ""
    })
    const [session,setSession]=useState([])
    const [category, setCategory] = useState([])
    const [mode, setMode] = useState([])
    const [updateC, setUpdateC] = useState(false)

    const accesscategory = async () => {
            const { data } = await axios.get('/api/v1/get-category')
            if (data.success) {
                if (data.result) {
                    setCategory(data.result)
                }
            }
        
    }
    const accessmode = async () => {
        const { data } = await axios.get('/api/v1/get-mode')

        if (data.success) {
            if (data.result) {
                setMode(data.result)
            }
        }

    }
    const accesssession = async () => {
        const { data } = await axios.get('/api/v1/get-session')
        if(data.success){
            setSession(data.result)
        }
    }

    useEffect(() => { accesscategory(); accessmode();accesssession(); }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

        if (name === "categoryname") {
            const catgroup = category.find(user => user.categoryname ===value)
            const setgrp = catgroup.groupname
            setData(prevData => ({ ...prevData, [name]: value, groupname: setgrp }))


        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('api/v1/add-session', formdata)
            if (data.success) {
                toast(data.message)
                accesssession()
                setData({  session: '',
                    groupname: '',
                    categoryname: '',
                    mode: '',
                    session: '',
                    additionalfee: ""})
            }
            else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error occurred while adding the session. Please try again.");
        }
    }

    const handleStatus = async (item, stat) => {
        const UpdateStatus = { ...item, sestatus: stat };
        
        try {
            const { data } = await axios.post('api/v1/updatesesstatus', UpdateStatus)
            if (data.success) {
                toast(data.message)
                accesssession()
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
            session: item.session || '',
            groupname: item.groupname || '',
            categoryname: item.categoryname || '',
            mode: item.mode || '',
            session: item.session || '',
            additionalfee: item.additionalfee || "",
            SeId:item.SeId ||''
        })
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/update-sesson', formdata)
            if (data.success) {
                toast.success(data.message);
                setData({
                    session: '',
                    groupname: '',
                    categoryname: '',
                    mode: '',
                    session: '',
                    additionalfee: ""
                })
                accesssession()
                setUpdateC(false)
            }
            else {
                toast.error("error")
             
            }
        } catch (error) {
            toast.error("Error in Updating Session")
        }
    }
    return (
        <SuperAdminLayout>
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>{updateC?"Update Session":'Add New Session'}</h1>
                </div>

                <form onSubmit={updateC ?handleUpdate:handleSubmit} className='  px-4 '>
                    <div className='border-2 rounded-sm grid grid-cols-3 gap-4 items-center'>
                        <div>
                            <label htmlFor="categoryname" className=' m-2 font-serif text-lg'> Select Category :</label>
                            <select
                                type="text"
                                name='categoryname'
                                value={formdata.categoryname}
                                onChange={handleChange}
                                placeholder=' Select University'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                                <option value="" >Select Category</option>
                                {category.map((item, index) => (

                                    <option key={index} value={item.categoryname}>{item.categoryname}</option>

                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="mode" className=' m-2 font-serif text-lg'> Select Mode :</label>
                            <select
                                type="text"
                                name='mode'
                                value={formdata.mode}
                                onChange={handleChange}
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                                <option value="" >Select Mode</option>
                                {mode.map((item, index) => (

                                    <option key={index} value={item.coursemode}>{item.coursemode}</option>

                                )
                                )}
                            </select>
                        </div>

                        <div >
                            <label htmlFor="session" className=' m-2 font-serif text-lg'>  Session :</label>
                            <input
                                type="text"
                                name='session'
                                value={formdata.session}
                                onChange={handleChange}
                                placeholder='month YYYY-YY'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div >
                            <label htmlFor="additionalfee" className=' m-2 font-serif text-lg'>  Additional Fee :</label>
                            <input
                                type="text"
                                name='additionalfee'
                                value={formdata.additionalfee}
                                onChange={handleChange}
                                placeholder='Additional Fee '
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                     
                    </div>
                    <div className='flex flex-row justify-center'>

                        <button type='submit' className='transition-shadow w-40 bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 mb-8  items-center hover:shadow-md hover:shadow-amber-950'>{updateC?"UPDATE SESSION":'ADD SESSION'}</button>
                    </div>
                </form>

                <div className='w-full  overflow-x-scroll '>
                    <table className='min-w-full border-collapse border border-gray-300 bg-gray-200 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'> Id</th>
                                <th className='p-2 border-2'>session </th>
                                <th className='p-2 border-2'>Group</th>
                                <th className='p-2 border-2 '>Category </th>
                                <th className='p-2 border-2'>mode</th>
                                <th className='p-2 border-2'>Additional Fee</th>
                                <th className='p-2 border-2'>Status</th>
                                <th className='p-2 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {session.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{item.SeId}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.session}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.groupname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.categoryname}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.mode}</td>
                                    <td className='px-3 border-2 border-gray-400'>{item.additionalfee}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.sestatus && item.sestatus == '1' ? (
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

export default Session