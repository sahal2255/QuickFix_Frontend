import React, { useEffect, useState } from 'react';
import { Checkbox, Layout, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { CategoryGet } from '../../../services/user/ServiceSection'; // Adjust the import path if needed

const { Sider } = Layout;

function ServiceSidebar() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);

  // Fetch service categories on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await CategoryGet(); // Call the API to get categories
        console.log('Fetched categories:', category);
        setServiceCategories(category); // Store categories in state
      } catch (error) {
        console.error('Category fetching error:', error); // Corrected error logging
      }
    };
    fetchCategory();
  }, []);

  const handleChange = (checkedValues) => {
    setSelectedServices(checkedValues); // Update the selected checkboxes
  };

  return (
    <Sider
      width={260}
      className="shadow-lg"
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        height: 'auto',
        position: 'fixed',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Service Categories
      </h3>

      <Divider style={{ margin: '12px 0' }} />

      {/* Checkbox Group with Animated Hover and Custom Styles */}
      <Checkbox.Group
        value={selectedServices}
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {serviceCategories.length > 0 ? (
          serviceCategories.map((category) => (
            <Checkbox
              key={category._id} // Use a unique key (assuming category._id exists)
              value={category.categoryName} // Ensure correct category field is used for value
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#555',
                padding: '8px 10px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                backgroundColor: selectedServices.includes(category.categoryName) ? '#f0f0f0' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              className="hover:bg-blue-50 hover:shadow-md hover:text-blue-500"
            >
              {category.categoryName} {/* Ensure the correct field for displaying the name */}
              {selectedServices.includes(category.categoryName) && (
                <CheckOutlined style={{ color: '#1890ff' }} />
              )}
            </Checkbox>
          ))
        ) : (
          <p>No categories available</p> // Render a message if no categories are fetched
        )}
      </Checkbox.Group>
    </Sider>
  );
}

export default ServiceSidebar;
