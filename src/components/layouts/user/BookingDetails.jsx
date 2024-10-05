import React, { useEffect, useState } from 'react';
import { ViewServiceDetails,CancelService } from '../../../services/user/HistoryService';
import { CommonSweetAlert } from '../../common/CommonSweetAlert';
import { showSuccessToast,showErrorToast } from '../../common/Toastify';
const BookingDetails = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState(null); 
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => { 
    const fetchBookingDetails = async () => {
      try {
        const bookingDetails = await ViewServiceDetails(bookingId); // Fetch booking details
        console.log('booking details', bookingDetails);
        setBooking(bookingDetails.booking); 
        setServiceDetails(bookingDetails.serviceTypes);
      } catch (error) {
        console.log('Error fetching booking details:', error);
      }
    };

    if (bookingId) {
      fetchBookingDetails(); // Fetch details if bookingId is available
    }
  }, [bookingId]);


  const onCancelService=async(bookingId)=>{
    console.log('booking id',bookingId)
    CommonSweetAlert(
        'Are you sure?', 
        'Do you want to cancel this booking?', 
        async () => {
          try {
            const cancelService = await CancelService(bookingId);
            if (cancelService.status === 200) {
            showSuccessToast('Service cancelled successfully')
              onClose(); // Close the modal on success
            }
          } catch (error) {
            console.log('Error cancelling service:', error);
          }
        },
        () => {
          console.log('Cancellation process aborted');
        }
      );
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Booking Details</h3>
      {booking ? (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Service Types</h4>
            {serviceDetails.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {serviceDetails.map(service => (
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
            <p className="mb-2"><strong>Owner Name:</strong> {booking.ownerName}</p>
            <p className="mb-2"><strong>Mobile Number:</strong> {booking.mobileNumber}</p>
            <p className="mb-2"><strong>Vehicle Registration:</strong> {booking.regNo}</p>
            <p className="mb-2"><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
            <p className="mb-2"><strong>Paid Amount:</strong> ₹{booking.payedAmount}</p>
            <p className="mb-2"><strong>Balance Amount:</strong> ₹{booking.balanceAmount}</p>
            <p className="mb-2"><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded ${booking.serviceStatus === 'Completed' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                {booking.serviceStatus}
              </span>
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              onClick={()=>onCancelService(booking._id)} // Call cancel service function
            >
              Cancel Service
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              onClick={onClose} // Call the onClose function when the button is clicked
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
