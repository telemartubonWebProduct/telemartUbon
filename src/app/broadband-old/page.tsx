"use client";
import BannerBoardbandoldcus from "@/components/HomeInternet/old-customer/Banner-old";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";
import PromotionBroadband from "@/components/HomeInternet/old-customer/Promotion";
import Addon from "@/components/HomeInternet/old-customer/Addon";

export default function BroadbandOld() {
    return (
        <>
            <MainLayout>
                <Box className="bg-white">
                    <BannerBoardbandoldcus />
                    <PromotionBroadband/>
                    <Addon/>
                </Box>
            </MainLayout>
        </>
    );
}