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
  
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  try {
    const response = await Instance.post('/admin/categoryAdd', formData, {
      withCredentials:true

    });
    console.log('Category added successfully', response);
  } catch (error) {
    console.error('Error adding category', error.response || error);
  }
};
