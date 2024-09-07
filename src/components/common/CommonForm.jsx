import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function CommonForm({
  formFields = [],
  initialValues = {},
  onSubmit,
}) {
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (values) => {
    const formData = { ...values, image: file };
    onSubmit(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create New Service</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* Dynamically map through formFields and render the fields */}
        {formFields.map((field) => (
          <Form.Item
            key={field.name} // Use field.name for a unique key
            name={field.name}
            label={field.label}
            rules={field.rules}
          >
            {field.type === 'select' ? (
              <Select placeholder={field.placeholder}>
                {field.options.map((option) => (
                  <Option key={option._id} value={option.categoryName}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            ) : field.type === 'input' ? (
              <Input placeholder={field.placeholder} />
            ) : field.type === 'number' ? (
              <InputNumber min={1} placeholder={field.placeholder} className="w-full" />
            ) : field.type === 'file' ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            ) : null}
          </Form.Item>
        ))}

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
