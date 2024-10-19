import React from 'react'
import dove from '../../assets/gif/dove.gif'
import phone from '../../assets/gif/phone.gif'
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className=''>

            <div className='bg-[hsl(189,54%,97%)] px-5 border w-full shadow-md flex items-center gap-2 sm:gap-5 justify-center flex-wrap md:flex-nowrap'>

                <div className='flex gap-2 me-2'>
                    <img src={dove} alt="" height={24} width={24} className='mix-blend-multiply' />
                    <span className='text-[.9rem]'>useradmin@gmail.com</span>
                </div>

                <div className='clip hidden sm:flex'>. </div>

                <div className='flex gap-2 whitespace-nowrap'>
                    <img src={phone} alt="" height={24} width={24} className='mix-blend-multiply' />
                    <span className='text-[.9rem]'>+91 9876543212</span>
                </div>

                <div className='clip1 hidden sm:flex'>. </div>

                <div className='flex gap-4'>
                    <Link className='h-full' to={''}><FaInstagramSquare className='h-6 rounded-full text-[#C13584]' /></Link>
                    <Link className='h-full' to={''}><FaXTwitter className='h-6 rounded-full text-[#3498db]' /></Link>
                    <Link className='h-full' to={''}><IoLogoYoutube className='h-6 rounded-full text-[#FF0000]' /></Link>
                    <Link className='h-full' to={''}><FaFacebook className='h-6 rounded-full text-[#1877F2]' /></Link>
                </div>

            </div>

        </div>
    )
}

export default Home