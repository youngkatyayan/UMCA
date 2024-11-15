import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const FeeStatement = () => {
  const [allResult, setAllResult] = useState(null);
  const uid = localStorage.getItem('uid');
  const mobile = uid ? CryptoJS.AES.decrypt(uid, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;

  const fetchFee = async () => {
    try {
      const { data } = await axios.post('/api/v1/fee-statement', { mobile });
      if (data.success) {
        setAllResult(data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle receipt download
  const downloadReceipt = async (transactionId) => {
    try {
      const response = await axios.get(`/api/v1/fee-statement/receipt/${transactionId}`, {
        responseType: 'blob', 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Receipt_${transactionId}.pdf`); 
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading receipt:", error);
    }
  };

  useEffect(() => {
    fetchFee();
  }, []);

  return (
    <StudentLayout>
      <div className='w-full bg-slate-100 p-6'>
        <div className='flex flex-col m-4 p-4 border rounded-md bg-white shadow-md'>
          <h1 className='text-black text-2xl font-serif font-bold mb-6'>Fee Statement</h1>

          {allResult && allResult.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {allResult.map((el, index) => (
                <div key={index} className='border rounded-lg p-4 shadow-lg bg-white'>
                  <h2 className='text-lg font-bold text-blue-700 mb-2'>{el.course}</h2>
                  <div className='text-gray-700 mb-4'>
                    <p className='font-semibold'>
                      Course Fees: 
                      <strike className={`ml-2 ${el.yearlyfee === '0' ? 'text-green-500' : 'text-gray-600'}`}>
                        {el.yearlyfee === '0' ? 'Free' : el.yearlyfee}
                      </strike>
                    </p>
                    <p className='font-semibold'>
                      Paid Fees: 
                      <span className={`ml-2 ${el.payment === '0' ? 'text-red-500' : 'text-gray-900'}`}>
                        {el.payment === '0' ? 'Not Paid' : el.payment}
                      </span>
                    </p>
                  </div>
                  <p className='text-sm text-gray-500'>
                    {(el.Transaction_Date ? `Payment Date: ${el.Transaction_Date.split('T')[0]}` : `Join Date: ${el.E_Date.split('T')[0]}`)}
                  </p>

                  {/* Download Receipt Button */}
                  {el.payment && (
                    <button
                      onClick={() => downloadReceipt(el.transactionId)} 
                      className='mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition'
                    >
                      Download Receipt
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 mt-6'>No fee statement available.</p>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default FeeStatement;
