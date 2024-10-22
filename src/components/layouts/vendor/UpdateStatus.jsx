import React, { useState } from 'react';

const UpdateStatus = ({ currentStatus, onUpdateStatus }) => {
  const statusOptions = [
    'Pending',
    'Confirmed',
    'In Progress',
    'Awaiting Parts',
    'Ready For Pickup',
    'Cancelled',
    'Completed',
    'Payment Pending',
    'Closed',
  ];

  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Define the order of statuses for comparison
  const statusOrder = {
    'Pending': 0,
    'Confirmed': 1,
    'In Progress': 2,
    'Awaiting Parts': 3,
    'Ready For Pickup': 4,
    'Cancelled': 5,
    'Completed': 6,
    'Payment Pending': 7,
    'Closed': 8,
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateStatus(selectedStatus); // Call the parent handler with the selected status
  };

  // Filter out statuses that come before the current status
  const filteredStatusOptions = statusOptions.filter(status => {
    return statusOrder[status] >= statusOrder[currentStatus];
  });

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <label className="block mb-3 text-lg font-bold text-white">Select Status:</label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border bg-black text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filteredStatusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition "
      >
        Update Status
      </button>
    </div>
  );
};

export default UpdateStatus;
