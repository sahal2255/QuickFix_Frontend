import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { ServiceGetById } from '../../../services/user/ServiceSection';
import CenterBanner from './CenterBanner';
import ServiceSidebar from './ServiceSideBar'; // Import the new sidebar component

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="mt-24 p-4 md:p-10">
        {/* Center Banner */}
        <CenterBanner 
          imageUrl={service.image} 
          altText={service.name} 
          aspectRatio="1 / 0.4" 
          className="rounded-lg shadow-md" 
        />

        {/* Flex container for sidebar and details */}
        <div className="flex flex-col pt-4 md:flex-row md:space-x-6 max-w-7xl mx-auto space-y-6 md:space-y-0">
          {/* Sidebar (Full width on mobile, 1/3 width on md and larger) */}
          <div className="w-full md:w-1/3">
            <ServiceSidebar 
              services={serviceType || []} 
              onSelectService={handleSelectService} 
              selectedService={selectedService}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          {/* Service Details (Full width on mobile, 2/3 width on md and larger) */}
          <div className="w-full md:w-2/3 p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
            {selectedService ? (
              <>
                {/* Service Image */}
                {selectedService.serviceImage && (
                  <img 
                    src={selectedService.serviceImage} 
                    alt={selectedService.serviceName} 
                    className="w-full h-64 object-cover rounded-lg mb-6" 
                  />
                )}

                <h1 className="text-3xl font-bold mb-4 text-blue-600">{selectedService.serviceName}</h1>
                <p className="text-lg mb-4 text-gray-700">
                  <strong>Category:</strong> {selectedService.categoryType}
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong>Price:</strong> <span className="text-green-600">${selectedService.price}</span>
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong>Duration:</strong> {selectedService.duration} minutes
                </p>
                <p className="text-lg mb-6 text-gray-700">
                  <strong>Description:</strong> {selectedService.description || 'No description available'}
                </p>

                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  Book Now
                </button>
              </>
            ) : (
              <div className="text-center text-lg text-gray-500">Select a service to see the details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
