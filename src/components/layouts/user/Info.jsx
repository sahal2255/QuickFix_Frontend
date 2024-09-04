import React from 'react';
import QualityIcon from '../../../assets/QualityIcon.png';
import ServiceIcon from '../../../assets/ServiceTeam.png';
import ModernEqp from '../../../assets/ModernEqp.png';

export default function Info() {
  return (
    <div className="p-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"> {/* Responsive grid */}
        <div className="bg-black rounded-lg text-white h-48 shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={QualityIcon} alt="Quality Icon" className="h-full w-full bg-white rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-semibold">Quality Servicing</h3>
          <p>We provide Quality service and customer satisfaction</p>
        </div>
        <div className="bg-black text-white rounded-lg shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={ServiceIcon} alt="Service Icon" className="h-full w-full bg-white rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-semibold">Experts Workers</h3>
          <p>Workers and staff are well-experts in this industry</p>
        </div>
        <div className="bg-black text-white rounded-lg shadow-lg p-5 text-center">
          <div className="h-12 w-12 mb-3 mx-auto bg-no-repeat bg-center bg-contain">
            <img src={ModernEqp} alt="Modern Equipment Icon" className="h-full w-full bg-white rounded-lg object-cover" />
          </div>
          <h3 className="text-lg font-semibold">Modern Equipment</h3>
          <p>Using modern equipment for the servicing</p>
        </div>
      </div>
    </div>
  );
}
