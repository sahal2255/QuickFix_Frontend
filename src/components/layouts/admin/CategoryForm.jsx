import React from 'react';
import { Button, Form, Input } from 'antd';
import { AddCategory } from '../../../services/admin/AdminService';

export default function CategoryForm() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
  
    console.log('Final FormData:', formData.get('categoryName'));
  
    try {
      const response = await AddCategory(formData);  // Send FormData directly
      console.log('Form submitted successfully:', response);
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
