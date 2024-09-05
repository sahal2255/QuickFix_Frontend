import Instance from "../../utils/Axios";
export const RefreshToken = async ()=>{
    try{
        const response = await Instance.post('/verify-token',{}, { withCredentials: true })
        console.log('access token creation success',response);
        return response
        
    }catch(error){
        console.log('access token creation service',error);
        
    }
}