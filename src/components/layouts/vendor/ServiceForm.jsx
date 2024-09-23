import React, { useEffect, useState } from 'react';
import CommonForm from '../../common/CommonForm';
import { CategoryGet } from '../../../services/vendor/VendorGet';
import { handleAddService } from '../../../services/vendor/AddService';

export default function ServiceForm() {
  const [categories,setCategories]=useState([])
  const [formData,setFormData]=useState({})

  useEffect(()=>{
    const fetchedCategories=async()=>{
      try{
        const fetchedServiceCategory=await CategoryGet()
        setCategories(fetchedServiceCategory)
      }catch(error){
        console.log('failed fetched category error',error)
      }
    }
    fetchedCategories()
  },[])
  
  

  const formFields = [
    {
      name: 'categoryType',
      label: 'Service Category',
      type: 'select',
      placeholder: 'Select a category',
      options: categories,
      rules: [{ required: true, message: 'Please select a category' }],
    },
    {
      name: 'serviceName',
      label: 'Service Name',
      type: 'input',
      placeholder: 'Enter service name',
      rules: [{ required: true, message: 'Please enter the service name' }],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      placeholder: 'Enter price',
      rules: [{ required: true, message: 'Please enter the price' }],
    },
    {
      name: 'duration',
      label: 'Duration (Day)',
      type: 'number',
      placeholder: 'Enter duration',
      rules: [{ required: true, message: 'Please enter the duration' }],
    },
    {
      name: 'image',
      label: 'Upload Image',
      type: 'file', // Change type to 'file'
      rules: [{ required: true, message: 'Please upload an image' }],
    },
  ];

  const handleSubmit = async (formData) => {
    const data = new FormData();
    data.append('categoryType', formData.categoryType);
    data.append('serviceName', formData.serviceName);
    data.append('price', formData.price);
    data.append('duration', formData.duration);

    if (formData.image) {
      // console.log('enter the condition',formData.image.name);
      
      data.append('file', formData.image); // Assuming file is an object
    }  else {
      console.error('No image file found');
    }
    setFormData(data)

    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    try {
      const response = await handleAddService(formData);  // Passing FormData to service
      console.log('Response after submitting service:', response);
    } catch (error) {
      console.log('Error submitting service:', error);
    }
  };

  return (
    <div>
      <CommonForm formFields={formFields} onSubmit={handleSubmit} />
    </div>
  );
}
