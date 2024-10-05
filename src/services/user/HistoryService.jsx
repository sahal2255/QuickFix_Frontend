import instance from "../../utils/Axios"

export const fetchServiceHistory=async()=>{
    try{
        const response=await instance.get('/servicehistory')
        return response.data
    }catch(error){
        console.log('service history fetching error',error)
    }
}

export const ViewServiceDetails=async (bookingId)=>{    
    try{
        const response=await instance.get(`/viewsingledetails/${bookingId}`)
        return response.data
    }catch(error){
        console.log('view service error frontend',error)
    }
}

export const CancelService=async(bookingId)=>{
    try{
        const response=await instance.put(`/cancelservice/${bookingId}`)
        console.log(response)
        return response
    }catch(error){
        console.log('service cancel error',error)
    }
}