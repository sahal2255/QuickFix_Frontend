import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from '../../../pages/user/UserLogin'
import UserSignUP from '../../../pages/user/UserSignUp'
import HomePage from '../../../pages/user/HomePage'
export default function UserRoute() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/signup' element={<UserSignUP />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
