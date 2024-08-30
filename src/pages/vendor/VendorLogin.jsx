import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const VendorLogin = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // Handle login logic here
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
          <Form.Item>
            <div className="flex justify-between text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Forgot Password?</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Create an Account</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VendorLogin;
