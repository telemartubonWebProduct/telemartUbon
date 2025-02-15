"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Box, Container, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { PackgeCCTV, PackgeTrueIDTV } from "@/datas/Boardband/Boardband-old.data";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface Iitem {
    id: number;
    image: string;
    title: string;
    date?: string;
    contract?: string;
    guarantee?: string;
    note?: string;
    price: string;
}

export interface IAddonItem {
    id: number;
    image: string;
    title: string;
    date?: string;
    contract?: string;
    guarantee?: string;
    note?: string;
    price: string;
}


export default function Addon() {
    const [selectedCategory, setSelectedCategory] = useState("CCTV");

    const getCategoryItems = () => {
        if (selectedCategory === "CCTV") return PackgeCCTV;
        if (selectedCategory === "TrueID TV") return PackgeTrueIDTV;
        return [];
    };

    const data: IAddonItem[] = getCategoryItems();


    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="lg" id="cctv">
                <Box sx={{ mb: 3, textAlign: "left" }}>
                    <Typography fontFamily="Prompt" variant="h5" fontWeight={600} color="#000">
                    อุปกรณ์เสริม
                    </Typography>
                    <Typography fontFamily="Prompt" variant="body1" color="#000">
                    สินค้าราคาพิเศษสำหรับลูกค้าทรูออนไลน์
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "CCTV" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "CCTV" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "CCTV" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "CCTV" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("CCTV")}
                    >
                        CCTV
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "TrueID TV" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "TrueID TV" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "TrueID TV" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "TrueID TV" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("TrueID TV")}
                    >
                        TrueID TV
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
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Box
                                sx={{
                                    maxWidth: 300,
                                    height: "524px",
                                    mx: "auto",
                                    p: 3,
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "16px",
                                    textAlign: "left",
                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                                    backgroundColor: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={300}
                                    height={200}
                                    style={{ borderRadius: "12px" }}
                                />

                                <Typography variant="h6" fontWeight={600} sx={{ mt: 2, color: "#000", fontFamily: "Prompt" }}>
                                    {item.title}
                                </Typography>

                                {item.date && (
                                    <Typography variant="body2" sx={{ color: "#000", fontFamily: "Prompt" }}>
                                        <CalendarMonthIcon />
                                        {item.date}
                                    </Typography>
                                )}
                                {item.contract && (
                                    <Typography variant="body2" sx={{ color: "#000", fontFamily: "Prompt" }}>
                                        <CalendarMonthIcon />
                                        {item.contract}
                                    </Typography>
                                )}
                                {item.guarantee && (
                                    <Typography variant="body2" sx={{ color: "#000", fontFamily: "Prompt" }}>
                                        <CheckCircleOutlineIcon />
                                        {item.guarantee}
                                    </Typography>
                                )}
                                {item.note && (
                                    <Typography variant="body2" sx={{ color: "#000", fontFamily: "Prompt" }}>
                                        {item.note}
                                    </Typography>
                                )}
                                <Box>
                                    <Typography
                                        sx={{
                                            mt: 2,
                                            color: "#E53935",
                                            fontSize: "32px",
                                            fontFamily: "Prompt",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.price}{" "}
                                        <Typography component="span" sx={{ fontWeight: "regular" }}>
                                            บาท/เดือน
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
}
