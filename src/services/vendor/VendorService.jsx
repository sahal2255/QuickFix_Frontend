import Instance from "../../utils/Axios";

export const VendorService = async (formData) => {
  try {
    console.log('axios request',formData);
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

export const OtpVerify = async ({ email, otp, formData }) => {
  try {
    // Add email and OTP to FormData
    const data = new FormData();
    data.append('email', email);
    data.append('otp', otp);

    // Append formData fields except the file
    for (const key in formData) {
      if (key !== 'image') {
        data.append(key, formData[key]);
      }
    }

    // Append the file
    if (formData.image) {
      data.append('image', formData.image);
    }

    // Make the request with proper content type
    const response = await Instance.post('/vendor/verify-otp', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.log('OTP verification error:', error);
    throw error;
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


export const handleAddService = async (data) => {
  console.log('Found the add service in service section', data);

  try {
    const response = await Instance.post('/vendor/addService', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    console.log('Response of the service section:', response);
    return response.data;
  } catch (error) {
    console.error('Add service error in service section:', error);
    throw error; // Optionally rethrow the error to handle it in the caller
  }
}
