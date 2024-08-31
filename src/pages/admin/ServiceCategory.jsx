import React, { useState } from 'react';
// import { Modal } from 'antd';
import CategoryForm from '../../components/layouts/admin/CategoryForm'; // Adjust the import path as needed
import Modal from '../../components/common/CommonModal';
export default function ServiceCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to track modal visibility

  const handleAddCategory = () => {
    setIsModalVisible(true); // Show the modal when the button is clicked
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="container mx-auto">
        {/* Card Container */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Service Categories</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleAddCategory} // Trigger modal visibility
            >
              Add Category
            </button>
          </div>

          {/* Modal to show the CategoryForm */}
          <Modal
            title="Add New Category"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null} // Hide default footer buttons
          >
            <CategoryForm />
          </Modal>

          {/* Card Body */}
          <div className="space-y-4">
            {/* Example Service Category Item */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-xl font-medium">Category 1</h3>
              <p className="text-gray-400">Description for category 1.</p>
              <div className="mt-2 flex justify-end">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>

            {/* Another Example Service Category Item */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-xl font-medium">Category 2</h3>
              <p className="text-gray-400">Description for category 2.</p>
              <div className="mt-2 flex justify-end">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
