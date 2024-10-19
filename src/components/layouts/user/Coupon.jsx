import React from 'react';

const Coupon = ({ couponCode, discount, expiryDate, selected, onSelect }) => {
  return (
    <div
      className={`bg-white rounded-md shadow-sm border-2 p-2 w-60 cursor-pointer ${ 
        selected ? 'border-green-500' : 'border-gray-300' 
      }`}
      onClick={onSelect} // Handle click event to select the coupon
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className={`text-sm font-medium ${selected ? 'text-green-600' : 'text-gray-800'}`}>
          Get {discount}% OFF
        </h2>
        <div className="bg-green-500 text-white rounded-lg py-0.5 px-1 text-xs">
          {expiryDate ? `Expires: ${expiryDate}` : 'No Expiry'}
        </div>
      </div>

      <div className={`text-xs ${selected ? 'text-green-600' : 'text-gray-600'}`}>
        Use Code: {couponCode}
      </div>
    </div>
  );
};

export default Coupon;
