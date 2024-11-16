import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import axios from 'axios'
import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js';
import { MdEdit } from 'react-icons/md';

const StudentCommision = () => {
  const [commission, setCommission] = useState([])


  const accesscommision = async () => {
    const UId = localStorage.getItem('uid');
    if (!UId) {
      console.error("No UId found in localStorage");
      return;
    }
    try {

      const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);
      const { data } = await axios.post('/api/v1/get-partcommission', {decryptedMobile})
      if (data.success) {
        setCommission(data.result)
      }
    } catch (error) {
      toast.error("Error In fetching StudentCommission Lisr")
    }
  }
  useEffect(() => { accesscommision(); }, [])


  return (
    <FranchiseLayout>
      <div className='w-full bg-slate-100 p-2'>
        <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-blue-500 shadow-md' >
          <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>StudentWise Commission</h1>
        </div>

        <div className='bg-gray-200 overflow-x-scroll m-4 p-4'>
                    <table className='min-w-full border-collapse border border-gray-300 '>
                        <thead className='bg-slate-600 text-white' >
                            <tr className='font-serif whitespace-nowrap'>
                                <th className='p-2 border-2'>S.No </th>
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

                            {commission.map((item, index) => (
                                <tr key={index} className=' border-2 border-gray-400'>
                                    <td className='px-3 border-2 border-gray-400  '>{index+1}</td>
                                    <td className='px-3 border-2 border-gray-400  '>{item.name}</td>
                                    <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.categoryname}</td>
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



      </div>
    </FranchiseLayout>
  )
}

export default StudentCommision 