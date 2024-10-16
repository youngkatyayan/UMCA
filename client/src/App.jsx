

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/signIn/Login.jsx'
import Admin from './components/admin/Admin.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/admin'  element={<Admin/>}/>
      </Routes>
    </Router>

  )
}

export default App