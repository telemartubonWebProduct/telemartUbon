"use client";
import BannerBoardbandNewcus from "@/components/HomeInternet/new-customer/Banner";
import Bannertwo from "@/components/HomeInternet/new-customer/bannertwo";
import PackageBroadbandNew from "@/components/HomeInternet/new-customer/Package";
import Sectiontwo from "@/components/HomeInternet/new-customer/Sectiontwo";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";

export default function Broadband() {
    return (
        <>
            <MainLayout>
                <Box className="bg-white">
                    <BannerBoardbandNewcus />
                    <PackageBroadbandNew />
                    <Bannertwo />
                    <Sectiontwo />
                </Box>
            </MainLayout>
        </>
    );
}