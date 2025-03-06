"use client";
import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import "swiper/css/autoplay";
import { slides } from "@/datas/home/promotePromotion.data";

export default function Announce() {
  return (
    <section className="w-full h-auto  py-10 mb-8">
      <div className="text-center mb-4">
        <Typography
          fontFamily={"Prompt"}
          fontWeight={"semiBold"}
          variant="h5"
          color="initial"
        >
         📢 ประชาสัมพันธ์ 
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
            640: {
              // Mobile
              slidesPerView: 1,
            },
            768: {
              // Tablet
              slidesPerView: 2,
            },
            1024: {
              // Desktop
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className=" rounded-lg shadow-lg overflow-hidden">
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
