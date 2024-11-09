import React from 'react'
import StudentLayout from '../layout/StudentLayout'
import logo from '../../assets/logo2.png'

import { useState } from 'react'

const IdCard = () => {

    


    const [stDetails, setStDetails] = useState([])
    return (
        <StudentLayout>
            <div className='w-full bg-slate-100 p-2'>

                <div className='border border-red-500'>

                    <div className='flex flex-col m-4 border rounded-md bg-transparent-100  bg-blue-800 shadow-md' >
                        <h1 className='text-white text-2xl m-4  text-center font-serif'>Student Identity</h1>
                    </div>


                    <div className='grid grid-cols-2 gap-4 m-8'>
                        <div className='border border-red-500'>
                            <div className="border border-red-500 text-center grid grid-cols-3">
                                <div className="border border-red-500 col-span-1 flex items-center justify-center">
                                    <img src={logo} alt="UMCA Logo" className="object-contain h-full sm:h-full" width={80} />
                                </div>
                                <div className="border border-red-500 col-span-2 flex items-center justify-center">
                                    UMCA EDUCATION
                                </div>
                            </div>


                            <div className='border border-red-500  grid grid-cols-2'>
                                <div className='border border-red-500 p-2 m-2'>
                                    {stDetails.map((item, index) => (
                                        <div key={index}>
                                        <div> <span>Name :</span> <span>{item.name}</span></div>
                                        <div><span>Course;</span> <span>{item.course}</span></div>
                                        <div><span> D.O.B :</span> <span> {item.dob}</span></div>
                                        <div><span>Session :</span> <span>{item.session}</span></div>

                                        </div>
                                    ))}

                                </div >
                                <div className='border border-red-500 m-2'>
                                    <img src={logo} alt="UMCA Logo" className="object-contain h-full sm:h-full" width={80} />
                                </div>
                            </div>
                        </div>
                        <div className="border border-red-500 flex items-center justify-center h-full w-full">
                            Back view
                        </div>

                    </div>

                </div>
            </div>

        </StudentLayout>
    )
}

export default IdCard