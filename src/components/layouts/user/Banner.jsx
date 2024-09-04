import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner1 from '../../../assets/Banner1.png';
import Banner2 from '../../../assets/Banner2.png';
import Banner3 from '../../../assets/Banner3.png';
import Banner4 from '../../../assets/Banner4.png';

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
          <div className="w-full h-96"> {/* Fixed width and height */}
            <img src={Banner1} alt="Slide 1" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-96">
            <img src={Banner2} alt="Slide 2" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-96">
            <img src={Banner3} alt="Slide 3" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-96">
            <img src={Banner4} alt="Slide 4" className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
