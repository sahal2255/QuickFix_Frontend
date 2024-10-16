import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminDashboard from '../../../pages/admin/AdminDashbord';
import ServiceCategory from '../../layouts/admin/ServiceCategory'; 
import ProtectedRoute from '../../common/admin/ProtectedRoute'; 
import VendorList from '../../layouts/admin/VendorList';
import UserList from '../../layouts/admin/UserList';
import AdminDash from '../../layouts/admin/AdminDash';

const AdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate=useNavigate()
  useEffect(() => {
    // Check if the admin is already logged in (based on token or session)
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsAuthenticated(true);
    }
    // navigate('/admin/login')
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/login"
          element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="service-category" element={<ServiceCategory />} />
          <Route path="vendors" element={<VendorList />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
