import React from 'react';
import AdminRoute from './components/routes/adminRoutes/AdminRoute';
import VendorRoutes from './components/routes/vendorRoutes/VendorRoutes';
import OTPpage from './components/common/OTPpage';
function App() {
  return (
    <>
      <AdminRoute />
      <VendorRoutes />
      {/* <OTPpage /> */}
    </>
  );
}

export default App;
