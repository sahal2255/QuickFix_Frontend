import React from 'react';
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function UserSignUp() {
    return (
        <div className='bg-black min-h-screen md:bg-white lg:bg-white flex justify-center items-center rounded-lg'>
            <div className='w-full max-w-lg h-full bg-black p-5 rounded-xl shadow-xl content-center min-h-[600px]'>
                <h2 className='text-2xl font-bold text-white text-center mb-10'>User SignUp</h2>
                
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
                        name="username"
                        rules={[
                            { required: true, message: 'Please enter your Name!' },
                        ]}
                        className='px-10'
                    >
                        <Input 
                            prefix={<CgProfile className="text-gray-500 mr-2" />} 
                            placeholder="Name" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="useremail"
                        rules={[
                            { required: true, message: 'Please enter your Email' },
                        ]}
                        className='px-10'
                    >
                        <Input 
                            prefix={<AiOutlineMail className="text-gray-500 mr-2" />} 
                            placeholder="Email" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="phonenumber"
                        rules={[
                            { required: true, message: 'Please enter your phone Number' },
                        ]}
                        className='px-10'
                    >
                        <Input 
                            prefix={<FaPhoneAlt className="text-gray-500 mr-2" />} 
                            placeholder="Phone Number" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                        ]}
                        className='px-10'
                    >
                        <Input.Password 
                            prefix={<RiLockPasswordFill className="text-gray-500 mr-2" />} 
                            placeholder="Password" 
                            className="p-3 rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                        className='px-10'
                    >
                        <Input.Password 
                            prefix={<RiLockPasswordFill className="text-gray-500 mr-2" />} 
                            placeholder="Confirm Password" 
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
                            className="w-full p-3 mx-auto rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                        >
                            Sign Up
                        </Button> 
                    </Form.Item>
                </Form>
                <div className="text-center mt-4 text-gray-400">
                        <span>You have an account? </span>
                        <Link to="/login" className="text-red-500 hover:underline">
                            Login
                        </Link>
                    </div>
            </div>
        </div>
    );
}
