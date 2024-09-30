import React, { useEffect, useState } from 'react';
import CommonCard from '../../components/common/CommonCard';
import Navbar from '../../components/layouts/user/Navbar';
import ServiceSidebar from '../../components/layouts/user/SideBar';
import { FilterOutlined } from '@ant-design/icons';
import { Drawer, Pagination } from 'antd';
import { ServiceGet } from '../../services/user/ServiceSection';
import SearchBar from '../../components/common/SearchBar'; 
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector

export default function Service() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 9; 
  const dispatch = useDispatch();

  // Access selected categories from Redux
  const selectedCategories = useSelector((state) => state.user.selectedCategories || []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  useEffect(() => {
    const fetchService = async () => {
      console.log('search location', searchQuery);
      console.log('Selected Categories in fetching:', selectedCategories)
      try {
        const response = await ServiceGet({searchQuery,selectedCategories}); 
        setServices(response);
      } catch (error) {
        console.log('Error fetching services', error);
      }
    };
    fetchService();
  }, [searchQuery,selectedCategories]);
 

  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const totalPages = Math.ceil(services.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      <div className="flex-grow flex mt-24">
        <aside className="hidden md:flex w-1/4">
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

        <main className="flex-grow flex flex-col justify-between pt-4">
          <div className="w-full">
            <SearchBar onSearch={(query) => setSearchQuery(query)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 p-4 sm:p-6 lg:p-10">
              {currentServices.length > 0 ? (
                currentServices.map((service) => (
                  <CommonCard key={service._id} service={service} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No services found.
                </div>
              )}
            </div>
          </div>

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
