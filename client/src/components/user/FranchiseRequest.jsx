import React, { useState } from 'react'
import dove from '../../assets/gif/dove.gif'
import phone from '../../assets/gif/phone.gif'
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UserHeader from '../header/UserHeader';
import Footer from '../header/Footer';
import Slider from './Slider';
import Courses from '../pages/Courses';
import GroupCategory from '../pages/GroupCategory';
import axios from 'axios';

const FranchiseRequest = () => {
  const [formData, setFormData] = useState({
    cmname: '',
    cmmobile: '',
    cmemail: '',
    oname: '',
    omobile: '',
    oemail: '',
    centername: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    crrbusiness: '',
    setupar: '',
    nocomp: '',
    staff: '',
    student: '',
    remark: '',
    addproof: null,
    signature: null,
    photo: null,
    condition: false,
  });
  const [img, setImg] = useState([])

  const handleImage = (e, index) => {
    const file = e.target.files[0];

    if (file) {

      if (file.type.startsWith('image/')) {
        console.log(file.type)
        const imageURL = URL.createObjectURL(file); 
        setImg((prev) => {
          const Images = [...prev];
          Images[index] = { file, url: imageURL } 
          return Images;
        });


      } else if (file.type === 'application/pdf') {
        console.log(file.type)
        const pdfURL = URL.createObjectURL(file);
        setImg(prev => {
          const Files = [...prev];
          Files[index] = { file, type: 'pdf', url: pdfURL };
          console.log('Updated Files:', Files);
          return Files;
        })

      }
    }

  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdataToSend=new FormData();
        for (const [key,value] of Object.entries(formData)){
            formdataToSend.append(key,value)

        }
        img.forEach((fileObj,index)=>{
            if(fileObj){
                formdataToSend.append(`image${index}`,fileObj.file);
            }
        })
        console.log(formData)
        console.log(formdataToSend)
    try {
      const response = await axios.post('/api/v1/franchise-request',formdataToSend );

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Form submitted successfully');
      } else {
        // Handle error
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className='w-full '>

        <div className='relative z-40 bg-[hsl(189,54%,97%)] px-5   w-full shadow-md hidden sm:flex items-center gap-2 sm:gap-5  flex-wrap sm:flex-nowrap'>

          <div className='flex gap-2 me-2'>
            <img src={dove} alt="" height={24} width={24} className='mix-blend-multiply' />
            <span className='text-[.9rem]'>umcafoundation@gmail.com</span>
          </div>

          {/* <div className='clip hidden sm:flex'>. </div> */}

          <div className='flex gap-2 whitespace-nowrap'>
            <img src={phone} alt="" height={24} width={24} className='mix-blend-multiply' />
            <span className='text-[.9rem]'>+91 9876543212</span>
          </div>

          {/* <div className='clip1 hidden sm:flex'>. </div> */}

          <div className='flex gap-4 ml-auto'>
            <Link className='h-full' to={''}><FaInstagramSquare className='h-6 rounded-full text-[#C13584]' /></Link>
            <Link className='h-full' to={''}><FaXTwitter className='h-6 rounded-full text-[#3498db]' /></Link>
            <Link className='h-full' to={''}><IoLogoYoutube className='h-6 rounded-full text-[#FF0000]' /></Link>
            <Link className='h-full' to={''}><FaFacebook className='h-6 rounded-full text-[#1877F2]' /></Link>
          </div>

        </div>

        <div className='z-30 relative'>
          <UserHeader />
        </div>




      </div>

      <div className="w-full p-4">
        <h2 className="text-2xl font-bold text-black bg-gray-300 p-3 shadow-md mx-24">Center Detail For Skill Development & Training Partner</h2>
        <br />
        <form onSubmit={handleSubmit} className=" border border-red-300 border-dashed p-2 mx-24" encType="multipart/form-data">
          <div className="container-fluid">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label className="text-right">Center Manager Name<span className="text-red-500">*</span></label>
                  <input type="text" id="cmname" name="cmname" value={formData.cmname} onChange={handleChange} required className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Center Manager Mobile</label>
                  <input type="text" id="cmmobile" name="cmmobile" maxLength="10" value={formData.cmmobile} onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Center Manager Email Id</label>
                  <input type="email" name="cmemail" id="cmemail" value={formData.cmemail} onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Owner Name<span className="text-red-500">*</span></label>
                  <input type="text" id="oname" name="oname" value={formData.oname} onChange={handleChange} required className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Owner Mobile No.</label>
                  <input type="text" name="omobile" id="omobile" maxLength="10" value={formData.omobile} onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Owner Email Id</label>
                  <input type="email" name="oemail" id="oemail" value={formData.oemail} onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label className="text-right">Center Name <span className="text-red-500">*</span></label>
                  <input type="text" id="centername" name="centername" value={formData.centername} required onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">Address<span className="text-red-500">*</span></label>
                  <input type="text" name="address" id="address" value={formData.address} required onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">City <span className="text-red-500">*</span></label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-right">State<span className="text-red-500">*</span></label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
                <div className="p-2">
                  <label className="text-left block">Pin Code <span className="text-red-500">*</span></label>
                  <input type="text" id="pin" name="pin" maxLength="6" value={formData.pin} onChange={handleChange} required className=" p-1 mt-1 rounded-md border border-blue-300  w-32" />
                </div>
                <div className="p-2 pt-8">
                  <label className="text-right">Upload Address Proof</label>
                  <input type="file" id="addproof" name="addproof" onChange={(e) => handleImage(e, 1)} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                  <span className="text-red-800">(Incorporation/Registration Certificate, Telephone Bill, Rent Agreement)</span>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-blue-500 text-xl  border-b-2 border-blue-500 border-p-  pb-2">Business Details</h4>

          <div className="container-fluid">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label className="text-right">Application For <span className="text-red-500">*</span></label>
                  <select className="w-full p-1 mt-1 rounded-md border border-blue-300 " id="appfor" name="appfor" onChange={handleChange} required>
                    <option value="" hidden selected>----Select----</option>
                    <option value="Individual Franchises">BRANCH</option>
                  </select>
                </div>


              </div>

              <div className="w-full lg:w-1/2 p-2">

                <div className="p-2">
                  <label className="text-right">Your Current Business <span className="text-red-500">*</span></label>
                  <input type="text" id="crrbusiness" name="crrbusiness" value={formData.crrbusiness} onChange={handleChange} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-blue-500 text-xl  border-b-2 border-blue-500 border-p-  pb-2">Infrastructure</h4>
          <div className="container-fluid">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label className="text-right">Setup Area In Sq.Ft.</label>
                  <input type="text" className="w-full p-1 mt-1 rounded-md border border-blue-300 " name="setupar" id="setupar" value={formData.setupar} onChange={handleChange} />
                </div>
                <div className="p-2">
                  <label className="text-right">No. of Computers</label>
                  <input type="text" name="nocomp" id="nocomp" className="w-full p-1 mt-1 rounded-md border border-blue-300 " value={formData.nocomp} onChange={handleChange} />
                </div>

              </div>
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label className="text-right">Total No. of Staff</label>
                  <input type="text" name="staff" id="staff" className="w-full p-1 mt-1 rounded-md border border-blue-300 " value={formData.staff} onChange={handleChange} />
                </div>
                <div className="p-2">
                  <label className="text-right">No. of Students</label>
                  <input type="text" name="student" id="student" className="w-full p-1 mt-1 rounded-md border border-blue-300 " value={formData.student} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-blue-500 text-xl  border-b-2 border-blue-500 border-p-  pb-2">Optional</h4>
          <div className="container-fluid">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label>Upload Signature</label>
                  <input type="file" id="signature" name="signature" onChange={(e) => handleImage(e, 2)} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>

              </div>
              <div className="w-full lg:w-1/2 p-2">
                <div className="p-2">
                  <label>Upload Photo</label>
                  <input type="file" id="photo" name="photo" onChange={(e) => handleImage(e, 3)} className="w-full p-1 mt-1 rounded-md border border-blue-300 " />
                </div>
               
              </div>
            </div>
          </div>
          <div className="w-full hidden">
            <div className="p-2">
              <textarea id="othercrsfield" name="course[]" disabled className="w-full p-1 mt-1 rounded-md border border-blue-300 "></textarea>
            </div>
          </div>

          <div className="w-full">
            <label>Remark</label>
            <textarea className="w-full p-1 mt-1 rounded-md border border-blue-300 " name="remark" rows="3" value={formData.remark} onChange={handleChange}></textarea>
          </div>


          <div className="w-full mt-5">
            <div className="w-full flex lg:w-1/2 p-2">
              <button
                type="submit"
                id="submit"
                name="submit"
                className="text-white px-4  py-2 justify-center bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>

        </form>
      </div>


      {/* Footer */}
      <div className='z-20'>
        <Footer />
      </div>

    </>

  );
};

export default FranchiseRequest;
