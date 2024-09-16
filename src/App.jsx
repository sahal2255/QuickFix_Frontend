import React from 'react';
import AdminRoute from './components/routes/adminRoutes/AdminRoute';
import VendorRoutes from './components/routes/vendorRoutes/VendorRoutes';
import Toastify from './components/common/Toastify';
import UserRoute from './components/routes/userRoutes/UserRoute';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
function App() {
  return (
    <>
    <Provider store={store}>
      <Toastify />
      <AdminRoute />
      <VendorRoutes />
      <UserRoute />
    </Provider>
      
    </>
  );
}

export default App;
