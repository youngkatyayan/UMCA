import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';


const CreateCollege = () => {
    const [data, setData] = useState({
        universityname: ''
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('api/v1/add-universty')
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
            <main className='min-h-screen bg-gray-200 p-2'>

            {/* <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New University</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 rounded-md  backdrop-blur border-2 bg-cover bg-center bg-no-repeat relative min-h-screen bg-opacity-5'>

                    <div className='border-2 rounded-sm flex flex-col items-center mt-4'>

                        <div className='w-full flex flex-col items-center '>
                            <label htmlFor="universityname" className=' mb-2 text-2xl font-serif'> University Name</label>
                            <input
                                type="text"
                                name='universityname'
                                value={data.universityname}
                                onChange={handleChange}
                                className='w-2/4 p-2 rounded-md my-4 shadow-md'
                                placeholder='Enter University Name'

                            />

                        </div>

                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 border-2 hover:font-bold text-white rounded-md px-4 py-2 m-4 items-center'>ADD UNIVERSITY</button>

                    </div>
                </form> */}

            </main>

        </SuperAdminLayout>
    )
}

export default CreateCollege