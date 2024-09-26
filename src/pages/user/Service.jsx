import React, { useEffect, useState } from 'react';
import CommonCard from '../../components/common/CommonCard';
import Navbar from '../../components/layouts/user/Navbar';
import ServiceSidebar from '../../components/layouts/user/SideBar';
import { FilterOutlined } from '@ant-design/icons';
import { Drawer, Pagination } from 'antd'; // Import Pagination from Ant Design
import { ServiceGet } from '../../services/user/ServiceSection';

export default function Service() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await ServiceGet();
        console.log('Fetched services', response);
        setServices(response); // Assuming response is an array of services
      } catch (error) {
        console.log('Error fetching services', error);
      }
    };
    fetchService();
  }, []);

  // Calculate the current items to display based on the current page
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const totalPages = Math.ceil(services.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      {/* Main content area */}
      <div className="flex-grow flex mt-24 ">
        {/* Sidebar (visible on larger screens) */}
        <aside className="hidden md:flex w-1/4 flex justify-center items-center m-20">
          <ServiceSidebar />
        </aside>

        {/* Mobile filter button */}
        <button
          className="md:hidden fixed top-28 right-4 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          onClick={toggleDrawer}
        >
          <FilterOutlined style={{ fontSize: '24px', color: '#4A5568' }} />
        </button>

        {/* Drawer for mobile view */}
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

        {/* Main content area with cards and pagination */}
        <main className="flex-grow flex flex-col justify-between pt-24 p-6">
          <div className="w-full max-w-4xl">
            {/* Grid layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentServices.map((service) => (
                <CommonCard key={service._id} service={service} />
              ))}
            </div>
          </div>

          {/* Pagination controls (stick to bottom) */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={services.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
