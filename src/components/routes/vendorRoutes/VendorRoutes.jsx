import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import VendorRegister from '../../../pages/vendor/VendorRegister';
import VendorDashboard from '../../../pages/vendor/VendorDashboard';
import VendorLogin from '../../../pages/vendor/VendorLogin';
import ServiceForm from '../../layouts/vendor/ServiceForm';
import VenderProtect from '../../common/vender/VenderProtect';
import FullService from '../../layouts/vendor/FullServices';
import VendorProfile from '../../layouts/vendor/VendorProfile';
import BookedServices from '../../layouts/vendor/BookedServices';
import SingleBooking from '../../layouts/vendor/SingleBooking';
import Coupon from '../../layouts/vendor/Coupon';
import MainDashboard from '../../layouts/vendor/MainDashboard';

const VendorRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsAuthenticated(true);
    }
   
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to dashboard if the vendor is logged in, else show login/register */}
        <Route 
          path='/vendor/register' 
          element={isAuthenticated ? <Navigate to='/vendor/dashboard' replace /> : <VendorRegister />} 
        />
        <Route 
          path='/vendor/login' 
          element={isAuthenticated ? <Navigate to='/vendor/dashboard' replace /> : <VendorLogin />} 
        />

        {/* Protected routes: only accessible to authenticated vendors */}
        <Route 
          path='/vendor' 
          element={
            <VenderProtect>
              <VendorDashboard />
            </VenderProtect>
          }
        >
          <Route path='dashboard' element={<MainDashboard />} />
          <Route path='add-service' element={<ServiceForm />} />
          <Route path='services' element={<FullService />} />
          <Route path='profile' element={<VendorProfile />} />
          <Route path='booked-services' element={<BookedServices />} />
          <Route path='coupons' element={<Coupon />} />
          <Route path='single-booking/:bookingId' element={<SingleBooking />} />
        </Route>

        {/* Fallback: If no match, redirect to login if not authenticated */}
        <Route path="/vendor/*" element={isAuthenticated ? <Navigate to='/vendor/dashboard' replace /> : <Navigate to='/vendor/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default VendorRoutes;
