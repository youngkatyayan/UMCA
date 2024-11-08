import React, { useEffect, useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import { FaSearch } from 'react-icons/fa'

const EnrolledCourses = () => {


    const [formdata, setData] = useState({
        coursename: "",
    })
    const [course,setCourse]=useState([])

    const accestudcor = async () => {
        const { data } = await axios.get('/api/v1/get-studcourse')
        if(data.success){
            setMode(data.result)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((...prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault;
        setData((...prevData) => ({ ...prevData, [name]: value }))
    }
    useEffect(()=>(accestudcor),[])

    return (
        <StudentLayout>

            <div className='w-full bg-gray-200 p-2'>
                <h1 className='text-white text-xl m-4 p-3 font-serif font-bold bg-slate-500 rounded-md '>Enrolled Course</h1>
                <form onSubmit={handleSubmit} className="flex items-center mb-8 mx-6">
                    <label htmlFor="group" className="m-1 font-serif text-lg px-2">Search course</label>
                    <input
                        required
                        type="text"
                        name="group"
                        value={formdata.group}
                        onChange={handleChange}
                        placeholder="Search course"
                        className="p-1 rounded-l-3xl my-2 shadow-md w-1/4"
                    />
                    <button
                        type="submit"
                        className="transition-shadow  bg-gray-700 hover:bg-gray-800 border-1    text-white rounded-r-3xl p-1 flex items-center justify-center  w-16"
                    >
                        <FaSearch className="m-1" />
                    </button>
                </form>


                <div className='grid grid-cols-2 mt-4 gap-8'>
                    {course.map((item,index)=>(
                        <div className='border border-red-200   justify-center text-center bg-white' key={index} > {item.   coursename}</div>
                    ))}
                </div>
            </div>

        </StudentLayout>
    )
}

export default EnrolledCourses