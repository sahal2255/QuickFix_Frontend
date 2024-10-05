import React, { useEffect, useState } from 'react';
import { fetchServiceHistory } from '../../../services/user/HistoryService';
import CommonModal from '../../common/CommonModal';
import BookingDetails from './BookingDetails';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [detailsShow, setDetailsShow] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Store only the selected booking ID

  useEffect(() => {
    const fetchedServiceHistory = async () => {
      try {
        const serviceHistory = await fetchServiceHistory();
        console.log('Service history:', serviceHistory);
        setBookings(serviceHistory); // Update state with fetched data
      } catch (error) {
        console.log('Error fetching service history:', error);
      }
    };

    fetchedServiceHistory();
  }, []);

  const handleViewDetails = (bookingId) => {
    console.log('Booking ID:', bookingId); // Log the booking ID
    setSelectedBookingId(bookingId); // Set the selected booking ID
    setDetailsShow(true); // Show the modal
  };

  const closeModal = () => {
    setDetailsShow(false); // Close the modal
    setSelectedBookingId(null); // Reset the selected booking ID
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking History</h2>
      {bookings.length > 0 ? (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li key={booking._id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{booking.serviceTypeName}</h3>
                  <p className="text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-lg font-semibold ${booking.serviceStatus === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                  {booking.serviceStatus}
                </span>
              </div>
              <div className="text-gray-700 mb-4">
                <p><strong>Owner Name:</strong> {booking.ownerName}</p>
                <p><strong>Mobile Number:</strong> {booking.mobileNumber}</p>
                <p><strong>Vehicle Registration:</strong> {booking.regNo}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                <p><strong>Paid Amount:</strong> ₹{booking.payedAmount}</p>
                <p><strong>Balance Amount:</strong> ₹{booking.balanceAmount}</p>
              </div>
              <div className="flex justify-end">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewDetails(booking._id)} // Pass the booking ID
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No bookings found.</p>
      )}

      {/* Modal to show selected booking details */}
      {detailsShow && (
        <CommonModal open={detailsShow} onCancel={closeModal}>
          <BookingDetails bookingId={selectedBookingId} onClose={closeModal} /> {/* Pass booking ID to BookingDetails */}
        </CommonModal>
      )}
    </div>
  );
}
