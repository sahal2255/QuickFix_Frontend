import React from 'react';
import AdminRoute from './components/routes/adminRoutes/AdminRoute';
import VendorRoutes from './components/routes/vendorRoutes/VendorRoutes';
import TopBar from './components/common/TopBar';
import Toastify from './components/common/Toastify';
import VendorLogin from './pages/vendor/VendorLogin';
function App() {
  return (
    <>
      <Toastify />
      <AdminRoute />
      <VendorRoutes />
      {/* <TopBar /> */}
      {/* <VendorLogin /> */}
    </>
  );
}

export default App;
