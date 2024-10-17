import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'

const Category = () => {
    const [formdata, setData] = useState({
        category: ''
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            console.log(formdata)
            const {data}=await axios.post('/api/v1/add-category',formdata)
            if(data.success){
                console.log('first')
            }
            else{
                console.log('error')
            }
        } catch (error) {
            console.log("error catch")
        }
    }
    return (
        <SuperAdminLayout>
            <main className='min-h-screen bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Category</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 rounded-md  backdrop-blur border-2 bg-cover bg-center bg-no-repeat relative min-h-screen bg-opacity-5'>

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
            </main>

        </SuperAdminLayout>
    )
}

export default Category