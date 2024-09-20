import Instance from "../../utils/Axios"

export const UserSignup = async (value)=>{
    console.log('enter signup service section',value)
    try{
        const response=await Instance.post('/signup',value)
        console.log('axios response ',response);
        return response.data
        
    }catch(error){
        console.log('axios response error',error)
    }
}

export const UserLogingIn = async (value)=>{
    console.log('enter the login section ');
    try{
        const response = await Instance.post('/login',value)
        console.log('login service response',response)
        return response.data
    }catch(error){
        console.log('login service error',error)
        throw error
    }
    
}

export const UserLogout = async () => {
    console.log('Entering logout service');
    try {
        const response = await Instance.post('/logout', {}, { withCredentials: true });
        console.log('Logout success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;  // Rethrow the error so it can be handled in `onLogout`
    }
};


export const UserProfile=async()=>{
    console.log('user profile service');
    try{
        const response=await Instance.get('/profile')
        console.log('response data',response.data)
        return response.data
    }catch(error){
        console.log('error',error)
        throw error;
    }
}