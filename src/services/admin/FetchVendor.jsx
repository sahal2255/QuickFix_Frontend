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

