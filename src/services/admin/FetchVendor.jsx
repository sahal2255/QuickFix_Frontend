import instance from "../../utils/Axios";

export const FetchVendors=async()=>{
    try{
        const response=await instance.get('/admin/vendorlist')
        console.log('getted service vendor',response)
        return response.data
    }catch(error){
        console.log('fetching vendors error',error);
        
    }
}

export const updateVendorStatus=async(vendor)=>{
    try{
        console.log('update for the vendor status',vendor._id)
        const response=await instance.put('/admin/updatevendorstatus',{
            vendorId: vendor._id, // Send vendor ID
            isEnabled:vendor.isEnabled       // Set the status
        })
        console.log('recieved response for the vendor updation');
        return response.data
        
    }catch(error){
        console.log('error for the update vendor status');
        
    }
}