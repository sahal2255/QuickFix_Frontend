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