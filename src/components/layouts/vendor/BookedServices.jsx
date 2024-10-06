import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import { fetchingBookings } from '../../../services/vendor/BookingServies';
import { Button } from 'antd';

const columns = [
    { id: 'ownerName', label: 'Owner Name' },
    { id: 'regNo', label: 'Registration No' },
    { id: 'serviceStatus', label: 'Service Status' },
    { id: 'payedAmount', label: 'Paid Amount' },
    { id: 'view', label: 'View' },
];

const BookedServices = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetchingBookings();
                console.log('response in the component', response);
                setBookings(response);
            } catch (error) {
                console.log('fetching booking error in the component', error);
            }
        };
        fetchBookings();
    }, []);

    const handleViewClick = (bookingId) => {
        console.log('View button clicked for booking ID:', bookingId);
        // Handle view action (e.g., navigate to detailed booking page)
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
