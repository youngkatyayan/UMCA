import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { MdOutlineWatchLater } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaRupeeSign } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
const FeatureCard = ({ Icon, title, description }) => (
    <div className="flex flex-col items-center text-center max-w-sm p-8 bg-white rounded-xl shadow-md">
        <div className="rounded-full bg-orange-50 p-8 mb-6">
            <Icon />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-blue-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);;
import git from '../../assets/25231.png'
import man from '../../assets/man.png'
import py from '../../assets/python-logo.png'
import mcr from '../../assets/RE1Mu3b.png'
import { FaArrowRightLong } from "react-icons/fa6";

const GroupCategory = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videos = [
        {
            id: 1,
            youtubeId: "coHF2jFsKHU",
            thumbnail: "/api/placeholder/640/360",
            title: "Success Story 1"
        },
        {
            id: 2,
            youtubeId: "coHF2jFsKHU",
            thumbnail: "/api/placeholder/640/360",
            title: "Success Story 2"
        },
        {
            id: 3,
            youtubeId: "coHF2jFsKHU",
            thumbnail: "/api/placeholder/640/360",
            title: "Success Story 3"
        }
    ];

    const IconCitizenCentric = () => (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    );

    const IconCareerFocused = () => (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    const IconMultilingual = () => (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    );

    const [allResult, setAllResult] = useState([])
    // console.log(allResult)
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

    const nextSlide = () => {
        setIsPlaying(false);
        setCurrentSlide((prev) => (prev + 1) % videos.length);
    };

    const prevSlide = () => {
        setIsPlaying(false);
        setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const goToSlide = (index) => {
        setIsPlaying(false);
        setCurrentSlide(index);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // parter section start
    const partners = [
        {
            id: 1,
            name: "Mangalayatan University",
            logo: man
        },
        {
            id: 2,
            name: "GitHub",
            logo: git
        },
        {
            id: 3,
            name: "Microsoft",
            logo: mcr
        },
        {
            id: 4,
            name: "Python",
            logo: py
        },
        // {
        //     id: 5,
        //     name: "",
        //     logo: "/api/placeholder/200/100"
        // }
    ];

    const pnextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= partners.length ? 0 : prevIndex + 1
        );
    };

    const pprevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? partners.length - 3 : prevIndex - 1
        );
    };

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


                            {(item.groupname === 'Skill' || item.groupname === 'skill') && (
                                <div className='w-full'>
                                    <p className="absolute z-10 -right-1 bg-[#3333df] text-white shadow-md -top-1 text-base rounded-md p-2">{item.coursemode}</p>
                                    <p className="absolute z-10 top-4 text-xl font-semibold left-2 text-white">{item.coursename}</p>
                                    <p className="absolute z-10 bottom-8 font-semibold left-2 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p>
                                    <div className="absolute mt-2 z-10 bottom-2 font-semibold left-2 text-md flex items-center gap-5 text-white">
                                        <p className='flex items-center gap-2'><FaRupeeSign />{item.yearlyfee === '0' ? 'Free' : item.yearlyfee} /-</p>
                                        <Link to={`/courses/${item.Id}`} className='flex items-center gap-1 text-orange-700'>Go To Course<FaArrowRightLong />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full grid gap-5 sm:gap-10 p-4 sm:grid-cols-2 lg:grid-cols-4 relative">
                    {allResult && allResult.slice(0, 4).map((item, index) => (
                        <div
                            key={index + item}
                            className={`group border-2 border-black h-48 w-56 rounded-lg transition-all duration-300 overflow-hidden relative `}
                        >
                            <div
                                className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-110 bg-blue-500"
                                style={{
                                    backgroundImage: `url(${`/api/v1/display-popular-course/${item.courseimage}`})`,
                                }}
                            ></div>


                            {(item.groupname === 'University' || item.groupname === 'university') && (
                                <div className='w-full'>
                                    <p className="absolute z-10 -right-1 bg-[#3333df] text-white shadow-md -top-1 text-base rounded-md p-2">{item.coursemode}</p>
                                    <p className="absolute z-10 top-4 text-xl font-semibold left-2 text-white">{item.coursename}</p>
                                    <p className="absolute z-10 bottom-8 font-semibold left-2 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p>
                                    <div className="absolute mt-2 z-10 bottom-2 font-semibold left-2 text-md flex items-center gap-5 text-white">
                                        <p className='flex items-center gap-2'><FaRupeeSign />{item.yearlyfee} /-</p>
                                        <Link to={`/courses/${item.Id}`} className='flex items-center gap-1 text-orange-700'>Go To Course<FaArrowRightLong />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

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


                            {(item.groupname === 'SDE' || item.groupname === 'sde') && (
                                <div className='w-full'>
                                    <p className="absolute z-10 -right-1 bg-[#3333df] text-white shadow-md -top-1 text-base rounded-md p-2">{item.coursemode}</p>
                                    <p className="absolute z-10 top-4 text-xl font-semibold left-2 text-white">{item.coursename}</p>
                                    <p className="absolute z-10 bottom-8 font-semibold left-2 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p>
                                    <div className="absolute mt-2 z-10 bottom-2 font-semibold left-2 text-md flex items-center gap-5 text-white">
                                        <p className='flex items-center gap-2'><FaRupeeSign />{item.yearlyfee === '0' ? 'Free' : item.yearlyfee} /-</p>
                                        <Link to={`/courses/${item.Id}`} className='flex items-center gap-1 text-orange-700'>Go To Course<FaArrowRightLong />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

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


                            {(item.groupname === 'NEILIT' || item.groupname === 'neilit') && (
                                <div className='w-full'>
                                    <p className="absolute z-10 -right-1 bg-[#3333df] text-white shadow-md -top-1 text-base rounded-md p-2">{item.coursemode}</p>
                                    <p className="absolute z-10 top-4 text-xl font-semibold left-2 text-white">{item.coursename}</p>
                                    <p className="absolute z-10 bottom-8 font-semibold left-2 text-md flex items-center gap-2 text-white"><MdOutlineWatchLater />{item.duration}</p>
                                     <div className="absolute mt-2 z-10 bottom-2 font-semibold left-2 text-md flex items-center gap-5 text-white">
                                        <p className='flex items-center gap-2'><FaRupeeSign />{item.yearlyfee === '0' ? 'Free' : item.yearlyfee} /-</p>
                                        <Link to={`/courses/${item.Id}`} className='flex items-center gap-1 text-orange-700'>Go To Course<FaArrowRightLong />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full py-5 my-5 mx-2 sm:mx-5 max-w-screen-xl">

                    <div className="bg-white rounded-xl shadow-md p-4 sm:w-[320px]  w-[250px] mx-auto">
                        <div className="flex items-center justify-between px-4 gap-1">
                            <div className="text-gray-600 text-xl md:text-3xl ">Skill <br />Courses</div>
                            <div className="text-blue-600 font-bold  md:text-3xl  text-xl ">7.1K+</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 sm:w-[320px]  w-[250px] mx-auto">
                        <div className="flex items-center justify-between px-4 gap-1">
                            <div className="text-gray-600 text-xl md:text-3xl ">Candidate  <br />Placed</div>
                            <div className="text-blue-600 font-bold  md:text-3xl  text-xl ">1K+</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 sm:w-[320px]  w-[250px] mx-auto">
                        <div className="flex items-center justify-between px-4 gap-1">
                            <div className="text-gray-600 text-xl md:text-3xl ">Skill <br /> Centers</div>
                            <div className="text-blue-600 font-bold  md:text-3xl  text-xl ">7+</div>
                        </div>
                    </div>



                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    Building a Skilled India
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    <FeatureCard
                        Icon={IconCitizenCentric}
                        title="Citizen Centric"
                        description="Designed to meet the skilling needs of India's diverse and aspirational population"
                    />

                    <FeatureCard
                        Icon={IconCareerFocused}
                        title="Career Focussed"
                        description="Relevant skill courses, certification, jobs and apprenticeships"
                    />

                    <FeatureCard
                        Icon={IconMultilingual}
                        title="Multilingual"
                        description="Explore Skill India Digital Hub in Multiple Indian languages"
                    />
                </div>
            </div>

            {/* success stories in video form start */}

            <div className="w-full max-w-4xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Success stories</h2>

                <div className="relative">
                    {/* Main video container */}
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        {isPlaying ? (
                            <iframe
                                className="w-full h-full absolute inset-0"
                                src={`https://www.youtube.com/embed/${videos[currentSlide].youtubeId}?autoplay=1&rel=0`}
                                title={videos[currentSlide].title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        ) : (
                            <>
                                <img
                                    src={`https://img.youtube.com/vi/${videos[currentSlide].youtubeId}/maxresdefault.jpg`}
                                    alt={`Success story ${currentSlide + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://img.youtube.com/vi/${videos[currentSlide].youtubeId}/hqdefault.jpg`;
                                    }}
                                />

                                {/* Play button overlay */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                    onClick={togglePlay}
                                >
                                    <div className="  bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-opacity">
                                        <div className="w-12 h-12 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent ml-1"><FaPlayCircle className='h-full w-full' /></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-gray-800 border-b-8 border-b-transparent"></div>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                    >
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent"></div>
                    </button>

                    {/* Video thumbnails/indicators */}
                    <div className="mt-4 flex justify-center gap-2">
                        {videos.map((video, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-24 h-16 overflow-hidden rounded transition-all ${currentSlide === index
                                    ? 'ring-2 ring-blue-500 scale-110'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* parterners section start */}

            <div className="w-full max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-sm">
                    PARTNERS
                </h2>

                <div className="relative">
                    <div className="flex items-center">
                        {/* Previous button */}
                        <button
                            onClick={pprevSlide}
                            className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Logo container */}
                        <div className="flex-1 overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)`,
                                }}
                            >
                                {partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className={`${window.innerWidth >= 1024
                                            ? 'w-1/3'
                                            : window.innerWidth >= 768
                                                ? 'w-1/2'
                                                : 'w-full'
                                            } flex-shrink-0 px-6`}
                                    >
                                        <div className="bg-white rounded-lg shadow-md p-6 h-40 flex items-center justify-center hover:shadow-lg transition-shadow">
                                            <img
                                                src={partner.logo}
                                                alt={`${partner.name} logo`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Next button */}
                        <button
                            onClick={pnextSlide}
                            className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GroupCategory