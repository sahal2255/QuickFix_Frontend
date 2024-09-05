import React ,{ useEffect, useState } from 'react';
import CommonTable from '../../common/CommonTable';
import { FetchVendors } from '../../../services/admin/FetchVendor';

export default function VendorList() {
    const [vendors, setVendors] = useState([]);

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

    const vendorColumns = [
        { id: 'name', label: 'Vendor Name' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber' , label :'Phone Number'},
        { id: 'regId' , label:'regId' },
    ];

    return (
        <div>
            <CommonTable columns={vendorColumns} rows={vendors} />
        </div>
    );
}
