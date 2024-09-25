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
        const fetchCategories = async () => {
            try {
                const fetchedServiceCategory = await CategoryGet();
                setCategories(fetchedServiceCategory);
            } catch (error) {
                console.log('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const formFields = [
        {
            name: 'categoryType',
            label: 'Service Category',
            type: 'select',
            options: categories,
            rules: [{ required: true, message: 'Please select a category' }],
            initialValue: formData.categoryType || '',
        },
        {
            name: 'serviceName',
            label: 'Service Name',
            type: 'input',
            rules: [{ required: true, message: 'Please enter the service name' }],
            initialValue: formData.serviceName || '',
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            rules: [{ required: true, message: 'Please enter the price' }],
            initialValue: formData.price || '',
        },
        {
            name: 'duration',
            label: 'Duration (Day)',
            type: 'number',
            rules: [{ required: true, message: 'Please enter the duration' }],
            initialValue: formData.duration || '',
        },
        {
            name: 'image',
            label: 'Upload Image',
            type: 'file',
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
            data.append('image', updatedFormData.image); // The key should match what your backend expects
        } else {
            console.error('No image file found');
        }
    
        // Log FormData contents
        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            const response = await updateService(formData._id, data);
            if (response && response.success) {
                onUpdateService(response.updatedService);
                onClose();
                showSuccessToast('Service updated successfully');
            }
        } catch (error) {
            console.log('Error updating service:', error);
        }
    }
    
    

    return (
        <div>
            <CommonForm formFields={formFields} initialValues={formData} onSubmit={handleSubmit} />
        </div>
    );
}
