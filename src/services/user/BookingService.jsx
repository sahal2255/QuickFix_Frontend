import instance from "../../utils/Axios"

export const ConfirmationOfBooking = async ({
    centerId,
    selectedServiceTypesDetails,
    totalPrice,
    paymentAmount,
    paymentOption,
    paymentMethod,
    OrderAmount,
    formData
}) => {
    console.log('payment method in service section',OrderAmount)
    try {
        const response = await instance.post('/confirm-booking', {
            centerId,
            selectedServiceTypesDetails,
            totalPrice,
            paymentAmount,
            paymentMethod,
            paymentOption,
            OrderAmount,
            formData // Form data including payment details
        });

        console.log('response', response);
        return response; // Ensure you return the response correctly
    } catch (error) {
        console.log('error for confirm booking', error);
    }
};


export const AmountSend=async({paymentAmount})=>{
    try{
        const response=await instance.post('/razorpaypayment',{
            paymentAmount
        })
        console.log('response.data',response.data)
        return response.data
    }catch(error){
        console.log('error',error)
    }
}