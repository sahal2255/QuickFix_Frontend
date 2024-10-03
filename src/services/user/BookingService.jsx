import instance from "../../utils/Axios"

export const ConfirmationOfBooking=async({centerId,selectedServiceTypesDetails,totalPrice,paymentOption,formData})=>{
    try{
        const response=await instance.post('/confirm-booking',{ 
            centerId,selectedServiceTypesDetails,totalPrice,paymentOption,formData
        },



        )
    }catch(error){
        console.log('error for confirm booking',error)
    }
}