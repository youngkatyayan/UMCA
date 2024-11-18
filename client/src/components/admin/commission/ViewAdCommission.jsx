import React, { useEffect, useState } from 'react'
import AddCollege from '../../../assets/addcollege.jpg';
import SuperAdminLayout from '../../layout/SuperAdminLayout';
import axios from 'axios';


const ViewAdCommission = () => {


  const [FranchiseList, setFranchList] = useState([])

  const accessfranchcommission = async () => {
    const { data } = await axios.get('/api/v1/get-francherncommsion')
    if (data.success) {
      setFranchList(data.result)
    }
  }

  useEffect(() => { accessfranchcommission() }, [])

  return (
    <SuperAdminLayout>
      <div className=' bg-gray-200 p-2 w-full '>
        <div className='flex flex-col m-4 border rounded-md bg-cover bg-center bg-no-repeat relative ' style={{ backgroundImage: `url(${AddCollege})` }}>
          <h1 className='text-white text-2xl m-4 p-1 font-serif font-bold'> View Commission</h1>
        </div>

        <div></div>
        <div></div>

      </div>
    </SuperAdminLayout>
  )
}

export default ViewAdCommission