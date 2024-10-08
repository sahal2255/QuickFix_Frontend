import React, { useState } from "react";
import CommonModal from "../../common/CommonModal";


const Coupon=()=>{
    const [showFormModal,setShowModal]=useState(false)

    const handleShowCouponAdd=()=>{
        setShowModal(true)
    }
    const handleCloseModal=()=>{
        setShowModal(false)
    }
    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg "
            onClick={handleShowCouponAdd}
            >
                Add New Coupon
            </button>


            <CommonModal open={showFormModal} onCancel={handleCloseModal}>

            </CommonModal>

        </div>
    )
}

export default Coupon 