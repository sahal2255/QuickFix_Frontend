import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { ServiceGetById } from '../../../services/user/ServiceSection';
import ServiceSidebar from './ServiceSideBar'; // Import the new sidebar component
import Footer from '../../layouts/user/Footer'
export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the full details of the service by its ID
    const fetchServiceDetails = async () => {
      try {
        const response = await ServiceGetById(serviceId);
        console.log('response in details page', response);
        setService(response.Details);
        setServiceType(response.ServiceTypes);
        setSelectedService(response.ServiceTypes?.[0]); // Set the first service type as default
      } catch (error) {
        console.log('Error fetching service details', error);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading service details...</div>
      </div>
    );
  }

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleBookNow = (serviceId) => {
    console.log('booking service id', serviceId);
    navigate(`/confirm-booking/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="mt-24 p-4 md:p-10">
        <div className="flex flex-col pt-4 md:flex-row md:space-x-6 max-w-7xl mx-auto space-y-6 md:space-y-0">
          <div className="w-full md:w-1/3">
            <ServiceSidebar 
              services={serviceType || []} 
              onSelectService={handleSelectService} 
              selectedService={selectedService}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            />
          </div>

          {/* Service Details */}
          <div className="w-full md:w-2/3 p-6 bg-white shadow-lg rounded-lg transition-transform ">
            {selectedService ? (
              <>
                {/* Service Image */}
                {selectedService.serviceImage && (
                  <img 
                    src={selectedService.serviceImage} 
                    alt={selectedService.serviceName} 
                    className="w-full h-64 object-cover rounded-lg mb-6 border-2 border-gray-200 shadow-md" 
                  />
                )}

                <h1 className="text-4xl font-bold mb-4 text-blue-600">{selectedService.serviceName}</h1>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Category:</strong> {selectedService.categoryType}
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Price:</strong> <span className="text-green-600">₹{selectedService.price}</span>
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Duration:</strong> {selectedService.duration} Day
                </p>
                <p className="text-lg mb-6 text-gray-700">
                  <strong className="font-semibold">Description:</strong> {selectedService.description || 'No description available'}
                </p>
              </>
            ) : (
              <div className="text-center text-lg text-gray-500">Select a service to see the details</div>
            )}
          </div>
        </div>

        {/* Book Now Button - Positioned below the service details */}
        <div className="flex justify-center mt-8">
          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-10 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => handleBookNow(serviceId)}
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="w-full ">
          <Footer />
        </div>
    </div>
  );
}
