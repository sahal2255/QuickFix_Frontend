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

export const DateByFetching = async (dates) => {
    console.log('dates in service', dates);  

    const formattedStartDate = dates[0] ? dates[0].format('YYYY-MM-DD') : null;
    const formattedEndDate = dates[1] ? dates[1].format('YYYY-MM-DD') : null;

    try {
        const response = await instance.get('/admin/datebybooking', {
            params: {
                startDate: formattedStartDate,  // Send formatted start date
                endDate: formattedEndDate       // Send formatted end date
            }
        });
        console.log('response for the date by fetching', response);
    } catch (error) {
        console.log('error in the fetching date by booking', error);
    }
};


