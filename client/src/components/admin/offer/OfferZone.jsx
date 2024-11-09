import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import { toast, ToastContainer } from 'react-toastify'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';


const OfferZone = () => {
    const [formdata, setData] = useState({
        categoryname: '',
        discount: '',
        description: '',
        courseCode: '',
        endDate: '',
        startDate: '',
        offercode: '',
        coursename: '',

    });
    const [course, setCourse] = useState([])
    const [category, setCategory] = useState([])
    const [offer, SetOffer] = useState([])
    const [update, setUpdate] = useState(false)


    const accessdata = async () => {
        const { data } = await axios.get('/api/v1/get-course')
        if (data.success) {
            setCourse(data.result)

        }
    }
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
        }
    }
    const accessoffer = async () => {
        const { data } = await axios.get('/api/v1/get-offer')
        if (data.success) {
            SetOffer(data.result)
        }
    }

    useEffect(() => {
        accessdata();
        accesscategory();
        accessoffer();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }))

        if (name === 'coursename') {
            const Cid = course.find(element => element.coursename === value)
            const CId = Cid.CoId;
            setData((prevData) => ({ ...prevData, [name]: value, courseCode: CId }))

        }

    }

    const handleEdit = (item) => {
        setUpdate(true)
        setData({

            categoryname: item.categoryname,
            discount: item.discount,
            description: item.description,
            courseCode: item.courseCode,
            endDate: item.EndDate,
            startDate: item.StartDate,
            offercode: item.offerCode,
            coursename: item.coursename,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('api/v1/offer', formdata)
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("EError in submitting the form")
        }
    }

    const handleUpdate = async (e) => {
        try {   
            e.preventDefault();
            const { data } = await axios.post('api/v1/update-offer', formdata)
            if (data.success) {
                toast.success(data.message)
                setUpdate(false)
                setData({
                    categoryname: '',
                    discount: '',
                    description: '',
                    courseCode: '',
                    endDate: '',
                    startDate: '',
                    offercode: '',
                    coursename: ''
                })

                accessoffer()
            }
            else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("EError in submitting the form")
        }
    }
    return (
        <SuperAdminLayout>
            <ToastContainer />
            <div className='w-full  bg-gray-200 p-2 h-auto '>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>{update ? "Update Offer" : 'Course offer'}</h1>
                </div>

                <form onSubmit={update ? handleUpdate : handleSubmit}>
                    <div className='grid lg:grid-cols-3 md:grid-col-3 sm:grid-cols-2 gap-4  px-2'>
                        {/* <div className=''>
                            <label htmlFor="categoryname" className='text-lg mb-2 '>Select Category<strong className='text-red-600'>*</strong></label>
                            <select type='text' onChange={handleChange} value={formdata.categoryname} name="categoryname" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' >

                                <option value=''>Select Category</option>
                                {category.map((item,index)=>(
                                    <option key={index} value={ item.coursename}>{item.coursename}</option>
                                ))}
                            </select>
                        </div> */}
                        <div className='w-full'>
                            <label htmlFor="coursename" className='text-lg mb-2'>Select Course</label>
                            <select type='text' onChange={handleChange} value={formdata.coursename} name="coursename" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' >

                                <option value=''>Select Course</option>
                                {course.map((item, index) => (
                                    <option key={index} value={item.couresename} >{item.coursename}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="courseCode" className='text-lg mb-2'>Course Code</label>
                            <input type='text' readOnly onChange={handleChange} value={formdata.courseCode} name="courseCode" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="offercode" className='text-lg mb-2'>Offer Code</label>
                            <input type='text' onChange={handleChange} value={formdata.offercode} name="offercode" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>
                        <div className=''>
                            <label htmlFor="startDate" className='text-lg mb-2 '>Start Date<strong className='text-red-600'>*</strong></label>
                            <input type='date' onChange={handleChange} value={formdata.startDate} name="startDate" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="endDate" className='text-lg mb-2'>End Date</label>
                            <input type='date' onChange={handleChange} value={formdata.endDate} name="endDate" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>

                        <div className=''>
                            <label htmlFor="description" className='text-lg mb-2 '>Description <strong className='text-red-600'>*</strong></label>
                            <input type='text' onChange={handleChange} value={formdata.description} name="description" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="discount" className='text-lg mb-2'>Discount</label>
                            <input type='text' onChange={handleChange} value={formdata.discount} name="discount" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                        </div>

                    </div>
                    <div className='flex flex-row justify-center'>
                        <button type='submit' className='transition-shadow w-40 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 text-xl' style={{
                            background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 0%, rgba(0,172,255,1) 100%)'
                        }}>{update ? "Update" : "Submit"}</button>

                    </div>
                </form>

                <div className='bg-gray-200 w-full overflow-x-scroll'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2 '>Sno.</th>
                                <th className='p-2 border-2 '>Course Name</th>
                                <th className='p-2 border-2 '>Course Code </th>
                                <th className='p-2 border-2'>Discount </th>
                                <th className='p-2 border-2'>Offer Code </th>
                                <th className='p-2 border-2 '>Description </th>
                                <th className='p-2 border-2 '>Start Date </th>
                                <th className='p-2 border-2 '>End Date </th>
                                <th className='p-2 border-2'>Status</th>
                                <th className='p-2 border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {offer.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{index + 1}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.coursename}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.courseCode}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.discount}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.offerCode}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.description}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.StartDate}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.EndDate}</td>

                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>

                                        {item.status && item.status == '1' ? (
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

export default OfferZone