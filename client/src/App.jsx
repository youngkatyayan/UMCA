import { Routes, Route } from 'react-router-dom';
import Login from './components/signIn/Login.jsx';
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
import OfferZone from './components/admin/offer/OfferZone.jsx';
import StudentDashboard from './components/student/StudentDashboard.jsx';
// import EnrolledCourses from './components/student/EnrolledCourses.jsx';
import Certificate from './components/student/Certificate.jsx';
// import DegreeProgram from './components/student/DegreeProgram.jsx';
// import FranchAnnounce from './components/admin/announcement/FranchAnnounce.jsx';
import StudentAnnounc from './components/admin/announcement/StudentAnnounc.jsx';
import Category from './components/admin/addMaster/Category.jsx';
import CourseCommision from './components/franchise/CourseCommision.jsx';
import StudentCommision from './components/franchise/StudentCommision.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import FeeStatement from './components/student/FeeStatement.jsx';
import IdCard from './components/student/IdCard.jsx';

import CreateCommission from './components/admin/commission/CreateCommission.jsx';
import ViewAdCommission from './components/admin/commission/ViewAdCommission.jsx';


import Contact from './components/pages/Contact.jsx';
import AboutUs from './components/user/AboutUs.jsx';
import UserCertificate from './components/user/UserCertificate.jsx';
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import TermCondition from './components/pages/TermCondition.jsx';
import RefundPolicy from './components/pages/RefundPolicy.jsx';



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
          <Route path='/offer' element={<OfferZone />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:id' element={<Courses />} />
          <Route path='/entroll-course/:id' element={<Entroll />} />

          <Route path='/create-commission' element={<CreateCommission/>} />
          <Route path='/Viewa-commission' element={<ViewAdCommission/>} />

          {/* announcement  */}



          <Route path='/announcement' element={<StudentAnnounc />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      );

    case 'Student-2':
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<StudentDashboard />} />
          {/* <Route path='/enrolled-courses' element={<EnrolledCourses />} /> */}
          {/* <Route path='/degreecourses' element={<DegreeProgram />} /> */}
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/update-profile' element={<UserProfile />} />
          <Route path='/franch-request' element={<FranchiseRequest />} />
          <Route path='/fees-details' element={<FeeStatement />} />
          <Route path='/student-id' element={<IdCard />} />
        </Routes>
      );
    case 'franchise-1':
      return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Fdashboard />} />
          <Route path='/admission-form' element={<Admission />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/entroll-course/:id' element={<Entroll />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/franch-request' element={<FranchiseRequest />} />
          <Route path='/entroll-course/:id' element={<Entroll />} />
          <Route path='/course-commision' element={<CourseCommision />} />
          <Route path='/student-commision' element={<StudentCommision />} />
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
          <Route path='/entroll-course/:id' element={<Entroll />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/about-us' element={<AboutUs/>} />
          <Route path='/user-certificate' element={<UserCertificate/>} />
          <Route path='/privacy&policy' element={<PrivacyPolicy/>} />
          <Route path='/term-condition' element={<TermCondition/>} />
          <Route path='/refund-policy' element={<RefundPolicy/>} />

        </Routes>
      );
  }
};

export default App;
