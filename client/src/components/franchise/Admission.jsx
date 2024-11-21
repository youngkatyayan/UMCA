import React, { useEffect, useState } from 'react'
import FranchiseLayout from '../layout/FranchiseLayout'
import axios from 'axios'
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import CryptoJS from 'crypto-js';
import moment from 'moment'



const Admission = (student) => {


    const handlePrint = async() => {
        console.log(formdata)
        const content = document.getElementById('student-details'); // Ensure the div you want to print has this ID
        if (content) {
            const newWindow = window.open('', '', 'height=600, width=800');
            newWindow.document.write('<html><head><title>Print Student Details</title>');
            newWindow.document.write('<style>');
            newWindow.document.write(`
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f9fafb;
                }
                .border {
                    border: 1px solid #ddd;
                }
                .rounded-lg {
                    border-radius: 8px;
                }
                .shadow-lg {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .bg-gray-50 {
                    background-color: #f9fafb;
                }
                .relative {
                    position: relative;
                }
                .text-xl {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .text-white {
                    color: white;
                }
                .text-lg {
                    font-size: 1.125rem;
                    font-weight: 600;
                }
                .text-red-600 {
                    color: #dc2626;
                }
                .text-red-800 {
                    color: #b91c1c;
                }
                .p-4, .p-6 {
                    padding: 1rem;
                }
                .m-1, .m-4 {
                    margin: 0.25rem;
                }
                .grid {
                    display: grid;
                    gap: 1rem;
                }
                .grid-cols-3 {
                    grid-template-columns: repeat(3, 1fr);
                }
                .w-full {
                    width: 100%;
                }
                input, select {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #60a5fa;
                    border-radius: 4px;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #1f2937;
                }
                h2 {
                    color: #b91c1c;
                    border-bottom: 2px solid #e11d48;
                    margin-bottom: 1rem;
                }
                .hidden-print {
                    display: none;
                }
                            
                @media (min-width: 640px) {
                    /* For sm (small screens, >= 640px) */
                    .sm:grid-cols-2 {
                        grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
                    }
                }

                @media (min-width: 768px) {
                    /* For md (medium screens, >= 768px) */
                    .md:grid-col-3 {
                        grid-template-columns: repeat(3, 1fr); /* 3 columns on medium screens */
                    }
                }

                @media (min-width: 1024px) {
                    /* For lg (large screens, >= 1024px) */
                    .lg:grid-cols-4 {
                        grid-template-columns: repeat(4, 1fr); /* 4 columns on large screens */
                    }
                }
                .personal{

                }
            `);
        
            newWindow.document.write('</style></head><body>');
            newWindow.document.write(content.outerHTML);
            newWindow.document.write('</body></html>');
            newWindow.document.close();
            newWindow.focus();
            newWindow.print();
            newWindow.close();
        } else {
            alert('Content not found!');
        }
    };
    
     
    const handleEdit = async (data) => {
        const Student = data.student;
        const dateofbirth = Student.dob ? moment(Student.dob).format('YYYY-MM-DD') : '';
      
        const updatedState = {
          SId: Student.SId || '',
          categoryname: Student.categoryname || '',
          session: Student.session || '',
          minority: Student.minority || "",
          name: Student.name || "",
          dob: dateofbirth || "",
          gender: Student.gender || "",
          category: Student.category || "",
          relation: Student.relation || "",
          relaname: Student.relaname || "",
          mothername: Student.mothername || "",
          nationality: Student.nationality || "",
          disabled: Student.disabled || '',
          coursename: Student.coursename || "",
          line1: Student.line1 || '',
          line2: Student.line2 || '',
          town: Student.town || '',
          state: Student.state || '',
          district: Student.district || '',
          pincode: Student.pincode || '',
          perline1: Student.perline1 || '',
          perline2: Student.perline2 || '',
          pertown: Student.pertown || '',
          perstate: Student.perstate || '',
          perdistrict: Student.perdistrict || '',
          perpincode: Student.perpincode || '',
          CommissionRs: Student.CommissionRs || '',
          commissionper: Student.commissionper || '',
          yearlyfee: Student.yearlyfee || '',
          Admincommission: Student.Admincommission || '',
          totalfranchCommission: Student.totalfranchCommission || '',
          totaladmincommission: Student.totaladmincommission || ''
        };
      
        setData(updatedState); // Update state
        console.log("State updated:", updatedState);
      
        handlePrint(); // Call after state update
      };
      
      

    useEffect(() => {
        if (student && typeof student === "object" && Object.keys(student).length > 0) {
          console.log("Student details set:", student);
         
          handleEdit(student)
        }
      }, [student]); 

    const [category, setCategory] = useState([])
    const [course, setCourse] = useState([])
    const [district, setDistrict] = useState([])
    const [session, setSession] = useState([])
    const [filteredDistrict, setFilteredDistrict] = useState([])
    const [state, setState] = useState([])
    const [commission, setCommission] = useState([])
    const [formdata, setData] = useState({
        Uid: '',
        categoryname: '',
        session: '',
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
        coursename: "",
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
        CommissionRs: '',
        commissionper: '',
        yearlyfee: '',
        Admincommission: '',
        totalfranchCommission: '',
        totaladmincommission: ''
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
    const [TotalCommission, setTotalCommission] = useState([])
    const UId = localStorage.getItem('uid')

    const accesscommission = async () => {
        const { data } = await axios.get('/api/v1/get-commission')
        if (data.success) {
            setCommission(data.result)
        }
    }
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
    const accesstotalcommission = async () => {

        const UId = localStorage.getItem('uid');
        if (!UId) {
            console.error("No UId found in localStorage");
            return;
        }

        const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);
        const { data } = await axios.post('/api/v1/get-totalcommission', {decryptedMobile})
        if (data.success) {
            setTotalCommission(data.result)
        }
    }

    useEffect(() => { accesscategory(); accessDistrict(); accessState(); accesscommission(); accesstotalcommission(); }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'categoryname') {
            try {

                const response = await axios.post('/api/v1/get-selctedcategory', { cname: value });
                const data = response.data;

                if (data.success) {
                    if (data.result.length > 0) {
                        setCourse(data.result);
                        console.log(data.result);
                    } else {
                        setCourse([]);
                        toast.error("No Coures Found")
                        console.log("no course available", data.result);
                    }
                } else {
                    setCourse("")
                }
            } catch (error) {
                console.error("Error fetching selected course:", error);
            }
        }

        if (name === 'coursename') {
            const { categoryname } = formdata;
            console.log(categoryname, value)
            try {
                const response = await axios.post('/api/v1/get-selctedcourse', { coursename: value, catname: categoryname });
                const data = response.data;

                if (data.success) {
                    setSession(data.result);
                    console.log(data.result);
                }
            } catch (error) {
                console.error("Error fetching selected course:", error);
            }
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

        if (name === 'session') {

            const optedsession = value;
            setData((prevData) => ({ ...prevData, [name]: value }));

            const { coursename, categoryname, } = formdata;
            // console.log(coursename, categoryname,optedsession)
            // console.log(session)


            const seyealyfee = session.find(((item) => categoryname === item.categoryname && optedsession == item.session))
            const Yearlyfee = seyealyfee ? seyealyfee.yearlyfee : null
            // console.log("yearlyfee",Yearlyfee)

            const selectedgroup = category.find(((item) => categoryname === item.categoryname))
            const Categoryname = selectedgroup ? selectedgroup.categoryname : null
            const totalcommissn = selectedgroup ? selectedgroup.totalcommission : null
            // console.log("categoryname , totalcommission",Categoryname ,totalcommissn)


            const selectedcommisson = commission.find(((item) => Categoryname == item.categoryname))
            const Commissionper = selectedcommisson ? selectedcommisson.commissionper : null

            // console.log("commission",Commissionper)
            const admincommission = totalcommissn - Commissionper
            // console.log("adminper , yearlyfee",admincommission,Yearlyfee)
            const netadmincommission = (admincommission / 100) * Yearlyfee
            // console.log(" presentadmincommission",netadmincommission)
            let uptoAdmincommission =parseInt(TotalCommission[0]?.AdminCommission || 0,10)

            // console.log("prevadmincomm",uptoAdmincommission)
            uptoAdmincommission += netadmincommission;  
            // console.log("newtotaladmincomm",uptoAdmincommission)

            const CommissionRs = (Commissionper / 100) * Yearlyfee
            // console.log(" centercommission",CommissionRs)

            let uptofranchcommission =parseInt(TotalCommission[0]?.franchcommission || 0,10)
            // console.log("prevcentercomm",uptofranchcommission)
            uptofranchcommission += CommissionRs;
            console.log("newtotalcentcom",uptofranchcommission);


            setData((prevData) => ({ ...prevData, CommissionRs: CommissionRs, categoryname: categoryname, yearlyfee: Yearlyfee, commissionper: Commissionper, Admincommission: netadmincommission, totalfranchCommission: uptofranchcommission, totaladmincommission: uptoAdmincommission }));

        }
    };


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

        const UId = localStorage.getItem('uid');
        if (!UId) {
            console.error("No UId found in localStorage");
            return;
        }

        const decryptedMobile = CryptoJS.AES.decrypt(UId, "LOGIN UID").toString(CryptoJS.enc.Utf8);

        setData(prevData => {
            const updatedData = { ...prevData, Uid: decryptedMobile };
            console.log("Updated data:", updatedData);
            return updatedData;
        });

        const completeData = { ...formdata, educationEntries, Uid: decryptedMobile };
        try {
            const { data } = await axios.post('/api/v1/admission-form', completeData)
            if (data.success) {
                toast(data.message)
            } else {
                toast.error("Eror in Submitting Form")
            }
            console.log(completeData); // Example submission logging

        } catch (error) {
            toast("Error in Submitting Form")
        }

    };
    return (
        <FranchiseLayout>
            <div className='flex flex-col flex-1 overflow-auto p-2 bg-slate-100'>
                <div className='flex flex-col m-4 border rounded-md bg-transparent-300  bg-blue-500 shadow-md' >
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Admission</h1>
                </div>



                <div className='mt-6 m-4' >
                    <form onSubmit={handleSubmit} id='student-details'>
                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Course Details</h2>
                        </div>
                        <div className='m-4 border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>
                            <div className='grid lg:grid-cols-4 md:grid-col-3 sm:grid-cols-2 gap-4  px-2'>
                                <div>
                                    <label htmlFor="categoryname" className='text-lg mb-2'> Select Category</label>
                                    <select type='text'
                                        id="categoryname"
                                        onChange={handleChange} value={formdata.categoryname} name="categoryname" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                        <option value="">Select an option</option>
                                        {category.map((item, index) => (
                                            <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                        ))}

                                    </select>
                                </div>
                                {
                                    formdata.categoryname && (
                                        <div>
                                            <label htmlFor="coursename" className='text-lg mb-2'>Select course</label>
                                            <select type='text' onChange={handleChange} value={formdata.coursename} name="coursename" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                                <option value="">Select an option</option>
                                                {course.map((item, index) => (
                                                    <option key={index} value={item.coursename}> {item.coursename}  </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                }
                                {
                                    formdata.categoryname && (
                                        <div>
                                            <label htmlFor="session" className='text-lg mb-2'>Select Session</label>
                                            <select type='text' onChange={handleChange} value={formdata.session} name="session" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                                <option value="">Select an option</option>
                                                {session.map((item, index) => (
                                                    <option key={index} value={item.session}>{item.session}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div>
                            <h2 className='text-xl mb-5 text-red-800 border border-b-rose-700 '>Personal Details</h2>
                        </div>

                        <div className='m-4 border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-50 relative'>

                            <div className='grid lg:grid-cols-4  md:grid-col-3 sm:grid-cols-2 personal  gap-4 px-2'>
                                <div>
                                    <label htmlFor="name" className='text-lg mb-2'> Full Name</label>
                                    <input type='text' onChange={handleChange} value={formdata.name} name="name" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                </div>

                                <div className=''>
                                    <select htmlFor="name" className='font-bold shadow-md rounded-md p-1 text-md mb-2 w-full'
                                        value={formdata.relation} onChange={handleChange} name='relation'
                                    >
                                        <option className='text-[0.9rem]' >---Select Father's /Husband's Name---</option>
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
                                    <div className='flex flex-row flex-wrap justify-start '>
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
                                        <select type='text' onChange={handleChange} value={formdata.state} name="state" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' >
                                            <option value="">Select State</option>
                                            {
                                                state.map((item, index) => (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="district" className='text-lg mb-2'> District</label>
                                        <select type='text' onChange={handleChange} value={formdata.district} name="district" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                            <option value="">Select District</option>
                                            {filteredDistrict.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
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
                                        <select type='text' onChange={handleChange} value={formdata.perstate} name="perstate" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' >
                                            <option value="">Select State</option>
                                            {
                                                state.map((item, index) => (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="perdistrict" className='text-lg mb-2'> District</label>
                                        <select type='text' onChange={handleChange} value={formdata.perdistrict} name="perdistrict" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1'>
                                            <option value="">Select District</option>
                                            {filteredDistrict.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="perpincode" className='text-lg mb-2'> Pincode</label>
                                        <input type='text' onChange={handleChange} value={formdata.perpincode} name="perpincode" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="mobno" className='text-lg mb-2'> Mobile No. </label>
                                        <input type='text' onChange={handleChange} value={formdata.mobno} name="mobno" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="whatsappno" className='text-lg mb-2'> Whatsapp No. </label>
                                        <input type='text' onChange={handleChange} value={formdata.whatsappno} name="whatsappno" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='text-lg mb-2'> Email</label>
                                        <input type='text' onChange={handleChange} value={formdata.email} name="email" className='w-full border  p-1 rounded-sm border-blue-300 shadow-md m-1' />
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
                                            <label className='block mb-1 text-[0.8rem] font-md'>Examination Passed</label>
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
        </FranchiseLayout >
    )
}

export default Admission