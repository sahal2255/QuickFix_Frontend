import React from 'react';
import { setSelectedServiceTypes, clearSelectedServiceTypes } from '../../../Redux/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ServiceTypeSidebar = ({ serviceId, serviceList }) => {
  const dispatch = useDispatch();
  
  const selectedServiceTypes = useSelector((state) => state.user.selectedServiceTypes); // Accessing the Redux state

  const handleCheckboxChange = (serviceTypeId) => {
    const updatedSelected = selectedServiceTypes.includes(serviceTypeId)
      ? selectedServiceTypes.filter((id) => id !== serviceTypeId)
      : [...selectedServiceTypes, serviceTypeId];

    dispatch(setSelectedServiceTypes(updatedSelected));
  };

  const handleClearAll = () => {
    dispatch(clearSelectedServiceTypes()); // Dispatch the action to clear all selected service types
  };

  return (
    <aside className="p-10 w-full bg-white shadow-lg rounded-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Select Service Types</h2>
      <ul className="space-y-4">
        {serviceList && serviceList.length > 0 ? (
          serviceList.map((service) => (
            <li key={`${service._id}-${service.serviceName}`} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`service-type-${service._id}`}
                checked={selectedServiceTypes.includes(service._id)} // Check against the ID
                onChange={() => handleCheckboxChange(service._id)} // Pass ID
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

      <button 
        onClick={handleClearAll}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Clear All
      </button>
    </aside>
  );
};

export default ServiceTypeSidebar;
