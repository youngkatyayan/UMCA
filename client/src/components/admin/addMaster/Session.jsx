import React, { useState } from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import AddCollege from '../../../assets/addcollege.jpg';


const Session = () => {
    const [data, setData] = useState({
        startsession: '',
        endsession: ''
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(data)
        try {
            const {data}=await axios.post('api/v1/add-mode')
            if(data.success){
                
            }
            else{
                console.log('error')
            }
        } catch (error) {
            console.log("error")
        }
    }
    return (
        <SuperAdminLayout>
            <main className='min-h-screen bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Add New Session</h1>
                </div>

                <form onSubmit={handleSubmit} className='  p-4 m-4 '>
                
                <div className='border-2 rounded-sm flex flex-col items-center mt-4'>

                    <div className='w-full flex flex-row gap-4 items-center justify-center '>
                        <label htmlFor="startsession" className=' m-2 font-serif'> Starting Session</label>
                        <input
                            type="date"
                            name='startsession'
                            value={data.startsession}
                            onChange={handleChange}
                            placeholder='Enter Session'
                            className='w-1/4 p-2 rounded-md my-4 shadow-md'
                        />
                        <label htmlFor="endsession" className=' m-2 font-serif'> Ending Session</label>
                        <input
                            type="date"
                            name='endsession'
                            value={data.endsession}
                            onChange={handleChange}
                            placeholder='Enter Session'
                            className='w-1/4 p-2 rounded-md my-4 shadow-md'
                        />
                       
                    </div>

                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 border-2 hover:font-bold text-white rounded-md px-4 py-2 m-4 items-center`'>ADD Category</button>

                </div>
                </form>
            </main>

        </SuperAdminLayout>
    )
}

export default Session