import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import { getSession } from '../utils/common.utils'
import Notification from './pages/Notifications/Notification'

function App() {

  const {isAdmin, isLoggedIn, userId} = getSession()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/register' element={ !isLoggedIn ? <Register /> : <Navigate to={'/'} />} />
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/notifications' element={isLoggedIn ? <Notification /> : <Navigate to={'/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
