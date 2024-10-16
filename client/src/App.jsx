import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/signIn/Login.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App