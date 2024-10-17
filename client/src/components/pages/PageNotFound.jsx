import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-150">
            <div className="bg-black text-white p-8 rounded-lg shadow-xl shadow-gray-950 w-full max-w-[65vw] h-full flex text-center justify-center flex-col max-h-[52vh]">
                <div className="flex items-center justify-center mb-6  ">
                    <svg className="w-36 h-36 mr-4 animate-pulse" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="30" fill="white" fillOpacity="0.2" filter="url(#glow)" />
                        <circle cx="24" cy="28" r="4" fill="white" />
                        <circle cx="40" cy="28" r="4" fill="white" />
                        <path d="M24 40 Q32 44 40 40" stroke="white" strokeWidth="2" fill="none" />
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur">
                                    <animate
                                        attributeName="stdDeviation"
                                        values="4;6;4"
                                        dur="3s"
                                        repeatCount="indefinite"
                                    />
                                </feGaussianBlur>
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>
                </div>
                <h1 className="md:text-6xl text-4xl font-bold mb-4 text-center">Oops!</h1>
                <p className="text-center mb-6 text-gray-400">We couldn't find the page you were looking for</p>
                <div className="flex justify-center">
                    <Link to={'/'} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default PageNotFound