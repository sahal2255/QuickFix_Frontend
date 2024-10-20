import React from 'react';

const Card = ({ title, icon: Icon, value, footer, color, className }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
      style={{ background: color }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-700">{title}</h2>
        {Icon && <Icon className="h-8 w-8 text-gray-600" />}
      </div>
      <div className="text-4xl font-extrabold text-gray-900">{value}</div>
      {footer && <p className="text-sm text-gray-500 mt-2">{footer}</p>}
    </div>
  );
};

export default Card;
