import React from 'react'

import SuperAdminLayout from '../layout/SuperAdminLayout'


// import CryptoJS from 'crypto-js';

const Admin = () => {
  // const uid = localStorage.getItem('uid')
  // var decrypted = CryptoJS.AES.decrypt(uid);
  // console.log(decrypted.toString(CryptoJS.enc.Utf8) )
  return (
    <SuperAdminLayout>
      <div>Dashboard</div>
    </SuperAdminLayout>
  )
}

export default Admin