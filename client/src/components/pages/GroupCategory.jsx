import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import axios from 'axios';
import is from '../../assets/is.jpg'
import ccc from '../../assets/ccc.jfif'
import o from '../../assets/level.webp'
import { MdOutlineWatchLater } from "react-icons/md";
const GroupCategory = () => {
    const [allResult, setAllResult] = useState([])

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const school = [
        `url(${ccc})`,
        `url(${o})`,
        `url(${''})`,
        `url(${''})`
    ];


    // display course data
    const fetchCourse = async () => {
        try {
            const { data } = await axios.get('/api/v1/display-popular-course')
            if (data.success) {
                setAllResult(data.result)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, []);
    return (

        <div className=' py-2 md:mt-1 flex flex-col items-center justify-center' >

            <h1 className='text-xl md:text-2xl font-bold font-serif  text-[#0f2b33] whitespace-nowrap items-center justify-center flex'>Our <pre className='text-orange-600'> Course </pre> Category</h1>

            <motion.div className='w-full py-5  gap-2 sm:gap-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 container' variants={container}
                initial="hidden"
                animate="visible">

                <motion.div className='item border-2 rounded-xl shadow-md sm:py-3 py-2 text-center bg-white' variants={item}>
                    <p className='text-base sm:text-2xl firstGroup text-[#35c0eb]'>Higher <span className='text-[hsl(36,93%,59%)]'>Education</span></p>
                    <p className='text-[.8rem]  sm:text-[.9rem] firstGroup from-neutral-500'>University Courses</p>
                </motion.div>

                <motion.div className=' item border-2 rounded-xl shadow-md py-3  text-center bg-white' variants={item}>
                    <p className='text-base sm:text-2xl firstGroup text-[#fa5e36]'>Skill <span className='text-[hsl(214,94%,66%)]'>Course</span></p>
                    <p className='text-[.8rem]  sm:text-[.9rem] firstGroup from-neutral-500'>Job Oriented Training</p>
                </motion.div>

                <motion.div className='item border-2 rounded-xl shadow-md py-3  text-center bg-white' variants={item}>
                    <p className='text-base sm:text-2xl firstGroup text-[#0c232b]'>NIE<span className='text-[hsla(0,93%,59%,1)]'>LIT</span></p>
                    <p className='text-[.8rem]  sm:text-[.9rem] firstGroup from-neutral-500'>ccc & 'o' Level</p>
                </motion.div>

                <motion.div className='item border-2 rounded-xl shadow-md py-3  text-center bg-white' variants={item}>
                    <p className='text-base sm:text-2xl firstGroup text-[#fa5e36] '>Software <span className='text-[hsl(214,94%,66%)]'>Development</span></p>
                    <p className='text-[.8rem]  sm:text-[.9rem] firstGroup from-neutral-500'>Engineering</p>
                </motion.div>

                <motion.div className='item border-2 rounded-xl shadow-md py-3  text-center bg-white' variants={item}>
                    <p className='text-base sm:text-2xl firstGroup text-[#35c0eb]'>Open <span className='text-[hsl(36,93%,59%)]'>Schooling</span></p>
                    <p className='text-[.8rem]  sm:text-[.9rem] firstGroup from-neutral-500'>School Education</p>
                </motion.div>

            </motion.div>

            <div className=" mt-2 shadow-md bg-white px-4 py-5 rounded-lg sm:px-8">
                <h1 className="text-center text-base sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-950 hover:from-pink-500 hover:to-orange-500">
                    Most <span className=" text-[rgb(2,0,36)]">Popular</span> Course
                </h1>

                <div className="w-full grid gap-5 sm:gap-10 p-4 sm:grid-cols-2 lg:grid-cols-4 relative">
                    {allResult && allResult.slice(0, 4).map((item, index) => (
                        <div
                            key={index + item}
                            className={`group border-2 border-black h-48 w-56 rounded-lg transition-all duration-300 overflow-hidden relative`}
                        >
                            <div
                                className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${`/api/v1/display-popular-course/${item.courseimage}`})`,
                                }}
                            ></div>


                            {item.groupname === 'University' && (
                                <div className='w-full'>
                                    <p className="absolute z-10 -right-1 bg-[#3333df] text-white shadow-md -top-1 text-base rounded-md p-2">{item.coursemode}</p>
                                    <p className="absolute z-10 top-4 text-xl font-semibold left-2 text-white">{item.coursename}</p>
                                    <p className="absolute z-10 top-24 font-semibold left-1 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p>
                                    {/* <p className="absolute z-10 top-24 font-semibold left-1 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p> */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                <div className="w-full grid gap-5 sm:gap-10 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    {allResult && allResult.slice(0, 4).map((item, index) => (
                        <div
                            key={index + item.coursename}
                            className="group border-2 border-black h-48 w-56 rounded-lg flex items-center justify-center text-white text-xl font-semibold overflow-hidden transition-transform duration-300"
                        >
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    backgroundImage: school[index % school.length]
                                }}
                            >
                                <p className=' text-center'>{item.coursename}</p>
                            </div>
                        </div>
                    ))}
                </div>



            </div>



        </div>

    )
}

export default GroupCategory