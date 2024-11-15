import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';


const Course = () => {

    const [mode, setMode] = useState([])
    const [category, setCategory] = useState([])
    const [session, setSession] = useState([])
    const [img, setImg] = useState([])
    const [courseDetails, setCourseDetails] = useState({})
    const [updateC, setUpdateC] = useState(false)
    const [formdata, setData] = useState({
        session: '',
        coursemode: '',
        eligibility: '',
        categoryname: '',
        duration: "",
        description: '',
        yearlyfee: '',
        applicationfee: '',
        examfee: '',
        brochure: '',
        coursename: '',
        courseimage:""
    })

    const { CoId } = useParams()

    const resetForm = () => {
        setData({
            session: '',
            coursemode: '',
            eligibility: '',
            categoryname: '',
            duration: '',
            description: '',
            yearlyfee: '',
            applicationfee: '',
            examfee: '',
            brochure: '',
            coursename: '',
            popular: '',
            courseimage:''
        });
    };

    useEffect(() => {
        if (CoId && CoId.length > 0) {
            setUpdateC(true);
            accessCourseDetails()
        } else {
            setUpdateC(false);
            resetForm();

        }
    }, [CoId])

    const accessCourseDetails = async () => {
        try {

            const { data } = await axios.post(`/api/v1/get-coursedetails/${CoId}`)
            if (data.success) {
                if (data.result) {

                    const courseDetails = data.result;
                    setCourseDetails(courseDetails);

                    setData({
                        session: courseDetails[0].session || '',
                        coursemode: courseDetails[0].coursemode || '',
                        eligibility: courseDetails[0].eligibility || '',
                        categoryname: courseDetails[0].categoryname || '',
                        duration: courseDetails[0].duration || '',
                        description: courseDetails[0].description || '',
                        yearlyfee: courseDetails[0].yearlyfee || '',
                        applicationfee: courseDetails[0].applicationfee || '',
                        examfee: courseDetails[0].examfee || '',
                        brochure: courseDetails[0].brochure || '',
                        coursename: courseDetails[0].coursename || '',
                        CoId: courseDetails[0].CoId || '',
                        popular: courseDetails[0].popular || '',
                        courseimage: courseDetails[0].courseimage || '',
                    });

                    console.log(formdata)
                }
            }

        } catch (error) {
            toast.error("Error Fetching Course Details", error)
        }


    }
    const accessmode = async () => {
        const { data } = await axios.get('/api/v1/get-mode')
        if (data.success) {
            setMode(data.result)
        }
    }
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
        }
    }
    const accesssession = async () => {
        const { data } = await axios.get('/api/v1/get-session')
        if (data.success) {
            setSession(data.result)
        }
    }
    useEffect(() => { accessmode(); accesscategory(); accesssession(); }, [])

    // useEffect(() => {
    //     if (Object.keys(courseDetails).length > 0) {
    //         console.log(courseDetails)
    //         setData({
    //             session: courseDetails.session || '',
    //             coursemode: courseDetails.coursemode || '',
    //             eligibility: courseDetails.eligibility || '',
    //             categoryname: courseDetails.categoryname || '',
    //             duration: courseDetails.duration || '',
    //             description: courseDetails.description || '',
    //             yearlyfee: courseDetails.yearlyfee || '',
    //             applicationfee: courseDetails.applicationfee || '',
    //             examfee: courseDetails.examfee || '',
    //             brochure: courseDetails.brochure || '',
    //             coursename: courseDetails.coursename || ''
    //         });
    //         console.log(formdata)
    //     }
    // }, [courseDetails]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

        if (name === 'categoryname') {
            const grpname = category.find(element => element.categoryname === value)
            console.log(grpname)
            const setgrp = grpname.groupname
            setData(prevData => ({ ...prevData, [name]: value, groupname: setgrp }))
            console.log(formdata)

        }
        if (name === 'session') {
            const grpname = category.forEach(element => {
                if (element.categoryname === name) {
                    const grpvalue = element.groupname
                    setData(prevData => ({ ...prevData, [name]: value, groupname: grpvalue }))

                }
            });
        }

    }

    const handleImage = (e, index) => {
        const file = e.target.files[0];

        if (file) {

            if (file.type.startsWith('image/')) {
                console.log(file.type)
                const imageURL = URL.createObjectURL(file); // Create a URL from the file
                setImg((prev) => {
                    const Images = [...prev];
                    Images[index] = {file,url:imageURL} // Store the URL in the img state instead of the file
                    return Images;
                });

      
            } else if (file.type === 'application/pdf') {
                console.log(file.type)
                const pdfURL = URL.createObjectURL(file);
                setImg(prev => {
                    const Files = [...prev];
                    Files[index] = { file,type: 'pdf', url: pdfURL };
                    console.log('Updated Files:', Files);
                    return Files;
                })
                
            }
        }
       
    };

    const handleSubmit = async (e) => {
        console.log(img)
        e.preventDefault()
        const formdataToSend=new FormData();
        for (const [key,value] of Object.entries(formdata)){
            formdataToSend.append(key,value)

        }
        img.forEach((fileObj,index)=>{
            if(fileObj){
                formdataToSend.append(`image${index}`,fileObj.file);
            }
        })
        try {
            console.log(formdata)
            const { data } = await axios.post('api/v1/add-course', formdataToSend)
            if (data.success) {
                toast.success(data.message)
            }
            else {
                console.log('error')
            }
        } catch (error) {
            console.log("error")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            console.log(formdata)
            const { data } = await axios.post('/api/v1/update-course', formdata)
            if (data.success) {
                toast.success(data.message)
                window.location.href = '/course-details'
            }
            else {
                console.log('error')
            }
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <SuperAdminLayout>
            <div className='w-full bg-gray-200 p-2 h-auto overflow-y-auto'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>{updateC ? 'Update Course' : 'Add New Course'}</h1>
                </div>

                <form onSubmit={updateC ? handleUpdate : handleSubmit} className='  p-4  '>

                    <div className='border-2 rounded-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 items-center'>

                        <div>
                            
                            <label htmlFor="coursename" className=' m-2 font-serif text-lg'> Course Name :</label>
                            <input
                                type="text"
                                name='coursename'
                                value={formdata.coursename}
                                onChange={handleChange}
                                placeholder=' Enter Course Name'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="coursemode" className=' m-2 font-serif text-lg'> Select Mode :</label>
                            <select
                                type="text"
                                name='coursemode'
                                value={formdata.coursemode}
                                onChange={handleChange}
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                <option value="" >Select Mode</option>
                                {mode.map((item, index) => (
                                    <option key={index} value={item.coursemode}>{item.coursemode}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="popular" className=' m-2 font-serif text-lg'>Popular :</label>
                            <select
                                type="text"
                                name='popular'
                                value={formdata.popular}
                                onChange={handleChange}

                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                <option value="" >Select Popular</option>
                                <option value="0" >0</option>
                                <option value="1" >1</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="categoryname" className=' m-2 font-serif text-lg'>Course Category :</label>
                            <select
                                type="text"
                                name='categoryname'
                                value={formdata.categoryname}
                                onChange={handleChange}

                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                <option value="" >Select Category</option>
                                {category.map((item, index) => (
                                    <option value={item.categoryname} key={index}>{item.categoryname}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="session" className=' m-2 font-serif text-lg'>Session:</label>
                            <select
                                type="text"
                                name='session'
                                value={formdata.session}
                                onChange={handleChange}

                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                <option value="" >Select Session</option>
                                {session.map((item, index) => (
                                    <option value={item.session} key={index}>{item.session}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="eligibility" className=' m-2 font-serif text-lg'> Eligibility :</label>
                            <input
                                type="text"
                                name='eligibility'
                                value={formdata.eligibility}
                                onChange={handleChange}
                                placeholder=' Enter Eligibility'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                            </input>
                        </div>



                        <div>
                            <label htmlFor="duration" className=' m-2 font-serif text-lg'> Duration :</label>
                            <input
                                type="text"
                                name='duration'
                                value={formdata.duration}
                                onChange={handleChange}
                                placeholder='Enter Duration'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className=' m-2 font-serif text-lg'> Description :</label>
                            <input
                                type="text"
                                name='description'
                                value={formdata.description}
                                onChange={handleChange}
                                placeholder='Enter Description'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="brochure" className=' m-2 font-serif text-lg'> Brouchure :</label>
                            <input
                                type="file"
                                name='brochure'
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                                onChange={(e) => handleImage(e, 1)}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="yearlyfee" className=' m-2 font-serif text-lg'> Yearly Fee :</label>
                            <input
                                type="text"
                                name='yearlyfee'
                                value={formdata.yearlyfee}
                                onChange={handleChange}
                                placeholder='Enter Yearly Fee'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>

                        <div>
                            <label htmlFor="applicationfee" className=' m-2 font-serif text-lg'>Application Fee :</label>
                            <input
                                type="text"
                                name='applicationfee'
                                value={formdata.applicationfee}
                                onChange={handleChange}
                                placeholder='Enter Application Fee'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="examfee" className=' m-2 font-serif text-lg'> Exam Fee :</label>
                            <input
                                type="text"
                                name='examfee'
                                value={formdata.examfee}
                                onChange={handleChange}
                                placeholder='Enter Exam Fee'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="courseimage" className=' m-2 font-serif text-lg'> Upload Course Image :</label>
                            <input
                                type="file"
                                name='courseimage'
                                onChange={(e) => handleImage(e, 2)}
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >


                            </input>
                        </div>



                    </div>
                    <div className='flex flex-row justify-center'>

                        <button type='submit' className='transition-shadow w-40 bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 mb-4'>{updateC ? "Update Course" : "ADD COURSE"}</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </SuperAdminLayout>
    )
}

export default Course