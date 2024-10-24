import React, { useEffect, useState } from 'react'
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import axios from 'axios'
import { Link, useNavigate  } from 'react-router-dom';
import { useRef } from 'react';
import future from '../../assets/futureIt.jpg'
const Courses = () => {
    const [allResult, setAllResult] = useState([])
    const prevref = useRef(null)
    const [isAtBottom, setIsAtBottom] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (prevref.current) {
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

    // navigate another page
    const handleNavigation = (id) => {
        navigate(`/courses/${id}`);
        window.location.reload()
    };
    return (

        <div className='w-full h-full shadow-md  shadow-[#ddd] my-5 grid grid-cols-1 px-5 md:grid-cols-[65%_35%] gap-3 '>

            <div className='w-full shadow-md bg-[#edf5f58a] '>
                <div className='w-full h-[5rem] shadow-md shadow-slate-400 bg-[#e2f3f0cb] px-5 flex items-center'>
                    <h1 className='text-2xl text-black'>UMCA Education</h1>
                </div>

                <div className="mx-3 border shadow-md bg-white my-2 py-4 px-5  text-justify gap-5 h-ful md:h-[23rem] overflow-hidden">
                    <div className="w-full  flex flex-col md:flex-row items-center gao-3">
                        <img src={future} alt="Future IT" className='h-52 me-5' width={350} />
                        <p className="text-justify leading-relaxed md:text-[1rem] ">
                            Indian IT industry has witnessed a rapid growth in the recent years. The demand for men and women with computer knowledge in IT industry is greater now than it has ever been. To in IT industry is greater now than is has ever been. To ensure your success, we have designed our training programmes in a scientific manner that develops your knowledge. Our faculty members are dedicated & devoted individuals of highest caliber with a genuine concern for building your future. UMCA Education has a strong commitment to develop  computer

                        </p>
                    </div>
                    <p className="text-justify leading-relaxed md:text-[1rem] text-ellipsis line-clamp-2 md:line-clamp-none"> professionals with high standards. In our efforts to deliver quality education, we emphasize on the need to establish a one-to-one contact with every student & be attentive to his/her needs so that the teacher can monitor individual progress & guide him/her accordingly on the way to success.

                        We wish the best of luck to all our existing and prospective students to take the right career decision at the right time.</p>
                </div>
            </div>

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
                            <div className='mx-3 p-2 shadow-md border h-32 md:h-[6.7rem] -z-10 mt-2 bg-white flex flex-col gap-1' key={index}>
                                <p className=''>{el.coursename}</p>
                                <p className='text-[.9rem] text-[#9c9696] text-justify text-ellipsis line-clamp-3 md:line-clamp-none'>{el.description}</p>
                                <Link onClick={() => handleNavigation(el.CoId)} className="text-blue-400">
                                    Read More
                                </Link>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>


    )
}

export default Courses