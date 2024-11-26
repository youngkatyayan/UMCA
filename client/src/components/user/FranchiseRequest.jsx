import React, { useState } from 'react'
import UserLayout from '../layout/Userlayout'
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
        // console.log(file.type)
        const imageURL = URL.createObjectURL(file);
        setImg((prev) => {
          const Images = [...prev];
          Images[index] = { file, url: imageURL }
          return Images;
        });


      } else if (file.type === 'application/pdf') {
        // console.log(file.type)
        const pdfURL = URL.createObjectURL(file);
        setImg(prev => {
          const Files = [...prev];
          Files[index] = { file, type: 'pdf', url: pdfURL };
          // console.log('Updated Files:', Files);
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

    const formdataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formdataToSend.append(key, value)

    }
    img.forEach((fileObj, index) => {
      if (fileObj) {
        formdataToSend.append(`image${index}`, fileObj.file);
      }
    })
    // console.log(formData)
    // console.log(formdataToSend)
    try {
      const response = await axios.post('/api/v1/franchise-request', formdataToSend);
// console.log(response)
      if (response.data.success) {
        alert('Form submitted successfully');
        setFormData({})
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <UserLayout>

      <div className="w-full p-4">
        <h2 className="text-2xl font-bold text-black bg-gray-300 p-3 shadow-md mx-auto max-w-4xl">
          Center Detail For Skill Development & Training Partner
        </h2>
        <br />

        <form
          onSubmit={handleSubmit}
          className="border border-red-300 border-dashed p-4 mx-auto max-w-4xl"
          encType="multipart/form-data"
        >
    
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                <div className="p-2">
                  <label>
                    Center Manager Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cmname"
                    name="cmname"
                    value={formData.cmname}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>Center Manager Mobile</label>
                  <input
                    type="text"
                    id="cmmobile"
                    name="cmmobile"
                    maxLength="10"
                    value={formData.cmmobile}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>Center Manager Email Id</label>
                  <input
                    type="email"
                    name="cmemail"
                    id="cmemail"
                    value={formData.cmemail}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>
                    Owner Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="oname"
                    name="oname"
                    value={formData.oname}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>Owner Mobile No.</label>
                  <input
                    type="text"
                    name="omobile"
                    id="omobile"
                    maxLength="10"
                    value={formData.omobile}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>Owner Email Id</label>
                  <input
                    type="email"
                    name="oemail"
                    id="oemail"
                    value={formData.oemail}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="p-2">
                  <label>
                    Center Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="centername"
                    name="centername"
                    value={formData.centername}
                    required
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>
                    Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    required
                    onChange={handleChange}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>
                    State<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>
                    Pin Code<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pin"
                    name="pin"
                    maxLength="6"
                    value={formData.pin}
                    onChange={handleChange}
                    required
                    className="w-1/2 p-2 mt-1 rounded-md border border-blue-300"
                  />
                </div>
                <div className="p-2">
                  <label>Upload Address Proof</label>
                  <input
                    type="file"
                    id="addproof"
                    name="addproof"
                    onChange={(e) => handleImage(e, 1)}
                    className="w-full p-2 mt-1 rounded-md border border-blue-300"
                  />
                  <span className="text-sm text-gray-600">
                    (Incorporation/Registration Certificate, Telephone Bill, Rent Agreement)
                  </span>
                </div>
              </div>
            </div>
          </div>

     
          <h4 className="text-blue-500 text-xl border-b-2 border-blue-500 pb-2 mt-6">
            Business Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2">
              <label>
                Application For<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 mt-1 rounded-md border border-blue-300"
                id="appfor"
                name="appfor"
                onChange={handleChange}
                required
              >
                <option value="" hidden>
                  ----Select----
                </option>
                <option value="Individual Franchises">BRANCH</option>
              </select>
            </div>
            <div className="p-2">
              <label>
                Your Current Business<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="crrbusiness"
                name="crrbusiness"
                value={formData.crrbusiness}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-md border border-blue-300"
              />
            </div>
          </div>

     
          <div className="text-center mt-6">
            <button
              type="submit"
              className="text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>

      </div>

    </UserLayout>

  );
};

export default FranchiseRequest;
