"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { PackageDaily, PackageMonthy } from "@/datas/Boardband/Boardband-old.data";
import { lineSupport } from "@/globals/buttonActionPath";

export default function PromotionBroadband() {
    const [selectedCategory, setSelectedCategory] = useState("รายเดือน");

    const getCategoryItems = () => {
        if (selectedCategory === "รายเดือน") return PackageMonthy;
        if (selectedCategory === "รายวัน") return PackageDaily;
        return [];
    };

    const itemsToRender = getCategoryItems();

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 3, textAlign: "left" }}>
                    <Typography fontFamily="Prompt" variant="h5" fontWeight={600} color="#000">
                        แพ็กเกจเสริมเพิ่มสปีด
                    </Typography>
                    <Typography fontFamily="Prompt" variant="body1" color="#555">
                        แพ็กเกจเน็ตบ้าน พร้อมสิทธิประโยชน์สุดคุ้มสำหรับลูกค้า
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "รายเดือน" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "รายเดือน" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "รายเดือน" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "รายเดือน" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("รายเดือน")}
                    >
                        รายเดือน
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "รายวัน" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "รายวัน" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "รายวัน" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "รายวัน" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("รายวัน")}
                    >
                        รายวัน
                    </Button>
                </Box>

                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={4}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 4 }, 
                        960: { slidesPerView: 3.2, spaceBetween: 4 }, 
                        1200: { slidesPerView: 3.2, spaceBetween: 4 },
                    }}
                    className="w-full mx-auto"
                >

                    {itemsToRender.map((item) => (
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
                                    transition: "transform 0.3s ease-in-out", // เพิ่ม transition
                                    "&:hover": {
                                        transform: "scale(1.05)", // ซูมเข้าเมื่อ hover
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // เพิ่มเงาให้ดูโดดเด่น
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
                                        WebkitTextFillColor: "transparent"
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
                                            WebkitTextFillColor: "transparent"
                                        }}
                                    >
                                        บาท
                                    </Typography>
                                </Typography>


                                <Box>
                                    <Typography variant="body1" fontFamily="Prompt" sx={{ mb: 1, color: "#000", fontSize: "12px" }}>
                                        ความเร็ว (ดาวน์โหลด/อัปโหลด)
                                    </Typography>
                                    <Typography component="div" variant="body1" fontFamily="Prompt" sx={{ mb: 1, color: "#000", fontSize: "32px", display: "inline-flex", alignItems: "center", fontWeight: 600, }}>
                                        {item.speedDownload} Mbps/
                                        <Box component="span" sx={{ display: "inline-flex", flexDirection: "column", position: "relative", top: "-4px", ml: "2px" }}>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: 1 }}>{item.speedUpload}</Typography>
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
            </Container>
        </Box>
    );
}
