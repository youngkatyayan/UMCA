import React, { useState, useEffect } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
const StudentAnnounc = () => {
  const [formdata, setData] = useState({
    title: '',
    brochure: '',
    description: '',
    category: "",
    date: ""
  })
  const [updateC, setUpdateC] = useState(false)
  const [img, setImg] = useState([])
  const [announcement, setAnnouncement] = useState([])

  

  const accessanouncement = async () => {
    const { data } = await axios.get('/api/v1/get-announcement')
    if (data.success) {
      setAnnouncement(data.result)
    }
  }

  useEffect(() => {
    accessanouncement()
  }, [])

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setData((prevData) => ({ ...prevData, [name]: type === 'file' ? files[0] : value }))
  }
  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {

      if (file.type.startsWith('image/')) {
        console.log(file.type)
        const imageURL = URL.createObjectURL(file); // Create a URL from the file
        setImg((prev) => {
          const Images = [...prev];
          Images[index] = { file, url: imageURL } // Store the URL in the img state instead of the file
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdataToSend = new FormData();

    for (const [key, value] of Object.entries(formdata)) {
      formdataToSend.append(key, value);
    }
    img.forEach((fileObj, index) => {
      if (fileObj) {
        formdataToSend.append(`image${index}`, fileObj.file);
      }
    });
    

    try {
      const { data } = await axios.post('/api/v1/add-anouncement', formdataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success) {
        accessanouncement()
        setData({})
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error in sending Announcement");
    }
  };

  const handleEdit = async (item) => {
    setUpdateC(true)
    const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';

    setData({
      ...formdata,
      AId: item.AId,
      category: item.categoryname || '',
      title: item.title || '',
      brochure: item.brochure || '',
      description: item.description || '',
      date:  formattedDate,
      category: item.category || ""

    })
    // console.log(formdata)
  }

  const handleDelete = async (item) => {

    const Aid=item.AId
    try {
      const { data } = await axios.post('/api/v1/delete-announcement', {Aid})
      if (data.success) {
        console.log(data.message)
        toast.success(data.message);
      }
      else {
        toast.error("Error in Deleting Announcement"); 
      }
    } catch (error) {
      toast.error("Error in Deleting Announcement"); 
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      // console.log(formdata)
      const { data } = await axios.post('/api/v1/update-announcement', formdata)
      if (data.success) {
        toast.success(data.message);
       setData({
          title: '',
          brochure: '',
          description: '',
          category: "",
          date: ""
        })
        accessanouncement()
        setUpdateC(false)
      }
      else {
        console.log('error')
      }
    } catch (error) {
      toast.error("Error in Updating Announcement")
    }
  }

  return (
    <SuperAdminLayout>

      <div className='w-full  bg-gray-200 p-2 overflow-y-auto h-auto '>
        <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
          <h1 className='text-white text-xl m-4 p-1 font-serif font-bold'>{updateC ? 'Update Student Announcement' : ' Student Announcement'}</h1>
        </div>

        <div className='m-4 bg-white rounded-md p-2 px-4'>
        <form onSubmit={updateC ? handleUpdate : handleSubmit} className='  px-4 '>

          <div className=' grid lg:grid-cols-3 gap-6 md:grid-cols-2 items-center'>
            <div>
              <label htmlFor="category" className=' mb-2  font-serif'> Announcement Category  : </label>
              <select

                name='category'
                value={formdata.category}
                onChange={handleChange}
                required
                className='w-full p-1 border border-blue-400 rounded-md my-2 shadow-md'
              >
                <option value="">Select Category</option>
                {["Homepage", "Franchise", "Students"].map((item, index) => (

                  <option key={index} value={item}>{item}</option>

                )
                )}
              </select>

            </div>
            <div>
              <label htmlFor="title" className=' mb-2  font-serif'> Title <sup className='text-red-600'>*</sup> :  </label>
              <input
                type="text"
                name='title'
                value={formdata.title}
                onChange={handleChange}
                required
                placeholder='Enter Category Name'
                className='w-full p-1 border border-blue-400 rounded-md my-2 shadow-md'
              />
            </div>

            <div>
              <label htmlFor="date" className=' mb-2  font-serif'> Date :  </label>
              <input
                type="date"
                name='date'
                value={formdata.date}
                onChange={handleChange}
                required
                placeholder='Enter Category Name'
                className='w-full p-1 border border-blue-400 rounded-md my-2 shadow-md'
              />
            </div>

            <div >
              <label htmlFor="description" className=' flex m-1 font-serif  w-full'>  Description :</label>
              <textarea
                // type="text"
                name='description'
                value={formdata.description}
                onChange={handleChange}
                placeholder=' Description'
                className=' p-2 border border-blue-400 rounded-md  shadow-md w-full '
              />
            </div>

            <div>
              <label htmlFor="brochure" className=' mb-2  font-serif'> Brouche :  </label>
              <input
                type="file"
                name='brochure'
                onChange={(e) => handleImage(e, 1)}
                placeholder='Add Brochure Name'
                className='w-full p-1 border border-blue-400 rounded-md my-2 shadow-md'
              />
            </div>
          </div>

          <div className='flex flex-row-1 justify-center'>
          <button type='submit' className='transition-shadow w-40 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 text-xl' style={{
                            background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 0%, rgba(0,172,255,1) 100%)'
                        }}>{updateC ? "UPDATE " : " SUBMIT"}</button>
          </div>
        </form> 
        </div>

        <div className='bg-gray-100  p-4 m-4   rounded-md   overflow-x-scroll '>
          <table className='min-w-full border-collapse border border-gray-300 '>
            <thead className='bg-slate-600 text-white' >
              <tr className='font-serif whitespace-nowrap'>
                <th className='p-2 border-2'>Announcement Id </th>
                <th className='p-2 border-2'>Category </th>
                <th className='p-2 border-2 '>Title </th>
                <th className='p-2 border-2 '>Description </th>
                <th className='p-2 border-2'>Brochure</th>
                <th className='p-2 border-2'>Date</th>
                <th className='p-2 border-2'>Action</th>
              </tr>
            </thead>
            <tbody>

              {announcement.map((item, index) => (
                <tr key={index} className=' border-2 border-gray-400'>
                  <td className='px-3 border-2 border-gray-400  '>{item.AId}</td>
                  <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.category}</td>
                  <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.title}</td>
                  <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.description}</td>
                  <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>{item.brochure}</td>
                  <td className='px-3 border-2 border-gray-400 text-[0.8rem]'>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                  <td >
                    <div className="px-3  flex space-x-2 m-2 justify-center items-center">
                      <button
                        className='p-2 shadow-md rounded-full text-lg text-green-500 hover:bg-green-500 hover:border hover:shadow-md hover:shadow-green-400 hover:text-white bg-white '
                        onClick={() => handleEdit(item)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className='p-2 shadow-md rounded-full text-lg text-red-500 hover:bg-red-500 hover:border hover:shadow-md hover:shadow-red-400 hover:text-white bg-white '
                        onClick={() => handleDelete(item)}
                      >
                        <MdDelete />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>
      <ToastContainer />
    </SuperAdminLayout>
  )
}

export default StudentAnnounc