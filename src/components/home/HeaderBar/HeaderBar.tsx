import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { menuItems } from "@/datas/home/HeaderBar.data";
import Link from "next/link";

export default function SectionMenu() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Box className="w-full h-full justify-center items-center flex pt-10 pb-4 mx-auto bg-white">
      <Swiper
        modules={[FreeMode]}
        spaceBetween={isSmallScreen ? 10 : 20}
        slidesPerView="auto"
        freeMode={true}
        className="mySwiper"
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <Link href={item.path} scroll={true}>
            <Box
              className="flex flex-col justify-center items-center group cursor-pointer"
              // onClick={() => window.location.href = item.path}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={isSmallScreen ? 60 : 100}
                height={isSmallScreen ? 12 : 20}
                className="text-gray-500 group-hover:text-[#FB4141]"
                />
              <Typography
                fontFamily={"Prompt"}
                variant={isSmallScreen ? "body2" : "h6"}
                className="font-bold text-gray-600 group-hover:text-[#FB4141] text-center"
              >
                {item.text}
              </Typography>
            </Box>
                </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
