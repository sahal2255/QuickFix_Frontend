import React, { useEffect, useState } from "react";
import CommonModal from "../../common/CommonModal";
import CommonForm from '../../common/CommonForm'
import { AddCoupon, CouponGet } from "../../../services/vendor/CouponService";
import { showSuccessToast,showErrorToast } from "../../common/Toastify";
import CommonTable from "../../common/CommonTable";
const Coupon=()=>{
    const [showFormModal,setShowModal]=useState(false)
    const [coupon,setCoupon]=useState([])
    const [formData,setFormData]=useState({})

    const handleShowCouponAdd=()=>{
        setShowModal(true)
    }
    const handleCloseModal=()=>{
        setShowModal(false)
    }

    const formFields=[
        {
            name:'couponName',
            label:'Coupon Name',
            type:'input',
            placeholder:'Enter Coupn Name',
            rules:[{required:true,message:'Please enter a coupon name'}]
        },
        {
            name:'couponValue',
            label:'Coupon Value',
            type:'input',
            placeholder:'Enter Coupn value',
            rules:[{required:true,message:'Please enter a coupon value in percentage'}]
        },
        {
            name:'startDate',
            label:'Start Date',
            type:'date',
            placeholder:'Enter Coupn Start Date',
            rules:[{required:true,message:'Please enter a coupon Start Date'}]
        },
        {
            name:'endDate',
            label:'End Date',
            type:'date',
            placeholder:'Enter Coupn End Date',
            rules:[{required:true,message:'Please enter a coupon End Date'}]
        }
    ]

    const handleSubmit=async(formData)=>{
        const data=new FormData();
        data.append('couponName',formData.couponName)
        data.append('couponValue',formData.couponValue)
        data.append('startDate',formData.startDate)
        data.append('endDate',formData.endDate)

        setFormData(data)

        for (const pair of data.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }
          try{
            const response=await AddCoupon(formData)
            console.log(response)
            showSuccessToast(response.message)
            setShowModal(false)

          }catch(error){
            console.log('error in the component for adding new coupon',error)
          }
    }

    useEffect(()=>{
        const fetchCoupon=async()=>{
            try{
                const response=await CouponGet()
                return response
            }catch(error){
                console.log('error in component for fetching coupons')
            }
        }
        fetchCoupon()
    },[])
    const couponColumns=[
        {id: 'couponName' , label:'Coupon Name'},
        {id: 'couponValue' , label:'Coupon Value'},
        {id: 'startDate' , label:'Coupon Start Date'},
        {id: 'endDate' , label:'Coupon End Date'},

    ]
    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg "
            onClick={handleShowCouponAdd}
            >
                Add New Coupon
            </button>
            <CommonModal open={showFormModal} onCancel={handleCloseModal}>
                <CommonForm formFields={formFields} onSubmit={handleSubmit}/>
            </CommonModal>

            <div className=" mt-6 bg-slate-800  ">
            <CommonTable columns={couponColumns}/> 
            </div>

        </div>
    )
}

export default Coupon 