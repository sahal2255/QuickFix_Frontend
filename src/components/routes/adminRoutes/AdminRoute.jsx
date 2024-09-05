import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminDashboard from '../../../pages/admin/AdminDashbord';
import ServiceCategory from '../../layouts/admin/ServiceCategory'; 
import ProtectedRoute from '../../common/admin/ProtectedRoute'; 
import VendorList from '../../layouts/admin/VendorList';

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="service-category" element={<ServiceCategory />} />
          <Route path='vendors' element={<VendorList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
