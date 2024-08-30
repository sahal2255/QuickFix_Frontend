import React, { useState } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    BriefcaseIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    UserCircleIcon,
    PowerIcon,
    XMarkIcon, // Icon for closing the sidebar
    Bars3Icon, // Icon for opening the sidebar
} from "@heroicons/react/24/solid";

export default function VendorSidebar() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-7 w-7 text-blue-gray-300" />
                        </ListItemPrefix>
                        <Typography className="font-medium text-lg">Dashboard</Typography>
                    </ListItem>
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-7 w-7 text-blue-gray-300" />
                        </ListItemPrefix>
                        <Typography className="font-medium text-lg">Add Service</Typography>
                    </ListItem>
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                        <BriefcaseIcon className="h-7 w-7 text-blue-gray-300" />
                        <Typography className="font-medium text-lg">Services</Typography>
                    </ListItem>
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                        <ListItemPrefix>
                            <UserGroupIcon className="h-7 w-7 text-blue-gray-300" />
                        </ListItemPrefix>
                        <Typography className="font-medium text-lg">Booked Services</Typography>
                    </ListItem>
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-7 w-7 text-blue-gray-300" />
                        </ListItemPrefix>
                        <Typography className="font-medium text-lg">Profile</Typography>
                    </ListItem>
                    <ListItem className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-4 cursor-pointer border-l-4 border-transparent hover:border-blue-gray-400">
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
