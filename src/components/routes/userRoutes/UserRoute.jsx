import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserLogin from '../../../pages/user/UserLogin';
import UserSignUP from '../../../pages/user/UserSignUp';
import HomePage from '../../../pages/user/HomePage';
import UserProtec from '../../common/user/UserProtec'; // For protected routes
import Service from '../../../pages/user/Service'; // Protected page
import ProfilePage from '../../../pages/user/ProfilePage';
import ServiceDetails from '../../layouts/user/ServiceDetails';
import ConfirmBooking from '../../layouts/user/ConfirmBooking';

export default function UserRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* Public routes */}
          <Route path='/login' element={<UserProtec isAuthPage={true}><UserLogin /></UserProtec>} />
          <Route path='/signup' element={<UserProtec isAuthPage={true}><UserSignUP /></UserProtec>} />

          {/* Protected routes */}
          <Route element={<UserProtec />}>
            <Route path='/service' element={<Service />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/service/:serviceId' element={<ServiceDetails />} />
            <Route path='/confirm-booking/:serviceId' element={<ConfirmBooking />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
