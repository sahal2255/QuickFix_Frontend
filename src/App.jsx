import React from 'react';
import AdminRoute from './components/routes/adminRoutes/AdminRoute';
import VendorRoutes from './components/routes/vendorRoutes/VendorRoutes';
import Toastify from './components/common/Toastify';
import UserRoute from './components/routes/userRoutes/UserRoute';
function App() {
  return (
    <>
      <Toastify />
      <AdminRoute />
      <VendorRoutes />
      <UserRoute />
    </>
  );
}

export default App;
