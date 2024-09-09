import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Upload, Modal,Checkbox, Radio  } from 'antd';
import { VendorService } from '../../services/vendor/VendorService';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import OTPpage from '../../components/common/OTPpage';
const amenitiesOptions = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'Cafe', value: 'cafe' },
  { label: 'Washroom', value: 'washroom' },
  { label: 'Restroom', value: 'restroom' },
];
export default function VendorRegister() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [showAmenities, setShowAmenities] = useState(false);
  const onFinish = async (values) => {
    try {
      const formData = new FormData(); // FormData object
      console.log('Form data before adding values:', formData);
      if (values.addAmenities === 'no') {
        values.amenities = []; // Ensure amenities is an empty array
      }
      // Loop over form values except the image field
      for (const key in values) {
        if (key !== 'image') {
          formData.append(key, values[key]); // Append each key-value pair
        }
      }
      console.log('frontend form data');
      
  
      // Handling the file input for 'image'
      if (values.image) {
        formData.append('image', values.image); // Appending the file directly
      } else {
        console.log('No image file found');
      }
  
      // Logging to check the final formData contents
      console.log('Final FormData:', formData.get('image'));
  
      const response = await VendorService(formData); // Submit the formData
      console.log('response', response);
  
      // Check if the response is successful
      if (response.success) {
        setFormData(values);
        console.log('form values', values);
  
        setEmail(values.email);
        setIsRegistered(true);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log('error', error); // Handle any error
    }
  };
  

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleAmenitiesChange = (e) => {
    setShowAmenities(e.target.value === 'yes'); // Show amenities if they select "yes"
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
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { pattern: /^[A-Za-z\s]+$/, message: 'Name must contain only letters' }
                ]}
              >
                <Input placeholder="Enter your name" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                  { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: 'Email must end with @gmail.com' }
                ]}
              >
                <Input placeholder="Enter your email" className="bg-white text-black" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Phone Number</span>}
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits' }
                ]} 
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
                valuePropName="file"
                getValueFromEvent={(e) => e.target.files[0]}
                rules={[{ required: true, message: 'Please upload an image of the center' }]}
              >
                <Input type="file" accept=".jpg,.jpeg,.png" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-black">Do you offer any amenities?</span>}
                name="addAmenities"
                rules={[{ required: true, message: 'Please select an option' }]}
              >
                <Radio.Group onChange={handleAmenitiesChange}>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Conditionally render amenities options based on vendor's choice */}
            {showAmenities && (
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="text-black">Select Amenities</span>}
                  name="amenities"
                >
                  <Checkbox.Group options={amenitiesOptions} />
                </Form.Item>
              </Col>
            )}
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
