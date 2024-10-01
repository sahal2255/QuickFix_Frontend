import React, { useState } from 'react';

const ServiceTypeSidebar = ({ serviceId, serviceList, onServiceTypeChange }) => {
//   console.log('Service ID in the sidebar:', serviceId);
//   console.log('Service list in the sidebar:', serviceList);
  
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);

  const handleCheckboxChange = (serviceType) => {
    setSelectedServiceTypes((prevSelected) => {
      const updatedSelected = prevSelected.includes(serviceType)
        ? prevSelected.filter((type) => type !== serviceType)
        : [...prevSelected, serviceType];

      onServiceTypeChange(updatedSelected);
      return updatedSelected;
    });
  };

  return (
    <aside className="p-10 w-full bg-black shadow-lg rounded-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Select Service Types</h2>
      <ul className="space-y-4">
        {serviceList && serviceList.length > 0 ? (
          serviceList.map((service) => (
            <li key={`${service._id}-${service.serviceName}`} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`service-type-${service._id}`}
                checked={selectedServiceTypes.includes(service.serviceName)}
                onChange={() => handleCheckboxChange(service.serviceName)}
                className="w-6 h-6 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded"
              />
              <label
                htmlFor={`service-type-${service._id}`}
                className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer"
              >
                {service.serviceName}
              </label>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No service types available for this service.</p>
        )}
      </ul>
    </aside>
  );
};

export default ServiceTypeSidebar;
