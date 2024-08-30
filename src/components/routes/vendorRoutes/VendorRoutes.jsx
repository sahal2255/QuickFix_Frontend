import React from 'react'
import { Routes,Route ,BrowserRouter } from 'react-router-dom'
import VendorRegister from '../../../pages/vendor/VendorRegister'
import VendorDashboard from '../../../pages/vendor/VendorDashboard'

export default function VendorRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/vendor/register' element={
                <VendorRegister />
            } />
            <Route path='/vendor/dashboard' element={
              <VendorDashboard />
            } />

        </Routes>
    </BrowserRouter>
  )
}
