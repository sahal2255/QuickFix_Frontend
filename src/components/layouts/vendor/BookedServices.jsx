import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import { fetchingBookings } from '../../../services/vendor/BookingServies';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'ownerName', label: 'Owner Name' },
    { id: 'regNo', label: 'Registration No' },
    { id: 'serviceStatus', label: 'Service Status' },
    { id: 'payedAmount', label: 'Paid Amount' },
    { id: 'view', label: 'View' },
];

const BookedServices = () => {
    const [bookings, setBookings] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetchingBookings();
                console.log('response in the component', response);
                setBookings(response.bookings);
            } catch (error) {
                console.log('fetching booking error in the component', error);
            }
        };
        fetchBookings();
    }, []);

    const handleViewClick = (bookingId) => {
        console.log('View button clicked for booking ID:', bookingId);
        navigate(`/vendor/dashboard/single-booking/${bookingId}`)
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

    return (
        <div>
            {bookings.length === 0 ? (
                <div>No bookings available</div>
            ) : (
                <CommonTable columns={columns} rows={rows} />
            )}
        </div>
    );
};

export default BookedServices;
