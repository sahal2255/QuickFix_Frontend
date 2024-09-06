import instance from "../../utils/Axios"

export const CategoryGet=async()=>{
    try{
        const response=await instance.get('/vendor/categoryget')
        console.log(response.data)
        return response.data ||[]
    }catch(error){
        console.log('getting category error',error);
        return []
    }
}