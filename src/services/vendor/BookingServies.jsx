import instance from "../../utils/Axios"

export const fetchingBookings=async()=>{
    try{
        const response=await instance.get('/vendor/bookedservices')
        console.log('response',response)
        return response.data
    }catch(error){
        console.log('error in fetching booking service in the service section',error)
    }
}