import instance from "../../utils/Axios";


export const VendorProfileGet=async()=>{
    try{
        const response=await instance.get('/vendor/profile')
        return response.data
    }catch(error){
        console.log('vendor profile get ',error)
    }
}

export const VendorProfileEdit=async(formData)=>{
    console.log('frontend service form data',formData)
    try {
        const response = await instance.put('/vendor/updateprofile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set correct headers for file upload
          },
        });
        return response.data;
      } catch (error) {
        console.log('Error during profile update:', error);
        throw error;
      }
    
}