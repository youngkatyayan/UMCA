import {Routes, Route} from 'react-router-dom';

import Login from './components/signIn/Login.jsx';
// import Admin from './components/admin/Admin.jsx';
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
import UpdateCourse from './components/admin/edirMaster/UpdateCourse.jsx';
import Courses from './components/user/Courses.jsx';
import NewApplicant from './components/admin/franchise/NewApplicant.jsx';
import FranchiseList from './components/admin/franchise/FranchiseList.jsx';
import FranchiseRequest from './components/user/FranchiseRequest.jsx';

import Entroll from './components/pages/Entroll.jsx';
import Fdashboard from './components/franchise/Fdashboard.jsx';
import Admission from './components/franchise/Admission.jsx';




const App = () => {
  // Retrieve values from localStorage and sessionStorage
  // let mobile = localStorage.getItem('uid');
  let Status = localStorage.getItem('Status');
  let Type = sessionStorage.getItem('Status');

  // Decrypt the stored values
  // const decryptedMobile = mobile ? CryptoJS.AES.decrypt(mobile, "LOGIN UID").toString(CryptoJS.enc.Utf8) : null;
  const decryptedStatus = Status ? CryptoJS.AES.decrypt(Status, "Status").toString(CryptoJS.enc.Utf8) : null;
  const decryptedType = Type ? CryptoJS.AES.decrypt(Type, "Type").toString(CryptoJS.enc.Utf8) : null;

  const userType = `${decryptedType}-${decryptedStatus}`;
  // console.log(userType)
  switch (userType) {
    case 'Admin-1':
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-category' element={<Category />} />
          <Route path='/create-mode' element={<Mode />} />
          <Route path='/add-session' element={<Session />} />
          <Route path='/add-group' element={<Group />} />
          <Route path='/add-course' element={<Course />} />
          <Route path='/course-details' element={<UpdateCourse />} />
          <Route path='/course-details/update-course/:CoId' element={<Course />} />
          <Route path='/received-applicant' element={<NewApplicant />} />
          <Route path='/franchise' element={<FranchiseList />} />
          <Route path='/franch-request' element={<FranchiseRequest />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/entroll-course/:id' element={<Entroll/>} />
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
          <Route path='/franch-request' element={<FranchiseRequest />} />
        </Routes>
      );
    
      case 'franchise-1':
      return (
        <Routes>
           <Route path='/login' element={<Login />} />
           <Route path='/dashboard' element={<Fdashboard />} />
           <Route path='/admission-form' element={<Admission />} />
           <Route path='/courses' element={<Courses />} />
           <Route path='/entroll-course/:id' element={<Entroll/>} />
        </Routes>
      )


    default:
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:id' element={<Courses />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/franch-request' element={<FranchiseRequest />} />
          <Route path='/entroll-course/:id' element={<Entroll/>} />
        

        </Routes>
      );
  }
};

export default App;
