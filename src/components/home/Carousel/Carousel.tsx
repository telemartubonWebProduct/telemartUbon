import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { slides, slidesMobile } from '@/datas/home/Carousel.data';

const Carousel = () => {


  return (
    <div className="w-full mx-auto max-w-8xl height[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        autoHeight
        className="w-full mx-auto max-w-8xl height[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <picture>
                <source media="(max-width: 768px)" srcSet={slidesMobile.find(mobileSlide => mobileSlide.id === slide.id)?.image} />
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full object-cover h-full"
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;