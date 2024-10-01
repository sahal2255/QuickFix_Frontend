import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ServiceTypeSidebar from './BookingSelection'; // Import the sidebar
import { useParams } from 'react-router-dom';
import { ServiceGetById } from '../../../services/user/ServiceSection';

export default function ConfirmBooking() {
  const { serviceId } = useParams();
  const [serviceList, setServiceList] = useState([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);

  useEffect(() => {
    const fetchedServiceTypes = async () => {
      try {
        const service = await ServiceGetById(serviceId);
        setServiceList(service.ServiceTypes);
      } catch (error) {
        console.log('Error fetching service types', error);
      }
    };
    fetchedServiceTypes();
  }, []);

  const handleServiceTypeChange = (selectedTypes) => {
    setSelectedServiceTypes(selectedTypes);
    console.log('Selected service types in ConfirmBooking:', selectedTypes);
  };

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
            onServiceTypeChange={handleServiceTypeChange} // Pass callback to child
          />
        </div>

        <div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-md">
          <h2 className="text-3xl font-bold mb-4">Booking Details</h2>
          {/* Display selected service types or other booking information here */}
          <p className="text-gray-600">
            Selected Service Types: {selectedServiceTypes.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
