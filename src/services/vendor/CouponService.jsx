import instance from '../../utils/Axios'

export const AddCoupon=async(formData)=>{
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    console.log('formData',formData)

    try{
        const response = await instance.post('/vendor/addcoupon', formData, {
            withCredentials: true // Include this inside the options object
        })
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


export const DeleteCoupon=async(couponId)=>{
    console.log('coupon id in the service ',couponId)
    try{
        const response=await instance.delete(`/vendor/deletecoupon/${couponId}`)
        return response.data
    }catch(error){
        console.log('error for delete coupon')
    }
}