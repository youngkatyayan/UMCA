import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Certificate = () => {
  const [allResult, setAllResult] = useState([]);
  const mobile = localStorage.getItem('uid');
  const decryptedMobile = mobile
    ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8)
    : null;

  const fetchDetails = async () => {
    try {
      const { data } = await axios.post('/api/v1/get-data-for-certificate-download', { decryptedMobile });
      if (data.success) {
        const resultsWithDownloadCount = data.result.map(item => ({
          ...item,
          downloadCount: 0, // Initialize download count for each item
        }));
        setAllResult(resultsWithDownloadCount);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDownload = (id) => {
    setAllResult(prevResults =>
      prevResults.map(item =>
        item.Id === id
          ? { ...item, downloadCount: item.downloadCount + 1 }
          : item
      )
    );
    alert('Download started!');
  };

  const calculateCompletionDate = (startDate, duration) => {
    const date = new Date(startDate);
    const yearsMatch = duration.match(/(\d+)\s*year/);
    const monthsMatch = duration.match(/(\d+)\s*month/);

    if (yearsMatch) {
      date.setFullYear(date.getFullYear() + parseInt(yearsMatch[1], 10));
    }
    if (monthsMatch) {
      date.setMonth(date.getMonth() + parseInt(monthsMatch[1], 10));
    }

    return date.toISOString().split('T')[0].split('-').reverse().join('/');
  };

  return (
    <StudentLayout>
      <div className="bg-gray-50 py-8 w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col m-4 border rounded-md bg-slate-400 shadow-md">
            <h1 className="text-white text-2xl m-4 p-1 font-serif font-bold">Download Certificate</h1>
          </div>

          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
              <table className="table-auto w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white uppercase text-xs font-semibold tracking-wider">
                    <th className="px-6 py-4 text-left">S.No.</th>
                    <th className="px-6 py-4 text-left">Course Name</th>
                    <th className="px-6 py-4 text-left">Start Date</th>
                    <th className="px-6 py-4 text-left">Complete Date</th>
                    <th className="px-6 py-4 text-left">Fees Status</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allResult.map((el, index) => {
                    const completionDate = calculateCompletionDate(el.Fentry, el.duration);
                    const isCertificateAvailable =
                      new Date(completionDate.split('/').reverse().join('-')) <= new Date();
                    const isDownloadAllowed = el.downloadCount < 3 && isCertificateAvailable;

                    return (
                      <tr key={index} className="transition hover:bg-gray-100 hover:shadow-sm">
                        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4">{el?.coursename}</td>
                        <td className="px-6 py-4">
                          {el.Fentry.split('T')[0].split('-').reverse().join('/')}
                        </td>
                        <td className="px-6 py-4">{completionDate}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${el.yearlyfee === 'Paid'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                              }`}
                          >
                            {el.yearlyfee || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {el?.groupname?.toLowerCase() === 'nielit' ||
                            el?.groupname?.toLowerCase() === 'university' ? (
                            '! Certificate is not available'
                          ) : (
                            <button
                              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition duration-200"
                              title="Download"
                              disabled={!isDownloadAllowed}
                              onClick={() => handleDownload(el.Id)}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 16l4 4m0 0l4-4m-4 4V4m0 12H4m12-2h4"
                                ></path>
                              </svg>
                              <span className="hidden sm:block">
                                {isDownloadAllowed
                                  ? `Download (${3 - el.downloadCount} left)`
                                  : 'Limit Reached'}
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 mx-8">
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
