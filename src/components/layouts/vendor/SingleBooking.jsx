import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccessToast,showErrorToast } from "../../common/Toastify";
import { fetchSingleBookingDetaiils,updateCompletedServiceType,updateServiceStatus } from "../../../services/vendor/BookingServies";
import UpdateStatus from "./UpdateStatus";

const SingleBooking = () => {
  const { bookingId } = useParams();
  const [bookingData, setBookingData] = useState(null);
  const [serviceType, setServiceType] = useState([]);
  const [completedServiceTypes, setCompletedServiceTypes] = useState([]);  
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleBooking = async () => {
      try {
        const response = await fetchSingleBookingDetaiils(bookingId);
        console.log("Service Type Details", response.serviceTypeDetails);
        setBookingData(response.bookedService);
        setServiceType(response.serviceTypeDetails);
        setStatus(response.bookedService.serviceStatus);
        setCompletedServiceTypes(response.bookedService.completedServiceTypes)
      } catch (error) {
        console.log("Error fetching single booking in the component:", error);
      }
    };

    if (bookingId) {
      fetchSingleBooking();
    }
  }, [bookingId]);

  const backToBooking = () => {
    navigate("/vendor/dashboard/booked-services");
  };

  const handleCompleteService=async(serviceTypeId)=>{
    console.log('completed service type id',serviceTypeId)
    try{
        const response=await updateCompletedServiceType(serviceTypeId,bookingId)
        setCompletedServiceTypes((prevCompleted) => [...prevCompleted, serviceTypeId])
    }catch(error){
        console.log('error in update the completed service')
    }
  }

  const handleStatusUpdate = async (newStatus) => {
    console.log('Updating status to:', newStatus);
    try {

      console.log('booking id in the updation of status',bookingId)
      console.log('new status in update status',newStatus)
      const response=await updateServiceStatus(bookingId,newStatus)
      setStatus(newStatus); 
      showSuccessToast(response.message)
    } catch (error) {
      console.log('Error updating booking status:', error);
    }
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="top-4 left-4 mb-4">
        <button
          className="bg-blue-500 text-white w-28 py-2 px-4 h-12 rounded-md text-sm hover:bg-blue-600 transition"
          onClick={backToBooking}
        >
          Back
        </button>
      </div>

      <div className="mt-5 shadow-lg rounded-lg p-6">
        {bookingData ? (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Booking Details</h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-bold">Owner Name:</span>
                <span>{bookingData.ownerName}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Mobile Number:</span>
                <span>{bookingData.mobileNumber}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Registration Number:</span>
                <span>{bookingData.regNo}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold mb-2">Booked Services:</span>
                {serviceType.length > 0 ? (
                    <ul className="list-disc pl-6">
                        {serviceType.map((item, index) => (
                          <li key={index} className="flex justify-between items-center mb-2">
                            <p>
                              {item.serviceName}
                              {/* Show Completed only if the booking is not cancelled */}
                              {status !== 'Cancelled' && completedServiceTypes.includes(item._id) && (
                                <span className="ml-2 text-green-500">(Completed)</span>
                              )}
                            </p>

                            {/* Show Cancelled status if booking is cancelled */}
                            {status === 'Cancelled' ? (
                              <span className="ml-4 text-red-500">(Cancelled)</span>
                            ) : (
                              /* Show Complete button only if service is not completed */
                              !completedServiceTypes.includes(item._id) && (
                                <button
                                  className="ml-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                  onClick={() => handleCompleteService(item._id)}
                                >
                                  Complete
                                </button>
                              )
                            )}
                          </li>
                        ))}
                    </ul>
                ) : (
                    <span>No services booked yet.</span>
                )}
                </div>


              <div className="flex flex-col">
                <span className="font-bold">Payment Method:</span>
                <span>{bookingData.paymentMethod}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Total Amount:</span>
                <span>{bookingData.totalAmount}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Paid Amount:</span>
                <span>{bookingData.payedAmount}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Payment ID:</span>
                <span>{bookingData.paymentId}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Balance Amount:</span>
                <span>{bookingData.balanceAmount}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Service Status:</span>
                <span>{status}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Completed Service Types:</span>
                <span>
                  {completedServiceTypes.length > 0
                    ? serviceType
                        .filter(item => completedServiceTypes.includes(item._id))
                        .map(item => item.serviceName)
                        .join(", ")
                    : "No services completed yet."}
                </span>
              </div>
            </div>
            {bookingData.serviceStatus !=='Cancelled' ?(

            <div className="flex flex-col mt-4">
              <UpdateStatus currentStatus={status} onUpdateStatus={handleStatusUpdate} />
            </div>
            ):(
              <div className=" flex flex-col mt-2">

                <p className="text-red-400 items-center">Booking is already Cancelled</p>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
};

export default SingleBooking;
