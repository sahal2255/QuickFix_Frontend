import instance from "../../utils/Axios"

export const fetchServiceHistory=async()=>{
    try{
        const response=await instance.get('/servicehistory')
        return response.data
    }catch(error){
        console.log('service history fetching error',error)
    }
}

export const ViewServiceDetails=async (bookingId)=>{    
    try{
        const response=await instance.get(`/viewsingledetails/${bookingId}`)
        return response.data
    }catch(error){
        console.log('view service error frontend',error)
    }
}

export const CancelService=async(bookingId)=>{
    try{
        const response=await instance.put(`/cancelservice/${bookingId}`)
        console.log(response)
        return response
    }catch(error){
        console.log('service cancel error',error)
    }
}


export const BalanceCheck=async({bookingId,balancePrice})=>{
    console.log('booking id in to the service section',bookingId)
    console.log('balance amount in the service section',balancePrice)
    try{
        const response=await instance.post('/balanceconfirm',{bookingId,balancePrice})
        console.log('response.data',response.data)
        return response.data
    }catch(error){
        console.log('error in the service section for the balance checking',error)
    }
}

export const BalancePayConfirm=async({bookingId,balancePrice})=>{
    try{
        const response=await instance.post('/payedbalanceamount',{bookingId,balancePrice})
        console.log('response in service',response)
        return response.data
    }catch(error){
        console.log('error in the service section for the ',error)
    }
}