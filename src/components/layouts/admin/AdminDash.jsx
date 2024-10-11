import React, { useEffect, useState } from 'react';
import { Users, Calendar,IndianRupee, DollarSign, Menu, Search, Bell, User, Briefcase, BookOpen, Clock } from 'lucide-react';
import Card from '../../common/Card'; // Import the Card component
import { FetchUser } from '../../../services/admin/FetchUser';
import { FetchBooking } from '../../../services/admin/AdminBookingService';
import { FetchVendors } from '../../../services/admin/FetchVendor';

const services = [
  { name: "Consulting", icon: Briefcase, value: 45, color: "bg-blue-500" },
  { name: "Training", icon: BookOpen, value: 30, color: "bg-green-500" },
  { name: "Support", icon: Clock, value: 25, color: "bg-yellow-500" }
];

const recentProjects = [
  { name: "Project Alpha", client: "ABC Corp", status: "In Progress", completion: 75 },
  { name: "Project Beta", client: "XYZ Inc", status: "Planning", completion: 20 },
  { name: "Project Gamma", client: "123 Ltd", status: "Completed", completion: 100 }
];

export default function AdminDash() {
const [userCount,setUserCount]=useState(0)
const [bookingCount,setBookingCount]=useState(0)
const [revenue,setRevenue]=useState(0)
const [vendors,setVendors]=useState(0)
useEffect(()=>{
    const dashboardDetails=async()=>{
        try{
            const user=await FetchUser()
            setUserCount(user.length)
            const booking=await FetchBooking()
            setBookingCount(booking.bookingDetails.length)
            setRevenue(booking.totalPrice)
            const vendors=await FetchVendors()
            setVendors(vendors.length)

        }catch(error){
            console.log('error in the dashbaord details',error)
        }
    }
    dashboardDetails()
},[])
  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex-1 flex flex-col overflow-hidden">
        

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">Service Dashboard</h1>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Clients" icon={Users} value={userCount} />
            <Card title="Total Bookings" icon={Briefcase} value={bookingCount} />
            <Card title="Total Vendors" icon={User} value={vendors} />
            <Card title="Total Revenue" icon={IndianRupee} value={revenue} />
          </div>
          
          {/* Service Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Service Distribution</h2>
            {services.map((service) => (
              <div key={service.name} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-md font-semibold text-gray-600">{service.name}</span>
                  <span className="text-md font-semibold text-gray-600">{service.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-full rounded-full ${service.color} transition-width duration-500`} style={{ width: `${service.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Recent Projects</h2>
            {recentProjects.map((project) => (
              <div key={project.name} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">{project.name}</h3>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    project.status === "Completed" ? "bg-green-200 text-green-800" :
                    project.status === "In Progress" ? "bg-blue-200 text-blue-800" :
                    "bg-yellow-200 text-yellow-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Client: {project.client}</p>
                <div className="flex items-center">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-full rounded-full transition-width duration-500" style={{ width: `${project.completion}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{project.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
