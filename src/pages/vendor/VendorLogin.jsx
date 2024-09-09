import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { vendorLogin } from '../../services/vendor/VendorService';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { showErrorToast, showSuccessToast } from '../../components/common/Toastify';

export default function VendorLogin() {
  const navigate=useNavigate()
  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
      const response=await vendorLogin(values)
      console.log('login succes ',response);
      if(response.success){
        showSuccessToast(response.message)
        navigate('/vendor/dashboard')
      }
      
    }catch (error) {
      if (error.response && error.response.status === 403) {
        showErrorToast(error.response.data.message); // Show the under verification message
      } else {
        showErrorToast(error.response?.data?.message || 'Login failed. Please try again.');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Vendor Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email!' },
            ]}
          >
            <Input
              placeholder="Email"
              className="rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              className="rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
              size="large"
            >
              Log In
            </Button>
          </Form.Item>
          
        </Form>
        <Form.Item>
          <div className="flex justify-between text-sm">
            {/* <a href="#" className="text-indigo-600 hover:text-indigo-700">Forgot Password?</a> */}
            <Link to="/vendor/register" className="text-indigo-600 hover:text-indigo-700">
              Create an Account
            </Link>
          </div>
        </Form.Item>
      </div>
    </div>
  );
};

 VendorLogin;
