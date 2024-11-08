import React from 'react'
import StudentLayout from '../layout/StudentLayout'

const StudentDashboard = () => {
  return (
    <StudentLayout>
  <div className="w-full">
    <div>
      <h1 className="text-xl font-serif mx-2 mb-4" >Announcement</h1>
      <div
        className="text-white  text-xl p-2 rounded-md font-sans"
        style={{
          background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          opacity:0.7
        }}
      >
        This is a demo announcement
      </div>
    </div>
  </div>
</StudentLayout>

  )
}

export default StudentDashboard