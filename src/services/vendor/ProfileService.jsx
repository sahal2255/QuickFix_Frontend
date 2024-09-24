import instance from "../../utils/Axios";


export const VendorProfileGet=async()=>{
    try{
        const response=await instance.get('/vendor/profile')
        return response.data
    }catch(error){
        console.log('vendor profile get ',error)
    }
}