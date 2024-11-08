import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Userlayout from '../layout/Userlayout';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Entroll = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const [promo, setPromo] = useState('')
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        state: '',
        promoCode: '',
        district: '',
        course: ''
    });

    // console.log(course)
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            course: course?.coursename,
        }))
    }, [course]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    // fetch total couse
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
    useEffect(() => {
        fetchCourse();
    }, [id]);

    // handleSubmit
    const date = new Date().toISOString().split('T')[0]
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.promoCode && date) {
                const { data } = await axios.post('/api/v1/promocode', { promoCode: formData.promoCode, date });
                if (data.success) {
                    let percentage = data.result[0].discount ? parseFloat(data.result[0].discount) : 0;
                    let total = (parseInt(course.yearlyfee, 10) * percentage) / 100;
                    setPromo(parseInt(course.yearlyfee, 10) - total);
                    setError(false);
                } else {
                    setError(true);
                }
            }
        } catch (error) {
            console.log(error.message);
            setError(true);
        }
    };

    // handle handleProceed
    const handleProceed = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/order-course', formData);
            if (data.success) {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    if (course?.yearlyfee === '0') {
                        sendPassword();
                    } else {
                        handlePayment();
                    }
                }, 500);
            } else {
                alert("Order was not successful, please try again.");
            }
        } catch (error) {
            console.error("Error during order creation:", error.message);
        }
    };

    // handle payment
    const handlePayment = async () => {
        const { CoId } = course;
        if (!CoId) {
            alert("Required information missing. Unable to proceed with payment.");
            return;
        }
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded");
            alert("Razorpay SDK is not loaded. Please refresh and try again.");
            return;
        }
        try {
            const orderResponse = await axios.post("/api/v1/create-order", {
                amount: course?.yearlyfee,
                currency: "INR",
            });

            const { order } = orderResponse.data;
            if (!order) {
                console.error("Order creation failed");
                alert("Order creation failed. Please try again.");
                return;
            }
            const options = {
                key: "rzp_live_cFGW0bIUY8JHu0",
                amount: order.amount,
                currency: order.currency,
                cname: course?.coursename,
                description: course?.description,
                order_id: order.id,
                handler: async (response) => {
                    await handlePaymentVerification(response);
                },
                prefill: {
                    contact: formData?.phone,
                    email: formData?.email,
                    name: formData?.name,
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (response) => {
                alert("Payment failed. Please try again.");
                console.error("Payment failed:", response.error);
            });

            rzp.open();
        } catch (error) {
            console.error("Error initiating payment:", error);
            alert("Error initiating payment. Please try again later.");
        }
    };


    // Handle payment verification after Razorpay payment success
    const handlePaymentVerification = async (response) => {
        const { CoId } = course;
        try {
            const paymentResult = await axios.post("/api/v1/verify-payment", {
                ...response, ...formData, CoId
            });

            if (paymentResult.data.success) {
                toast.success("Payment successful!");
                setTimeout(() => {
                    setIsLoading(false);
                    sendPassword();
                }, 400);
            } else {
                alert(paymentResult.data.message || "Payment verification failed.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification encountered an error.");
        }
    };

    // sendpassword to user
    const sendPassword = async () => {
        try {
            const response = await axios.post('/api/v1/send-password', { email: formData.email });
            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Something went wrong');
        }
    };


    return (
        <Userlayout>
            <ToastContainer />
            <div>
                {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <ClipLoader color="#123abc" loading={isLoading} size={50} />
                        <h1 style={{ marginLeft: '10px' }}>Loading...</h1>
                    </div>
                ) : (
                    <div className=" bg-blue-50 sm:p-6 ">
                        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

                            <div className="lg:w-2/3">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-t-lg">
                                    <h2 className="text-white text-lg font-semibold">1. Basic Details</h2>
                                </div>

                                <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Name*"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone number<span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Phone Number*"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email ID<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Email*"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="flex-1 p-2 border rounded focus:ring-2 w-full focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="State Name*"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            District<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            className="flex-1 p-2 border rounded focus:ring-2 w-full focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="District Name*"
                                        />
                                    </div>

                                    <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors" onClick={handleProceed}>
                                        Proceed
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <button className="text-blue-600 flex items-center gap-2" onClick={() => navigate(-1)}>
                                        <span>←</span> Go back to program
                                    </button>
                                </div>
                            </div>

                            <div className="lg:w-1/3 ">

                                {
                                    (course?.yearlyfee === '0' ? (
                                        <>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </span>
                                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                            </div>

                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold">{course?.coursename}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>Duration: {course?.duration}</span>

                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <span>Program Fees</span>
                                                    <span>₹ {course?.yearlyfee === '0' && "Free"}</span>
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <div className="bg-white p-6 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </span>
                                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                            </div>

                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold">{course?.coursename}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>Duration: {course?.duration}</span>

                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <span>Program Fees</span>
                                                    <span>₹ {course?.yearlyfee}</span>
                                                </div>

                                                <div className="flex items-center sm:gap-2 gap-1 mb-2">
                                                    <input
                                                        type="text"
                                                        name="promoCode"
                                                        value={formData.promoCode}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter code here"
                                                        className="flex-1 p-2 border rounded"
                                                    />
                                                    <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200" onClick={handleSubmit}>
                                                        APPLY
                                                    </button>
                                                </div>
                                                {error && <p className="text-red-600">Invalid promo code.</p>}  {/* Display error message */}

                                            </div>

                                            <div className="border-t pt-4">
                                                <h3 className="font-semibold mb-2">Billing Details</h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>Total Price</span>
                                                        <span>₹ {(promo) ? promo : course?.yearlyfee}</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div >
                    </div >
                )}
            </div >

        </Userlayout >
    );
};

export default Entroll;
