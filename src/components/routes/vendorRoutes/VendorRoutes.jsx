import React from 'react'
import { Routes,Route ,BrowserRouter } from 'react-router-dom'
import VendorRegister from '../../../pages/vendor/VendorRegister'

export default function VendorRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/vendor/register' element={
                <VendorRegister />
            } />

        </Routes>
    </BrowserRouter>
  )
}
