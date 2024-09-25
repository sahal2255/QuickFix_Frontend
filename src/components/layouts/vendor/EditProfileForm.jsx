import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Checkbox, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { VendorProfileEdit } from '../../../services/vendor/ProfileService';

const amenitiesOptions = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'Cafe', value: 'cafe' },
  { label: 'Washroom', value: 'washroom' },
  { label: 'Restroom', value: 'restroom' },
];

export default function EditProfileForm({ onCancel, initialData,onUpdateSuccess }) {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null); // Storing the image file

  useEffect(() => {
    form.setFieldsValue(initialData); // Pre-fill the form with existing vendor data
  }, [form, initialData]);


  const onFinish = async (values) => {
    console.log('clicking submit button');
    
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]); // Add form fields to FormData
    });
    if (imageFile) {
      formData.append('image', imageFile); // Add the image file if it exists
    }

    try {
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        
      const response = await VendorProfileEdit(formData); // Pass formData to the API service
      console.log('Updated Profile:', response);
      onUpdateSuccess(response.vendor)
    } catch (error) {
      console.log('Error during profile update:', error);
    }
  };

  const onImageChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      setImageFile(info.file.originFileObj); // Store the actual image file
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Registration ID"
            name="regId"
            rules={[{ required: true, message: 'Please enter your registration ID' }]}
          >
            <Input placeholder="Enter your registration ID" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter your location' }]}
          >
            <Input placeholder="Enter your location" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Image of the Center"
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => (e.file ? e.file : null)}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={onImageChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Amenities"
            name="amenities"
          >
            <Checkbox.Group options={amenitiesOptions} />
          </Form.Item>
        </Col>
      </Row>

      <div className="flex justify-end">
        <Button onClick={onCancel} className="mr-2">Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
