

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/signIn/Login.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import Admin from './components/admin/Admin.jsx'

import CreateCollege from './components/admin/addMaster/CreateCollege.jsx'
import Mode from './components/admin/addMaster/mode.jsx'
import Category from './components/admin/addMaster/Category.jsx'
import Session from './components/admin/addMaster/Session.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
       <Route path='/' exact element={<Login/>}/>
        {/* <Route path='/' exact element={<Dashboard/>}/> */}
        {/* <Route path='/admin'  element={<Admin/>}/>  */}
        <Route path='/admin'  element={<Admin/>}/>
        <Route path='/dashboard'  element={<Dashboard/>}/>
        <Route path='/add-college'  element={<CreateCollege/>}/>
        <Route path='/create-mode'  element={<Mode/>}/>
        <Route path='/add-category'  element={<Category/>}/>
        <Route path='/add-session'  element={<Session/>}/>
      </Routes>
    </Router>

  )
}

export default App