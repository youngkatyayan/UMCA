import React, { useState } from 'react'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'
import { RiArrowDropDownFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


const UserHeader = () => {
  const [course, setCourse] = useState(false)
  const [changeBar, setChangeBar] = useState(false)
  const navigate = useNavigate()
  // for menu function
  const toggleMenu = (e, value) => {
    e.preventDefault()
    setCourse(prev => prev === value ? null : value)
  }

  const clipStyle = {
    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
    background: '#f3f1f1',
    width: '100px'
  };
  return (
    <div className='w-full '>

      <div className='md:h-28 min-h-24 border shadow-md bg-white flex flex-col sm:flex-row items-center text-center justify-center sm:justify-around px-2 sm:px-5 md:px-20 py-2'>
        <img src={logo} alt="UMCA Logo" className='object-contain h-full sm:h-full' width={130} />

        <div className='flex flex-col items-center  mt-2 sm:mt-0'>
          <h1 className='text-xl sm:text-3xl font-semibold text-orange-600'>UMCA Education</h1>
          <h2 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>A Division of UMCA Foundation</h2>
          <h3 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>(NGO Redg. Under Sec 8 of The Company Act 1956 Ministry of Corporate Affairs, Govt. of India)</h3>
          <h4 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>Registration No. -U85300UP2019NPL122900</h4>
        </div>

      </div>

      <div className='w-full h-16 bg-black flex items-center p-0 md:px-5'>


        <div className='visible md:hidden flex items-center justify-between w-full relative ' >

          <Link to='/' className='text-orange-600 font-semibold flex ms-5' >
            <p style={clipStyle} className='h-full flex items-center ps-2 font-semibold gap-1'>
              <IoMdHome className='text-xl' />
              UMCA
            </p>
            Educational
          </Link>

          <Link className='text-white text-xl transition-transform duration-300 border py-2 px-3 me-5' onClick={() => setChangeBar(prev => !prev)}>
            {changeBar ? <RxCross2 /> : <FaBars />}
          </Link>

          {changeBar && (
            <div className={`w-full bg-slate-600 mt-2 py-2 absolute top-full -z-20 flex flex-col space-y-2 transition-transform duration-300 ease-in ${changeBar ? 'translate-y-0 visible' : '-translate-y-full'}`}>
              <Link className='text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>About</Link>

              {/* Courses Dropdown */}
              <div className='text-zinc-50 relative menu group'>
                <Link onClick={(e) => toggleMenu(e, 1)} className='group-focus:text-sky-500 flex ps-5 focus-within:bg-black focus-within:py-2 items-center'>
                  Courses <RiArrowDropDownFill />
                </Link>

                {course === 1 && (
                  <div className='flex flex-col w-full absolute z-20 text-[.9rem] bg-neutral-700 px-4 py-2 top-full space-y-1 courses transition-transform duration-300 ease-in rounded-md translate-y-0 visible'>
                    <Link className='whitespace-nowrap'>O Level</Link>
                    <Link className='whitespace-nowrap'>CCC</Link>
                    <Link className='whitespace-nowrap'>DCA</Link>
                    <Link className='whitespace-nowrap'>ADCA</Link>
                    <Link className='whitespace-nowrap'>DDTP</Link>
                    <Link className='whitespace-nowrap'>DCFA</Link>
                    <Link className='whitespace-nowrap'>DMHM</Link>
                    <Link className='whitespace-nowrap'>DC FA</Link>
                    <Link className='whitespace-nowrap'>Tally GST With Accounting</Link>
                    <Link className='whitespace-nowrap'>Basic Computer</Link>
                    <Link className='whitespace-nowrap'>Hindi Computer Typing</Link>
                    <Link className='whitespace-nowrap'>English Computer Typing</Link>
                    <Link className='whitespace-nowrap'>English Computer Typing (ADCA)</Link>
                    <Link className='whitespace-nowrap'>DCHM</Link>
                    <Link className='whitespace-nowrap'>MDCA</Link>
                  </div>
                )}
              </div>

              {/* Student Zone Dropdown */}
              <div className='text-zinc-50 relative menu group'>
                <Link onClick={(e) => toggleMenu(e, 2)} className='group-focus:text-sky-500 flex ps-5 items-center whitespace-nowrap focus-within:bg-black focus-within:py-2'>
                  Student Zone <RiArrowDropDownFill />
                </Link>

                {course === 2 && (
                  <div className='flex flex-col absolute w-full  text-[.9rem] bg-neutral-700 px-4 py-2 top-full space-y-1 transition-transform duration-300 ease-in rounded-md  translate-y-0 visible'>
                    <Link className='whitespace-nowrap'>Enquiry</Link>
                    <Link className='whitespace-nowrap'>Certificate Verification</Link>
                  </div>
                )}
              </div>

              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'> Centers</Link>
              <Link to={'/franch-request' } className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>Franchise </Link>
              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'> Gallery</Link>
              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>Placement</Link>
              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>PMKVY</Link>
              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>Workshop</Link>
              <Link className='whitespace-nowrap text-zinc-50 ps-5 focus-within:bg-black focus-within:py-2'>Contact Us</Link>
            </div>
          )}
        </div>






        <div className='hidden  md:flex md:gap-[.8vw] lg:gap-[1.5vw]'>

          <Link to='/' className=' text-orange-600 font-semibold flex'>
            <span style={clipStyle} className='h-full flex items-center ps-2 font-semibold gap-1'><IoMdHome className='text-xl' />
              UMCA
            </span>
            Educational
          </Link>
          <Link className=' text-zinc-50 '>About</Link>

          <Link   to={'/courses'} className=' text-zinc-50  relative  menu group'>Courses
            {/* <p onClick={(e) => toggleMenu(e, 1)} className='group-focus:text-sky-500 flex items-center justify-center'>Courses <RiArrowDropDownFill /></p> */}

            {/* <div
              className={`flex flex-col absolute text-[.9rem] bg-[#020202] px-4 py-2 top-10 space-y-1 border-2 border-white courses transition-transform duration-300 ease-in rounded-md -z-20 ${course === 1 ? 'translate-y-[0] visible' : '-translate-y-[100%]'
                }`}
            >
              <Link className='whitespace-nowrap'>O Level</Link>
              <Link className='whitespace-nowrap'>CCC</Link>
              <Link className='whitespace-nowrap'>DCA</Link>
              <Link className='whitespace-nowrap'>ADCA</Link>
              <Link className='whitespace-nowrap'>DDTP</Link>
              <Link className='whitespace-nowrap'>DCFA</Link>
              <Link className='whitespace-nowrap'>DMHM</Link>
              <Link className='whitespace-nowrap'>DC FA</Link>
              <Link className='whitespace-nowrap'>Tally GST With Accounting</Link>
              <Link className='whitespace-nowrap'>Basic Computer</Link>
              <Link className='whitespace-nowrap'>Hindi Computer Typing</Link>
              <Link className='whitespace-nowrap'>English Computer Typing</Link>
              <Link className='whitespace-nowrap'>English Computer Typing (ADCA)</Link>
              <Link className='whitespace-nowrap'>DCHM</Link>
              <Link className='whitespace-nowrap'>MDCA</Link>
            </div> */}

          </Link>

          <Link className=' text-zinc-50  relative  menu group'>Student Zone
            {/* <p onClick={(e) => toggleMenu(e, 2)} className='group-focus:text-sky-500 flex items-center justify-center whitespace-nowrap'>Student Zone <RiArrowDropDownFill /></p>

            <div
              className={`flex flex-col absolute text-[.9rem] bg-[#020202] px-4 py-2 top-10 space-y-1 border-2 border-white courses transition-transform duration-300 ease-in rounded-md -z-10 ${course === 2 ? 'translate-y-[0] visible' : '-translate-y-[100%] '
                }`}
            >
              <Link className='whitespace-nowrap'>Enquiry</Link>
              <Link className='whitespace-nowrap'>Certificate Verification</Link>

            </div> */}
          </Link>

          <Link className=' text-zinc-50 '>Centers</Link>
          <Link to={'/franch-request' } className=' text-zinc-50 '>Franchise</Link>
          <Link className=' text-zinc-50 '>Gallery</Link>
          <Link className=' text-zinc-50 '>Placement</Link>
          <Link className=' text-zinc-50 '>PMKVY</Link>
          <Link className=' text-zinc-50 '>Workshop</Link>
          <Link  className=' text-zinc-50 '>Contact Us</Link>
        </div>

      </div>

    </div>
  )
}

export default UserHeader