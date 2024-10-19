import { Route, Routes } from 'react-router-dom';
import Login from './components/signIn/Login.jsx';
import Admin from './components/admin/Admin.jsx';
import Category from './components/admin/addMaster/Category.jsx';
import Mode from './components/admin/addMaster/Mode.jsx';
import Session from './components/admin/addMaster/Session.jsx';
import PageNotFound from './components/pages/PageNotFound.jsx';
import Dashboard from './components/admin/Dashboard.jsx';
import CryptoJS from 'crypto-js';
import React from 'react';
import Group from './components/admin/addMaster/Group.jsx';
import Course from './components/admin/addMaster/Course.jsx';
import Home from './components/user/Home.jsx';

const App = () => {
  // Retrieve values from localStorage and sessionStorage
  let mobile = localStorage.getItem('uid');
  let Status = localStorage.getItem('Status');
  let Type = sessionStorage.getItem('Status');

  // Decrypt the stored values
  // const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;
  const decryptedStatus = Status ? CryptoJS.AES.decrypt(Status, "Status").toString(CryptoJS.enc.Utf8) : null;
  const decryptedType = Type ? CryptoJS.AES.decrypt(Type, "Type").toString(CryptoJS.enc.Utf8) : null;

  const userType = `${decryptedType}-${decryptedStatus}`;

  switch (userType) {
    case 'Admin-1':
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/add-category' element={<Category />} />
          <Route path='/create-mode' element={<Mode />} />
          <Route path='/add-session' element={<Session />} />
          <Route path='/add-group' element={<Group />} />
          <Route path='/add-course' element={<Course />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      );

    case 'user-0':
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Login />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      );
  }
};

export default App;
