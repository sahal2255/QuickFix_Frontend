import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner5 from '../../../assets/car2.webp';
import Banner6 from '../../../assets/car3.jpg';
import Banner7 from '../../../assets/bike1.jpg';
import Banner8 from '../../../assets/bike2.jpg';

export default function Banner() {
  return (
    <div className="max-w-screen-xxl mx-auto"> {/* Container for centering */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <div className="w-full h-[600px]"> {/* Increased height */}
            <img src={Banner5} alt="Slide 1" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[600px]"> {/* Increased height */}
            <img src={Banner6} alt="Slide 2" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[600px]"> {/* Increased height */}
            <img src={Banner7} alt="Slide 3" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[600px]"> {/* Increased height */}
            <img src={Banner8} alt="Slide 4" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
