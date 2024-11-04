import React, { useEffect, useState } from 'react'
import Userlayout from '../layout/Userlayout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import certi from '../../assets/certi.avif'
import img1 from '../../assets/1.avif'
import img2 from '../../assets/2.avif'
import img3 from '../../assets/3.avif'
import LearnPath from '../pages/LearnPath'
import { useNavigate } from 'react-router-dom'
const features = [
    { icon: '✓', text: "UMCA-EDU's JobAssist helps you get noticed by top hiring companies" },
    { icon: '✓', text: "Industry-recognized Data Analyst Master's certificate from UMCA-EDU" },
    { icon: '✓', text: "Dedicated live sessions by faculty of industry experts" },
    { icon: '✓', text: "Masterclasses from IBM experts" },
    { icon: '✓', text: "Industry-recognized IBM certifications for IBM courses" },
    { icon: '✓', text: "Ask-Me-Anything (AMA) sessions with IBM leadership" },
    { icon: '✓', text: "Capstone from 3 domains and 20+ projects" },
    { icon: '✓', text: "Exclusive hackathons conducted by IBM" },
    { icon: '✓', text: "Lifetime access to self-paced learning content" },
    { icon: '✓', text: "Program crafted to initiate your journey as a Data Analyst" }
];

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const Courses = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [allResult, setAllResult] = useState([])
    const navigate = useNavigate()
    const fetchCourse = async () => {
        try {
            if (id) {
                const response = await axios.post(`/api/v1/get-course-according-data/${id}`);
                if (response.data.success) {
                    setCourse(response.data.result[0]);
                }
            }
        } catch (error) {
            console.error('Course not fetched:', error.message);
        }
    };

    const allCourse = async () => {
        try {
            const { data } = await axios.get('/api/v1/display-popular-course')
            if (data.success) {
                setAllResult(data.result)
            }
        } catch (error) {
            console.error('Course not fetched:', error.message);
        }
    };

    useEffect(() => {
        allCourse();
    }, []);

    useEffect(() => {
        fetchCourse();
    }, [id]);
    // console.log(allResult)

    const handleNavigate = (value) => {
        navigate(`/entroll-course/${value}`)
        window.location.reload()
    }
    return (
        <Userlayout>
            {course ? (
                <>
                    <div className=" mx-auto p-6">

                        <div className="text-sm mb-6">
                            <Link to={'/'} className="text-blue-600">Home</Link>
                            <span className="mx-2">-</span>
                            <span>{course?.coursename}</span>
                        </div>


                        <div className="flex w-full flex-col lg:flex-row justify-between items-start gap-5 lg:gap-16 ">

                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.coursename}</h1>

                                <div className="mb-4">
                                    <span className="font-medium"> Data Analytics Course by</span>
                                    <span className="text-blue-600 ml-1">UMCA EDU</span>
                                </div>


                                <ul className="space-y-4 mb-8">
                                    {[
                                        `Earn a recognized ${course?.coursename} Certification to boost your career`,
                                        'Learn SQL, R, Python, data visualization, and predictive analytics skills',
                                        'Get hands-on experience with the latest tools and work on real-world projects',
                                        'Earn IBM certificates and benefit from Masterclasses by IBM experts'
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="mt-1 text-green-500 font-bold">✓</div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>


                                <div className="flex gap-4 mb-8">
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                                        Talk to advisor
                                    </button>
                                    <a
                                        href={`/api/v1/get-course-according-data/${course?.brochure}`}
                                        download
                                        className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50"
                                    >
                                        Download Syllabus
                                    </a>

                                </div>



                            </div>

                            <div className="lg:w-[32em] border-2">

                                <img src={`/api/v1/get-course-according-data/${course?.courseimage}`} alt="" className='w-' />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 md:grid-cols-4 shadow-md gap-6 bg-white p-6 rounded-lg shadow-sm relative">

                            <div>
                                <div className="text-gray-600 mb-1 text-md">Duration</div>
                                <div className="font-medium">{course?.duration}</div>
                            </div>

                            <div>
                                <div className="text-gray-600 mb-1 text-md">Learning Format</div>
                                <div className="font-medium">{course?.coursemode}</div>
                            </div>

                            <div>
                                <div className="text-gray-600 mb-1 text-md">Eligibility</div>
                                <div className="font-medium">{course?.eligibility}</div>
                            </div>

                            <div>
                                <div className="text-gray-600 mb-1 text-md">Fees</div>
                                <div className="font-medium">{course?.yearlyfee} /-</div>
                            </div>

                            <div className="bg-yellow-500 px-2 py-2 w-[6rem] absolute h-10 -bottom-5 left-16 sm:left-auto sm:right-5 sm:top-8">
                                <Link
                                    to={`/entroll-course/${course?.Id}`}
                                    state={{ course }}
                                    className="text-white font-semibold text-center block"
                                >
                                    JOIN NOW
                                </Link>
                            </div>


                        </div>
                    </div>

                    {/* key features starts  */}
                    <div className="lg:mx-8 p-6 my-5 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8">Key Features</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-500 text-sm">{feature.icon}</span>
                                        </div>
                                    </div>
                                    <span className="text-gray-700 leading-snug">
                                        {feature.text.split('IBM').map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && <span className="text-blue-700 font-medium">IBM</span>}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certificate advantage */}
                    <div className=" lg:mx-8 p-6 mb-5">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                    Certificate Advantage
                                </h2>

                                <p className="text-gray-700 mb-12 max-w-4xl">
                                    Get certified in {course?.coursename} with this UMCA program. Access masterclasses by experts, and AMAs with leadership.
                                    Earn {course?.coursename}  and UMCA certificates plus complete capstone projects. Advance your career now!
                                </p>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    Get Ahead With UMCA Advantage
                                </h3>
                                <div className="space-y-4 mb-5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-500 text-sm">✓</span>
                                            </div>
                                        </div>
                                        <span className="text-gray-700">
                                            Content and certificate by <span className="text-blue-700 font-medium">UMCA</span>
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-500 text-sm">✓</span>
                                            </div>
                                        </div>
                                        <span className="text-gray-700">
                                            Masterclasses by <span className="text-blue-700 font-medium">UMCA</span> experts
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                                        Earn Your {course?.coursename} Certificate
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-500 text-sm">✓</span>
                                                </div>
                                            </div>
                                            <span className="text-gray-700">
                                                Industry-recognized certificate by UMCA-EDU
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-500 text-sm">✓</span>
                                                </div>
                                            </div>
                                            <span className="text-gray-700">
                                                Dedicated live sessions by faculty of industry experts
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-4 relative overflow-hidden">
                                <div className="bg-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={certi}
                                        alt="UMCA Certificate"
                                        className="w-full h-auto"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* career support */}
                    <div className="lg:mx-8 p-6 mb-5 shadow-inner shadow-white">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Career Support</h1>

                        <div className="flex flex-col lg:flex-row gap-8">

                            <div className="lg:w-1/2 bg-blue-500 text-white p-8 rounded-lg">
                                <h2 className="text-2xl font-bold mb-2">UMCA-EDU</h2>
                                <h3 className="text-xl font-semibold mb-4">JobAssist Program</h3>

                                <p className="mb-6">
                                    UMCA-EDU Job Assist program is an India Specific Offering in partnership with
                                    IIMJobs.The Program offers extended support to certified learners to land their dream jobs.
                                </p>

                                <button className="flex items-center gap-2 bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    <span className="transform rotate-180">↑</span>
                                    Download Brochure
                                </button>
                            </div>

                            <div className="lg:w-1/2 space-y-6">
                                <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                                    <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={img1}
                                            alt="IIMJobs membership"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-semibold">IIMJobs Pro-Membership of 6 months for free</p>
                                </div>

                                <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                                    <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={img2}
                                            alt="Resume building"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-semibold">Resume building assistance to create a powerful resume</p>
                                </div>

                                <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                                    <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={img3}
                                            alt="Profile spotlight"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-semibold">Spotlight on IIMJobs for highlighting your profile to recruiters</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:mx-8 p-6 mb-5">
                        <LearnPath data={course} />
                    </div>
                </>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {allResult && allResult.map((url, index) => (
                        <div className="rounded-lg overflow-hidden shadow-lg bg-white w-full" key={index}>
                            {/* Course Image */}
                            <div className="relative">
                                <img
                                    src={`/api/v1/display-popular-course/${url?.courseimage}`}
                                    alt="Course thumbnail"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                                    {url?.coursemode}
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-blue-600">{url?.groupname}</span>
                                    <div className="flex items-center">
                                        <StarIcon />
                                        <span className="ml-1 text-sm text-gray-600">4.6</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {url?.coursename}
                                </h3>


                                <p className="text-gray-600 text-[.9rem] mb-2 text-ellipsis line-clamp-2">
                                    {url?.description}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <ClockIcon />
                                        <span className="ml-2">{url?.duration}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <UsersIcon />
                                        <span className="ml-2">1.2k Students</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <BookIcon />
                                        <span className="ml-2">12 Modules</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="text-green-500">✓</span>
                                        <span className="ml-2">Certificate</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <div>
                                        <span className="text-lg font-bold text-gray-500">₹ {url?.yearlyfee}/-</span>
                                        {/* <span className="text-sm text-gray-500 line-through ml-2">$199</span> */}
                                    </div>
                                    <Link onClick={() => handleNavigate(url?.Id)} className="bg-blue-600  text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors transform-gpu">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            )
            }
        </Userlayout >
    );
};

export default Courses;




