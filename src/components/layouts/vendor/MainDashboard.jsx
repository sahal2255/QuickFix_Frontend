import React, { useEffect, useState } from 'react';
import { Users, Wrench, IndianRupee, Truck, Briefcase, CheckCircle, Tag } from 'lucide-react'; // Changed icon to Tag for coupons
import Card from '../../common/Card.jsx'; // Import the Card component
import { fetchingBookings } from '../../../services/vendor/BookingServies.jsx';
import { handleGetServices } from '../../../services/vendor/AddService.jsx';
import LineChart from '../../common/LineChart';
import { GetMonthlyDetails,FetchUsedDates } from '../../../services/vendor/DashboardService.jsx';
import BarChart from '../../common/BarChart.jsx';
import DateRangePicker from '../../common/DateRangePicker.jsx';
import CommonTable from '../../common/CommonTable.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'


export default function ServiceDashboard() {
  const [bookedServiceCount, setBookedServiceCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalService, setTotalService] = useState(0); // Changed from totalClients to totalCoupons
  const [completedCount, setCompletedCount] = useState(0);
  const [months, setMonths] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [dateRange,setDateRange]=useState({startDate:null,endDate:null})
  const [tableRow,setTableRow]=useState([])

  useEffect(() => {
    const fetchDashBoardDetails = async () => {
      try {
        const bookings = await fetchingBookings();
        setBookedServiceCount(bookings.bookings.length);
        console.log(bookings.totalPrice);
        setTotalRevenue(bookings.totalPrice);
        setTableRow(bookings.bookings)
        const services = await handleGetServices();
        setTotalService(services.length);

        const monthlyDetails = await GetMonthlyDetails();
        const monthlyData = monthlyDetails.result;
        const monthsData = monthlyData.map((item) => item.month);
        const revenueData = monthlyData.map((item) => item.totalRevenue);
        const bookingData = monthlyData.map((item) => item.totalBookings);
        console.log(bookingData);

        setMonths(monthsData);
        setMonthlyRevenue(revenueData);
        setMonthlyBookings(bookingData);
      } catch (error) {
        console.log('Error fetching dashboard details', error);
      }
    };
    fetchDashBoardDetails();
  }, []);

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue,
        fill: false,
        borderColor: '#4bc0c0', // Corrected the typo
      }
    ]
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
    labels: months,
    datasets: [ // Corrected to datasets (plural)
      {
        label: 'Bookings',
        data: monthlyBookings,
        backgroundColor: '#36a3eb',
      }
    ]
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
const handleDateSubmit=async(dates)=>{
  console.log('Submit clicked with date range:', dates);
  if (!dates || !dates[0] || !dates[1]) {
    showErrorToast('Please select a valid date range'); // Show error toast
    return;
  }
  try{
    
    const response=await FetchUsedDates(dates)
    console.log('response in component ',response)
    setTableRow(response.bookings)
  }catch(error){
    console.log('date by fetching error in',error)
  }
}
const handleDateDownload=async(dates)=>{
  if (!dates || !dates[0] || !dates[1]) {
    showErrorToast('Please select a valid date range'); // Show error toast
    return;
  }
  try{
    const response=await FetchUsedDates(dates)
    if(response.bookings){
      const doc=new jsPDF()

      const bookingData=response.bookings.map(booking=>[
        booking.createdAt,
        booking.ownerName,
        booking.regNo,
        booking.serviceStatus,
        booking.totalAmount,
        booking.payedAmount,
        booking.balanceAmount
      ])

      doc.autoTable({
        head:[['Date', 'Customer', 'RegNo','Service Status','Amount' ,'Payed Amount','Balance Amount']],
        body:bookingData
      })

      doc.save(`bookingsReport_${dates[0].format('YYYY-MM-DD')}_to_${dates[1].format('YYYY-MM-DD')}.pdf`)
    }
  }catch(error){
    console.log('error for the download report option')
  }
}

const bookingColoumns=[
  {id:'ownerName' ,label:'Owner Name'},
  {id:'mobileNumber' ,label:'Mobile Number'},
  {id:'regNo' ,label:'Reg No'},
  {id:'serviceStatus' ,label:'Service Status'},
  {id:'totalAmount' ,label:'Service Amount'},
  {id:'payedAmount' , label:'Payed Amount'},
  {id:'balanceAmount' ,label:'Balance Amount'}
]
  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-4xl font-semibold text-white mb-6">Service Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Bookings" icon={Truck} value={bookedServiceCount} color="white" />
            <Card title="Total Services" icon={Wrench} value={totalService} color="white" /> {/* Updated to show coupons */}
            <Card title="Total Revenue" icon={IndianRupee} value={totalRevenue} color="white" />
          </div>
          <div className="mt-6 w-full gap-3 lg:flex lg:justify-between">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />
            </div>
            <div className="lg:w-1/2">
              <BarChart chartData={barChartData} chartOptions={barChartOptions} />
            </div>
          </div>

          
          <div className="mb-6 mt-6">
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
