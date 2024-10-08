import React from 'react';
import VendorSidebar from '../../components/layouts/vendor/VendorSidebar';
import TopBar from '../../components/common/TopBar';
import { Outlet } from 'react-router-dom';

export default function VendorDashboard() {
    return (
        <div className='flex flex-col h-screen'>
            <TopBar />
            <div className='flex flex-1 '>
                <div className='fixed top-[6rem] left-0 w-[25rem] lg:w-[20rem] z-40 h-full overflow-y-auto'>
                    <VendorSidebar />
                </div>
                <div className="flex-1 flex justify-center items-center mt-24">
                <div className="w-full lg:w-[calc(100%-20rem)] h-[calc(100vh-6rem)] lg:ml-[20rem] p-6 bg-black text-white rounded-lg overflow-hidden z-30 relative">
                    <div className="h-full overflow-y-auto">
                    <Outlet />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
