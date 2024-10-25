import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { UpdateCategory } from '../../../services/admin/AdminService';
import { showSuccessToast } from '../../common/Toastify';

const CategoryEditForm = ({ open, onClose, category, setCategories }) => {
  const [form] = Form.useForm();
  
  // Prefill form fields when the component is rendered or category changes
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        categoryName: category.categoryName,
      });
    }
  }, [category, form]);

  const onFinish = async (values) => {
    try {
      console.log('Form values:', values);

      // Convert form values to a plain object
      const dataObject = {
        categoryId: category._id,
        categoryName: values.categoryName
      };
      console.log('data object',dataObject);
      
      // Convert the plain object to FormData
      const formData = new FormData();
      Object.keys(dataObject).forEach(key => {
        formData.append(key, dataObject[key]);
      });

      console.log('FormData entries:', [...formData.entries()]); // Debugging FormData

      // Pass FormData to the service
      const response = await UpdateCategory(dataObject);

      if (response) {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === category._id ? response.updatedCategory : cat
          )
        );
        showSuccessToast(response.message);
        onClose(); // Close the modal after success
      }
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <Modal
      title="Edit Category"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEditForm;
