import React, { useEffect, useState } from 'react';
import { Users, IndianRupee, Briefcase, User ,CheckCircleIcon,ClockIcon,XCircleIcon} from 'lucide-react';
import Card from '../../common/Card'; // Import the Card component
import { FetchUser } from '../../../services/admin/FetchUser';
import { FetchBooking } from '../../../services/admin/AdminBookingService';
import { FetchVendors } from '../../../services/admin/FetchVendor';
import LineChart from '../../common/LineChart';  // Import LineChart
import BarChart from '../../common/BarChart';  // Import BarChart
import { DateByFetching, FetchMonthlyDetails } from '../../../services/admin/DashbaordService';  // Fetch monthly details
import PieChart from '../../common/PieChart';
import DateRangePicker from '../../common/DateRangePicker';
import CommonTable from '../../common/CommonTable';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Ensure you have this plugin installed

export default function AdminDash() {
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [vendors, setVendors] = useState(0);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [months, setMonths] = useState([]);
  const [completedCount,setCompletedCount]=useState(0)
  const [pendingCount,setPendingCount]=useState(0)
  const [cancelledCount,setCancelledCount]=useState(0)
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [tableRow,setTableRow]=useState([])
  useEffect(() => {
    const dashboardDetails = async () => {
      try {
        const user = await FetchUser();
        setUserCount(user.length);
        const booking = await FetchBooking();
        setBookingCount(booking.bookingDetails.length);
        setTableRow(booking.bookingDetails)
        setRevenue(booking.totalPrice);
        const vendors = await FetchVendors();
        setVendors(vendors.length);

        const details = await FetchMonthlyDetails();
        const monthsData = details.map(item => item.month);  // Extract months
        const revenueData = details.map(item => item.totalRevenue);  // Extract revenue
        const bookingsData = details.map(item => item.totalBookings);  // Extract bookings
        
        setMonths(monthsData);
        setMonthlyRevenue(revenueData);
        setMonthlyBookings(bookingsData);
        const completed = booking.bookingDetails.filter(
          detail => detail.serviceStatus === 'Completed'
        ).length;
        const pending = booking.bookingDetails.filter(
          detail => detail.serviceStatus === 'Pending'
        ).length;
        const cancelled = booking.bookingDetails.filter(
          detail => detail.serviceStatus === 'Cancelled'
        ).length;
  
        setCompletedCount(completed);
        setPendingCount(pending);
        setCancelledCount(cancelled);


      } catch (error) {
        console.log('error in the dashboard details', error);
      }
    };
    dashboardDetails();
  }, []);

  const handleDateSubmit = async(dates) => {
    console.log('Submit clicked with date range:', dates);
    try{
      const response=await DateByFetching(dates)
      console.log('response in component ',response)
      setTableRow(response.bookings)
    }catch(error){
      console.log('date by fetching error in',error)
    }
  };

  
  const handleDateDownload = async (dates) => {
      console.log('Download clicked with date range:', dates);
      try {
          const response = await DateByFetching(dates);
          
          if (response.bookings) {
              const doc = new jsPDF();
  
              // Prepare table data (columns: Date, Customer, Amount)
              const salesData = response.bookings.map(booking => [
                  booking.createdAt,       // Date of booking
                  booking.ownerName,       // Customer name
                  booking.totalAmount      // Amount
              ]);
  
              // Add autoTable with the salesData
              doc.autoTable({
                  head: [['Date', 'Customer', 'Amount']], // Table headers
                  body: salesData                          // Table body (sales data)
              });
  
              // Save the generated PDF
              doc.save(`bookings_report_${dates[0].format('YYYY-MM-DD')}_to_${dates[1].format('YYYY-MM-DD')}.pdf`);
          }
      } catch (error) {
          console.log('Error downloading booking report:', error);
      }
  };
  

  const lineChartData = {
    labels: months,  
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue, 
        fill: false,
        borderColor: '#4bc0c0',
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  const barChartData = {
    labels: months,  // Dynamic months
    datasets: [
      {
        label: 'Bookings',
        data: monthlyBookings,  // Dynamic bookings data
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Monthly Bookings',
      },
    },
  };

  const pieChartData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [completedCount, pendingCount, cancelledCount],
        backgroundColor: ['green', 'orange', 'red'],
      },
    ],
  };
  

  const bookingColoumns=[
    {id:'ownerName' ,label:'Owner Name'},
    {id:'mobileNumber' ,label:'Mobile Number'},
    {id:'regNo' ,label:'Reg No'},
    {id:'serviceStatus' ,label:'Service Status'},
    {id:'totalAmount' ,label:'Service Amount'},
  ]

  return (
    <div className="flex h-screen bg-gradient-to-r ">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-4xl font-semibold text-gray-100 mb-6">Service Dashboard</h1>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Clients" icon={Users} value={userCount} color="linear-gradient(to right, #cce7ff, #80bfff)" />
            <Card title="Total Bookings" icon={Briefcase} value={bookingCount} color="linear-gradient(to right, #ffe4b3, #ffcc80)" />
            <Card title="Total Vendors" icon={User} value={vendors} color="linear-gradient(to right, #d9f7be, #a3d377)" />
            <Card title="Total Revenue" icon={IndianRupee} value={revenue} color="linear-gradient(to right, #ffd6e7, #ffa3bc)" />
          </div>

          {/* Charts Section */}
          <div className="mt-6 w-full gap-3 lg:flex lg:justify-between">
            {/* Line Chart (Revenue) */}
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />
            </div>

            {/* Bar Chart (Bookings) */}
            <div className="lg:w-1/2">
              <BarChart chartData={barChartData} chartOptions={barChartOptions} />
            </div>
          </div>
          <div className="flex flex-col mt-6 lg:flex-row lg:justify-between gap-6">
          <div className="flex flex-col lg:w-2/3 gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-0">
              <Card title="Completed Services" value={completedCount} icon={CheckCircleIcon} color="green" />
              <Card title="Pending Services" value={pendingCount} icon={ClockIcon} color="yellow" />
              <Card title="Cancelled Services" value={cancelledCount} icon={XCircleIcon} color="red" />
            </div>
          </div>

          <div className="lg:w-1/3 flex justify-center lg:justify-start mt-6 lg:mt-0">
            <PieChart chartData={pieChartData} />
          </div>
        </div>
        <div className="mb-6">
            <DateRangePicker onDateRangeChange={setDateRange} onSubmit={handleDateSubmit} onDownload={handleDateDownload} />
          </div>
          <div className='mt-5'>
              <CommonTable columns={bookingColoumns} rows={tableRow}/> 
          </div>

        </main>
      </div>
    </div>
  );
}
