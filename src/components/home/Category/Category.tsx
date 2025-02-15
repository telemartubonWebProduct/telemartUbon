"use client"; 
import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { items } from "@/datas/home/Category.data";
import Link from "next/link";

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function CategoryCards() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        padding: theme.spacing(2),
      }}
    >

     
      <Swiper
        slidesPerView={1.5}
        spaceBetween={16}
        pagination={{ clickable: true  }}
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        style={{
          width: "100%",
          paddingBottom: "40px",
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.path}>
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 320,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  color: "#fff",
                  padding: theme.spacing(2),
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
              </Box>
            </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
