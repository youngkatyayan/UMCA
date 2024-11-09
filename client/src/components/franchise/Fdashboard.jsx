import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Fdashboard = () => {

    const [FAInfo, setFAInfo] = useState({ totalAdmission: 0, totalOutgoingForms: 0, totalOutgoingForms: 0 });

    const UId = localStorage.getItem('uid');
    if (!UId) {
        console.error("No UId found in localStorage");
        return;
    }
    // console.log(FAInfo)

    const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);

    const student = async () => {
        const { data } = await axios.post("/api/v1/get-student",{decryptedMobile})
        if (data.success) {
            setFAInfo( {totalAdmission: data.result[0] })
        }
    }
    useEffect(() => {
        student();
    }, [])
    return (
        <FranchiseLayout>
            <div className='w-full bg-slate-300 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-white shadow-md' >
                    <h1 className='text-black text-2xl m-4 p-1 font-serif font-bold'>Dashboard</h1>
                </div>
                <div className='gap-4 sm:flex justify-center my-2 w-auto '>
                    <div className='h-24 lg:w-[20vw] w-full bg-sky-600 flex my-1 box1 hover:bg-sky-700 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-36 bg-sky-800 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                        </div>
                        <div className='h-24 w-full flex text-lg items-start justify-center text-white flex-col px-3'>
                            <p>TOTAL ADMISSION</p>
                            <span className='text-2xl'>{FAInfo && FAInfo.totalAdmission?.count}</span>
                        </div>
                    </div>

                    <div className='h-24 lg:w-[20vw] w-full bg-red-500 flex my-1 box hover:bg-red-600 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-36 bg-red-700 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                        </div>
                        <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                            <p>TOTAL FEES DEPOSITED</p>
                            <span className='text-2xl'>{FAInfo.totalOutgoingForms}</span>
                        </div>
                    </div>
                    <div className='h-24 lg:w-[20vw] w-full bg-green-500 flex my-1 box hover:bg-green-600 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-36 bg-green-700 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                        </div>
                        <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                            <p>EARNED COMMESSION</p>
                            <span className='text-2xl'>{FAInfo.totalOutgoingForms}</span>
                        </div>
                    </div>
                </div>
            </div>

        </FranchiseLayout>
    )
}

export default Fdashboard