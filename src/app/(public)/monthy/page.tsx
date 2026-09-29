"use client";
import BannerMonthy from "@/components/Monthy/Banner";
import BannerproMonthy from "@/components/Monthy/bannerPromotion";
import PromotionMonthy from "@/components/Monthy/Promotions";

import MainLayout from "@/layouts/MainLayout";

import Box from "@mui/material/Box";

export default function Monthly() {
    return (
        <>
            <MainLayout>
                <Box className="bg-white">
                    <BannerMonthy />
                    <BannerproMonthy/>
                    <Box className="flex justify-center items-center">
                    <PromotionMonthy/>
                    </Box>
                </Box>
            </MainLayout>
        </>
    );
}
