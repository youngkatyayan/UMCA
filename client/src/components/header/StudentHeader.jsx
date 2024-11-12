import React, { useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import user from '../../assets/gif/user.gif'
const StudentHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  // const [openSideBar, setOpenSideBar] = useState(false)
  const handleDelete = async (req, res) => {
    try {

      const { data } = await axios.delete('/api/v1/logout')
      if (data.success) {
        toast.success(data.message)
        localStorage.clear()
        sessionStorage.clear()
        setTimeout(() => {
          window.location.href = '/login'
        }, 500);
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      alert(error.message)
    }
  }


  const uid = localStorage.getItem('uid')
  const decryptedType = uid ? CryptoJS.AES.decrypt(uid, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;
  return (
    <>
      <ToastContainer />
      <div className="flex items-start justify-center ">
        <div className="header text-black flex justify-between items-center w-full text-3xl font-serif p-3 relative">
          {/* <span >
            <AiOutlineMenu className="text-black text-3xl mx-3" onClick={()=>setOpenSideBar(prev=>!prev)} />
          </span> */}
          <span className="absolute left-1/2 transform -translate-x-1/2">UserId:{decryptedType}</span>

          <div className="flex items-center ml-auto">
            <span className='px-4'>
              <FaRegMessage className='mx-2' />
            </span>
            <span className='px-4'>
              <IoIosNotificationsOutline />
            </span>
            <span className="ml-4 overflow-hidden" onClick={() => setOpenMenu(prev => !prev)}>
              <img src={user} alt="" className='me-6 h-10 mix-blend-multiply' />
              {/* <CiSettings className='me-6' /> */}
            </span>
          </div>
        </div>
      </div>

      {
        openMenu && (
          <div className='min-w-32 bg-slate-50 font-serif px-3 py-3 rounded-sm shadow-md shadow-gray-400 flex flex-col gap-3 whitespace-nowrap justify-start absolute right-2 top-14' style={{ zIndex: '1000' }}>
            <Link to={'/update-profile'} className='hover:border-2 hover:bg-purple-100 hover:shadow-sm  hover:rounded-s px-2 hover:text-purple-600 hover:shadow-purple p-1'>
             Update Profile
            </Link>
            <hr />
            <Link className='hover:border-2 hover:bg-purple-100 hover:shadow-sm  hover:rounded-s px-2 hover:text-purple-600 hover:shadow-purple p-1'>
              Change Password
            </Link>
            <hr />
            <Link className='hover:border-2 hover:bg-purple-100 hover:shadow-sm  hover:rounded-s px-2 hover:text-purple-600 hover:shadow-purple p-1'
              onClick={() => handleDelete()}>
              Logout
            </Link>
          </div>
        )
      }

    </>
  )
}

export default StudentHeader