import React, { useState } from 'react';
import Diagnos from '../../../assets/Diagnostic.png'
import Engine from '../../../assets/EngineSer.png'
import Oil from '../../../assets/Oilserv.png'
import Others from '../../../assets/OtherServ.png'
import Tyre from '../../../assets/TyreRepl.png'
const services = [
  {
    name: 'Diagnostic Test',
    description: 'Ensure your vehicle\'s optimal performance with our comprehensive diagnostic check, identifying issues before they become costly repairs.',
    image: Diagnos
  },
  {
    name: 'Engine Servicing',
    description: 'Trust our experts to keep your car running smoothly and safely.',
    image: Engine
  },
  {
    name: 'Tire Replacement',
    description: 'Quality tire replacement services to ensure your safety on the road.',
    image: Tyre
  },
  {
    name: 'Oil Changing',
    description: 'Regular oil changes to keep your engine running efficiently.',
    image: Oil
  },
  {
    name: 'Other Services',
    description: 'Explore our range of other vehicle services.',
    image: Others
  }
];

export default function OurService() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="p-5 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold text-black text-center mb-5">Our Services</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 mb-4 md:mb-0">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-3 mb-3 cursor-pointer ${selectedService.name === service.name ? 'bg-blue-100' : 'bg-white'} rounded-lg`}
              onClick={() => setSelectedService(service)}
            >
              <h3 className="text-lg font-semibold text-center">{service.name}</h3>
            </div>
          ))}
        </div>
        <div className="md:w-1/3 flex flex-col items-center justify-center p-5">
          <div className="w-full text-white flex justify-center">
            <img 
              src={selectedService.image} 
              alt={selectedService.name} 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="md:w-1/3 bg-gray-100 flex flex-col items-center justify-center p-5">
          <div className="w-full text-black text-center">
            <h3 className="text-2xl font-bold mb-2">{selectedService.name}</h3>
            <p className='text-xl font-semibold'>{selectedService.description}</p>
          </div>
        </div>

          
        
      </div>
    </div>
  );
}
