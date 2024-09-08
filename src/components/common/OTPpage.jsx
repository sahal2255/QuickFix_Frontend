import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { OtpVerify } from '../../services/vendor/VendorService';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from './Toastify';
import { InputOTP } from 'antd-input-otp';

export default function OTPpage({ email, formData }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();  // Ant Design Form instance
  const [otp, setOtp] = useState('');  // State to hold the OTP value

  const handleFinish = async (values) => {
    try {
      const enteredOTP = otp.join('');  // Get the OTP from form values
      console.log('Entered OTP:', enteredOTP);
      const response = await OtpVerify({ email, otp: enteredOTP, formData });
      console.log('OTP verification response:', response);
      if (response.success === true) {
        showSuccessToast('Registration Success');
        navigate('/vendor/login');
      }
    } catch (error) {
      showErrorToast('OTP Verification Failed');
      console.log('OTP verification error:', error);
    }
  };

  return (
    <div className="inset-0 items-center h-64 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>
        
        {/* Ant Design Form for OTP input */}
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="otp"
            rules={[
              { 
                required: true, 
                message: 'Please enter the OTP!' 
              },
              
            ]}
          >
            <InputOTP
              autoFocus
              length={6}
              inputType="numeric"
              value={otp}
              onChange={(otpValue) => setOtp(otpValue)}  // Update state with the OTP input
              className="otp-input"
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button block htmlType="submit" type="primary">
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
