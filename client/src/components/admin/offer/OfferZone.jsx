import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import { ToastContainer } from 'react-toastify'
import AddCollege from '../../../assets/addcollege.jpg';


const OfferZone = () => {
    const [formdata, setData] = useState({
        categoryname: '',
    });
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    return (
        <SuperAdminLayout>
            <ToastContainer />
            <div className='w-full  bg-gray-200 p-2 h-auto '>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Course offer</h1>
                </div>

                <form  onSubmit={handleSubmit}>
                <div className='grid lg:grid-cols-3 md:grid-col-3 sm:grid-cols-2 gap-4  px-2'>
                    <div className=''>
                        <label htmlFor="line1" className='text-lg mb-2 '>Line 1<strong className='text-red-600'>*</strong></label>
                        <input type='text' onChange={handleChange} value={formdata.line1} name="line1" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="line2" className='text-lg mb-2'>Line 2</label>
                        <input type='text' onChange={handleChange} value={formdata.line2} name="line2" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="town" className='text-lg mb-2'>City/Town/Village</label>
                        <input type='text' onChange={handleChange} value={formdata.town} name="town" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className=''>
                        <label htmlFor="line1" className='text-lg mb-2 '>Line 1<strong className='text-red-600'>*</strong></label>
                        <input type='text' onChange={handleChange} value={formdata.line1} name="line1" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="line2" className='text-lg mb-2'>Line 2</label>
                        <input type='text' onChange={handleChange} value={formdata.line2} name="line2" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="town" className='text-lg mb-2'>City/Town/Village</label>
                        <input type='text' onChange={handleChange} value={formdata.town} name="town" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className=''>
                        <label htmlFor="line1" className='text-lg mb-2 '>Line 1<strong className='text-red-600'>*</strong></label>
                        <input type='text' onChange={handleChange} value={formdata.line1} name="line1" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="line2" className='text-lg mb-2'>Line 2</label>
                        <input type='text' onChange={handleChange} value={formdata.line2} name="line2" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="town" className='text-lg mb-2'>City/Town/Village</label>
                        <input type='text' onChange={handleChange} value={formdata.town} name="town" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                    </div>

                </div>
                <div className='flex flex-row justify-center'>
                    <button type='submit' className='transition-shadow w-40 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 text-xl' style={{
                        background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 0%, rgba(0,172,255,1) 100%)'
                    }}>Submit</button>

                </div>
                </form>
            </div>

        </SuperAdminLayout>
    )
}

export default OfferZone