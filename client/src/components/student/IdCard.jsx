import React, { useEffect, useState } from "react";
import StudentLayout from "../layout/StudentLayout";
import logo from "../../assets/logo2.png";
import Id from "../../assets/Id2.png";
import Photo from "../../assets/shank.jpg";
import CryptoJS from "crypto-js";
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";

const IdCard = () => {
  const [stDetails, setStDetails] = useState(null); // Start with null or an empty object

  const mobile = localStorage.getItem("uid");

  const decryptedMobile = mobile
    ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8)
    : null;

  const fetchStudent = async () => {
    try {
      if (decryptedMobile) {
        const { data } = await axios.post("/api/v1/getStudent-data", {
          decryptedMobile,
        });
        console.log(data.result);

        if (data.success && data.result.length > 0) {
          const student = data.result[0];
          setStDetails({
            name: student.name,
            mobno: student.phone,
            email: student.email,
            course: student.course,
          });
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []); // Only fetch once when the component mounts

  if (!stDetails) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const handlePrint = () => {
    const content = document.getElementById('print-section');
    const newWindow = window.open('', '', 'height=600, width=800');

    newWindow.document.write('<html><head><title>Print</title>');
    newWindow.document.write('<style>');
    newWindow.document.write(`
      .print-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-left: 48px;
        margin-right: 48px;
      }
      .flex-center {
        display: flex;
        justify-content: center;
        height: 380px;
      }
      .front-view, .back-view {
        position: relative;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        height: 380px;
        aspect-ratio: 591 / 1004;
      }
      .absolute-header {
        position: absolute;
        width: 100%;
        height: 400px;
      }
      .relative-header {
        position: relative;
        text-align: center;
         display: grid; 
        grid-template-columns: repeat(4, 1fr);
        // background-color: rgba(0, 0, 255, 0.75);
       padding-top: 16px  !important;
      }
      // .relative-header header-text{
      // display: grid;
      //   grid-template-columns: repeat(4, 3fr);
      //   }
      .header-logo {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .student-details {
        padding-left: 24px;
        margin-top: 8px;
        margin-bottom: 48px;
      }
      .student-details span {
        font-size: 0.7rem;
      }
          .student-details .photo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .student-details .photo img {
      height: 70px;
      width: auto;
      border-radius: 8px;
    }
      .blue-bg {
        background-color: #1e3a8a;
        color: white;
        padding: 8px;
        text-align: center;
        width: 128px;
        margin: auto;
        border-radius: 8px;
      }
      .address {
        margin-top: 80px;
        padding: 8px;
      }
      .instruction-list {
        font-size: 0.5rem;
        margin-top: 16px;
        list-style-type: decimal;
        padding-left: 16px;
      }
      .reative-header mt-16 {
        marin-top:4rem;
      }
      .absolute{
        position:absolute;
      }
      .relative{
        position:relative
      }

    `);
    newWindow.document.write('</style>');
    newWindow.document.write('</head><body>');

    newWindow.document.write(`
      <div class="print-container">
        <div class="flex-center">
          <div class="front-view" style="background-image: url(${Id});">
            <div class="absolute-header">
              <div class="relative-header">
                <div class="header-logo">
                  <img src="${logo}" alt="UMCA Logo" width="52" />
                </div>
                <div class="text-blue-900 font-semibold header-text">UMCA EDUCATION</div>
              </div>
              <hr class="border-blue-700" style="margin-top: 8px;" />
              <div class="blue-bg">Student Id</div>
              <div class="student-details">
                <div class="grid grid-cols-1 mt-1 bg-opacity-75">
                   <div class="photo">
              <img src="${Photo}" alt="Student Photo" />
            </div>
                  <div class="relative pl-6 justify-center text-start content-center mt-2 mb-12">
                    <div><span class="font-bold text-[0.8rem]">Name: </span><span style="font-size: 0.7rem;">${stDetails.name}</span></div>
                    <div><span class="font-bold text-[0.8rem]">Phone: </span><span style="font-size: 0.7rem;">${stDetails.mobno}</span></div>
                    <div><span class="font-bold text-[0.8rem]">Email: </span><span style="font-size: 0.7rem;">${stDetails.email}</span></div>
                    <div><span class="font-bold text-[0.8rem]">Course: </span><span style="font-size: 0.7rem;">${stDetails.course}</span></div>
                    <div class="h-10 relative">
                      <span class="font-bold absolute text-[0.7rem] bottom-0 right-0 pr-2">Registrar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gap-4 flex-center">
          <div class="back-view" style="background-image: url(${Id});">
            <div class="absolute mt-20 px-2">
              <div>
                <h3 class="text-blue-700 font-bold mb-1">Campus Address</h3>
                <div class="font-semibold" style="font-size: 0.5rem;">
                  H.N. 37, 2nd Floor, Near Alwatiya Hospital Chhama Enclave, Maruti Estate, Shahganj Agra, UP 282010
                  <br /> +91-9149261291 <br /> umcafoundation@gmail.com
                </div>
              </div>
              <div>
                <div class="text-blue-700 font-bold mt-4">Instructions</div>
                <ul class="instruction-list">
                  <li>Carry this ID card at all times while on the premises. It must be shown upon request for identification.</li>
                  <li>Report a lost or stolen card immediately to administration or security for a replacement.</li>
                  <li>Do not lend or share this ID card; it is strictly for personal use only.</li>
                  <li>Keep this ID card in good condition.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };
  return (
    <StudentLayout>
      <div className="w-full bg-blue-50 shadow-md">
        <div className="bg-blue-50">
          <div className="flex flex-col m-4 border rounded-md bg-transparent-100 bg-blue-800 shadow-md">
            <h1 className="text-white text-2xl m-4 text-center font-serif">
              Student Identity
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 ml-12 mr-12 " id="print-section">

            <div className="flex justify-center" style={{ height: '380px', }}>
              {/* Front view section */}
              <div
                className=" "
                style={{
                  backgroundImage: `url(${Id})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat',
                  aspectRatio: '591 / 1004',
                  height: '380px',
                  position: 'relative'


                }}
              >
                {/* Header section */}
                <div className=" absolute w-full" style={{ height: "400px" }}>
                  <div className=" relative text-center grid grid-cols-4 bg-opacity-75 mt-16">
                    <div className="col-span-1  ">
                      <img src={logo} alt="UMCA Logo" className="object-contain" width={52} />
                    </div>
                    <div className="text-blue-900 col-span-3 text-base flex items-center font-semibold justify-start">
                      UMCA EDUCATION
                    </div>
                  </div>
                  <hr className="border border-blue-700 mt-2" />
                  <span className="bg-blue-800 flex items-center justify-center m-auto content-center text-white px-4 rounded-b-md w-32"> Student Id</span>

                  {/* Details section */}
                  <div className="grid grid-cols-1 mt-1 bg-opacity-75">
                    <div className="flex items-center justify-center">
                      <img src={Photo} style={{ height: '70px', width: "auto" }} alt="Description" />

                    </div>
                    <div className="relative pl-6   justify-center text-start content-center mt-2 mb-12 ">
                      <div>
                        <span className="font-bold text-[0.8rem] ">Name: </span>
                        <span style={{ fontSize: '0.7rem' }}> {stDetails.name}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[0.8rem]">Phone: </span>
                        <span style={{ fontSize: '0.7rem' }}> {stDetails.mobno}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[0.8rem]">Email: </span>
                        <span style={{ fontSize: '0.7rem' }}> {stDetails.email}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[0.8rem]">course: </span>
                        <span style={{ fontSize: '0.7rem' }}> {stDetails.course}</span>
                      </div>
                      <div className="h-10 relative">
                        {/* <span style={{ fontSize: '0.7rem' }}> {stDetails.district}</span> */}
                        <span className="font-bold absolute text-[0.7rem] bottom-0 right-0 pr-2 ">Registrar </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" gap-4 w-full" style={{ height: '380px', }}>
              {/* Back view section */}
              <div
                className="relative "
                style={{
                  backgroundImage: `url(${Id})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center', // Centers the image
                  backgroundRepeat: 'no-repeat', // Prevents repeat
                  aspectRatio: '591 / 1004',
                  height: '380px',
                  position: 'relative'
                }}
              >
                <div className="absolute mt-20  px-2">

                  <div >
                    <h3 className="text-blue-700 font-bold mb-1 ">Campus Address</h3>
                    <div className=" font-semibold" style={{ fontSize: '0.5rem' }}>H.N. 37, 2nd Floor,<br /> Near Alwatiya Hospital Chhama Enclave, Maruti Estate,<br /> Shahganj Agra, UP 282010 <br />+91-9149261291 <br /> umcafoundation@gmail.com
                    </div>
                  </div>

                  <div>
                    <div className="text-blue-700 font-bold mt-4">Instruction</div>
                    <ul className="font-semibold text-xs list-decimal list-inside " style={{ listStyleType: 'decimal', fontSize: '0.5rem' }}>
                      <li>Carry this ID card at all times while on the premises. It must be shown upon request for identification.</li>
                      <li>Report a lost or stolen card immediately to administration or security for a replacement.</li>
                      <li>Do not lend or share this ID card; it is strictly for personal use only.</li>
                      <li>Keep this ID card in good condition.</li>
                    </ul>

                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center absolute bg-red-700 m-4 p-2 rounded-md">
            <button onClick={handlePrint} className="flex items-center justify-center w-16 h-6 bg-red-700 p-1 rounded-md">
              <VscFilePdf className="text-white text-3xl" />
            </button>
          </div>


        </div>

      </div>
    </StudentLayout>
  );
};

export default IdCard;