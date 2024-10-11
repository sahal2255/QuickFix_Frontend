import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { handleLogout } from '../../../services/vendor/VendorService';
import { 
    PresentationChartBarIcon, 
    BriefcaseIcon, 
    Cog6ToothIcon, 
    UserGroupIcon, 
    TagIcon,
    UserCircleIcon, 
    PowerIcon, 
    XMarkIcon, // Icon for closing the sidebar
    Bars3Icon // Icon for opening the sidebar
} from "@heroicons/react/24/solid";
import { showSuccessToast } from '../../common/Toastify';
import { Link } from 'react-router-dom'; // Import Link

export default function VendorSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            console.log('click logout');
            await handleLogout();
            showSuccessToast('Logout Success');
            navigate('/vendor/login'); // Redirect after successful logout
        } catch (error) {
            console.log('logout failed');
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
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="mb-4 p-4 border-b border-gray-600">
                    <Typography variant="h5" className="text-xl font-semibold">
                        Dashboard
                    </Typography>
                </div>
                <List className="flex-col space-y-2 overflow-y-auto h-[calc(100vh-4rem)]"> {/* Adjust height as needed */}
                    <Link to="/vendor/dashboard/dashboard">
                        <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-7 w-7 text-blue-gray-300" />
                            </ListItemPrefix>
                            <Typography className="font-medium text-lg">Dashboard</Typography>
                        </ListItem>
                    </Link>

                    {/* <Link to="/vendor/dashboard/add-service">
                        <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-7 w-7 text-blue-gray-300" />
                            </ListItemPrefix>
                            <Typography className="font-medium text-lg">Add Service</Typography>
                        </ListItem>
                    </Link> */}

                    <Link to="/vendor/dashboard/services">
                        <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                            <ListItemPrefix>
                                <BriefcaseIcon className="h-7 w-7 text-blue-gray-300" />
                            </ListItemPrefix>
                            <Typography className="font-medium text-lg">Services</Typography>
                        </ListItem>
                    </Link>

                    <Link to="/vendor/dashboard/booked-services">
                        <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                            <ListItemPrefix>
                                <UserGroupIcon className="h-7 w-7 text-blue-gray-300" />
                            </ListItemPrefix>
                            <Typography className="font-medium text-lg">Booked Services</Typography>
                        </ListItem>
                    </Link>
                    <Link to="/vendor/dashboard/coupons">
                        <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                            <ListItemPrefix>
                            <TagIcon className="h-7 w-7 text-blue-gray-300" /> {/* Coupon icon */}
                            </ListItemPrefix>
                            <Typography className="font-medium text-lg">Coupons</Typography>
                        </ListItem>
                        </Link>


                    <Link to="/vendor/dashboard/profile">
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
