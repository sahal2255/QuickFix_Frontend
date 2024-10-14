import React, { useEffect, useState } from 'react';
import { Users, Wrench, IndianRupee, Truck, Briefcase, CheckCircle, Tag } from 'lucide-react'; // Changed icon to Tag for coupons
import Card from '../../common/Card.jsx'; // Import the Card component
import { fetchingBookings } from '../../../services/vendor/BookingServies.jsx';
import { handleGetServices } from '../../../services/vendor/AddService.jsx';
import LineChart from '../../common/LineChart';
import { borderColor, display } from '@mui/system';
import { plugins } from 'chart.js';
import { GetMonthlyDetails } from '../../../services/vendor/DashboardService.jsx';
export default function ServiceDashboard() {
  const [bookedServiceCount, setBookedServiceCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalService, setTotalService] = useState(0); // Changed from totalClients to totalCoupons
  const [completedCount, setCompletedCount] = useState(0);
  const [months, setMonths] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);


  useEffect(() => {
    const fetchDashBoardDetails = async () => {
      try {
        const bookings=await fetchingBookings()
        setBookedServiceCount(bookings.bookings.length)
        console.log(bookings.totalPrice)
        setTotalRevenue(bookings.totalPrice)
        const services=await handleGetServices()
        setTotalService(services.length)
        const monthlyDetails=await GetMonthlyDetails()
      } catch (error) {
        console.log('Error fetching dashboard details', error);
      }
    };
    fetchDashBoardDetails();
  }, []);


  const lineChartData={
    labels:months,
    datasets:[
      {
        label:'Revenue',
        data:monthlyRevenue,
        fill:false,
        borderColorL:'red',
      }
    ]
  }
  const lineChartOptions={
    responsive:true,
    plugins:{
      legend:{
        display:true,
      },
      title:{
        display:true,
        text:'Monthly Revenue'
      }
    }
  }
  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-4xl font-semibold text-white mb-6">Service Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Bookings" icon={Truck} value={bookedServiceCount} color="white" />
            <Card title="Total Services" icon={Wrench} value={totalService} color="white" /> {/* Updated to show coupons */}
            <Card title="Total Revenue" icon={IndianRupee} value={totalRevenue} color="white" />
            {/* <Card title="Completed Services" icon={CheckCircle} value={completedCount} color="white" /> */}
          </div>
          <div className='mt-6'>
            <div>
              <LineChart chartData={lineChartData} chartOptions={lineChartOptions}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
