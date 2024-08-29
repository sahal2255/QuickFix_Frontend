import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminSidebar from '../../layouts/admin/AdminSidebar';
import ProtectedRoute from '../../common/admin/ProtectedRoute'; 

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={
          // <ProtectedRoute>
            <AdminLogin />
          // </ProtectedRoute>
        } />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminSidebar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
