import instance from "../../utils/Axios";

export const FetchMonthlyDetails=async()=>{
    try {
        const response=await instance.get('/admin/monthlydetails')
        // console.log('response in service',response.data)
        return response.data.data
    } catch (error) {
        console.log('fetching error',error)
    }
}