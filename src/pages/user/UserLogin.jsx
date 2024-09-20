import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';  
import {  UserLogingIn } from '../../services/user/UserSignService';
import { showErrorToast, showSuccessToast } from '../../components/common/Toastify';


export default function UserLogin() {
    const navigate=useNavigate()


    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await UserLogingIn(values);  // Ensure values contain {email, password}
            showSuccessToast(response.message);
            navigate('/');
            console.log(response);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log('Error details:', error.response.data);
                showErrorToast(error.response.data.message);
            } else {
                console.log('Unexpected error:', error);
                showErrorToast('Login failed. Please try again later.');
            }
        }
    };
    ;
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-black md:bg-white lg:bg-white">
            <div className="w-full max-w-lg p-8 bg-black rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-white text-center mb-10">User Login</h2>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="useremail"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<AiOutlineMail className="text-gray-500 mr-2" />} 
                            placeholder="Email" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                    >
                        <Input.Password 
                            prefix={<RiLockPasswordFill className="text-gray-500 mr-2" />} 
                            placeholder="Password" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                        className='flex justify-center'
                    >
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full p-3 mx-auto rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                        >
                            Login
                        </Button> 
                    </Form.Item>

                    {/* Add Sign Up Link */}
                </Form>
                    <div className="text-center mt-4 text-gray-400">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className="text-red-500 hover:underline">
                            Sign up
                        </Link>
                    </div>
            </div>
        </div>
    );
}
