import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';


const Group = () => {
    const [formdata, setData] = useState({
        group: ''
    })

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
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Course Group</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 rounded-md border-2  relative '>

                    <div className='border-2 rounded-sm grid grid-cols-1 items-center mt-4'>

                        <div className='w-full flex flex-col items-center '>
                            <label htmlFor="group" className=' text-2xl font-serif'> Course Group</label>
                            <input
                                required
                                type="text"
                                name='group'
                                value={formdata.group}
                                onChange={handleChange}
                                placeholder='Enter Course Group'
                                className='w-1/2 p-2 rounded-md my-2 shadow-md'
                            />

                        </div>


                    </div>

                    <div className='flex flex-row justify-center'>
                    <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950'>ADD GROUP</button>

                    </div>
                </form>

            </div>

        </SuperAdminLayout>
    )
}

export default Group