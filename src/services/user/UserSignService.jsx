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
    }
    
}