import instance from "../../utils/Axios"

export const GetMonthlyDetails=async()=>{
    try{
        const response=await instance.get('/vendor/monthlydetails')
    }catch(error){
        console.log('error in the fetching dashbaorrd error',error)
    }
}