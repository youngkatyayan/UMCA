import React from 'react'
import logo from '../../assets/logo2.png'
const UserHeader = () => {
  return (
    <>
       <div className='md:h-28 min-h-24 border shadow-md bg-white flex flex-col sm:flex-row items-center text-center justify-center sm:justify-around px-2 sm:px-5 md:px-20 py-2'>
      <img src={logo} alt="UMCA Logo" className='object-contain h-16 sm:h-full' width={130} />

      <div className='flex flex-col items-center  mt-2 sm:mt-0'>
        <h1 className='text-base sm:text-3xl font-semibold text-orange-600'>UMCA Education</h1>
        <h2 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>A Division of UMCA Foundation</h2>
        <h3 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>(NGO Redg. Under Sec 8 of The Company Act 1956 Ministry of Corporate Affairs, Govt. of India)</h3>
        <h4 className='text-[.8rem] sm:text-base font-semibold text-blue-950'>Registration No. -U85300UP2019NPL122900</h4>
      </div>
    </div>
    </>
  )
}

export default UserHeader