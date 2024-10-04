import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationOfBooking, AmountSend } from '../../../services/user/BookingService';
import OtpInput from 'react-otp-input'; // Correct import for react-otp-input
import {useRazorpay} from 'react-razorpay';

export default function ConfirmForm({
  centerId,
  totalPrice,
  paymentAmount,
  selectedServiceTypesDetails,
  paymentMethod,
}) {
  const [formData, setFormData] = useState();
  const {error,isLoading,Razorpay}=useRazorpay()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    setFormData(data);

    try {
      console.log('Submitting booking confirmation');

      // Send the payment amount to the backend to create a Razorpay order
      const sendPayment = await AmountSend({ paymentAmount });
      console.log('send payment', sendPayment);
      console.log('payment method in form',paymentMethod)

      // Assuming sendPayment contains the 'order' object
      const { order } = sendPayment; // Destructure the order from the response

      // Initialize Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Fetch key from environment variables
        amount: order.amount, // Amount in paise
        currency: order.currency, // Currency type
        name: 'Quick Fix',
        description: 'Payment for services',
        order_id: order.id, // Razorpay order ID
        handler: async function (response) {
          console.log('Payment Success:', response);
          // Confirm the booking after payment success
          const bookingResponse = await ConfirmationOfBooking({
            centerId,
            selectedServiceTypesDetails,
            totalPrice,
            paymentMethod,
            paymentAmount,
            OrderAmount:order.amount,
            paymentOption: 'Razorpay',
            formData: {
                ...data,
                paymentId: response.razorpay_payment_id, // Include payment ID in formData
                orderId: response.razorpay_order_id, // Include order ID if needed
                paymentSignature: response.razorpay_signature // Include signature if needed
            }
        });
          console.log('Booking confirmation response:', bookingResponse);
        },
        prefill: {
          name: data.ownerName,
          email: data.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout modal
      const rzp =new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error with booking confirmation or payment:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Confirm Booking Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Owner Name</label>
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
            {...register('vehicleReg', {
              required: 'Vehicle registration number is required',
            })}
          />
          {errors.vehicleReg && (
            <p className="text-red-500 text-xs mt-1">{errors.vehicleReg.message}</p>
          )}
        </div>

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

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Confirm and Pay
        </button>
      </form>
    </div>
  );
}
