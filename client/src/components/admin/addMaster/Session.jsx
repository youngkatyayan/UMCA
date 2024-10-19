import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Session = () => {
    const [formdata, setData] = useState({
        session: '',
        groupname: '',
        categoryname: '',
        mode: '',
        session: '',
        additionalfee: ""
    })

    const [category, setCategory] = useState([])
    const [mode, setMode] = useState([])

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

    useEffect(() => { accesscategory(); accessmode(); }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

        if (name === "categoryname") {
            const catgroup = category.find(user => user.categoryname = name)
            const setgrp = catgroup.groupname
            console.log(setgrp)
            // console.log(catgroup)
            setData(prevData => ({ ...prevData, [name]: value, groupname: setgrp }))


        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            const { data } = await axios.post('api/v1/add-session', formdata)
            console.log(data)
            if (data.success) {
                toast(data.message)
            }
            else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error occurred while adding the session. Please try again.");
            console.log("error")
        }
    }
    return (
        <SuperAdminLayout>
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Session</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 '>

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
                                placeholder='Enter Session'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>


                        <div></div>


                    </div>
                    <div className='flex flex-row justify-center'>

                        <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950'>ADD SESSION</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </SuperAdminLayout>
    )
}

export default Session