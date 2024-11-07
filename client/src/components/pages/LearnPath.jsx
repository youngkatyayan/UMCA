
import React, { useState } from 'react';

const LearnPath = ({data}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const mainCourses = [
    { id: 1, title: 'Business Analytics with Excel', hasPreview: true },
    { id: 2, title: 'SQL Certification Course', hasPreview: true },
    { id: 3, title: 'Programming Basics and Data Analytics with Python', hasPreview: true },
    { id: 4, title: 'R Programming for Data Science', hasPreview: false },
    { id: 5, title: 'Data Analytics with R', hasPreview: true },
    { id: 6, title: 'Tableau Desktop Specialist Certification Training', hasPreview: true },
    { id: 7, title: 'Data Analyst Masters Capstone', hasPreview: false },
  ];

  const electives = [
    { id: 8, title: 'PL-300 Microsoft Power BI Certification Training', hasPreview: false },
    { id: 9, title: 'Industry Master Class – Data Analytics', hasPreview: false },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {data?.coursename} Training Program Learning Path
      </h1>
      
      <p className="text-gray-600 mb-8">
        Accelerate your career trajectory with our extensive data analyst course curriculum. 
        Delve into foundational statistics, master analysis with Python and R, navigate 
        databases using SQL, and harness the power of visualization with Tableau and Power BI
      </p>

      <h2 className="text-xl font-bold text-blue-900 mb-4">Learning Path</h2>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="space-y-4">
          {/* Main Courses */}
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-200" />
            
            <div className="space-y-6">
              {mainCourses.map((course) => (
                <div key={course.id} className="relative">
                  <div className="absolute left-0 -ml-1 mt-2 w-4 h-4 rounded-full bg-blue-200" />
                  
                  <div className="ml-8 flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{course.title}</span>
                    <div className="flex items-center gap-4">
                     
                      <button 
                        className="text-gray-400"
                        onClick={() => setExpandedSection(
                          expandedSection === course.id ? null : course.id
                        )}
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            expandedSection === course.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Electives Section */}
          <div className="pt-4">
            <h3 className="text-gray-800 font-medium mb-4">Electives:</h3>
            
            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-200" />
              
              <div className="space-y-6">
                {electives.map((course) => (
                  <div key={course.id} className="relative">
                    <div className="absolute left-0 -ml-1 mt-2 w-4 h-4 rounded-full bg-blue-200" />
                    
                    <div className="ml-8 flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{course.title}</span>
                      <button className="text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPath;