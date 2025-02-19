import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { AdminService } from "../../services/admin/AdminService";
import { showSuccessToast,showErrorToast } from "../../components/common/Toastify";
export default function AdminLogin() {
  const navigate = useNavigate();  // Use the hook inside the component

  const onFinish = async (values) => {
    try {
      console.log('Success:', values);
      const response = await AdminService(values);
      console.log('Login successful:', response);
      // In AdminLogin component
if (response && response.token) {
  document.cookie = `token=${response.token}; path=/;`; // Set token cookie
  showSuccessToast(response.message);
  navigate('/admin/dashboard'); // Navigate to dashboard
}

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;  // Extract error message
      showErrorToast(errorMessage);  // Show error message from backend
      console.error('Login failed:', errorMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="bg-black min-h-screen md:bg-white lg:bg-white flex justify-center items-center rounded-lg ">
      <div className="w-full max-w-lg h-96 bg-black p-6 rounded-xl shadow-2xl content-center">
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          Admin Login
        </h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input 
              prefix={<AiOutlineMail className="text-gray-500 mr-2" />} 
              placeholder="Email" 
              className="p-3 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password 
              prefix={<RiLockPasswordFill className="text-gray-500 mr-2" />} 
              placeholder="Password" 
              className="p-3 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 0, span: 24 }}
            className='flex justify-center'
          >
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full p-3 mx-auto rounded-lg bg-red-600 text-white font-semibold hover:!bg-red-700"
            >
              Login
            </Button> 
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
