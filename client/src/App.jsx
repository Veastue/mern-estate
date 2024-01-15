import React from 'react'
import {BrowserRouter, Routes, Route } from'react-router-dom'
import Headers from './components/Headers'
import { Signin, SignUp, About, Profile, Home } from './pages'

const App = () => {
  return (
    <BrowserRouter> 
      <Headers/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
