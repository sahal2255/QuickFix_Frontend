import Instance from "../../utils/Axios";

export const VendorService = async (formData) => {
  try {
    console.log('axios request');
    const response = await Instance.post('/vendor/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('vendor res', response);
    return response.data;  
  } catch (error) {
    console.log('error', error);
    throw error;  // Rethrow error if you want to handle it in the component
  }
};
export const OtpVerify = async ({ email,otp }) => {
  try {
    console.log('OTP verification request');
    const response = await Instance.post('/verify-otp', { email,otp });
    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.log('OTP verification error:', error);
    throw error;  // Rethrow error if you want to handle it in the component
  }
};
