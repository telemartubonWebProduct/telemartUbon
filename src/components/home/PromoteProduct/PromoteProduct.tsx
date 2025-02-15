"use client"; 
// If you are on Next.js 13 with the app router, 
// remember to mark this component as client-side.

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles (you can also import them in a global CSS if you prefer)
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import "swiper/css/autoplay";
import { slides } from "@/datas/home/promotePromotion.data";
import Typography from '@mui/material/Typography'


export default function PromoteProduct() {
  return (
    <section className="w-full h-auto bg-gray-50 py-10 mb-8">
        <div className="text-center mb-4 ">
            <Typography fontFamily={"Prompt"} fontWeight={"semiBold"}    variant="h5" color="initial">
                รวมรวมสิทธิพิเศษ สายอินเตอร์เน็ตบ้าน พร้อมสิทธิประโยชน์สุดคุ้ม
            </Typography>
        </div>
      <div className="container mx-auto px-4">
        <Swiper
          // Swiper core settings
          modules={[Autoplay]}
          loop={true} // Infinite looping
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
       
      
          spaceBetween={20}
          // Responsive breakpoints for Tailwind
          breakpoints={{
            640: { // Mobile
              slidesPerView: 1,
            },
            768: { // Tablet
              slidesPerView: 2,
            },
            1024: { // Desktop
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
             
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
