import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import Button from '@mui/material/Button';
import CommonModal from '../../common/CommonModal';
import ServiceForm from './ServiceForm';
import EditServiceForm from './EditServiceForm';
import { handleGetServices } from '../../../services/vendor/AddService';

// Define table columns
const columns = [
  { id: 'category', label: 'Category' },
  { id: 'serviceName', label: 'Service Name' },
  { id: 'view', label: 'View' },
  // { id: 'status', label : 'Status'}  
];

const FullService = () => {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [showForm, setShowForm] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewService, setViewService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const getData = await handleGetServices();
        setServices(getData); // Ensure this matches the expected structure
      } catch (error) {
        console.error('Error fetching services:', error); // More specific error logging
      }
    };
    getServices();
  }, []);

  // Handle the View button click
  const handleViewClick = (service) => {
    setViewService(service);
    setSelectedService(service); // Set the selected service for editing
    setEditMode(false); // Reset edit mode to false when viewing
    setViewModal(true);
  };

  const handleFormModal = () => {
    setShowForm(true);
  };

  const handleEditClick = () => {
    setEditMode(true); // Enable edit mode
  };

  const closeFormModal = () => {
    setShowForm(false);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setSelectedService(null); // Clear the selected service
    setEditMode(false);
    setViewService(null); // Clear the view service
  };

  const addService = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

 

  const handleUpdateService = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
    closeViewModal(); // Close the modal after updating the service
  };


  // const handleStatusChange=async(serviceTypeId)=>{
  //   console.log('service type id',serviceTypeId)
  //   try{
  //     const response=await updateServiceTypeStatus(serviceTypeId)
  //   }catch(error){
  //     console.log('error in the status enabled error',error)
  //   }
  // }
  // Format the service data for the table rows
  const rows = services 
    .filter(service => service && service._id) // Ensure each service is valid
    .map((service) => ({
      id: service._id,
      category: service.categoryType,
      serviceName: service.serviceName,
      view: (
        <Button variant="outlined" color="primary" onClick={() => handleViewClick(service)}>
          View
        </Button>
      ),
      // status: (
      //   <Button variant='outlined' color='primart' onClick={()=>{handleStatusChange(service._id)}}>
      //     update
      //   </Button>
      // ),
    }));

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Services</h1>
        <Button onClick={handleFormModal} variant="contained" color="primary">
          Add New Service
        </Button>
      </div>

      {services.length === 0 ? ( // Check if there are no services
        <div className="text-center text-lg text-gray-600">
          No services available.
        </div>
      ) : (
        // Render the CommonTable with the formatted columns and rows
        <CommonTable columns={columns} rows={rows} />
      )}

      <CommonModal open={showForm} onCancel={closeFormModal}>
        <ServiceForm onCancel={closeFormModal} onAddService={addService} />
      </CommonModal>

      <CommonModal open={viewModal} onCancel={closeViewModal}>
        {viewService && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            {!editMode ? (
              <>
                {/* Service details view */}
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={viewService.serviceImage}
                    alt={viewService.serviceName}
                    className="w-48 h-48 object-cover rounded-lg shadow-md mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {viewService.serviceName}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    <strong>Category:</strong> {viewService.categoryType}
                  </p>
                  <p className="text-lg">
                    <strong>Price:</strong> ${viewService.price}
                  </p>
                  <p className="text-lg">
                    <strong>Duration:</strong> {viewService.duration} minutes
                  </p>
                  <p className="text-lg">
                    <strong>Description:</strong> {viewService.description || 'No description available'}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button onClick={handleEditClick} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={closeViewModal} variant="contained" color="default">
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <EditServiceForm
                initialData={selectedService}  // Pass the selected service as initial data
                onClose={closeViewModal}      // Close the modal after editing
                onUpdateService={handleUpdateService} // Update the service in the parent state
              />
            )}
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default FullService;
