// EditCouponForm.jsx

import React from 'react';
import CommonForm from '../../common/CommonForm';
import { Form } from 'antd';
import dayjs from 'dayjs';

const EditCouponForm = ({ editForm, onSubmit, onCancel }) => {
    const formFields = [
        {
            name: 'couponName',
            label: 'Coupon Name',
            type: 'input',
            placeholder: 'Enter Coupon Name',
            rules: [{ required: true, message: 'Please enter a coupon name' }],
        },
        {
            name: 'couponValue',
            label: 'Coupon Value',
            type: 'input',
            placeholder: 'Enter Coupon Value',
            rules: [{ required: true, message: 'Please enter a coupon value in percentage' }],
        },
        {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            placeholder: 'Enter Coupon Start Date',
            rules: [{ required: true, message: 'Please enter a coupon Start Date' }],
            initialValue: dayjs(editForm.startDate), // Convert to dayjs object for initial value
        },
        {
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            placeholder: 'Enter Coupon End Date',
            rules: [{ required: true, message: 'Please enter a coupon End Date' }],
            initialValue: dayjs(editForm.endDate), // Convert to dayjs object for initial value
        },
    ];

    return (
        <CommonForm
            formFields={formFields}
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialValues={editForm} 
        />
    );
};

export default EditCouponForm;
