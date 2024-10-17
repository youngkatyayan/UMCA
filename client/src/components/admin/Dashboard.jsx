import React, { useState } from 'react'
import SuperAdminLayout from '../layout/SuperAdminLayout'
import AddCollege from '../../assets/addcollege.jpg';


const Dashboard = () => {
   
    return (
        <SuperAdminLayout>
            <main className='min-h-screen bg-gray-200 p-2'>
                <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
                    <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'>Dashboard</h1>
                </div>

              
            </main>

        </SuperAdminLayout>
    )
}

export default Dashboard