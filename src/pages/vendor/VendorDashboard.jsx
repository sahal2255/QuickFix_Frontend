import React from 'react';
import VendorSidebar from '../../components/layouts/vendor/VendorSidebar';
import TopBar from '../../components/common/TopBar';

export default function VendorDashboard() {
    return (
        <div className='flex flex-col h-screen'>
            <TopBar />
            <div className='flex flex-1 pt-[8rem]'>
                <div className='fixed top-[6rem] left-0 w-[25rem] lg:w-[20rem] z-40'>
                    <VendorSidebar />
                </div>
                <main className="flex-1 ml-[25rem] lg:ml-[20rem] p-6 overflow-y-auto">
                    
                </main>
            </div>
        </div>
    );
}
