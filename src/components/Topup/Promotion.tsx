import React, { useRef } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import speedIcon from '../../../public/assets/Icon/speednet.png';
import CalendarIcon from '../../../public/assets/Icon/calendar.png';
import Call from '../../../public/assets/Icon/calling.png'
import { PromotionGame, PromotionInsurance, PromotionTopup, PromotionTopupCall, PromotionTopupCallNet, PromotionTopupEntertain } from "@/datas/Topup/Topup.data";
import HeaderTopup from "./Header";
import { lineSupport } from "@/globals/buttonActionPath";



export default function Promotion() {



    const netRef = useRef<HTMLHeadingElement | null>(null);
    const netCallRef = useRef<HTMLHeadingElement | null>(null);
    const callRef = useRef<HTMLHeadingElement | null>(null);
    const entertrainRef = useRef<HTMLHeadingElement | null>(null);
    const gameRef = useRef<HTMLHeadingElement | null>(null);
    const inssuranceRef = useRef<HTMLHeadingElement | null>(null);


    const handleTabClick = (tab: string) => {
        if (tab === "เน็ต" && netRef.current) {
            netRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เน็ต + โทร" && netCallRef.current) {
            netCallRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "โทร" && callRef.current) {
            callRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เอ็นเตอร์เทนเม้นท์" && entertrainRef.current) {
            entertrainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "เกมส์" && gameRef.current) {
            gameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (tab === "insurance" && inssuranceRef.current) {
            inssuranceRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

    };


    return (
        <Box id="internet" className="p-6">
            <HeaderTopup onTabClick={handleTabClick} />
            <h4 ref={netRef} className="text-2xl font-bold mb-4 text-black mt-10">เน็ต</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionTopup.map((promo) => (
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
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="internetcall" ref={netCallRef} className="text-2xl font-bold mb-4 text-black mt-10">เน็ต + โทร</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionTopupCallNet.map((prompcallnet) => (
                    <Box
                        key={prompcallnet.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{prompcallnet.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{prompcallnet.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={Call.src} alt="call icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{prompcallnet.call}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{prompcallnet.validity}</span>
                            </p>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{prompcallnet.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({prompcallnet.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="call" ref={callRef} className="text-2xl font-bold mb-4 text-black mt-10">โทร</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionTopupCall.map((promocall) => (
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

            <h4 id="entertain" ref={entertrainRef} className="text-2xl font-bold mb-4 text-black mt-10">เอ็นเตอร์เทนเม้นท์</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionTopupEntertain.map((promoenter) => (
                    <Box
                        key={promoenter.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">
                                {promoenter.title}
                            </h6>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img
                                    src={CalendarIcon.src}
                                    alt="calendar icon"
                                    className="w-5 h-5 mr-2"
                                />
                                <span className="font-bold">{promoenter.validity}</span>
                            </p>
                            <Box className="text-[10px] text-gray-600 mb-2">
                                {promoenter.note}
                            </Box>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promoenter.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promoenter.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="game" ref={gameRef} className="text-2xl font-bold mb-4 text-black mt-10">เกมส์</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionGame.map((promogame) => (
                    <Box
                        key={promogame.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promogame.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2 " />
                                <span className="font-bold">{promogame.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promogame.validity}</span>
                            </p>
                            <Box className="text-[10px] text-gray-600 mb-2">
                                {promogame.note}
                            </Box>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promogame.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promogame.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <h4 id="inssurance" ref={inssuranceRef} className="text-2xl font-bold mb-4 text-black mt-10">insurance</h4>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PromotionInsurance.map((promoinssurance) => (
                    <Box
                        key={promoinssurance.id}
                        className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 max-w-[358px] w-full min-h-[240px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
                    >
                        <Box>
                            <h6 className="text-[16px] font-semibold mb-2 text-black break-words leading-tight">{promoinssurance.title}</h6>
                            <p className="text-sm text-gray-600 flex items-center mb-2">
                                <motion.img src={speedIcon.src} alt="speed icon" className="w-5 h-5 mr-2 " />
                                <span className="font-bold">{promoinssurance.speed}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <motion.img src={CalendarIcon.src} alt="calendar icon" className="w-5 h-5 mr-2" />
                                <span className="font-bold">{promoinssurance.validity}</span>
                            </p>
                            <Box className="text-[10px] text-gray-600 mb-2">
                                {promoinssurance.note}
                            </Box>
                        </Box>
                        <Box className="flex justify-between items-center mt-4">
                            <Box className="text-sm text-gray-600">
                                <span className="text-[24px] font-bold text-red-500">{promoinssurance.price}</span>
                                <span className="text-sm ml-1 text-red-500">บาท</span>
                                <Box className="text-[10px]">({promoinssurance.vat})</Box>
                            </Box>
                            <button onClick={() => window.location.href = lineSupport}  className="bg-red-500 text-white py-2 px-4 rounded-full text-[14px]">ซื้อเลย</button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
