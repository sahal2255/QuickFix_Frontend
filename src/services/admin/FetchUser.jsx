import instance from "../../utils/Axios"

export const FetchUser=async()=>{
    try{
       const response=await instance.get('/admin/userlist')
       return response.data
    }catch(error){
        console.log('fetching user error');
        
    }
}