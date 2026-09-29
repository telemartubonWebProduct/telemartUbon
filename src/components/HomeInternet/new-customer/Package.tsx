import { dataWifiHome } from "@/datas/home/WifiHome.data";
import { lineSupport } from "@/globals/buttonActionPath";
import { Box, Button,  Typography, } from "@mui/material";
import { motion } from "framer-motion";
import * as React from "react";


import { Swiper, SwiperSlide } from "swiper/react";

export default function WifiHome() {
  

    return (
        <Box sx={{}} className="pt-[7rem] pb-[7rem]">
            <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
                <Typography
                    fontFamily={"Prompt"}
                    variant="h4"
                    className="font-bold text-[#2C2C2C] mb-[2rem] text-center"
                >
                    โปรโมชั่นสำหรับลูกค้าใหม่
                </Typography>

                <Swiper
                    loop={true} // เพิ่ม prop นี้เพื่อเปิดใช้งาน loop
                    slidesPerView={1.2}
                    spaceBetween={4}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 4 },
                        960: { slidesPerView: 3.2, spaceBetween: 4 },
                        1200: { slidesPerView: 3.2, spaceBetween: 4 },
                    }}
                    className="w-full mx-auto"
                >
                    {dataWifiHome.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Box
                                sx={{
                                    maxWidth: 300,
                                    minHeight: 420,
                                    mx: "auto",
                                    p: 3,
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "16px",
                                    textAlign: "left",
                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                                    backgroundColor: "#fff",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontFamily="Prompt"
                                    fontWeight={600}
                                    sx={{ mb: 1, color: "#000" }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontFamily="Prompt"
                                    fontWeight={700}
                                    sx={{
                                        mb: 1,
                                        display: "inline-flex",
                                        alignItems: "baseline",
                                        background: "linear-gradient(90deg, #0BCAFF 0%, #226AC8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {item.price}
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontSize: "12px",
                                            ml: "4px",
                                            fontWeight: 700,
                                            background: "linear-gradient(90deg, #0BCAFF 0%, #226AC8 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        บาท
                                    </Typography>
                                </Typography>

                                <Box>
                                    <Typography
                                        variant="body1"
                                        fontFamily="Prompt"
                                        sx={{ mb: 1, color: "#000", fontSize: "12px" }}
                                    >
                                        ความเร็ว (ดาวน์โหลด/อัปโหลด)
                                    </Typography>
                                    <Typography
                                        component="div"
                                        variant="body1"
                                        fontFamily="Prompt"
                                        sx={{
                                            mb: 1,
                                            color: "#000",
                                            fontSize: "32px",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.speedDownload} Mbps/
                                        <Box
                                            component="span"
                                            sx={{
                                                display: "inline-flex",
                                                flexDirection: "column",
                                                position: "relative",
                                                top: "-4px",
                                                ml: "2px",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: 1 }}>
                                                {item.speedUpload}
                                            </Typography>
                                            <Typography sx={{ fontSize: "14px", lineHeight: 1 }}>Mbps</Typography>
                                        </Box>
                                    </Typography>
                                </Box>

                                {item.note && (
                                    <Typography
                                        variant="body2"
                                        fontFamily="Prompt"
                                        sx={{ mb: 2, color: "#777", fontSize: "14px" }}
                                    >
                                        {item.note}
                                    </Typography>
                                )}

                                <Box className="flex flex-wrap gap-2 justify-center items-center mb-4">
                                    {item.package.map((p, i) => (
                                        <Box key={i} className="flex-shrink-0">
                                            <motion.img
                                                src={p.icon}
                                                alt={p.title}
                                                className="w-[40px] h-auto"
                                            />
                                        </Box>
                                    ))}
                                </Box>

                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Prompt",
                                        textTransform: "none",
                                        background: "linear-gradient(90deg, #0BCAFF 0%, #226AC8 100%)",
                                        borderRadius: "999px",
                                        px: 4,
                                        py: 1,
                                        "&:hover": {
                                            background: "linear-gradient(90deg, #0BCAFF 0%, #226AC8 100%)",
                                        },
                                    }}
                                    onClick={() => {        
                                        window.location.href = lineSupport;
                                    }}
                                >
                                    ซื้อเลย
                                </Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Box>
    );
}
