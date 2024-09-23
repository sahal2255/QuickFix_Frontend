import instance from "../../utils/Axios";

export const handleAddService = async (data) => {
    console.log('Found the add service in service section', data);
  
    try {
      const response = await instance.post('/vendor/addService', data, {
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

  export const handleGetServices=async()=>{
    console.log('found the frontend get service router')
    try{
      const response=await instance.get('/vendor/serviceget')
      return response.data
    }catch(error){
      console.log('frontend router error')
    }
  }