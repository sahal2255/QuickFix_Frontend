import React, { useEffect, useState } from 'react';
import CommonForm from '../../common/CommonForm';
import { CategoryGet } from '../../../services/vendor/VendorGet';
import { updateService } from '../../../services/vendor/AddService'; // Assuming this function exists for updating services
import { showSuccessToast } from '../../common/Toastify';

export default function EditServiceForm({ initialData, onClose, onUpdateService }) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(initialData);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchedCategories = async () => {
            try {
                const fetchedServiceCategory = await CategoryGet();
                setCategories(fetchedServiceCategory);
            } catch (error) {
                console.log('Failed to fetch categories', error);
            }
        };
        fetchedCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
    console.log('category',formData.categoryType)
    console.log('name',formData.serviceName);
    console.log('price',formData.price);
    console.log('duration',formData.duration);
    console.log('image',formData.serviceImage)
    
    
    
    const formFields = [
        {
            name: 'categoryType',
            label: 'Service Category',
            type: 'select',
            options: categories,
            rules: [{ required: true, message: 'Please select a category' }],
            initialValue: formData.categoryType || '', // Pre-fill categoryType
        },
        {
            name: 'serviceName',
            label: 'Service Name',
            type: 'input',
            rules: [{ required: true, message: 'Please enter the service name' }],
            initialValue: formData.serviceName || '', // Pre-fill serviceName
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            rules: [{ required: true, message: 'Please enter the price' }],
            initialValue: formData.price || '', // Pre-fill price
        },
        {
            name: 'duration',
            label: 'Duration (Day)',
            type: 'number',
            rules: [{ required: true, message: 'Please enter the duration' }],
            initialValue: formData.duration || '', // Pre-fill duration
        },
        {
            name: 'image',
            label: 'Upload Image',
            type: 'file', // Change type to 'file'
            rules: [{ required: false }],
        },
    ];

    const handleSubmit = async (updatedFormData) => {
        const data = new FormData();
        data.append('categoryType', updatedFormData.categoryType);
        data.append('serviceName', updatedFormData.serviceName);
        data.append('price', updatedFormData.price);
        data.append('duration', updatedFormData.duration);

        if (updatedFormData.image) {
            data.append('file', updatedFormData.image); // If a new image is uploaded
        }

        try {
            const response = await updateService(formData._id, data); // Assuming updateService accepts the service ID and new data
            if (response && response.success) {
                onUpdateService(response.updatedService); // Call the parent function to update the service in the list
                onClose(); // Close the modal
                showSuccessToast('Service updated successfully');
            }
        } catch (error) {
            console.log('Error updating service:', error);
        }
    };

    return (
        <div>
            <CommonForm formFields={formFields} initialValues={formData} onSubmit={handleSubmit} />
        </div>
    );
}
