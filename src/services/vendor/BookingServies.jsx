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


export const fetchSingleBookingDetaiils=async(bookingId)=>{
    console.log('booking id in service',bookingId)
    try{
        const response=await instance.get(`/vendor/singlebooking/${bookingId}`)
        return response.data
    }catch(error){
        console.log('error in the service section ',error)
    }
}
export const updateCompletedServiceType=async(serviceTypeId)=>{
    console.log('service type id in the service',serviceTypeId)
    try {
        const response=await instance.put('/vendor/updaionofcompleted')
    } catch (error) {
        console.log('completed service type updaiton error ',error)
    }
}