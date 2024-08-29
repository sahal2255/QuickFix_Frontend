import React from 'react';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import TopBar from '../../components/layouts/admin/TopBar';

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-full">
          <AdminSidebar />
        </div>
        {/* Main Content */}
        <div className="ml-64 mt-16 p-4"> {/* Added mt-16 to account for the TopBar height */}
          <h1>Welcome to the Admin Dashboard</h1>
        </div>
      </div>
      <TopBar />
    </div>
  );
}
