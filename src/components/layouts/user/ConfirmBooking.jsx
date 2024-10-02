import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ServiceTypeSidebar from './BookingSelection'; // Import the sidebar
import { useParams } from 'react-router-dom';
import { ServiceGetById } from '../../../services/user/ServiceSection';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { clearSelectedServiceTypes } from '../../../Redux/Slices/userSlice';
import { ConfirmationOfBooking } from '../../../services/user/BookingService';


export default function ConfirmBooking() {
  const { serviceId } = useParams();
  const [serviceList, setServiceList] = useState([]);
  const [centerId,setCenterId]=useState()
  const dispatch=useDispatch()
  // Use useSelector to get selected service types from Redux
  const selectedServiceTypeIds = useSelector((state) => state.user.selectedServiceTypes);

  useEffect(() => {
    const fetchedServiceTypes = async () => {
      try {
        const service = await ServiceGetById(serviceId);
        setServiceList(service.ServiceTypes);
        // console.log('service.Details._id',service.Details._id)
        setCenterId(service.Details._id)
      } catch (error) {
        console.log('Error fetching service types', error);
      }
    };
    fetchedServiceTypes();
  }, [serviceId]); // Add serviceId as a dependency to refetch on change

  const selectedServiceTypesDetails = serviceList.filter(serviceType =>
    selectedServiceTypeIds.includes(serviceType._id)
  );

  // Correct total price calculation with accumulator initialized to 0
  const totalPrice = selectedServiceTypesDetails.reduce((acc, cur) => acc + Number(cur.price), 0);

  const handleSubmit=async()=>{
    console.log('vendorDetails',centerId)
    console.log('selected service type details',selectedServiceTypesDetails)
    console.log('toatl price',totalPrice)

    try{
      const confirm=await ConfirmationOfBooking({centerId,selectedServiceTypesDetails,totalPrice})
    }catch(error){
      console.log('booking confirmation error')
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="flex flex-col mt-4 pt-24 md:flex-row md:space-x-8 max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:w-1/3">
          <ServiceTypeSidebar 
            serviceId={serviceId} 
            serviceList={serviceList} 
          />
        </div>

        <div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-md">
          <h2 className="text-3xl font-bold mb-4">Booking Details</h2>

          {selectedServiceTypesDetails.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedServiceTypesDetails.map(serviceType => (
                    <tr key={serviceType._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {serviceType.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{serviceType.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Total Price Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-700">
                  Total Price: <span className="text-green-600"> ₹{totalPrice}</span>
                </h3>
              </div>
              <div className='mt-6 flex justify-center'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md'
                onClick={handleSubmit}
                >
                  Book Now
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No selected service types.</p>
          )}
        </div>
      </div>
    </div>
  );
}
