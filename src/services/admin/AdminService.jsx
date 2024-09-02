import Instance from "../../utils/Axios";

export const AdminService = async (values) => {
    try {
        console.log('Axios Request')
        console.log(Instance);
        

        const response = await Instance.post('/admin/login', values, {
            withCredentials: true
        });
        console.log('Response from server:', response);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};
export const handleLogout = async () => {
    try {
        const response = await Instance.post('/admin/logout'); // Use the Axios instance for logout
        console.log('Logout successful:', response);
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
        throw error;
    }
};



export const AddCategory = async (formData) => {
  console.log('Service section: Logging formData entries:');
  
  // Log each entry in the FormData
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  try {
    const response = await Instance.post('/admin/categoryAdd', formData, {
      withCredentials: true, 
      headers: {
        'Content-Type': 'multipart/form-data', // Important to set the correct Content-Type
      },
    });
    if (response) {
      console.log('Category added successfully', response);
      return response.data; // Ensure to return the relevant part of the response
    } else {
      console.warn('Received undefined response from server');
      return null;
    }
    console.log('Category added successfully', response);
  } catch (error) {
    console.error('Error adding category', error.response || error);
  }
};

export const fetchCategories=async()=>{
  try{
    const response=await Instance.get('/admin/categories')
    return response.data
  }
  catch(error){
    console.log('fetching error',error);
    
  }
}


export const deleteCategory = async (categoryId) => {
  console.log('Attempting to delete category with ID:', categoryId);
  try {
    const response = await Instance.delete(`/admin/deleteCategory/${categoryId}`, {
      withCredentials: true,
    });
    console.log('Response from server:', response);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error.response || error);
    throw error;
  }
};
