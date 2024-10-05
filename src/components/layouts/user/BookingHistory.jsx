import React, { useEffect, useState } from 'react';
import { fetchServiceHistory } from '../../../services/user/HistoryService';
import CommonModal from '../../common/CommonModal';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [detailsShow, setDetailsShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // To hold selected booking details

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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking); // Store the selected booking details
    setDetailsShow(true); // Show the modal
  };

  const closeModal = () => {
    setDetailsShow(false); // Close the modal
    setSelectedBooking(null); // Reset the selected booking
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
                  onClick={() => handleViewDetails(booking)} // Pass the entire booking object
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
      {detailsShow && selectedBooking && (
        <CommonModal open={detailsShow} onCancel={closeModal}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Booking Details</h3>
            <p><strong>Service Type:</strong> {selectedBooking.serviceTypeName}</p>
            <p><strong>Owner Name:</strong> {selectedBooking.ownerName}</p>
            <p><strong>Mobile Number:</strong> {selectedBooking.mobileNumber}</p>
            <p><strong>Vehicle Registration:</strong> {selectedBooking.regNo}</p>
            <p><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount}</p>
            <p><strong>Paid Amount:</strong> ₹{selectedBooking.payedAmount}</p>
            <p><strong>Balance Amount:</strong> ₹{selectedBooking.balanceAmount}</p>
            <p><strong>Status:</strong> {selectedBooking.serviceStatus}</p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </CommonModal>
      )}
    </div>
  );
}
