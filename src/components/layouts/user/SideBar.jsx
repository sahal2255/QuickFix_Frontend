import React, { useEffect, useState } from 'react';
import { Checkbox, Layout, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { CategoryGet } from '../../../services/user/ServiceSection';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from redux
import { addCategory, removeCategory } from '../../../Redux/Slices/userSlice'; // Import Redux actions

const { Sider } = Layout;

function ServiceSidebar() {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.user.selectedCategories || []); // Read selected categories from Redux
  const [serviceCategories, setServiceCategories] = useState([]);

  // Fetch service categories on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await CategoryGet();
        setServiceCategories(category);
      } catch (error) {
        console.error('Category fetching error:', error);
      }
    };
    fetchCategory();
  }, []);

  const handleChange = (checkedValues) => {
    const lastSelected = checkedValues.find((val) => !selectedCategories.includes(val)); // New selection
    const lastDeselected = selectedCategories.find((val) => !checkedValues.includes(val)); // Deselection
  
    console.log('Before dispatch:', selectedCategories);
  
    if (lastSelected) {
      dispatch(addCategory(lastSelected));
    }
  
    if (lastDeselected) {
      dispatch(removeCategory(lastDeselected));
    }
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
        value={selectedCategories} // Use Redux state for selected categories
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {serviceCategories.length > 0 ? (
          serviceCategories.map((category) => (
            <Checkbox
              key={category._id} // Assuming category._id exists
              value={category.categoryName} // Assuming categoryName is the correct field
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#555',
                padding: '8px 10px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                backgroundColor: selectedCategories.includes(category.categoryName) ? '#f0f0f0' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              className="hover:bg-blue-50 hover:shadow-md hover:text-blue-500"
            >
              {category.categoryName}
              {selectedCategories.includes(category.categoryName) && (
                <CheckOutlined style={{ color: '#1890ff' }} />
              )}
            </Checkbox>
          ))
        ) : (
          <p>No categories available</p> // Fallback if no categories are fetched
        )}
      </Checkbox.Group>
    </Sider>
  );
}

export default ServiceSidebar;
