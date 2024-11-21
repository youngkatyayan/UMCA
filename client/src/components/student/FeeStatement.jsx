import React, { useEffect, useState } from 'react';
import StudentLayout from '../layout/StudentLayout';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import jsPDF from "jspdf";
import logo from '../../assets/logo2.png'
import { convertToWords } from 'react-number-to-words';
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
          format: [120, 120], 
        });
  
        pdf.setFontSize(12);
        const headerFont = "helvetica";
        const bodyFont = "times";
  
        pdf.setFont('Roboto', "bold");
        pdf.setTextColor(0, 51, 102); 
        pdf.text("UMCA EDUCATION", 58, 13, { align: "center" }); 
        pdf.setLineWidth(0.5);
        pdf.line(10, 25, 110, 25); 

        pdf.setFont(headerFont, "bold");
        pdf.setTextColor(0, 51, 102); 
        pdf.addImage(logo, "PNG", 10, 5, 15, 15); 
        pdf.text("FEE RECEIPT", 60, 20, { align: "center" }); 
        pdf.setLineWidth(0.5);
        pdf.line(10, 25, 110, 25); 
  
        // --- Body ---
        pdf.setFont(bodyFont);
        pdf.setFontSize(10);
        pdf.setTextColor(0); // Black text
  
        const drawRow = (label, value, y) => {
          const defaultText = "N/A";
          const safeText = (value) => (value ? value.toString() : defaultText);
          const truncatedText = (text, maxLength) =>
            text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
  
          pdf.setTextColor(0); // Label color
          pdf.text(`${label}:`, 15, y);
          pdf.setTextColor(0, 102, 204); // Blue for values
          pdf.text(truncatedText(safeText(value), 50), 50, y);
        };
  
        let startY = 30;
        const rowGap = 6;
  
        drawRow("Receipt No", receiptData.Id, startY);
        drawRow("Name", receiptData.name, (startY += rowGap));
        drawRow("Course Name", receiptData.coursename, (startY += rowGap));
        drawRow("Mobile No", receiptData.mobile, (startY += rowGap));
        drawRow("Amount in Words", convertToWords(receiptData.payment), (startY += rowGap));
        drawRow("Payment Amount", `₹${receiptData.payment} /-`, (startY += rowGap));
        drawRow("Payment Mode", receiptData.payment_id ? "Online" : "Cash", (startY += rowGap));
        drawRow("Transaction ID", receiptData.payment_id, (startY += rowGap));
        drawRow(
          "Transaction Date",
          new Date(receiptData.Transaction_Date).toLocaleDateString(),
          (startY += rowGap)
        );
        drawRow("Receipt Date", new Date().toLocaleDateString(), (startY += rowGap));
  
        // --- Footer ---
        startY += 10;
        pdf.setFontSize(8);
        pdf.setTextColor(100); // Grey text
        pdf.text("Thank you for your payment!", 60, startY, { align: "center" });
        pdf.text("For queries, contact: umcafoundation@gmail.com", 60, startY + 5, {
          align: "center",
        });
  
        // Save the receipt
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
  console.log(allResult)
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
