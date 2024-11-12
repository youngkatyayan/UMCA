import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';
const StudentDashboard = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [Entroll, setEntroll] = useState([]);
  const [EntrollCourse, setEntrollCourse] = useState([]);

  let uid = localStorage.getItem('uid');
  // console.log(Entroll)
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
      alert(error.message)
    }
  }

  useEffect(() => {
    accessanouncement();
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
            <div className="text-white text-xl p-2 rounded-md font-sans mb-4" style={{
              background:
                'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
              opacity: 0.7,
            }} >
              No announcements available.
            </div>
          )}
        </div>

        <div className="mt-8 w-full bg-white px-4 sm:px-8 md:px-16 py-5 gradient-shadow">
          <p className="text-center py-3 text-lg mb-4">
            <b>Registration No :</b> {Entroll?.SId}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
            <div>
              <div className="flex">
                <p className="w-24 sm:w-28  font-semibold">Name</p>
                <p>: {Entroll?.name}</p>
              </div>

              <div className="flex mt-4">
                <p className="w-24 sm:w-28  font-semibold">Gender</p>
                <p>: {Entroll?.gender}</p>
              </div>
              <div className="flex mt-4">
                <p className="w-24 sm:w-28  font-semibold">Nationality</p>
                <p>: {Entroll?.nationality}</p>
              </div>
            </div>

            <div>
              <div className="flex">
                <p className="w-24 sm:w-28  font-semibold">Email</p>
                <p>: {Entroll?.email}</p>
              </div>
              <div className="flex mt-4">
                <p className="w-24 sm:w-28 font-semibold">Mobile No.</p>
                <p>: {Entroll?.phone || Entroll?.mobno}</p>
              </div>
              <div className="flex mt-4">
                <p className="w-24 sm:w-28  font-semibold">Date of Birth</p>
                <p>: {Entroll?.dob ? Entroll.dob.split('T')[0].split('-').reverse().join('/') : "N/A"}</p>
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </div>

        {
          EntrollCourse && EntrollCourse.map((el, index) => (
            <div key={index} className="mt-4 w-full shadow-md rounded-md bg-white px-4 sm:px-8 md:px-16 py-2">
              <p className="text-center py-2 text-lg mb-2">
                <b className='text-blue-950'>Course :</b> {el?.course || el?.coursename}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 mb-5">
                <div className='col-span-1'>
                  <div className="flex">
                    <p className="w-24 sm:w-28  font-semibold">Fee</p>
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
                  {/* <div className="flex mt-4">
                    <p className="w-24 sm:w-28  font-semibold">Date of Birth</p>
                    <p>: {Entroll?.dob ? Entroll.dob.split('T')[0].split('-').reverse().join('/') : "N/A"}</p>
                  </div> */}
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
