import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Upload, Modal } from 'antd';
import { VendorService } from '../../services/vendor/VendorService';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import OTPpage from '../../components/common/OTPpage';  // Import the OTP component

export default function VendorRegister() {
  const [isRegistered, setIsRegistered] = useState(false); 
  const [email, setEmail] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      console.log('Form data before adding values:', formData);

      for (const key in values) {
        if (key !== 'image') {
          formData.append(key, values[key]);
        }
      }

      if (values.image && values.image.length > 0) {
        formData.append('image', values.image[0].originFileObj);
      } else {
        console.log('No image file found');
      }

      console.log('Final FormData:', formData.get('image'));

      const response = await VendorService(formData);
      console.log('response', response);

      if (response.success) {
        setFormData(values)
        console.log('form values',values);
        
        setEmail(values.email);
        setIsRegistered(true); 
        setIsModalVisible(true);  
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);  
  };

  const handleCancel = () => {
    setIsModalVisible(false);  
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center text-black mx-auto mb-6">Vendor Registration</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span className="text-black">Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Email</span>}
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input placeholder="Enter your email" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Phone Number</span>}
                name="phoneNumber"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input placeholder="Enter your phone number" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Password</span>}
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password placeholder="Enter your password" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Confirm Password</span>}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm your password" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Registration ID</span>}
                name="regId"
                rules={[{ required: true, message: 'Please enter your registration ID' }]}
              >
                <Input placeholder="Enter your registration ID" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Location</span>}
                name="location"
                rules={[{ required: true, message: 'Please enter your location' }]}
              >
                <Input placeholder="Enter your location" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Image of the Center</span>}
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: 'Please upload an image of the center' }]}
              >
                <Upload 
                  name="image" 
                  beforeUpload={() => false} // Prevent automatic upload
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }} className="flex justify-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-red-500 hover:!bg-red-700 text-white"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p className="text-black">
            Already have an account?{' '}
            <Link to="/vendor/login" className="text-red-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      
      <Modal
        title="Enter OTP"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <OTPpage email={email} formData={formData} />
      </Modal>
    </div>
  );
}
