import instance from "../../utils/Axios"

export const fetchServiceHistory=async()=>{
    try{
        const response=await instance.get('/servicehistory')
        return response.data
    }catch(error){
        console.log('service history fetching error',error)
    }
}