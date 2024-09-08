import React,{useState} from 'react'
import { OtpVerify } from '../../services/vendor/VendorService';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast,showErrorToast } from './Toastify';
export default function OTPpage({email,formData }) {
    const navigate=useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(''));
    console.log('passed email',email);
    console.log('passed form data',formData);
    
    
    const handleChange = (element, index) => {
      if (isNaN(element.value)) return;
  
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    };

    const confirmOTP = async () => {
        try {
          const enteredOTP = otp.join('');
          console.log('Entered OTP:', enteredOTP);
          const response = await OtpVerify({email, otp: enteredOTP,formData });
          console.log('OTP verification response:', response);
          if(response.success===true){
                showSuccessToast('Registration Success')
                navigate('/vendor/login')
            }    
        } catch (error) {
        showErrorToast('OTP Verification Failed');
          console.log('OTP verification error:', error);
        }
      };
    
  
    return (
      <div className="inset-0  items-center h-64 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Enter OTP
          </h2>
          <div className="flex space-x-2">
            {otp.map((data, index) => (
              <input
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            className="mt-6 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            onClick={confirmOTP}
          >
            Verify OTP
          </button>
        </div>
      </div>
    )
}
