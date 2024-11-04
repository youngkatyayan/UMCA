import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
const Footer = () => {
    return (
        <div className='bg-slate-200'>
            <div className='w-full sm:px-20 md:min-h-44 bg-slate-200 pb-5 shadow-current flex flex-col md:flex md:flex-row gap-5'>

                <div className='md:w-1/5'>
                    <p className='text-2xl font-semibold border-b-2 border-black md:py-2 px-2 md:px-0'>Quick Links</p>
                    <div className='flex flex-col pt-1 text-[#494646] md:space-y-2 px-2 md:px-0'>
                        <Link className='font-semibold' to={''}>Rule & Guidlines</Link>
                        <Link className='font-semibold' to={''}>Download Prospectus  </Link>
                        <Link className='font-semibold' to={''}>Certificate Verification</Link>
                    </div>
                </div>

                <div className='md:w-1/5'>
                    <div className='w-4/5'>
                        <p className='text-2xl font-semibold border-b-2 border-black md:py-2 px-2 md:px-0'>PNKVY</p>
                        <div className='flex flex-col pt-1 text-[#494646] md:space-y-2 px-2 md:px-0'>
                            <Link className='font-semibold' to={''}>Franchise Proposal</Link>
                            <Link className='font-semibold' to={'/login'}>Admin Login</Link>
                            {/* <Link className='font-semibold' to={''}>Certificate Verification</Link> */}
                        </div>
                    </div>
                </div>

                <div className='md:w-1/5'>
                    <div className='w-4/5'>
                        <p className='text-2xl font-semibold border-b-2 border-black md:py-2 px-2 md:px-0 '>Pay Fee</p>
                        <div className='flex flex-col pt-1 text-[#494646] md:space-y-2 px-2 md:px-0'>
                            <Link className='font-semibold' to={''}>Payment Details</Link>
                        </div>
                    </div>
                </div>

                <div className='md:w-1/5'>
                    <div className='w-4/5'>
                        <p className='text-2xl font-semibold border-b-2 border-black md:py-2 px-2 md:px-0'>Socail</p>
                        <div className='flex flex-col pt-1 text-[#494646] md:space-y-2 px-2 md:px-0'>
                            <Link className='font-semibold  flex items-center gap-1' to={''}><FaFacebook className='animate-pulse' />Facebook</Link>
                            <Link className='font-semibold flex items-center gap-1' to={''}><FaGooglePlusG className='animate-pulse' />Google Plus</Link>
                            <Link className='font-semibold flex items-center gap-1' to={''}><RiTwitterXLine className='animate-pulse' />Twitter</Link>
                        </div>
                    </div>
                </div>


                <div className='md:w-1/5'>
                    <p className='text-2xl font-semibold border-b-2 border-black md:py-2 px-2 md:px-0'>UMCA Education</p>
                    <div className='flex flex-col pt-1 text-[#494646] md:space-y-2 px-2 md:px-0 '>
                        <div className='font-semibold text-[.9rem]'>
                            <p className='flex gap-2 items-center'>
                                <MdLocationOn className='animate-pulse' />
                                H.N. 37, 2nd Floor, Near
                            </p>
                            <p>
                                Alwatiya  Hospital Chhama Enclave, Maruti Estate, Shahganj
                                <br />
                                Agra, UP 282010
                            </p>
                        </div>


                        <Link className='font-semibold flex items-center gap-2' to={''}><FaPhone className='animate-pulse' /> +91-9149261291 </Link>
                        <Link className='font-semibold flex items-center gap-2' to={''}><AiOutlineMail className='animate-pulse' />umcafoundation@gmail.com</Link>
                    </div>
                </div>
            </div>
            <p className='py-4 text-[.8rem] text-center '>All Copyright © 2024 reserved by UMCA Education Designed and Developed By <Link to={'https://umcaonlineservices.com/'} className='text-sky-400 hover:underline'>UMCA Online Services</Link></p>
        </div>
    )
}

export default Footer