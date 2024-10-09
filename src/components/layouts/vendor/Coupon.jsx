import React, { useEffect, useState } from "react";
import CommonModal from "../../common/CommonModal";
import CommonForm from '../../common/CommonForm';
import { AddCoupon, CouponGet } from "../../../services/vendor/CouponService";
import { showSuccessToast, showErrorToast } from "../../common/Toastify";
import CommonTable from "../../common/CommonTable";

const Coupon = () => {
    const [showFormModal, setShowModal] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editCouponId, setEditCouponId] = useState(null);

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
        setEditCouponId(rowData._id);
        setFormData({
            couponName: rowData.couponName,
            couponValue: rowData.couponValue,
            startDate: rowData.startDate,
            endDate: rowData.endDate,
        });
        console.log('coupon id', rowData._id);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (rowData) => {
        console.log('delete coupon', rowData);
        // Implement deletion logic here, if needed
    };

    const handleBlock = async (rowData) => {
        console.log('handle allow/block', rowData);
        // Implement block logic here, if needed
    };

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

    const handleSubmit = async (formData) => {
        const data = new FormData();
        data.append('couponName', formData.couponName);
        data.append('couponValue', formData.couponValue);
        data.append('startDate', formData.startDate);
        data.append('endDate', formData.endDate);

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
        { id: 'action', label: 'Action', align: 'center' },
        { id: 'delete', label: 'Delete', align: 'center' }
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
                <CommonTable columns={couponColumns} rows={coupon} onAllowClick={handleBlock} onDeleteClick={handleDelete} onEditClick={handleEdit} />
            </div>

            <CommonModal open={editMode} onCancel={handleCloseModal}>
                <CommonForm formFields={formFields} onSubmit={handleSubmit} initialValues={formData} />
            </CommonModal>
        </div>
    );
};

export default Coupon;
