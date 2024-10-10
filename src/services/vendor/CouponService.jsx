import instance from '../../utils/Axios'

export const AddCoupon=async(formData)=>{
    console.log('formData',formData)
    try{
        const response=await instance.post('/vendor/addcoupon',{formData})
        return response.data
    }catch(error){
        console.log('error in the adding coupon',error)
    }
}

export const CouponGet=async()=>{
    try{
        const response=await instance.get('/vendor/coupons')
        console.log(response.data)
        return response.data
    }catch(error){
        console.log('error in the coupon gettign in service',error)
    }
}

export const EditCoupon=async(editCouponId,formData)=>{
    console.log('edit coupon id',editCouponId)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    try{
        const response = await instance.put(`/vendor/editcoupon/${editCouponId}`, formData, {
            withCredentials:true
        })    
        return response.data
    }catch(error){
        console.log('error in the coupon updation ',error)
    }
}