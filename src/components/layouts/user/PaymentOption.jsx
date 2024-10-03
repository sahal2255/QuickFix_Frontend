import React, { useState } from 'react';

export default function PaymentOption({ onSelectPayment }) {
  const [selectedOption, setSelectedOption] = useState('full'); // Default to 'full'

  const handlePaymentSelect = (option) => {
    setSelectedOption(option);
    onSelectPayment(option); // Send selected payment option to the parent component
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Payment Option:</h3>
      <div className="flex space-x-4">
        {/* Full Payment Option */}
        <div
          onClick={() => handlePaymentSelect('full')}
          className={`cursor-pointer border rounded-lg px-4 py-2 text-center transition ${
            selectedOption === 'full' 
              ? 'border-blue-500 bg-blue-100' 
              : 'border-gray-300'
          }`}
        >
          <p className="text-lg font-medium">Full Payment</p>
        </div>

        {/* Advance Payment Option */}
        <div
          onClick={() => handlePaymentSelect('advance')}
          className={`cursor-pointer border rounded-lg px-4 py-2 text-center transition ${
            selectedOption === 'advance' 
              ? 'border-blue-500 bg-blue-100' 
              : 'border-gray-300'
          }`}
        >
          <p className="text-lg font-medium">Advance Payment</p>
        </div>
      </div>
    </div>
  );
}
