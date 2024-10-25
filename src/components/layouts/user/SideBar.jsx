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

    if (lastSelected) {
      dispatch(addCategory(lastSelected));
    }

    if (lastDeselected) {
      dispatch(removeCategory(lastDeselected));
    }
  };

  return (
    <Sider
      width="100%"
      className="custom-sidebar shadow-xl rounded-lg"
      style={{
        padding: '20px',
        backgroundColor: '#f0f5ff',
        height: 'auto',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h3
        style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#1d4ed8',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        Service Categories
      </h3>

      <Divider style={{ margin: '16px 0', borderColor: '#333333' }} />

      <Checkbox.Group
        value={selectedCategories}
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {serviceCategories.length > 0 ? (
          serviceCategories.map((category) => (
            <Checkbox
              key={category._id}
              value={category.categoryName}
              className={`custom-checkbox ${selectedCategories.includes(category.categoryName) ? 'selected' : ''}`}
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: selectedCategories.includes(category.categoryName) ? '#1d4ed8' : '#4B5563',
                padding: '10px 12px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backgroundColor: selectedCategories.includes(category.categoryName) ? '#ebf4ff' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {category.categoryName}
              {selectedCategories.includes(category.categoryName) && (
                <CheckOutlined style={{ color: '#1d4ed8' }} />
              )}
            </Checkbox>
          ))
        ) : (
          <p style={{ color: '#555', textAlign: 'center' }}>No categories available</p>
        )}
      </Checkbox.Group>
    </Sider>
  );
}

export default ServiceSidebar;
