import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import jsPDF from "jspdf";
import logo from '../../assets/logo2.png'
import {convertToWords} from 'react-number-to-words';
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
      const response = await axios.post(`/api/v1/fee-statement/receipt/${transactionId}`);
  
      if (response.data && response.data.result) {
        const receiptData = response.data.result[0] || {};
  
        const pdf = new jsPDF({
          unit: "mm", 
          format: [150, 200], 
        });
  
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        pdf.rect(10, 10, 130, 180); 
  
        // Logo
        const imgWidth = 30;
        const imgHeight = 15;
        pdf.addImage(logo, "PNG", 50, 10, imgWidth, imgHeight);
  
        // Title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 51, 102);
        pdf.text("FEE RECEIPT", 75, 30, { align: "center" });
        pdf.setDrawColor(150);
        pdf.line(20, 35, 130, 35);
  
        // Transaction Details Title
        pdf.setFontSize(12);
        pdf.text("Transaction Details", 75, 45, { align: "center" });
  
        // Content
        pdf.setFontSize(9);
        const defaultText = "N/A"; 
  
        const safeText = (value) => (value ? value.toString() : defaultText);
  
        pdf.setTextColor(0);
        pdf.text("Receipt No:", 20, 55);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(receiptData.Id), 80, 55);
  
        pdf.setTextColor(0);
        pdf.text("Name (Mr./Mrs.):", 20, 65);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(receiptData.name), 80, 65);
  
        pdf.setTextColor(0);
        pdf.text("Course Name:", 20, 75);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(receiptData.coursename), 80, 75);
  
        pdf.setTextColor(0);
        pdf.text("Mobile No:", 20, 85);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(receiptData.mobile), 80, 85);
  
        pdf.setTextColor(0);
        pdf.text("Amount in Words:", 20, 95);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(convertToWords(receiptData.payment)), 80, 95);
  
        pdf.setFillColor(230, 240, 255); 
        pdf.rect(15, 105, 120, 25, "F");
  
        pdf.setTextColor(0);
        pdf.text("Payment Amount:", 20, 115);
        pdf.setTextColor(50, 150, 50);
        pdf.text(`₹${safeText(receiptData.payment)} /-`, 80, 115);
  
        pdf.setTextColor(0);
        pdf.text("Transaction ID:", 20, 125);
        pdf.setTextColor(50, 50, 150);
        pdf.text(safeText(receiptData.payment_id), 80, 125);
  
        pdf.setTextColor(0);
        pdf.text("Payment Mode:", 20, 135);
        pdf.setTextColor(50, 50, 150);
        pdf.text(receiptData.payment_id ? "Online" : "Cash", 80, 135);
  
        pdf.setTextColor(0);
        pdf.text("Transaction Date:", 20, 145);
        pdf.setTextColor(50, 50, 150);
        pdf.text(
          safeText(new Date(receiptData.Transaction_Date).toLocaleDateString()),
          80,
          145
        );
  
        pdf.setTextColor(0);
        pdf.text("Receipt Date:", 20, 155);
        pdf.setTextColor(50, 50, 150);
        pdf.text(new Date().toLocaleDateString(), 80, 155);
  
        pdf.setDrawColor(150);
        pdf.line(20, 160, 130, 160);
  
        // Footer
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        pdf.text("Thank you for your payment!", 75, 170, { align: "center" });
        pdf.text("For queries, contact: umcafoundation@gmail.com", 75, 175, {
          align: "center",
        });
  
        // Save PDF
        pdf.save(`Receipt_${transactionId}.pdf`);
      } else {
        console.error("Invalid data received for the receipt.");
      }
    } catch (error) {
      console.error("Error downloading receipt:", error);
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

                  {el.payment && (
                    <button
                      onClick={() => downloadReceipt(el.courseId)}
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
