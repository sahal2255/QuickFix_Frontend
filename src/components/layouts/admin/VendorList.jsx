import React, { useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import { FetchVendors, updateVendorStatus } from '../../../services/admin/FetchVendor';

export default function VendorList() {
    const [vendors, setVendors] = useState([]);
    // const [isEnabled,setIsEnabled]=useState(flase)

    useEffect(() => {
        const loadVendors = async () => {
            try {
                const fetchedVendors = await FetchVendors();
                setVendors(fetchedVendors);  
            } catch (error) {
                console.error('Failed to fetch vendors', error);
            }
        };
        loadVendors();
    }, []);

    const handleAllowClick = async (vendor) => {
        try {
            // Toggle the `isEnabled` state
            const updatedVendor = {
                ...vendor,
                isEnabled: !vendor.isEnabled  // Toggle isEnabled (true -> false or false -> true)
            };

            // Update backend with the new state
            const response = await updateVendorStatus(updatedVendor);

            // Update the local state to reflect the change
            setVendors(vendors.map(v =>
                v._id === vendor._id ? { ...v, isEnabled: updatedVendor.isEnabled } : v
            ));
        } catch (error) {
            console.error('Error updating vendor status:', error);
        }
    };

    const vendorColumns = [
        { id: 'name', label: 'Vendor Name' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
        { id: 'regId', label: 'Reg ID' },
        { id: 'action', label: 'Actions', align: 'center' }  // Column for the Allow button
    ];

    return (
        <div>
            <CommonTable
                columns={vendorColumns}
                rows={vendors}
                onAllowClick={handleAllowClick}  // Pass the action handler to CommonTable
            />
        </div>
    );
}
