import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';

const StudentDashboard = () => {
  const [announcement, setAnnouncement] = useState([]);

  const accessanouncement = async () => {
    const { data } = await axios.get('/api/v1/get-studannouncement');
    if (data.success) {
      setAnnouncement(data.result);
    }
  };

  useEffect(() => {
    accessanouncement();
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
