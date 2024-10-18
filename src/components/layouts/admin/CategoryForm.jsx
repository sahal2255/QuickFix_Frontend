import React from 'react';
import { Button, Form, Input } from 'antd';
import { AddCategory } from '../../../services/admin/adminService';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../../common/Toastify';

export default function CategoryForm({setCategories,closeModal}) {
  const navigate=useNavigate()
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    const { categoryName } = values;

    const formData = new FormData();
    formData.append('categoryName', categoryName);

    console.log('Final FormData:', formData.get('categoryName'));

    try {
      const response = await AddCategory(formData);  // Send FormData directly
      console.log('category added successfully:', response);
      if (response) {
        console.log('Category added successfully:', response);
        setCategories((prevCategories) => [...prevCategories,response.newCategory])
        showSuccessToast(response.message)
        form.resetFields();
        closeModal()
        navigate('/admin/service-category')
      } else {
        console.warn('Failed to add category: response was undefined');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        {/* Category Name */}
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[
            { required: true, message: 'Please input the category name!' },
          ]}
        >
          <Input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-red-500 hover:bg-red-700 text-white w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
