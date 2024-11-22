import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { TfiAnnouncement } from "react-icons/tfi";
const StudentDashboard = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [Entroll, setEntroll] = useState([]);
  const [EntrollCourse, setEntrollCourse] = useState([]);

  let uid = localStorage.getItem('uid');
  const mobile = uid ? CryptoJS.AES.decrypt(uid, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;
  const accessanouncement = async () => {
    const { data } = await axios.get('/api/v1/get-studannouncement');
    if (data.success) {
      // setAnnouncement(data.result);
    }
  };

  const fetchCourse = async () => {
    try {
      const { data } = await axios.post(`/api/v1/get-entroll-course`, { mobile })
      if (data.success) {
        setEntroll(data.result[0])
        setEntrollCourse(data.result)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    // accessanouncement();
    fetchCourse()
  }, []);

  return (
    <StudentLayout>

      <div className="w-full">
        <div>
          {/* <h1 className="text-xl font-serif mx-2 mb-4">Announcement</h1> */}

          {/* Single Announcement Scrolling */}
          {announcement.length > 0 ? (
            announcement.map((item, index) => (
              <div
                key={index}
                className="text-white text-xl p-2 rounded-md font-sans mb-4 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                  opacity: 0.7,
                }}
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    animation: 'marquee 10s linear infinite',
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-xl p-2 rounded-md font-sans mb-4 flex items-center gap-5" style={{
              background:
                'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
              opacity: 0.7,
            }} >
             <TfiAnnouncement className=''/> No announcements available.
            </div>
          )}
        </div>

        <div className="p-6 max-w-5xl mx-auto">
          <div className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-900 pb-2 mb-6">
            STUDENT PROFILE
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Card */}
            <div className="bg-white rounded-lg shadow-md p-4 h-fit">
              <img
                src={`/api/v1/get-entroll-course/${Entroll?.profileImg}`}
                alt="Student"
                className="w-32 h-48 object-cover mb-6 mx-6"
              />
              <div className="space-y-2">
                {/* <div className="flex gap-2">
                  <span className="text-gray-600">Student</span>
                  <span className="text-gray-600">:</span>
                </div> */}
                <div className="flex gap-2">
                  <span className="text-gray-600">Reg. No.</span>
                  <span className="text-gray-600">:</span>
                  <span className="ml-2">{Entroll?.SId}</span>
                </div>
                {/* <div className="flex gap-2">
                  <span className="text-gray-600">Course</span>
                  <span className="text-gray-600">:</span>
                  <span>BA-LLB</span>
                </div> */}
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
              <div className="text-lg font-semibold text-gray-800 mb-4">
                STUDENT PROFILE
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Student Name</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.name}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Father's Name</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.relaname}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Mother's Name</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.mothername}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Date of Birth</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.dob ? Entroll.dob.split('T')[0].split('-').reverse().join('/') : "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Enrollment No.</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2"></span>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Roll No.</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2"></span>
                    </div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Session</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.session}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Mobile No.</span>
                    <div>
                      <span className="text-gray-600">:</span>
                      <span className="ml-2">{Entroll?.phone || Entroll?.mobno}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    

        {
          EntrollCourse && EntrollCourse.map((el, index) => (
            <div key={index} className="mt-4  px-4 sm:px-8 md:px-16 py-2 mx-5 bg-white rounded-lg shadow-md p-6 flex-grow">
              <p className="text-center py-2 text-lg mb-2">
                <b className='text-blue-950'>Course :</b> {el?.course || el?.coursename}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 mb-5">
                <div className='col-span-1'>
                  <div className="flex">
                    <p className="w-24 sm:w-28  font-semibold">Fee (₹)</p>
                    <p>: {el?.yearlyfee || 'Free'} /-</p>
                  </div>

                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">Duration</p>
                    <p>: {el?.duration}</p>
                  </div>

                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">Course Mode</p>
                    <p>: {el?.coursemode}</p>
                  </div>

                </div>

                <div className='col-span-2'>
                  <div className="flex">
                    <p className="w-24 sm:w-28  font-semibold">Category</p>
                    <p>: {el?.categoryname}</p>
                  </div>
                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28 font-semibold">session</p>
                    <p>: {el?.session}</p>
                  </div>
                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">Group</p>
                    <p>: {Entroll?.groupname}</p>
                  </div>
                </div>

                {/* <div>
                  <div className="flex">
                    <p className="w-24 sm:w-28  font-semibold">District</p>
                    <p className="capitalize">: {Entroll?.district}</p>
                  </div>
                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">State</p>
                    <p>: {Entroll?.state}</p>
                  </div>
                  <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">Pin Code</p>
                    <p>: {Entroll?.pincode}</p>
                  </div>
                </div> */}
              </div>
            </div>
          ))
        }


      </div>


      {/* Add keyframes for the scrolling animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </StudentLayout>
  );
};

export default StudentDashboard;
