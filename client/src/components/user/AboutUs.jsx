import React from 'react';
import Userlayout from '../layout/Userlayout';

const AboutUs = () => {
    return (
        <Userlayout>
            <div className="min-h-screen bg-white">

                <div className="w-full bg-gradient-to-r from-blue-300 to-blue-500 relative h-64 ">

                    <div className="absolute left-16 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <div className="flex">
                            {['A', 'B', 'O', 'U', 'T'].map((letter, index) => (
                                <div
                                    key={index}
                                    className="w-12 h-12 bg-white text-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg transform rotate-3 border border-blue-200"
                                >
                                    {letter}
                                </div>
                            ))}
                            <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg transform rotate-3 border border-blue-200">
                                S
                            </div>
                        </div>
                    </div>

                    <h1 className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white text-6xl font-bold">
                        ABOUT US
                    </h1>
                </div>

                <div className="bg-gray-100 py-2 px-4 text-center text-sm text-gray-700 ">
                    <marquee className=" scrolling-text" behavior="scroll" direction="left">
                        UMCA EDUCATION IS REGISTERED UNDER THE COMPANIES ACT 1956, MINISTRY OF CORPORATE AFFAIRS, GOVT. OF INDIA REG.
                    </marquee>
                </div>


                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-6">
                        Welcome to{" "}
                        <span className="text-blue-600">UMCA Education</span>
                    </h2>

                    <div className="space-y-6 text-gray-700">
                        <p className="leading-relaxed">
                            Indian IT industry has witnessed a rapid growth in the recent years.
                            The demand for men and women with computer knowledge in IT industry
                            is greater now than it has ever been. To in IT industry is greater
                            now than is has ever been. To ensure your success, we have designed
                            our training programmes in a scientific manner that develops your
                            knowledge. Our faculty members are dedicated & devoted individuals
                            of highest caliber with a genuine concern for building your future.
                            Anshika Computer Academy has a strong commitment to develop computer
                            professionals with high standards.
                        </p>

                        <p className="leading-relaxed">
                            In our efforts to deliver quality education, we emphasis on the need
                            to establish a one to one contact with every student & be attentive
                            to his/her needs so that the teacher can monitor individual progress
                            & guide him/her accordingly on the way to success.
                        </p>

                        <p className="leading-relaxed">
                            We wish the best of luck to all our existing and prospective students
                            to take the right career decision at the right time.
                        </p>
                    </div>
                </div>
            </div>
        </Userlayout>
    );
};

export default AboutUs;