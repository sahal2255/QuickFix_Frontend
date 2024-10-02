import instance from "../../utils/Axios"

export const ConfirmationOfBooking=async({centerId,selectedServiceTypesDetails,totalPrice})=>{
    console.log('hitting to the confirm booking service section')
    console.log('cneter id in service section',centerId)
    console.log('selected details in service section',selectedServiceTypesDetails)
    console.log('total price in service section',totalPrice)
    try{
        const response=await instance.post('/confirm-booking',{ 
            centerId,selectedServiceTypesDetails,totalPrice
        },
        


        )
    }catch(error){
        console.log('error for confirm booking',error)
    }
}