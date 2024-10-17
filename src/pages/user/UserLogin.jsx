import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';  
import { LoginWithGoogleFunction, UserLogingIn } from '../../services/user/UserSignService';
import { showErrorToast, showSuccessToast } from '../../components/common/Toastify';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';  // Import Google OAuth

export default function UserLogin() {
    const navigate = useNavigate();

    // Function for handling Google Login Success
    const handleGoogleSuccess = async (tokenResponse) => {
        console.log('Google Login Successful', tokenResponse);
        try {
            // Make an API call to your backend to handle login with Google token
            const { credential: responseToken } = tokenResponse;
            const response=await LoginWithGoogleFunction(responseToken)
            // showSuccessToast("Login successful with Google!");
            navigate('/');
        } catch (error) {
            console.error("Error logging in with Google:", error);
            showErrorToast("Google login failed. Please try again later.");
        }
    };

    // Function for handling Google Login Failure
    const handleGoogleFailure = (error) => {
        console.error('Google Login Failed', error);
        showErrorToast('Google login failed. Please try again.');
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await UserLogingIn(values);  // Ensure values contain {email, password}
            showSuccessToast(response.message);
            navigate('/');
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

                    {/* Google Login Button */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
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
