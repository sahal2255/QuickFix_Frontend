import React, { useEffect, useState } from "react";
import CommonModal from "../../common/CommonModal";
import CommonForm from '../../common/CommonForm';
import { AddCoupon, CouponGet, DeleteCoupon, EditCoupon } from "../../../services/vendor/CouponService";
import { showSuccessToast, showErrorToast } from "../../common/Toastify";
import CommonTable from "../../common/CommonTable";
import dayjs from 'dayjs'
import { Form } from 'antd';
import EditCouponForm from './EditCouponForm'

const Coupon = () => {
    const [showFormModal, setShowModal] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [formData, setFormData] = useState({});
    const [editForm,setEditForm]=useState({})
    const [editMode, setEditMode] = useState(false);
    const [editCouponId, setEditCouponId] = useState(null);
    const [form] = Form.useForm();


    const handleShowCouponAdd = () => {
        setEditMode(false);
        setFormData({});
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditMode(false);
    };
    const handleEdit = (rowData) => {
        const couponId = rowData._id;
        console.log('coupon id in the component:', couponId);
        
        // Set state for editing mode and coupon ID
        setEditMode(true);
        setEditCouponId(couponId);

        // Update the state with form data for the edit
        const editFormData = {
            couponName: rowData.couponName,
            couponValue: rowData.couponValue,
            startDate: dayjs(rowData.startDate),  // Convert start date to dayjs object
            endDate: dayjs(rowData.endDate),      // Convert end date to dayjs object
        };

        setEditForm(editFormData);
        console.log('Form data to set in the state:', editFormData);
        // setShowModal(true); // Open modal for editing
    };

    const handleEditSubmit = async (formValues) => {
        try {
            console.log('Attempting to retrieve form values before submission...');
            const formData = new FormData();
            formData.append('couponName', formValues.couponName);
            formData.append('couponValue', formValues.couponValue);
            formData.append('startDate', formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : '');
            formData.append('endDate', formValues.endDate ? formValues.endDate.format('YYYY-MM-DD') : '');

            // Log the new formData
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await EditCoupon(editCouponId, formData);
            console.log('Response from EditCoupon API:', response);
            showSuccessToast(response.message); // Show success message
            // setShowModal(false);
            setEditMode(false) // Close the modal
            fetchCoupon(); // Re-fetch the coupons to update the table
            
        } catch (error) {
            console.log('Error in editing coupon:', error);
            showErrorToast('Error updating coupon'); // Show error message
        }
    };

    
    const handleDelete = async (rowData) => {
        console.log('delete coupon', rowData);
        const couponId=rowData._id
        console.log(couponId)
        try{
            const response=await DeleteCoupon(couponId)
            showSuccessToast(response.message)
            fetchCoupon()
        }catch(error){
            console.log('error in the delete section',error)
        }
    };

    
    const handleSubmit = async (formDetails) => {
        const data = new FormData();
        data.append('couponName', formDetails.couponName);
        data.append('couponValue', formDetails.couponValue);
        data.append('startDate', formDetails.startDate);
        data.append('endDate', formDetails.endDate);
        
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
            const response = await AddCoupon(data);
            console.log(response);
            showSuccessToast(response.message);
            setShowModal(false);
            // Re-fetch the coupons to update the table
            fetchCoupon();
        } catch (error) {
            console.log('error in the component for adding new coupon', error);
        }
    };

    const fetchCoupon = async () => {
        try {
            const response = await CouponGet();
            console.log('response', response);
            setCoupon(response);
        } catch (error) {
            console.log('error in component for fetching coupons');
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    const couponColumns = [
        { id: 'couponName', label: 'Coupon Name' },
        { id: 'couponValue', label: 'Coupon Value' },
        { id: 'startDate', label: 'Coupon Start Date' },
        { id: 'endDate', label: 'Coupon End Date' },
        { id: 'edit', label: 'Edit', align: 'center' },
        { id: 'delete', label: 'Delete', align: 'center' }
    ];
    const formFields = [
        {
            name: 'couponName',
            label: 'Coupon Name',
            type: 'input',
            placeholder: 'Enter Coupon Name',
            rules: [{ required: true, message: 'Please enter a coupon name' }]
        },
        {
            name: 'couponValue',
            label: 'Coupon Value',
            type: 'input',
            placeholder: 'Enter Coupon value',
            rules: [{ required: true, message: 'Please enter a coupon value in percentage' }]
        },
        {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            placeholder: 'Enter Coupon Start Date',
            rules: [{ required: true, message: 'Please enter a coupon Start Date' }]
        },
        {
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            placeholder: 'Enter Coupon End Date',
            rules: [{ required: true, message: 'Please enter a coupon End Date' }]
        }
    ];

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                onClick={handleShowCouponAdd}
            >
                Add New Coupon
            </button>
            <CommonModal open={showFormModal} onCancel={handleCloseModal}>
                <CommonForm formFields={formFields} onSubmit={handleSubmit} initialValues={formData} />
            </CommonModal>

            <div className="mt-6 bg-slate-800">
                <CommonTable columns={couponColumns} rows={coupon}  onDeleteClick={handleDelete} onEditClick={handleEdit} />
            </div>

            <CommonModal open={editMode} onCancel={handleCloseModal}>
                <EditCouponForm editForm={editForm} onSubmit={handleEditSubmit}/>
            </CommonModal>
        </div>
    );
};

export default Coupon;
