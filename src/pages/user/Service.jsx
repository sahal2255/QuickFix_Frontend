import React, { useEffect, useState } from 'react';
import ActionAreaCard from '../../components/common/CommonCard'; // Updated to ActionAreaCard
import Navbar from '../../components/layouts/user/Navbar';
import ServiceSidebar from '../../components/layouts/user/SideBar';
import { FilterOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { ServiceGet } from '../../services/user/ServiceSection';

export default function Service() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [services, setServices] = useState([]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Fetch services
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await ServiceGet();
        console.log('Fetched services:', response);
        setServices(response); // Store the fetched services
      } catch (error) {
        console.log('Error fetching services:', error);
      }
    };
    fetchService();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="flex-grow flex mt-24 bg-gray-700">
        <aside className="hidden md:flex w-1/4 flex justify-center items-center m-20">
          <ServiceSidebar />
        </aside>

        <button
          className="md:hidden fixed top-28 right-4 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          onClick={toggleDrawer}
        >
          <FilterOutlined style={{ fontSize: '24px', color: '#4A5568' }} />
        </button>

        <Drawer
          title="Service Categories"
          placement="left"
          closable={true}
          onClose={toggleDrawer}
          visible={drawerVisible}
          width={240}
          bodyStyle={{ padding: '0' }}
        >
          <ServiceSidebar />
        </Drawer>

        {/* Main content */}
        <main className="flex-grow p-6">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Map through the services and pass each to ActionAreaCard */}
              {services.length > 0 ? (
                services.map((service) => (
                  <ActionAreaCard key={service._id} service={service} />
                ))
              ) : (
                <p className="text-white">No services available</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
