import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Fdashboard = () => {

    const [FAInfo, setFAInfo] = useState({ totalAdmission: 0, totalearnedcommission: 0, totalOutgoingForms: 0 });
    const [TotalCommission, setTotalCommission] = useState([])

    const UId = localStorage.getItem('uid');
    if (!UId) {
        console.error("No UId found in localStorage");
        return;
    }

    const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);

    const student = async () => {
        const { data } = await axios.post("/api/v1/get-student",{decryptedMobile})
        if (data.success) {
            setFAInfo( {totalAdmission: data.result[0] })
        }
    }
    const accesstotalcommission = async () => {
        const { data } = await axios.post('/api/v1/get-totalcommission', {decryptedMobile})
        if (data.success) {
            setTotalCommission(data.result[0].franchcommission)
        }
    }
    useEffect(() => {
        student(); accesstotalcommission();
    }, [])
    return (
        <FranchiseLayout>
            <div className='w-full bg-slate-100 p-2'>
                <div className='flex flex-col sm:m-4  m-1 border rounded-md bg-transparent-300  bg-blue-500 shadow-md' >
                    <h1 className='text-white text-xl sm:text-2xl m-2 sm:m-4 p-1 font-serif font-bold'>Dashboard</h1>
                </div>
                <div className='gap-4 grid grid-cols-1 sm:grid-cols-3 text-sm justify-center  m-2 sm:m-6 w-auto '>
                    <div className='h-18 sm:h-24 lg:w-[20vw] w-full bg-sky-600 flex my-1 box1 hover:bg-sky-700 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-24  bg-sky-800 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-5xl  sm:text-6xl p-1 text-white' />
                        </div>
                        <div className='h-18 sm:h-24 w-full flex  items-start justify-center text-white flex-col p-3'>
                            <p>TOTAL ADMISSION</p>
                            <span className='text-2xl'>{FAInfo && FAInfo.totalAdmission?.count}</span>
                        </div>
                    </div>

                    <div className='h-18 sm:h-24 lg:w-[20vw] w-full bg-red-500 flex my-1 box hover:bg-red-600 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-24 bg-red-700 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-5xl  sm:text-6xl text-white' />
                        </div>
                        <div className='h-18 sm:h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                            <p>TOTAL FEES DEPOSITED</p>
                            <span className='text-2xl'>{FAInfo.totalearnedcommission}</span>
                        </div>
                    </div>
                    <div className='h-18 sm:h-24 lg:w-[20vw] w-full bg-green-500 flex my-1 box hover:bg-green-600 hover:transition-transform hover:transform-gpu'>
                        <div className='h-full w-24 bg-green-700 flex items-center justify-center'>
                            <MdOutlinePlaylistAddCheck className='text-5xl  sm:text-6xl text-white' />
                        </div>
                        <div className='h-18 sm:h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                            <p>EARNED COMMESSION</p>
                            <span className='text-2xl'>{TotalCommission}</span>
                        </div>
                    </div>
                </div>
            </div>

        </FranchiseLayout>
    )
}

export default Fdashboard