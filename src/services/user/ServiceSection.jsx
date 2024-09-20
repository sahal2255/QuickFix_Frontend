import instance from "../../utils/Axios";


export const ServiceGet=async()=>{
    try{
        const response=await instance.get('/services')
        console.log('service response',response)
        return response.data
    }catch(error){
        console.log('error for service ',error)
    }
}