import React, { useState } from 'react';
import StudentLayout from '../layout/StudentLayout'

const Certificate = () => {
  const [searchData, setSearchData] = useState({
    enrollmentNo: '',
    name: '',
    course: '',
  });

  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Sample certificate data
  const sampleCertificate = {
    studentName: "John Doe",
    enrollmentNo: "2024001",
    course: "Web Development",
    completionDate: "2024-03-15",
    grade: "A",
    status: "Verified"
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setSearchResult(sampleCertificate);
      setIsSearching(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };
  const handleDownload = () => {
    const certificateData = `
      Certificate of Completion
  
      Student Name: ${searchResult.studentName}
      Enrollment Number: ${searchResult.enrollmentNo}
      Course: ${searchResult.course}
      Completion Date: ${searchResult.completionDate}
      Grade: ${searchResult.grade}
      Status: ${searchResult.status}
    `;
  
    // Create a Blob from the certificate data
    const blob = new Blob([certificateData], { type: 'text/plain' });
  
    // Create an anchor element to simulate the download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${searchResult.studentName}_certificate.txt`; // Set the file name
  
    // Trigger the click event on the anchor link to start the download
    link.click();
  };
  

  return (
    <StudentLayout>
      <div className="bg-gray-50 py-8 w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate Download Portal</h1>
            <p className="text-gray-600">Enter your details below to download your certificate</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
                  <input
                    type="text"
                    name="enrollmentNo"
                    value={searchData.enrollmentNo}
                    onChange={handleInputChange}
                    placeholder="Enter enrollment no."
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={searchData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={searchData.course}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={isSearching}
                >
                  🔍 {isSearching ? 'Searching...' : 'Search Certificate'}
                </button>
              </div>
            </form>
          </div>

          {searchResult && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📜 Certificate Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Student Name</p>
                  <p className="font-medium">{searchResult.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Number</p>
                  <p className="font-medium">{searchResult.enrollmentNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{searchResult.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion Date</p>
                  <p className="font-medium">{searchResult.completionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className="font-medium">{searchResult.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ {searchResult.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  ⬇️ Download Certificate
                </button>
              </div>

            </div>
          )}

          <div className="mt-8">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex">
                <span className="text-blue-400 mr-3">ℹ️</span>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Make sure to enter your details exactly as they appear on your enrollment documents</li>
                      <li>Certificates are typically available within 2 weeks of course completion</li>
                      <li>For any issues, please contact our support team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Certificate;
