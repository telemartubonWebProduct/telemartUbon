import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import speedIcon from '../../../public/assets/Icon/speednet.png';
import CalendarIcon from '../../../public/assets/Icon/calendar.png';
import Call from '../../../public/assets/Icon/calling.png'
import VideoIcon from "../../../public/assets/Icon/icon-vdo.webp"

import HeaderTopup from "./Header";
import { PromotionMonthyCall, PromotionMonthyNolimit, PromotionMonthySocial, PromotionMonthyUpspeed } from "@/datas/Monthy/Monthy.data";
import { PromotionMonthyAsianCombo, PromotionMonthyComboplus, PromotionMonthyIqiyi, PromotionMonthyViu, PromotionMonthyWeTV } from "@/datas/Monthy/series.data";
import { PromotionConsultcoupon, PromotionFreeAcidentInsurance, PromotionInsuranceCumulative, PromotionWhoscall } from "@/datas/Monthy/insurance.data";
import { PromotionCouponLiftstyle, PromotionGame } from "@/datas/Monthy/game.data";
import { lineSupport } from "@/globals/buttonActionPath";






export default function PromotionMonthy() {
    const netupspeed = useRef<HTMLHeadingElement | null>(null);
    const netnolimit = useRef<HTMLHeadingElement | null>(null);
    const netsocial = useRef<HTMLHeadingElement | null>(null);
    const call = useRef<HTMLHeadingElement | null>(null);
    const series = useRef<HTMLHeadingElement | null>(null);
    const insurance = useRef<HTMLHeadingElement | null>(null);
    const game = useRef<HTMLHeadingElement | null>(null);


    const handleTabClick = (tab: string) => {
        if (tab === "เน็ตเพิ่มสปีด" && netupspeed.current) {
            netupspeed.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เน็ตไม่จำกัด" && netnolimit.current) {
            netnolimit.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เน็ตเล่นโซเซียล" && netsocial.current) {
            netsocial.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "โทร" && call.current) {
            call.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "ซีรีส์ & เอนเตอร์เทนเมนท์" && series.current) {
            series.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "ความคุ้มครอง" && insurance.current) {
            insurance.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เกม & ไลฟ์สไตล์" && game.current) {
            game.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }


    };

    const [selectedCategory, setSelectedCategory] = useState("Asian Combo");
    const getCategoryItems = () => {
        if (selectedCategory === "Asian Combo") return PromotionMonthyAsianCombo;
        if (selectedCategory === "Combo+") return PromotionMonthyComboplus;
        if (selectedCategory === "Viu") return PromotionMonthyViu;
        if (selectedCategory === "Iqiyi") return PromotionMonthyIqiyi;
        if (selectedCategory === "WeTV") return PromotionMonthyWeTV;
        return [];
    };
    const itemsToRender = getCategoryItems();

    const [selected, setselected] = useState("ประกันชีวิตคุ้มครองสะสม");
    const getSelectedItems = () => {
        if (selected == "ประกันชีวิตคุ้มครองสะสม") return PromotionInsuranceCumulative;
        if (selected == "ฟรีประกันอุบัติเหตุ") return PromotionFreeAcidentInsurance;
        if (selected == "คูปองปรึกษาแพทย์") return PromotionConsultcoupon;
        if (selected == "Whoscall ป้องกันมิจฉาชีพ") return PromotionWhoscall;
        return [];
    };
    const Itemselected = getSelectedItems();

    const [selectedGamelife, setselectedGamelige] = useState("Game");
    const getSelectedGamelife = () => {
        if (selectedGamelife == "Game") return PromotionGame;
        if (selectedGamelife == "คูปองไลฟ์สไตล์") return PromotionCouponLiftstyle;
        return [];
    };
    const ItemselectGamelife = getSelectedGamelife();


    return (
        <Box className="p-6">
            <HeaderTopup onTabClick={handleTabClick} />
            <h4 id="internetpure" ref={netupspeed} className="text-2xl font-bold mb-4 text-black mt-10">เน็ตเพิ่มสปีด</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionMonthyUpspeed.map((promo) => (
                    <Box
                        key={promo.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promo.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promo.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promo.validity}</span>
                            </p>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promo.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promo.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}   className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 ref={netnolimit} className="text-2xl font-bold mb-4 text-black mt-10">เน็ตไม่จำกัด</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionMonthyNolimit.map((promonolimit) => (
                    <Box
                        key={promonolimit.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promonolimit.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promonolimit.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promonolimit.validity}</span>
                            </p>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promonolimit.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promonolimit.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}   className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="socialInternet" ref={netsocial} className="text-2xl font-bold mb-4 text-black mt-10">เน็ตเล่นโซเซียล</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionMonthySocial.map((promosocial) => (
                    <Box
                        key={promosocial.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promosocial.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promosocial.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promosocial.validity}</span>
                            </p>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promosocial.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promosocial.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 ref={call} className="text-2xl font-bold mb-4 text-black mt-10">โทร</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionMonthyCall.map((promocall) => (
                    <Box
                        key={promocall.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promocall.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={Call.src} alt="call icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promocall.call}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promocall.validity}</span>
                            </p>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promocall.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promocall.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="entertainment" ref={series} className="text-2xl font-bold mb-4 text-black mt-10">ซีรีส์ & เอนเตอร์เทนเมนท์</h4>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                        justifyContent: { xs: "center", md: "flex-start" },
                        p: { xs: 2, md: 4 }
                    }}
                >
                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selectedCategory === "Asian Combo" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selectedCategory === "Asian Combo" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "Asian Combo" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "Asian Combo" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("Asian Combo")}
                    >
                        Asian Combo
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selectedCategory === "Combo+" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selectedCategory === "Combo+" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "Combo+" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "Combo+" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("Combo+")}
                    >
                        Combo+
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "Viu" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "Viu" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "Viu" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "Viu" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("Viu")}
                    >
                        Viu
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "Iqiyi" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "Iqiyi" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "Iqiyi" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "Iqiyi" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("Iqiyi")}
                    >
                        Iqiyi
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selectedCategory === "WeTV" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selectedCategory === "WeTV" ? "#FB4141" : "#FFFFFF",
                            color: selectedCategory === "WeTV" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedCategory === "WeTV" ? "contained" : "outlined"}
                        onClick={() => setSelectedCategory("WeTV")}
                    >
                        WeTV
                    </Button>
                </Box>

                <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {itemsToRender.map((item) => (
                        <Box
                            key={item.id}
                            className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 w-full max-w-[358px] min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                        >
                            <Box>
                                <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">
                                    {item.title}
                                </h6>
                                {item?.speed && (
                                    <p className="text-sm text-gray-600 flex items-center mb-2">
                                        <motion.img
                                            src={speedIcon.src}
                                            alt="speed icon"
                                            className="w-5 h-5 mr-2"
                                        />
                                        <span className="font-bold">{item.speed}</span>
                                    </p>
                                )}
                                {item?.note && (
                                    <span className="font-bold text-[10px] text-black">{item.speed}</span>
                                )}
                                <p className="text-sm text-gray-600 flex items-center">
                                    <motion.img
                                        src={CalendarIcon.src}
                                        alt="calendar icon"
                                        className="w-5 h-5 mr-2"
                                    />
                                    <span className="font-bold">{item.validity}</span>
                                </p>
                                {item?.unlock && (
                                    <p className="text-sm text-gray-600 flex items-center mb-2">
                                        <motion.img
                                            src={VideoIcon.src}
                                            alt="video icon"
                                            className="w-5 h-5 mr-2"
                                        />
                                        <span className="font-bold">{item.unlock}</span>
                                    </p>
                                )}
                            </Box>

                            <Box className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 mb-4">
                                <Box className="text-sm text-gray-600">
                                    <span className="text-[24px] font-bold text-red-500">
                                        {item.price}
                                    </span>
                                    <span className="text-sm ml-1 text-red-500">บาท</span>
                                    <Box className="text-[10px]">({item.vat})</Box>
                                    <Box className="flex flex-wrap mt-5 gap-2">
                                        {item.imgae.map((promo, pIndex) => (
                                            <motion.img
                                                key={pIndex}
                                                src={promo.icon}
                                                alt={`Promotion icon ${pIndex}`}
                                                className="flex-none w-14 h-14 mb-2"
                                            />
                                        ))}
                                    </Box>
                                    {item?.phone && (
                                        <Box className="text-[12px] flex items-center mt-2">
                                            <motion.img
                                                src={Call.src}
                                                alt="call icon"
                                                className="w-5 h-5 mr-2"
                                            />
                                            {item.phone}
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <button onClick={() => window.location.href = lineSupport} className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px] w-full">
                                ซื้อเลย
                            </button>
                        </Box>
                    ))}
                </Box>
            </Box>

            <h4 ref={insurance} className="text-2xl font-bold mb-4 text-black mt-10">ความคุ้มครอง</h4>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                        justifyContent: { xs: "center", md: "flex-start" },
                        p: { xs: 2, md: 4 }
                    }}
                >
                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selected === "ประกันชีวิตคุ้มครองสะสม" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selected === "ประกันชีวิตคุ้มครองสะสม" ? "#FB4141" : "#FFFFFF",
                            color: selected === "ประกันชีวิตคุ้มครองสะสม" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selected === "ประกันชีวิตคุ้มครองสะสม" ? "contained" : "outlined"}
                        onClick={() => setselected("ประกันชีวิตคุ้มครองสะสม")}
                    >
                        ประกันชีวิตคุ้มครองสะสม
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selected === "ฟรีประกันอุบัติเหตุ" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selected === "ฟรีประกันอุบัติเหตุ" ? "#FB4141" : "#FFFFFF",
                            color: selected === "ฟรีประกันอุบัติเหตุ" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selected === "ฟรีประกันอุบัติเหตุ" ? "contained" : "outlined"}
                        onClick={() => setselected("ฟรีประกันอุบัติเหตุ")}
                    >
                        ฟรีประกันอุบัติเหตุ
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selected === "คูปองปรึกษาแพทย์" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selected === "คูปองปรึกษาแพทย์" ? "#FB4141" : "#FFFFFF",
                            color: selected === "คูปองปรึกษาแพทย์" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selected === "คูปองปรึกษาแพทย์" ? "contained" : "outlined"}
                        onClick={() => setselected("คูปองปรึกษาแพทย์")}
                    >
                        คูปองปรึกษาแพทย์
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor: selected === "Whoscall ป้องกันมิจฉาชีพ" ? "#FB4141" : "#DDDDDD",
                            backgroundColor: selected === "Whoscall ป้องกันมิจฉาชีพ" ? "#FB4141" : "#FFFFFF",
                            color: selected === "Whoscall ป้องกันมิจฉาชีพ" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selected === "Whoscall ป้องกันมิจฉาชีพ" ? "contained" : "outlined"}
                        onClick={() => setselected("Whoscall ป้องกันมิจฉาชีพ")}
                    >
                        Whoscall ป้องกันมิจฉาชีพ
                    </Button>
                </Box>
                <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Itemselected.map((item) => (
                        <Box
                            key={item.id}
                            className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                        >
                            <Box>
                                <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{item.title}</h6>
                                <p className="text-sm text-gray-600 flex items-center mb-2">
                                    <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2" />
                                    <span className="font-bold">{item.speed}</span>
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                    <span className="font-bold">{item.validity}</span>
                                </p>
                            </Box>
                            <Box className="flex justify-between items-center mt-4">
                                <Box className="text-sm text-gray-600">
                                    <span className="text-[24px] font-bold text-red-500">{item.price}</span>
                                    <span className="text-sm ml-1 text-red-500">บาท</span>
                                    <Box className="text-[10px]">({item.vat})</Box>
                                </Box>
                                <button className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <h4 id="game" ref={game} className="text-2xl font-bold mb-4 text-black mt-10">เกม & ไลฟ์สไตล์</h4>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                        justifyContent: { xs: "center", md: "flex-start" },
                        p: { xs: 2, md: 4 }
                    }}
                >
                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selectedGamelife === "Game" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selectedGamelife === "Game" ? "#FB4141" : "#FFFFFF",
                            color: selectedGamelife === "Game" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedGamelife === "Game" ? "contained" : "outlined"}
                        onClick={() => setselectedGamelige("Game")}
                    >
                        Game
                    </Button>

                    <Button
                        sx={{
                            fontFamily: "Prompt",
                            borderRadius: "30px",
                            borderColor:
                                selectedGamelife === "คูปองไลฟ์สไตล์" ? "#FB4141" : "#DDDDDD",
                            backgroundColor:
                                selectedGamelife === "คูปองไลฟ์สไตล์" ? "#FB4141" : "#FFFFFF",
                            color: selectedGamelife === "คูปองไลฟ์สไตล์" ? "#FFFFFF" : "#000",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#FB4141",
                                color: "#FFFFFF",
                                borderColor: "#FB4141",
                            },
                        }}
                        variant={selectedGamelife === "คูปองไลฟ์สไตล์" ? "contained" : "outlined"}
                        onClick={() => setselectedGamelige("คูปองไลฟ์สไตล์")}
                    >
                        คูปองไลฟ์สไตล์
                    </Button>
                </Box>

                <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {ItemselectGamelife.map((item) => (
                        <Box
                            key={item.id}
                            className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                        >
                            <Box>
                                <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">
                                    {item.title}
                                </h6>
                                <p className="text-sm text-gray-600 flex items-center mb-2">
                                    <motion.img
                                        src={speedIcon.src}
                                        alt="speed icon"
                                        className="w-5 h-5 mr-2"
                                    />
                                    <span className="font-bold">{item.speed}</span>
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <motion.img
                                        src={CalendarIcon.src}
                                        alt="calendar icon"
                                        className="w-5 h-5 mr-2"
                                    />
                                    <span className="font-bold">{item.validity}</span>
                                </p>
                                {item?.coupon && (
                                    <p className="text-sm text-gray-600 flex items-center mb-2 mt-2">
                                        {item.iconCoupon && item.iconCoupon.length > 0 && (
                                            <motion.img
                                                src={item.iconCoupon[0].icon}
                                                alt="coupon icon"
                                                className="w-10 h-10 mr-2"
                                            />
                                        )}
                                        <span className="font-bold">{item.coupon}</span>
                                    </p>
                                )}
                                <Box className="text-[10px] text-gray-600 mb-2">{item.note}</Box>
                            </Box>
                            <Box className="flex justify-between items-center mt-4">
                                <Box className="text-sm text-gray-600">
                                    <span className="text-[24px] font-bold text-red-500">
                                        {item.price}
                                    </span>
                                    <span className="text-sm ml-1 text-red-500">บาท</span>
                                    <Box className="text-[10px]">({item.vat})</Box>
                                </Box>
                                <button onClick={() => window.location.href = lineSupport} className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">
                                    ซื้อเลย
                                </button>
                            </Box>
                        </Box>
                    ))}


                </Box>

            </Box>

        </Box>
    );
}
