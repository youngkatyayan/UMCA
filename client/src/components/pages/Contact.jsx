import React, { useState } from 'react';
import Userlayout from '../layout/Userlayout.jsx';
import contactImg from '../../assets/contactBnr.jpg';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!captchaValue) {
            alert('Please verify that you are not a robot.');
            return;
        }
        console.log('Form submitted:', formData);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <Userlayout>
            <div className='m-0 p-0'>

                <div className='shadow-md shadow-slate-600'>
                    <img src={contactImg} alt="" className="w-full object-cover" />
                </div>

                <div className=" mx-auto p-6  bg-gray-100 sm:m-3 m-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-blue-600">
                            <span>📞</span>
                            <h1 className="text-xl font-semibold">UMCA Education</h1>
                            <a href="#contact" className="text-green-700 hover:text-green-800">Contact us</a>
                        </div>
                    </div>

                    <div className="md:flex md:gap-8 bg-white p-6 rounded-lg shadow-md">

                        <div className="md:w-1/2 sm:ms-4 m-0">
                            <h2 className="text-purple-600 text-2xl mb-6 font-semibold">Enquiry Form</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-700">Full Name:</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter Your Full Name"
                                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label  className="text-gray-700">Phone:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter Contact No"
                                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label  className="text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email Address"
                                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-700">Message:</label>
                                    <textarea
                                        name="message"
                                        placeholder="Type Your Message"
                                        rows="4"
                                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex justify-center mt-4">
                                    <ReCAPTCHA
                                        sitekey='6Le3OX0qAAAAAEiGOySr55PcQ9jurtm3qJc1yMwp'
                                        onChange={handleCaptchaChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-6 transition-colors"
                                >
                                    Send Query
                                </button>
                            </form>
                        </div>


                        <div className="mt-8 md:mt-0 md:w-1/2 space-y-4 text-right text-gray-800 sm:me-4 m-0">
                            <div className='sm:mt-10'>
                                <span className="bg-gray-600 text-white px-2 py-1 rounded"> &#128100; Chairman</span>
                                <p className="text-[#] text-green-900 mt-1">Mr. Sunil Dutt Sharma</p>
                            </div>

                            <div>
                                <span className="bg-gray-600 text-white px-2  py-1 rounded">&#128100; Project Director</span>
                                <p className="text-[#] text-green-900  mt-1">Mr. Sudhir Mishra/ Ms Anita Agnihotri</p>
                            </div>

                            <div>
                                <span className="bg-gray-600 text-white px-2  py-1 rounded"> <span>📍</span> Address</span>
                                <p className="text-[#] text-green-900  mt-1">
                                    UMCA Education<br />
                                    H.N. 37 2ND FLOOR NEAR ALWATIYA HOSPITAL CHHAMA<br />
                                    ENCLAVE MARUTI ESTATE SHAHGANJ<br />
                                    Agra UP 282010
                                </p>
                            </div>

                            <div>
                                <span className="bg-gray-600 text-white px-2  py-1 rounded"><span>☎️</span> Mobile</span>
                                <p className="text-[#] text-red-900  mt-1">+91-9149261291</p>
                            </div>

                            <div>
                                <span className="bg-gray-600 text-white px-2  py-1 rounded"><span>✉️</span> Email</span>
                                <p className="text-[#] text-blue-900  mt-1">umcafoundation@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Userlayout>
    );
};

export default Contact;
