import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import axios from 'axios'
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { FaRegFilePdf } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import IdCard from "../student/IdCard.jsx"


import CryptoJS from 'crypto-js';



const StudentDetails = () => {
    
    const [studentDetails,setStudentDetails] =useState([])
    const [selectedStudent, setSelectedStudent] = useState(null);
    const UId = localStorage.getItem('uid')

    const accessstdetails = async () => {
        if (!UId) {
            console.error("No UId found in localStorage");
            return;
        }

        const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);
        const { data } = await axios.post('/api/v1/get-franstudentdetails',{decryptedMobile})
        if (data.success) {
            setStudentDetails(data.result)
        }
    }
    useEffect(() => { accessstdetails(); }, [])


    const handleApplication=async(item)=>{
    }
    const handleId=async(item)=>{
        setSelectedStudent(item);
        console.log('first')
        
    }
    return (
    <FranchiseLayout>
        <div className='flex flex-col flex-1 overflow-auto p-2 bg-slate-100'>
                <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-blue-500 shadow-md' >
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Studenta Details</h1>
                </div>

                <div className='bg-gray-200 overflow-x-scroll m-4 p-4'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>S.No </th>
                                <th className='p-2 border-2 '>Application Form </th>
                                <th className='p-2 border-2 '>Student Id </th>
                                <th className='p-2 border-2'> Student Name</th>
                                <th className='p-2 border-2 '>Category </th>
                                <th className='p-2 border-2 '>Course </th>
                                <th className='p-2 border-2 '>Session </th>
                                <th className='p-2 border-2 '>Total Fees </th>
                                <th className='p-2 border-2 '>Commission Percent</th>
                                <th className='p-2 border-2 '>Commission </th>
                                </tr>
                        </thead>
                        <tbody>

                            {studentDetails.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{index+1}</td>
                                    <td className='px-3  border-gray-400  flex justify-center  '>
                                    <FaAddressCard className='text-blue-600 text-4xl  cursor-pointer' onClick={()=>handleApplication(item)} />
                                    </td>
                                    <td className='px-3 border-2 border-gray-400   ' onClick={()=>handleId(item)}>
                                        {<FaRegFilePdf className='text-red-500 text-4xl  cursor-pointer'/>}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.name}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.7rem]'>{item.categoryname}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.coursename}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.session}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.yearlyfee}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.commissionper}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.commissionern}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {selectedStudent && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Student ID Card</h2>
                    <IdCard student={selectedStudent} /> {/* Pass the student data as props */}
                </div>
            )}
       </div>

    </FranchiseLayout>
  )
}

export default StudentDetails