import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogout } from '../../../services/admin/AdminService';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  TagIcon,
  PowerIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { showSuccessToast } from "../../common/Toastify";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/admin/login");
      showSuccessToast('Admin Logout success')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <button
        className="lg:hidden p-4 text-white bg-gray-800 rounded-md fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <Card
        className={`fixed lg:static h-screen lg:min-h-screen w-[25rem] lg:w-[20rem] p-4 bg-black text-white shadow-xl shadow-blue-gray-900/5 border border-gray-700 rounded-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="mb-4 p-4 border-b border-gray-600">
          <Typography variant="h5" className="text-xl font-semibold">
            Dashboard
          </Typography>
        </div>
        <List className="flex-col space-y-2">
          <Link to="/admin/dashboard" className="block">
            <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-7 w-7 text-blue-gray-300" />
              </ListItemPrefix>
              <Typography className="font-medium text-lg">Dashboard</Typography>
            </ListItem>
          </Link>
          <Link to="/admin/dashboard/vendors" className="block">
            <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
              <ListItemPrefix>
                <BuildingStorefrontIcon className="h-7 w-7 text-blue-gray-300" />
              </ListItemPrefix>
              <Typography className="font-medium text-lg">Vendors</Typography>
            </ListItem>
          </Link>
          <Link to="/admin/dashboard/service-category" className="block">
            <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
              <ListItemPrefix>
                <TagIcon className="h-7 w-7 text-blue-gray-300" />
              </ListItemPrefix>
              <Typography className="font-medium text-lg">Service Category</Typography>
            </ListItem>
          </Link>
          <Link to="/admin/profile" className="block">
            <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
              <ListItemPrefix>
                <UserCircleIcon className="h-7 w-7 text-blue-gray-300" />
              </ListItemPrefix>
              <Typography className="font-medium text-lg">Profile</Typography>
            </ListItem>
          </Link>
          <ListItem
            className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400"
            onClick={onLogout}
          >
            <ListItemPrefix>
              <PowerIcon className="h-7 w-7 text-blue-gray-300" />
            </ListItemPrefix>
            <Typography className="font-medium text-lg">Log Out</Typography>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
