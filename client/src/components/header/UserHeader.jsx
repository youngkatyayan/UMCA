import React from 'react'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'
const UserHeader = () => {
  const clipStyle = {
    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
    background: '#f3f1f1',
    width: '100px'
  };
  return (
    <div className='w-full'>

      <div className='md:h-28 min-h-24 border shadow-md bg-white flex flex-col sm:flex-row items-center text-center justify-center sm:justify-around px-2 sm:px-5 md:px-20 py-2'>
        <img src={logo} alt="UMCA Logo" className='object-contain h-full sm:h-full' width={130} />

        <div className='flex flex-col items-center  mt-2 sm:mt-0'>
          <h1 className='text-xl sm:text-3xl font-semibold text-orange-600'>UMCA Education</h1>
          <h2 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>A Division of UMCA Foundation</h2>
          <h3 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>(NGO Redg. Under Sec 8 of The Company Act 1956 Ministry of Corporate Affairs, Govt. of India)</h3>
          <h4 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>Registration No. -U85300UP2019NPL122900</h4>
        </div>

      </div>

      <div className='w-full h-16 bg-black flex items-center px-5'>

        <div className=' flex '>

          <Link className='text-lg text-orange-600 font-semibold flex'>
            <span style={clipStyle} className='h-full flex items-center ps-5 font-semibold '>
              UMCA
            </span>
            Educational
          </Link>
          <Link className='text-lg text-zinc-50 ps-5'>About</Link>
          <Link className='text-lg text-zinc-50 ps-5 relative'>Courses

            <div className='flex flex-col absolute text-[.9rem] bg-[#020202] px-4 py-2 top-11 space-y-1 border-2 border-white courses'>
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

          </Link>

        </div>

      </div>

    </div>
  )
}

export default UserHeader