import React, { useEffect, useState } from 'react';
import CommonForm from '../../common/CommonForm';
import { CategoryGet } from '../../../services/vendor/VendorGet';
import { handleAddService } from '../../../services/vendor/VendorService';

export default function ServiceForm() {
  const [categories,setCategories]=useState([])

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
      type: 'upload',
      rules: [{ required: true, message: 'Please upload an image' }],
    },
  ];

  const handleSubmit = async(formData) => {
    console.log('Form Data:', formData);
    try{
      const response=await handleAddService()
      console.log('response of add data',response);
      
    }catch(error){

    }
  };

  return (
    <div>
      <CommonForm formFields={formFields} onSubmit={handleSubmit} />
    </div>
  );
}
