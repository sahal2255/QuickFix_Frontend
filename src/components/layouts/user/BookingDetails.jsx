import React, { useEffect, useState } from 'react';
import { ViewServiceDetails, CancelService } from '../../../services/user/HistoryService';
import { CommonSweetAlert } from '../../common/CommonSweetAlert';
import { showSuccessToast } from '../../common/Toastify';

const BookingDetails = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingDetails = await ViewServiceDetails(bookingId);
        console.log('booking details', bookingDetails);
        setBooking(bookingDetails.booking);
        setServiceDetails(bookingDetails.serviceTypes);
      } catch (error) {
        console.log('Error fetching booking details:', error);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const onCancelService = async (bookingId) => {
    CommonSweetAlert(
      'Are you sure?',
      'Do you want to cancel this booking?',
      async () => {
        try {
          const cancelService = await CancelService(bookingId);
          if (cancelService.status === 200) {
            showSuccessToast('Service cancelled successfully');
            onClose();
          }
        } catch (error) {
          console.log('Error cancelling service:', error);
        }
      },
      () => {
        console.log('Cancellation process aborted');
      }
    );
  };

  const statusColorMap = {
    Pending: 'bg-yellow-200 text-yellow-700',
    Confirmed: 'bg-blue-200 text-blue-700',
    'In Progress': 'bg-indigo-200 text-indigo-700',
    'Awaiting Parts': 'bg-orange-200 text-orange-700',
    'Ready For Pickup': 'bg-teal-200 text-teal-700',
    Cancelled: 'bg-red-200 text-red-700',
    Completed: 'bg-green-200 text-green-700',
    'Payment Pending': 'bg-purple-200 text-purple-700',
    Closed: 'bg-gray-200 text-gray-700',
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Booking Details</h3>
      {booking ? (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Service Types</h4>
            {serviceDetails.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {serviceDetails.map((service) => (
                  <li key={service._id} className="text-gray-700">
                    {service.serviceName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No service types available.</p>
            )}
          </div>

          <div className="mb-6">
            <p className="mb-2">
              <strong>Owner Name:</strong> {booking.ownerName}
            </p>
            <p className="mb-2">
              <strong>Mobile Number:</strong> {booking.mobileNumber}
            </p>
            <p className="mb-2">
              <strong>Vehicle Registration:</strong> {booking.regNo}
            </p>
            <p className="mb-2">
              <strong>Total Amount:</strong> ₹{booking.totalAmount}
            </p>
            <p className="mb-2">
              <strong>Paid Amount:</strong> ₹{booking.payedAmount}
            </p>
            <p className="mb-2">
              <strong>Balance Amount:</strong> ₹{booking.balanceAmount}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded ${statusColorMap[booking.serviceStatus.trim()] || 'bg-gray-200 text-gray-700'}`}
              >
                {booking.serviceStatus}
              </span>
            </p>
          </div>

          <div className="flex justify-between mt-6">
            {booking.serviceStatus !== 'Cancelled' && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={() => onCancelService(booking._id)}
              >
                Cancel Service
              </button>
            )}
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Loading booking details...</p>
      )}
    </div>
  );
};

export default BookingDetails;
