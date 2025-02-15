
"use client";
import BannerTop from "@/components/Topup/BannerTop";

import Promotion from "@/components/Topup/Promotion";
import PromotionBannerTopup from "@/components/Topup/promotionBanner";
import MainLayout from "@/layouts/MainLayout";

import Box from "@mui/material/Box";

export default function Topup() {
    return (
        <>
            <MainLayout>
                <Box className="bg-white">
                    <BannerTop />
                    <PromotionBannerTopup/>
                    <Box className="flex justify-center items-center">
                    <Promotion/>
                    </Box>
                </Box>
            </MainLayout>
        </>
    );
}
