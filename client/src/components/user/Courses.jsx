import React, { useEffect, useState, useRef } from 'react'
import Userlayout from '../layout/Userlayout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import courseLogo from '../../assets/banner.jpg'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
const Courses = () => {
    const param = useParams()
    const [loading, setLoading] = useState(false)
    const [course, setCouse] = useState([])
    const [allResult, setAllResult] = useState([])
    const prevref = useRef(null)
    const [isAtBottom, setIsAtBottom] = useState(false);
    // console.log(param)
    const fetchCours = async () => {
        const { id } = param
        try {
            if (id) {
                const response = await axios.post(`/api/v1/get-course-according-data/${id}`)
                if (response.data.success) {
                    setCouse(response.data.result)
                }
            }
        } catch (error) {
            console.log('Course not fetch', error.message)
        }
    }
    useEffect(() => {
        fetchCours()
    }, [param]);

    // console.log(course)
    useEffect(() => {
        if (prevref.current) {
            // Check whether the content is scrolled to the bottom
            const handleScroll = () => {
                const isBottom = prevref.current.scrollTop + prevref.current.clientHeight >= prevref.current.scrollHeight;
                setIsAtBottom(isBottom);
            };

            prevref.current.addEventListener('scroll', handleScroll);
            return () => {
                prevref.current.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const fetchCourse = async () => {
        try {
            const response = await axios.get('/api/v1/get-course')
            if (response.data.success) {
                setAllResult(response.data.result)
                // console.log(response.data.result)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchCourse()

    }, []);


    const handlePrev = () => {
        if (prevref.current) {
            prevref.current.scrollTop -= 100
        }
    }

    const handleNext = () => {
        if (prevref.current) {
            prevref.current.scrollTop += 100
        }
    }
    return (
        <Userlayout>
            {
                loading ? (
                    <div className=''>
                        <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                            Loading...
                        </button>
                    </div>
                ) : (

                    <div className='w-full h-full'>
                        <div className='w-full bg-[#dff7f2]'>
                            <img src={courseLogo} alt="" />
                            <div className='flex w-full'>
                                <div className='clip3 ps-3'>Announcements</div>
                                <div className='w-full'>
                                    <marquee direction="left" behavior="alternate" scrollamount="5" scrolldelay="100" >UMCA Education is Reged. Under the companies act 1956 Mninstry of corporate affairs Govt. of India Reg. No. is - U85300UP2019NPL122900  </marquee>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-full shadow-md  shadow-[#ddd] my-5 grid grid-cols-1 px-5 md:grid-cols-[65%_35%] gap-3 '>

                            {
                                course && course.map((item, index) => (
                                    <div className='w-full shadow-md bg-[#edf5f58a] '>
                                        <div className='w-full h-[5rem] shadow-md shadow-slate-400 bg-[#e2f3f0cb] px-5 flex items-center'>
                                            <h1 className='text-2xl text-black'>{item.coursename}[]</h1>
                                        </div>

                                        <div className="mx-3 border shadow-md bg-white my-2 py-4 px-5  text-justify gap-5 h-ful md:h-[23rem] overflow-hidden">

                                        </div>

                                    </div>
                                ))
                            }


                            <div className='shadow-sm pb-5 relative bg-[#edf5f58a]' >

                                <div className='w-full h-[5rem] z-10 shadow-md shadow-slate-400 bg-[#d9f1ed] px-5 flex items-center justify-between'>
                                    <h1 className='text-2xl text-red-600'>Offered Courses</h1>
                                    <div className=''>
                                        <p onClick={handlePrev} ><AiFillCaretUp /></p>
                                        <p
                                            onClick={handleNext}
                                            className={`${isAtBottom ? 'cursor-not-allowed opacity-50' : ''}`}
                                            disabled={isAtBottom}
                                        >
                                            <AiFillCaretDown />
                                        </p>
                                    </div>
                                </div>

                                <div className='h-[23rem] overflow-hidden' ref={prevref}>
                                    {
                                        allResult && allResult.map((el, index) => (
                                            <div className='mx-3 p-2 shadow-md border h-32 md:h-[6.7rem] -z-10 mt-2 bg-white flex flex-col gap-1' key={index + el}>
                                                <p className=''>{el.coursename}</p>
                                                <p className='text-[.9rem] text-[#9c9696] text-justify text-ellipsis line-clamp-3 md:line-clamp-none'>{el.description}</p>
                                                <Link to={`/courses/${el.CoId}`} className='text-blue-400'>Read More</Link>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                )}
        </Userlayout>
    )
}

export default Courses