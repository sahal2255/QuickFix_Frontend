import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import Button from '@mui/material/Button';
import CommonModal from '../../common/CommonModal';
import ServiceForm from './ServiceForm';
import { handleGetServices } from '../../../services/vendor/AddService';

// Define table columns
const columns = [
  { id: 'category', label: 'Category' },
  { id: 'serviceName', label: 'Service Name' },
  { id: 'view', label: 'View' },
  { id: 'action', label: 'Actions', align: 'center' },
];

const FullService = () => {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getServices = async () => {
      try {
        const getData = await handleGetServices();
        console.log('Fetched data:', getData);
        setServices(getData); // Ensure this matches the expected structure
      } catch (error) {
        console.error('Error fetching services:', error); // More specific error logging
      }
    };
    getServices();
  }, []);

  // Function to handle View button click
  const handleViewClick = (service) => {
    console.log(`View clicked for service: ${service._id}`);
    // Add logic for viewing service details here
  };

  const handleFormModal = () => {
    setShowForm(true);
  };

  const closeFormModal = () => {
    setShowForm(false);
  };
  const addService = (newService) => {
    console.log('Adding new service to table:', newService); // Log new service
    setServices((prevServices) => {
      const updatedServices = [...prevServices, newService];
      console.log('Updated services array:', updatedServices); // Log updated services
      return updatedServices;
    });
  };
  const handleStartStopClick = (service) => {
    setServices((prevServices) =>
      prevServices.map((s) =>
        s._id === service._id ? { ...s, isActive: !s.isActive } : s
      )
    );
    console.log(`${service.isActive ? 'Stop' : 'Start'} clicked for service: ${service.name}`);
  };

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
    action: (
      <Button
        variant="contained"
        color={service.isActive ? 'error' : 'primary'}
        onClick={() => handleStartStopClick(service)}
      >
        {service.isActive ? 'Stop' : 'Start'}
      </Button>
    ),
  }));


  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Services</h1>
        <Button onClick={handleFormModal} variant="contained" color="primary">
          Add New Service
        </Button>
      </div>

      {/* Render the CommonTable with the formatted columns and rows */}
      <CommonTable columns={columns} rows={rows} />

      <CommonModal open={showForm} onClose={closeFormModal}>
        <ServiceForm onClose={closeFormModal} onAddService={addService}/> {/* ServiceForm is passed here */}
      </CommonModal>
    </div>
  );
};

export default FullService;
