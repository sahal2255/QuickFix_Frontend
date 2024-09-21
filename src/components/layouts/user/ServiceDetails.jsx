import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { ServiceGetById } from '../../../services/user/ServiceSection';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch the full details of the service by its ID
    const fetchServiceDetails = async () => {
      try {
        const response = await ServiceGetById(serviceId); // Assuming this API fetches the service details by ID
        setService(response);
      } catch (error) {
        console.log('Error fetching service details', error);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  if (!service) {
    return <div>Loading...</div>; // Show loading state until service data is fetched
  }

  return (
    <div>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="mt-20 p-4">
        {/* Full service details */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <img
            src={service.image || '/static/images/cards/default-image.jpg'}
            alt={service.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg mb-2">
            <strong>Location:</strong> {service.location}
          </p>
          <p className="text-lg mb-2">
            <strong>Amenities:</strong> {service.amenities ? service.amenities.join(', ') : 'N/A'}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {service.email}
          </p>
        </div>
      </div>
    </div>
  );
}
