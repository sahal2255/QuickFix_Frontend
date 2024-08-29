import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function UserLogin() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-black md:bg-white lg:bg-white">
            <div className="w-full max-w-lg p-8 bg-black rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-white text-center mb-10">Login</h2>

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
                </Form>
            </div>
        </div>
    );
}
