import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Layout, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css'; // Import Ant Design CSS

const { Sider } = Layout;

const serviceCategories = [
  'Car Service',
  'Bike Service',
  'Bus Service',
  'Truck Service',
];

function ServiceSidebar() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleChange = (checkedValues) => {
    setSelectedServices(checkedValues);
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
        {serviceCategories.map((category, index) => (
          <Checkbox
            key={index}
            value={category}
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#555',
              padding: '8px 10px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              backgroundColor: selectedServices.includes(category) ? '#f0f0f0' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className="hover:bg-blue-50 hover:shadow-md hover:text-blue-500"
          >
            {category}
            {selectedServices.includes(category) && (
              <CheckOutlined style={{ color: '#1890ff' }} />
            )}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Sider>
  );
}

export default ServiceSidebar;
