import React from 'react';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import TopBar from '../../components/common/TopBar';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar /> 

      <div className="flex flex-1 pt-[8rem]"> 
        <div className="fixed top-[6rem] left-0 w-[25rem] lg:w-[20rem] z-40">
          <AdminSidebar />
        </div>

        <main className="flex-1 ml-[25rem] w-full lg:ml-[20rem] p-6 bg-black text-white rounded-lg overflow-y-auto z-30 relative">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa repudiandae maiores exercitationem, veniam voluptates voluptatem fuga ducimus qui ipsum earum asperiores, cum aut sapiente ex atque officiis labore aliquam! Illo.</p>
        </main>
      </div>
    </div>
  );
}
