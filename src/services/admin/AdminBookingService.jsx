import instance from "../../utils/Axios"
export const FetchBooking=async()=>{
    try{
        const response=await instance.get('/admin/bookingdetails')
        return response.data
    }catch(error){
        console.log('error fetching bookings',error)
    }
}