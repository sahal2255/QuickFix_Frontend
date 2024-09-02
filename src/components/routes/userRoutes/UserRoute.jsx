import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from '../../../pages/user/UserLogin'
export default function UserRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
