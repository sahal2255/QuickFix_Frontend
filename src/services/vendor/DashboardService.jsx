import instance from "../../utils/Axios"

export const GetMonthlyDetails=async()=>{
    try{
        const response=await instance.get('/vendor/monthlydetails')
        console.log('monthly details response',response)
        return response.data
    }catch(error){
        console.log('error in the fetching dashbaorrd error',error)
    }
}


export const FetchUsedDates=async(dates)=>{
    console.log('dates')
    const formattedStartDate = dates[0] ? dates[0].format('YYYY-MM-DD') : null;
    const formattedEndDate = dates[1] ? dates[1].format('YYYY-MM-DD') : null;

    try{
        const response=await instance.get('/vendor/bookingbydates', {
            params: {
                startDate: formattedStartDate,  // Send formatted start date
                endDate: formattedEndDate       // Send formatted end date
            }
        })
        return response.data
    }catch(error){
        console.log('error in the fetching by dates',error)
    }
}