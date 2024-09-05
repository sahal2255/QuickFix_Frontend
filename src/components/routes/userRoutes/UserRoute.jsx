import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from '../../../pages/user/UserLogin';
import UserSignUP from '../../../pages/user/UserSignUp';
import HomePage from '../../../pages/user/HomePage';
import UserProtec from '../../common/user/UserProtec'; // For protected routes
import Service from '../../../pages/user/Service'; // Protected page

export default function UserRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignUP />} />
          
          <Route element={<UserProtec />}>
            <Route path='/service' element={<Service />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
