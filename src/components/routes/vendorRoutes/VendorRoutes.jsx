import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import VendorRegister from '../../../pages/vendor/VendorRegister';
import VendorDashboard from '../../../pages/vendor/VendorDashboard';
import VendorLogin from '../../../pages/vendor/VendorLogin';
import ServiceForm from '../../layouts/vendor/ServiceForm';
import VenderProtect from '../../common/vender/VenderProtect';
import FullService from '../../layouts/vendor/FullServices';
import VendorProfile from '../../layouts/vendor/VendorProfile';
import BookedServices from '../../layouts/vendor/BookedServices';

const VendorRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/vendor/register' element={<VendorRegister />} />
        <Route path='/vendor/login' element={<VendorLogin />} />

        <Route 
          path='/vendor/dashboard' 
          element={
            <VenderProtect>
              <VendorDashboard />
            </VenderProtect>
          }
        >
          <Route path='add-service' element={<ServiceForm />} />
          <Route path='services' element={<FullService />} />
          <Route path='profile' element={<VendorProfile />}/>
          <Route path='booked-services' element={<BookedServices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default VendorRoutes;
