import React from 'react'
import {BrowserRouter, Routes, Route } from'react-router-dom'
import Headers from './components/Headers'
import { Signin, SignUp, About, Profile, Home,} from './pages'

import PrivateRouteU from './components/PrivateRouteU'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'

const App = () => {
  return (
    <BrowserRouter> 
      <Headers/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRouteU />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
