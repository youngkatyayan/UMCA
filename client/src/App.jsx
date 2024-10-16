

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/signIn/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        {/* <Route path='/' exact element={<Dashboard/>}/> */}
      </Routes>
    </Router>

  )
}

export default App