import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';
import axios from 'axios';


const Course = () => {

    const [mode,setMode]=useState([])
    const [category,setCategory]=useState([])
    const [formdata, setData] = useState({
        session: '',
        coursemode:'',
        categoryname:'',
        eligibilty:'',
        duration:"",
        description:'',
        yearlyfee:'',
        applicationfee:'',
        examfee:'',
        broacher:''
    })

    const accessmode = async () => {
        const { data } = await axios.get('/api/v1/get-mode')
        if(data.success){
            setMode(data.result)
            console.log(mode)
        }
    }
    const accesscategory = async () => {
        const { data } = await axios.get('/api/v1/get-category')
        if(data.success){
            setCategory(data.result)
            console.log(category)
        }
    }
    useEffect(()=>{accessmode();accesscategory();},[])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

        if(name==='categoryname'){
            const grpname=category.forEach(element => {
                if(element.categoryname===name){
                    const grpvalue =element.groupname
                    setData(prevData => ({ ...prevData, [name]: value ,groupname:grpvalue}))
                    
                }
            });
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const { data } = await axios.post('api/v1/add-mode')
            if (data.success) {

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
            <div className='w-full bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Course</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4  '>

                    <div className='border-2 rounded-sm  grid grid-cols-4 gap-3 items-center'>
                        {/* <div>
                            <label htmlFor="name" className=' m-2 font-serif text-lg'> Course Code :</label>
                            <select
                                type="text"
                                name='name'

                                onChange={handleChange}

                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                                <option className='' >Select Category</option>
                            </select>
                        </div> */}
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Course Name :</label>
                            <input
                                type="text"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder=' Enter Course Name'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Select Mode :</label>
                            <select
                                type="text"
                                name='startsession'
                                value={formdata.coursemode}
                                onChange={handleChange}
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                <option value="" >Select Mode</option>
                                {mode.map((item,index)=>(
                                    <option key={index} value={item.coursemode}>{item.coursemode}</option>
                                )
                                )}
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
                                {category.map((item,index)=>(
                                    <option value={item.categoryname} key={index}>{item.categoryname}</option>
                                ))}
                            </select>
                        </div>
                       
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Eligibility :</label>
                            <input
                                type="text"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder=' Enter Eligibility'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >
                            </input>
                        </div>

                       
                       
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Duration :</label>
                            <input
                                type="text"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder='Enter Session'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Description :</label>
                            <input
                                type="text"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder='Enter Session'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Yearly fees :</label>
                            <input
                                type="text"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder='Enter Session'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="startsession" className=' m-2 font-serif text-lg'> Broucher :</label>
                            <input
                                type="file"
                                name='startsession'
                                value={formdata.startsession}
                                onChange={handleChange}
                                placeholder=' Select Mode'
                                className=' p-2 rounded-md my-4 shadow-md w-full'
                            >

                                
                            </input>
                        </div>

                       


                    </div>
                    <div className='flex flex-row justify-center'>

                        <button type='submit' className='transition-shadow  bg-gray-700 hover:bg-gray-700 border-1 hover:font-serif hover:text-md hover:text-white text-white rounded-md px-4 py-2 m-4 items-center hover:shadow-md hover:shadow-amber-950 mb-4'>ADD COURSE</button>
                    </div>
                </form>
            </div>

        </SuperAdminLayout>
    )
}

export default Course