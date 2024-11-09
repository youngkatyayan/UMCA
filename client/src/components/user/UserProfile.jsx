import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import StudentLayout from '../layout/StudentLayout';
import CryptoJS from 'crypto-js';
const UserProfile = () => {
    const [category, setCategory] = useState([])
    const [course, setCourse] = useState([])
    const [district, setDistrict] = useState([])
    const [session, setFilteredSession] = useState([])
    const [filteredDistrict, setFilteredDistrict] = useState([])
    const [state, setState] = useState([])
    // const [data,setFormData]=useState([])
    const mobile = localStorage.getItem('uid')
    const [formdata, setData] = useState({
        // categoryname: '',
        // session: '',
        minority: "",
        name: "",
        dob: "",
        gender: "",
        category: "",
        relation: "",
        relaname: "",
        mothername: "",
        nationality: "",
        disabled: '',
        // coursename: "",
        line1: '',
        line2: '',
        town: '',
        state: '',
        district: '',
        pincode: '',
        perline1: '',
        perline2: '',
        pertown: '',
        perstate: '',
        perdistrict: '',
        perpincode: '',
        Uid: 'Direct'
    });

    const [educationEntries, setEducationEntries] = useState([
        {
            examinationPassed: '',
            schoolCollege: '',
            boardUniversity: '',
            yearOfPassing: '',
            marksPercentage: '',
            classDivision: '',
            subjects: '',
        },
    ]);

    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if (data.success) {
            setCategory(data.result)
        }
    }
    const accessState = async () => {
        const { data } = await axios.get('/api/v1/get-state')
        if (data.success) {
            setState(data.result)
        }

    }
    const accessDistrict = async () => {
        const { data } = await axios.get('/api/v1/get-district')
        if (data.success) {
            setDistrict(data.result)
        }
    }
    useEffect(() => { accesscategory(); accessDistrict(); accessState() }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'categoryname') {
            try {

                const response = await axios.post('/api/v1/get-selctedcourse', { cname: value });
                const data = response.data;

                if (data.success) {
                    setCourse(data.result);
                }
            } catch (error) {
                console.error("Error fetching selected course:", error);
            }
        }

        if (name === 'coursename') {
            const filteredSession = course.filter((item) => {
                return item.coursename == value;
            })
            setFilteredSession(filteredSession)
            setData((prevData) => ({ ...prevData, [name]: value }));
        }
        if (name === 'state') {
            const filtereddistrict = district.filter((item) => {
                return item.state === value;
            })
            setFilteredDistrict(filtereddistrict)
            setData((prevData) => ({ ...prevData, district: '' }));
        }

        if (name == 'sameAsAbove') {
            const line1 = formdata.line1;
            const line2 = formdata.line2;
            const town = formdata.town;
            const state = formdata.state;
            const district = formdata.district;
            const pincode = formdata.pincode;
            setData((prevData) => ({ ...prevData, perline1: line1, perline2: line2, pertown: town, perstate: state, perdistrict: district, perpincode: pincode }));
        }
    };

    // Add new education entry
    const handleAddEntry = () => {
        setEducationEntries((prevEntries) => [
            ...prevEntries,
            {
                examinationPassed: '',
                schoolCollege: '',
                boardUniversity: '',
                yearOfPassing: '',
                marksPercentage: '',
                classDivision: '',
                subjects: '',
            }
        ]);
    };

    // Handle education entry change
    const handleEducationChange = (index, event) => {
        const { name, value } = event.target;

        setEducationEntries((prevEntries) => {
            const updatedEntries = [...prevEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            return updatedEntries;
        });
    };

    // Remove an education entry
    const handleRemoveEntry = (index) => {
        setEducationEntries((prevEntries) => prevEntries.filter((_, idx) => idx !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const completeData = { ...formdata, educationEntries };
        try {
            const { data } = await axios.post('/api/v1/admission-form', completeData)
            if (data.success) {
                toast(data.message)
            } else {
                toast("Eror in Submitting Form")
            }
        } catch (error) {
            toast("Error in Submitting Form")
        }

    };

    // fetch student proceeding data 
    const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;
    // console.log(decryptedMobile)
    const fetchStudent = async () => {
        try {
            if (decryptedMobile) {
                const { data } = await axios.post('/api/v1/getStudent-data', { decryptedMobile })
                console.log(data.result)

                if (data.success) {
                    setData({
                        ...formdata,
                        name: data.result[0].name,
                        mobno: data.result[0].phone,
                        email: data.result[0].email,
                        state: data.result[0].state,
                        district: data.result[0].district,
                    })
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => { fetchStudent() }, [])
    return (
        <StudentLayout>
            <ToastContainer />
            <div className='flex flex-col flex-1 overflow-auto'>
                <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-slate-400 shadow-md' >
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Update Profile</h1>
                </div>

                <div className='mt-6 m-4' >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Personal Details</h2>
                        </div>

                        <div className='m-4 border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>

                            <div className='grid lg:grid-cols-4 md:grid-col-3 sm:grid-cols-2   gap-4 px-2'>
                                <div>
                                    <label htmlFor="name" className='text-lg mb-2'> Full Name</label>
                                    <input type='text' onChange={handleChange} value={formdata.name} readOnly disabled name="name" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>

                                <div>
                                    <select htmlFor="name" className='text-md mb-2 w-full'
                                        value={formdata.relation} onChange={handleChange} name='relation'
                                    >
                                        <option>Select Father's /Husband's Name</option>
                                        <option value="father">Father  Name </option>
                                        <option value="husband">Husband  Name </option>
                                    </select>
                                    <input type='text' onChange={handleChange} value={formdata.relaname} name="relaname" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>
                                <div>
                                    <label htmlFor="mothername" className='text-lg mb-2'>Mother's Name</label>
                                    <input id='mothername' type='text' onChange={handleChange} value={formdata.mothername} name="mothername" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>
                                <div>
                                    <label htmlFor="dob" className='text-lg mb-2'>Date of Birth</label>
                                    <input type='date' onChange={handleChange} value={formdata.dob} name="dob" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>
                                <div>
                                    <label htmlFor="gender" className='text-lg mb-2'>Gender</label>
                                    <select type='text' id='gender' onChange={handleChange} value={formdata.gender} name="gender" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                        <option>select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="nationality" className='text-lg mb-2'>Nationality</label>
                                    <input type='text' id='nationality' onChange={handleChange} value={formdata.nationality} name="nationality" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>
                                <div>
                                    <label htmlFor="disabled" className='text-lg mb-2'>Whether diffrently abled</label>
                                    <input type='text' id='disabled' onChange={handleChange} value={formdata.disabled} name="disabled" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>

                                <div>
                                    <label htmlFor="category" className='text-lg mb-2'>Category</label>
                                    <div className='flex flex-row flex-wrap justify-center '>
                                        {['Gen', 'SC', 'ST', 'OBC'].map((category) => (
                                            <label key={category} className='flex justify-items-center m-1 '>
                                                <input
                                                    type='radio'
                                                    onChange={handleChange}
                                                    name='category'
                                                    value={category}
                                                    className='m-1 border p-1 rounded-sm border-blue-300 shadow-md' />
                                                {category}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="minority" className='text-lg mb-2'>Minority</label>
                                    <div className='flex flex-row justify-start '>
                                        {['Yes', 'NO'].map((minority) => (
                                            <label key={minority} className='flex justify-items-center m-2 '>
                                                <input
                                                    type='radio'
                                                    onChange={handleChange}
                                                    name='minority'
                                                    className='m-1 border p-1 rounded-sm border-blue-300 shadow-md' />
                                                {minority}
                                            </label>
                                        ))}
                                    </div>
                                </div>





                            </div>
                        </div>
                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Contact Details</h2>
                        </div>


                        <div className=' '>
                            <div className='m-4 border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>
                                <div className='text-xl  text-white p-4' style={{
                                    background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 45%, rgba(0,172,255,1) 77%)'
                                }}>
                                    Address For communcation
                                </div>
                                <div >
                                    <div className='mt-4'>
                                        <label htmlFor="line1" className='text-lg mb-2 '>Line 1<strong className='text-red-600'>*</strong></label>
                                        <input type='text' onChange={handleChange} value={formdata.line1} name="line1" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div className='w-full'>
                                        <label htmlFor="line2" className='text-lg mb-2'>Line 2</label>
                                        <input type='text' onChange={handleChange} value={formdata.line2} name="line2" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div className='w-full'>
                                        <label htmlFor="town" className='text-lg mb-2'>City/Town/Village</label>
                                        <input type='text' onChange={handleChange} value={formdata.town} name="town" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                </div>

                                <div className='grid grid-cols-3 sm:grid-cols-3  gap-4'>

                                    <div>
                                        <label htmlFor="state" className='text-lg mb-2'> State</label>

                                        <input type='text' onChange={handleChange} value={formdata.state} disabled readOnly name="state" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />

                                    </div>
                                    <div>
                                        <label htmlFor="district" className='text-lg mb-2'> District</label>

                                        <input type='text' onChange={handleChange} value={formdata.district} disabled readOnly name="district" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />

                                    </div>
                                    <div>
                                        <label htmlFor="pincode" className='text-lg mb-2'> Pincode</label>
                                        <input type='text' onChange={handleChange} value={formdata.pincode} name="pincode" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>

                                </div>

                            </div>

                            <div className='m-4 border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>

                                <div className='text-xl  text-white p-4  inline-flex w-full' style={{
                                    background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 45%, rgba(0,172,255,1) 77%)'
                                }}>
                                    <div>
                                        <input type="checkbox" id="sameAsAbove" name="sameAsAbove" onClick={handleChange} className="mr-2" />
                                        <label htmlFor="sameAsAbove" className="text-white m-1"></label>
                                    </div>
                                    <div>Permanent Address (If same as above, copy the address here)</div>
                                </div>

                                <div >
                                    <div className='mt-4'>
                                        <label htmlFor="perline1" className='text-lg mb-2'>Line 1<strong className='text-red-600'>*</strong></label>
                                        <input type='text' onChange={handleChange} value={formdata.perline1} name="perline1" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div className='w-full'>
                                        <label htmlFor="perline2" className='text-lg mb-2'>Line 2</label>
                                        <input type='text' onChange={handleChange} value={formdata.perline2} name="perline2" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div className='w-full'>
                                        <label htmlFor="pertown" className='text-lg mb-2'>City/Town/Village</label>
                                        <input type='text' onChange={handleChange} value={formdata.pertown} name="pertown" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                </div>

                                <div className='grid grid-cols-3 sm:grid-cols-3  gap-4'>

                                    <div>
                                        <label htmlFor="perstate" className='text-lg mb-2'> State</label>
                                        
                                        <input type='text' onChange={handleChange} value={formdata.perstate}  name="perstate" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />

                                    </div>
                                    <div>
                                        <label htmlFor="perdistrict" className='text-lg mb-2'> District</label>
                                      
                                        <input type='text' onChange={handleChange} value={formdata.perdistrict}  name="perdistrict" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />

                                    </div>
                                    <div>
                                        <label htmlFor="perpincode" className='text-lg mb-2'> Pincode</label>
                                        <input type='text' onChange={handleChange} value={formdata.perpincode} name="perpincode" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="mobno" className='text-lg mb-2'> Mobile No. </label>
                                        <input type='text' onChange={handleChange} value={formdata.mobno} readOnly disabled name="mobno" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="whatsappno" className='text-lg mb-2'> Whatsapp No. </label>
                                        <input type='text' onChange={handleChange} value={formdata.whatsappno} name="whatsappno" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='text-lg mb-2'> Email</label>
                                        <input type='text' onChange={handleChange} value={formdata.email} name="email" readOnly disabled className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div>
                            <h2 className='text-lg mb-5 mt-5 text-red-800 border border-b-rose-700 '>Education Details</h2>
                        </div>

                        <div className='space-y-6'>
                            {educationEntries.map((entry, index) => (
                                <div key={index} className='border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>
                                    {/* Delete button */}
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveEntry(index)}
                                        className='absolute top-4 right-4 text-red-500 hover:text-red-600 transition duration-150 ease-in-out'
                                    >
                                        <MdOutlineDelete className='text-2xl' />
                                    </button>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4'>
                                        <div>
                                            <label className='block mb-1 text-md font-md'>Examination Passed</label>
                                            <input
                                                type='text'
                                                name='examinationPassed'
                                                value={entry.examinationPassed}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter Examination Passed'
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-md font-md'>School/College</label>
                                            <input
                                                type='text'
                                                name='schoolCollege'
                                                value={entry.schoolCollege}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter School/College'
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-md font-md'>Board/University</label>
                                            <input
                                                type='text'
                                                name='boardUniversity'
                                                value={entry.boardUniversity}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter Board/University'
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-md font-md'>Year of Passing</label>
                                            <input
                                                type='text'
                                                name='yearOfPassing'
                                                value={entry.yearOfPassing}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter Year of Passing'
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-md font-md'>% of Marks</label>
                                            <input
                                                type='text'
                                                name='marksPercentage'
                                                value={entry.marksPercentage}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter % of Marks'
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-md font-md'>Class/Division</label>
                                            <input
                                                type='text'
                                                name='classDivision'
                                                value={entry.classDivision}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter Class/Division'
                                                required
                                            />
                                        </div>

                                        <div >
                                            <label className='block mb-1 text-md font-md'>Subjects</label>
                                            <input
                                                type='text'
                                                name='subjects'
                                                value={entry.subjects}
                                                onChange={(e) => handleEducationChange(index, e)}
                                                className='w-full border border-blue-300 rounded-md p-2 focus:border-blue-500 focus:outline-none'
                                                placeholder='Enter Subjects'
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Entry Button */}
                            <button
                                type='button'
                                onClick={handleAddEntry}
                                className='w-24 py-1 text-green-600 bg-white border border-green-500 rounded-md text-xl transition-colors duration-300 ease-in-out hover:bg-green-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2'
                            >
                                <MdOutlineAddBox className='inline-block mr-2 text-3xl align-middle' />
                            </button>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <button type='submit' className='transition-shadow w-40 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 text-xl' style={{
                                background: 'linear-gradient(90deg, rgba(26,0,36,1) 0%, rgba(76,98,177,1) 0%, rgba(0,172,255,1) 100%)'
                            }}>Submit</button>
                        </div>
                    </form>


                </div>

            </div >
        </StudentLayout>
    )
}

export default UserProfile