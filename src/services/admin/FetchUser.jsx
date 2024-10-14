import instance from "../../utils/Axios"

export const FetchUser=async()=>{
    try{
       const response=await instance.get('/admin/userlist')
       return response.data
    }catch(error){
        console.log('fetching user error');
        
    }
}

export const UpdateUserStatus=async(updatedUser)=>{
    console.log('update status id',updatedUser)
    try{
        const response=await instance.put('/admin/updateuserstatus',updatedUser)
        return response
    }catch(error){
        console.log('error in update user status in service section',error)
    }
}