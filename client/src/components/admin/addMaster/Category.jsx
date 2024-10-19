import React, { useState,useEffect } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
import { toast } from 'react-toastify';

const Category = () => {
    const [formdata, setData] = useState({
        category: '',
        groupname:''
    })
    const [group,setGroup]=useState([])
    const accessdata=async()=>{
        try {
            const {data}=await axios.get('/api/v1/get-group')
          
        if(data.success){
            if(data.result){
                setGroup(data.result)  
            }
        }
        } catch (error) {
            toast.error(error.message)
        }
    }

   useEffect(()=>{accessdata()},[])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formdata)
            const {data}=await axios.post('/api/v1/add-category',formdata)
            if(data.success){
                console.log(data)
                toast.success(data.message);
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
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Category</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 rounded-md  backdrop-blur border-2 bg-cover bg-center bg-no-repeat relative '>

                    <div className='border-2 rounded-sm  grid grid-cols-3 gap-6 items-center'>
                    <div>
                            <label htmlFor="category" className=' mb-2 text-lg font-serif'> Category <sup className='text-red-600'>*</sup> :  </label>
                            <input
                                type="text"
                                name='category'
                                value={formdata.category}
                                onChange={handleChange}
                                required
                                placeholder='Enter Category Name'
                                className='w-full p-2 rounded-md my-4 shadow-md'
                            />

                        </div>
                        <div >
                            <label htmlFor="description" className=' m-2 font-serif text-lg'>  Description :</label>
                            <input
                                type="text"
                                name='description'
                                value={formdata.description}
                                onChange={handleChange}
                                placeholder=' Description'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="groupname" className=' mb-2 text-lg font-serif'> Select Group : </label>
                            <select
                              
                                name='groupname'
                                value={formdata.groupname}
                                onChange={handleChange}
                               
                                className='w-full p-2 rounded-md my-4 shadow-md'
                            >
                                <option  value="">Select Group</option>
                                {group.map((item,index)=>(
                                    
                                    <option key={index} value={item.groupname}>{item.groupname}</option>
                                    
                                )
                                )}
                            </select>

                        </div>
                       

                    </div>
                    <div className='flex flex-row-1 justify-center'>

                    <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950'>ADD CATEGORY</button>
                    </div>
                    </form>

                
            </div>

        </SuperAdminLayout>
    )
}

export default Category