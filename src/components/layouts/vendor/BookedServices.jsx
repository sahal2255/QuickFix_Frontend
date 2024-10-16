import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import { fetchingBookings } from '../../../services/vendor/BookingServies';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import DateRangePicker from '../../common/DateRangePicker';
import { FetchUsedDates } from '../../../services/vendor/DashboardService';

const columns = [
    { id: 'ownerName', label: 'Owner Name' },
    { id: 'regNo', label: 'Registration No' },
    { id: 'serviceStatus', label: 'Service Status' },
    { id: 'payedAmount', label: 'Paid Amount' },
    { id: 'view', label: 'View' },
];

const BookedServices = () => {
    const [bookings, setBookings] = useState([]);
    const [dateRange,setDateRange]=useState({startDate:null,endDate:null})
    const navigate=useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetchingBookings();
                // console.log('response in the component', response);
                setBookings(response.bookings);
            } catch (error) {
                console.log('fetching booking error in the component', error);
            }
        };
        fetchBookings();
    }, []);

    const handleViewClick = (bookingId) => {
        console.log('View button clicked for booking ID:', bookingId);
        navigate(`/vendor/single-booking/${bookingId}`)
    };



    const rows = bookings.map((service) => ({
        ownerName: service.ownerName,
        regNo: service.regNo,
        serviceStatus: service.serviceStatus,
        payedAmount: service.payedAmount,
        view: (
            <Button variant="outlined" color="primary" onClick={() => handleViewClick(service._id)}>
                View
            </Button>
        ),
    }));
    const handleDatebyBookings=async(dates)=>{
        // console.log('heloo')
        if (!dates || !dates[0] || !dates[1]) {
            showErrorToast('Please select a valid date range'); // Show error toast
            return;
          } 
          try{
            const response=await FetchUsedDates(dates)
            console.log('response in the component', response.data);

            setBookings(response.bookings)
          }catch(error){
            console.log('error in the fetching ',error)
          }
        
        }
    return (
        <div>
            {bookings.length === 0 ? (
                <div>No bookings available</div>
            ) : (
                <div>
                    <div className='mb-6 mt-6'>

                    <DateRangePicker onDateRangeChange={setDateRange} onSubmit={handleDatebyBookings} />
                    </div>
                    <CommonTable columns={columns} rows={rows} />
                </div>
            )}
        </div>
    );
};

export default BookedServices;
