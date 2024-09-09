import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'; // Adjust the import path as needed
import Modal from '../../common/CommonModal';
import { fetchCategories, deleteCategory } from '../../../services/admin/adminService';
import CategoryEditForm from '../../layouts/admin/CategoryEditForm';
import { showSuccessToast } from '../../common/Toastify';

export default function ServiceCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to track modal visibility for adding a new category
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // For selected category to edit

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
    setIsModalVisible(true); // Show the modal for adding a category
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the add category modal
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false); // Hide the edit category modal
    setSelectedCategory(null); // Reset selected category
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      showSuccessToast(response.message);
      setCategories(categories.filter(category => category._id !== categoryId)); // Update category list after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category) => {
    console.log('Handling edit for category:', category); // Log the category being edited
    setSelectedCategory(category); // Set the selected category to be edited
    setIsEditModalVisible(true); // Show the edit modal
  };

  // useEffect(() => {
  //   console.log('Selected category updated:', selectedCategory);
  // }, [selectedCategory]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="container mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Service Categories</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>

          {/* Modal to show the CategoryForm for adding */}
          <Modal
            title="Add New Category"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <CategoryForm setCategories={setCategories} closeModal={handleCancel} />
          </Modal>

          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-gray-400">No categories available.</p>
            ) : (
              categories.map((category) => (
                <div key={category._id} className="bg-gray-700 p-4 rounded-md">
                  <h3 className="text-xl font-medium">{category.categoryName}</h3>
                  <div className="mt-2 flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal to show the Edit Category Form */}
          {selectedCategory && (
            <CategoryEditForm
              open={isEditModalVisible}
              onClose={handleEditCancel}
              category={selectedCategory}
              setCategories={setCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
}
