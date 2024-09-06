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
    throw error;  
  }
};

export const OtpVerify = async ({ email,otp,formData }) => {
  try {
    const numericOtp = parseInt(otp, 10);
    console.log('OTP verification request');
    const response = await Instance.post('/vendor/verify-otp', { email,otp:numericOtp ,formData});
    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.log('OTP verification error:', error);
    throw error;  // Rethrow error if you want to handle it in the component
  }
};

export const vendorLogin=async(values)=>{
  console.log('enter login serveice',values)
  
  
  try{
    const response=await Instance.post('/vendor/login',values,{
      withCredentials:true,
    })
    console.log('login success',response);
    return response.data
  }catch(error){
    console.error('Error logging in:', error.response?.data || error.message);
        throw error;
  }
}

export const handleLogout = async()=>{
  try{
    console.log('enter the logoaut serve');
    const response = await Instance.post('/vendor/logout')
    console.log('Logout Success',response);
    
  }catch(error){
    console.error('Error during logout:', error.response?.data || error.message);
        throw error;
  }
}


export const handleAddService = async (values) =>{
  console.log('found the add service in service section')
  try{
    const response=await Instance.post('/')
  }catch(error){
    console.log('add service error in service section');
    
  }
}