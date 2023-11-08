import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import About from './components/About'
import Profile from './components/Profile'
import Home from './components/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
