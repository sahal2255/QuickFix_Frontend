import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Layout } from 'antd';
import { CheckOutlined } from '@ant-design/icons'; // Optional for checkbox icon styling

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
      width={240}
      className="bg-gray-50 shadow-lg mt-20 border-r border-gray-200 flex flex-col justify-center"
      style={{ height: '50vh', position: 'fixed', top: '12vh' }} // Adjusted height and vertical centering
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Service Categories</h3>
      <Checkbox.Group
        options={serviceCategories}
        value={selectedServices}
        onChange={handleChange}
        className="flex flex-col gap-4 px-4"
      />
    </Sider>
  );
}

export default ServiceSidebar;
