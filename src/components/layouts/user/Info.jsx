import React from 'react';
import QualityIcon from '../../../assets/QualityIcon.png';
import ServiceIcon from '../../../assets/ServiceTeam.png';
import ModernEqp from '../../../assets/ModernEqp.png';

export default function Info() {
  return (
    <div className="p-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"> {/* Responsive grid */}
        <div className="bg-gray-100 rounded-lg text-black h-48 shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={QualityIcon} alt="Quality Icon" className="h-full w-full bg-gray-100 rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-bold">Quality Servicing</h3>
          <p className='text-lg font-semibold'>We provide Quality service and customer satisfaction</p>
        </div>
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={ServiceIcon} alt="Service Icon" className="h-full w-full bg-gray-100 rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-bold">Experts Workers</h3>
          <p className='text-lg font-semibold'>Workers and staff are well-experts in this industry</p>
        </div>
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={ModernEqp} alt="Modern Equipment Icon" className="h-full w-full bg-gray-100 rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-bold">Modern Equipment</h3>
          <p className='text-lg font-semibold'>Using modern equipment for the servicing</p>
        </div>
      </div>
    </div>
  );
}
