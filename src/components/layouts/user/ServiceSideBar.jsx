import React from 'react';

const ServiceSideBar = ({ services, onSelectService, selectedService }) => {
  return (
    <div className="w-full bg-gray-100 p-4 shadow-lg h-auto lg:h-full rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Available Services</h2>
      <ul>
        {services.map((service, index) => (
          <li 
            key={index} 
            className={`cursor-pointer p-3 mb-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors ${
              selectedService && selectedService._id === service._id ? 'bg-blue-200' : 'bg-white'
            }`} 
            onClick={() => onSelectService(service)}
          >
            {service.serviceName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSideBar;
