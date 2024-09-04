import React, { useState,useEffect } from 'react';
import CategoryForm from '../../components/layouts/admin/CategoryForm'; // Adjust the import path as needed
import Modal from '../../components/common/CommonModal';
import { fetchCategories,deleteCategory } from '../../services/admin/adminService';
import { showSuccessToast } from '../../components/common/Toastify';
export default function ServiceCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to track modal visibility
  const [categories,setCategories]=useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    loadCategories();
  }, []);
  const handleAddCategory = () => {
    setIsModalVisible(true); // Show the modal when the button is clicked
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };


  const handleDelete = async (categoryId) => {
    try {
      console.log('category id',categoryId);
      
      const response = await deleteCategory(categoryId);
      showSuccessToast(response.message);
      // Update the categories list after deletion
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="container mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
            <CategoryForm setCategories={setCategories} closeModal={handleCancel}/>
          </Modal>

          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-gray-400">No categories available.</p>
            ) : (
              categories.map((category) => (
                <div key={category._id} className="bg-gray-700 p-4 rounded-md">
                  <h3 className="text-xl font-medium">{category.categoryName}</h3>
                  <div className="mt-2 flex justify-end">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </div>
    </div>
  );
}
