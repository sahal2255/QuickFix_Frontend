import instance from "../../utils/Axios";


export const ServiceGet=async()=>{
    try{
        const response=await instance.get('/services')
        // console.log('service response',response)
        return response.data
    }catch(error){
        console.log('error for service ',error)
    }
}

export const ServiceGetById=async(serviceId)=>{
    try{
        const response=await instance.get(`/service/${serviceId}`)
        console.log(response.data)
        return response.data
    }catch(error){
        console.log('error for the single service',error)
    }
}

// export const ServiceTypeGet=async(serviceId)=>{
//     const response
// }