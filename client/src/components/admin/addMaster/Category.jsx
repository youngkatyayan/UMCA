import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
// import { useSelector } from 'react-redux';
const Category = () => {
    const [formdata, setData] = useState({
        category: ''
    })
    // const user = useSelector(state => state)
    // console.log(user)
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formdata)
            const { data } = await axios.post('/api/v1/add-category', formdata)
            if (data.success) {
                console.log('first')
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
            <div className='bg-gray-200 p-2 w-full'>
            <div className='flex flex-col m-4 w-full border rounded-md bg-cover bg-center relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Category</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 rounded-md  backdrop-blur border-2 bg-cover '>

                    <div className='border-2 rounded-sm flex flex-col items-center mt-4'>

                        <div className='w-full flex flex-col items-center '>
                            <label htmlFor="category" className=' mb-2 text-2xl font-serif'> Course Category</label>
                            <input
                                type="text"
                                name='category'
                                value={formdata.category}
                                onChange={handleChange}
                                placeholder='Enter Category Name'
                                className='w-2/4 p-2 rounded-md my-4 shadow-md'
                            />

                        </div>

                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 border-2 hover:font-bold text-white rounded-md px-4 py-2 m-4 items-center`'>ADD Category</button>

                    </div>
                </form>
            </div>

        </SuperAdminLayout>
    )
}

export default Category