import React, { useEffect, useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import logo from '../../assets/logo2.png'
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Id from '../../assets/id.jpg'


const IdCard = () => {
    const [stDetails, setStDetails] = useState(null) // Start with null or an empty object

    const mobile = localStorage.getItem('uid')

    const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;

    const fetchStudent = async () => {
        try {
            if (decryptedMobile) {
                const { data } = await axios.post('/api/v1/getStudent-data', { decryptedMobile })
                console.log(data.result)

                if (data.success && data.result.length > 0) {
                    const student = data.result[0]; 
                    setStDetails({
                        name: student.name,
                        mobno: student.phone,
                        email: student.email,
                        state: student.state,
                        district: student.district,
                    })
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchStudent();
    }, []) // Only fetch once when the component mounts

    if (!stDetails) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <StudentLayout>
            <div className='w-full bg-slate-100 p-2'>
                <div className='border border-red-500'>
                    <div className='flex flex-col m-4 border rounded-md bg-transparent-100 bg-blue-800 shadow-md'>
                        <h1 className='text-white text-2xl m-4 text-center font-serif'>Student Identity</h1>
                    </div>

                    <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 m-8'>
                        <div className='border border-red-500'>
                            <div className="border border-red-500 text-center grid grid-cols-3">
                                <div className="border border-red-500 col-span-1 flex items-center justify-center p-2   ">
                                    <img src={logo} alt="UMCA Logo" className="object-contain h-full sm:h-full" width={80} />
                                </div>
                                <div className="border border-red-500 text-green-600 col-span-2 text-lg flex items-center font-thin justify-center">
                                    UMCA EDUCATION
                                </div>
                            </div>

                            <div className='border border-red-500 grid md:grid-cols-3 grid-cols-1 '>
                            <div className='border border-red-500 m-2 col-span-1  flex items-center justify-center order-1 sm:order-0 '>
                                    <img src={logo} alt="UMCA Logo" className="object-contain h-full sm:h-full" width={80} />
                                </div>
                                <div className='border border-red-500 p-2 mt-12 mb-12 col-span-2 order-0 sm:order-1 '>
                                    {/* Directly displaying stDetails */}
                                    <div><span className='font-bold'>Name: </span><span>{stDetails.name}</span></div>
                                    <div><span className='font-bold'>Phone: </span><span>{stDetails.mobno}</span></div>
                                    <div><span className='font-bold'>Email: </span><span>{stDetails.email}</span></div>
                                    <div><span className='font-bold'>State: </span><span>{stDetails.state}</span></div>
                                    <div><span className='font-bold'>District: </span><span>{stDetails.district}</span></div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="border border-red-500 flex items-center justify-center h-full w-full">
                            Back view
                        </div>
                    </div>
                </div>
                <p class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
  Responsive text example
</p>
            </div>
        </StudentLayout>
    )
}

export default IdCard;
