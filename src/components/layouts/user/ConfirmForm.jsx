import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationOfBooking } from '../../../services/user/BookingService';

export default function ConfirmForm({centerId,totalPrice,
    paymentAmount,selectedServiceTypesDetails,paymentOption}) {
    const [formData,setFormData]=useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log('Form Data:', data);
    setFormData(data)
    console.log('centerid',centerId);
    console.log('servicetype',selectedServiceTypesDetails)
    console.log('totalprice',totalPrice)
    console.log('payment ',paymentAmount)
    console.log('paymentoption',paymentOption)
    try{
        const confirmation=await ConfirmationOfBooking({centerId,totalPrice,paymentAmount,selectedServiceTypesDetails,paymentOption,formData})
    }catch(error){
        console.log('error for confirmation details')
    }
    
    
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Confirm Booking Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Owner Name
          </label>
          <input
            type="text"
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.ownerName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('ownerName', { required: 'Owner name is required' })}
          />
          {errors.ownerName && (
            <p className="text-red-500 text-xs mt-1">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Registration Number
          </label>
          <input
            type="text"
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.vehicleReg ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('vehicleReg', { required: 'Vehicle registration number is required' })}
          />
          {errors.vehicleReg && (
            <p className="text-red-500 text-xs mt-1">{errors.vehicleReg.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
