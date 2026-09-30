"use client";

import { useEffect } from "react";

import Carousel from "@/components/home/Carousel/Carousel";
import HeaderBar from "@/components/home/HeaderBar/HeaderBar";
import Introducing from "@/components/home/Introducing/Introducing";


import MainLayout from "@/layouts/MainLayout";
import CategoryCards from "@/components/home/Category/Category";
import { Box, Grid } from "@mui/material";
import PackageOffers from "@/components/home/PackageOffers/PackageOffers";
import HomeInternet from "@/components/home/HomeInternet/HomeInternet";
import Banner from "@/components/home/ฺBanner/Banner";
import WifiHome from "@/components/home/WifiHome/WifiHome";
import Announce from "@/components/home/announce/Announce";





export default function Home() {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18007307609/51JQCLqnuIYcENnqxopD",
        value: 1.0,
        currency: "THB",
      });
    }
  }, []);

  return (
    <>
      <MainLayout>
        <Box className="min-h-screen w-full   mx-auto ">
          <HeaderBar />
          <Grid container spacing={0} className="w-full mx-auto ">
            <Grid id="carousel" item xs={12} md={12} lg={12}>
              <Carousel />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Box id="introducing" className="w-full mx-auto">
                <Introducing />
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={12}  className="bg-gray-100 mb-8">
                <Box id="category" className="w-full mx-auto">
                  <Announce />
                </Box>
              </Grid>
      
        
              <Grid item xs={12} md={12} lg={12}>
                <Box id="category" className="w-full mx-auto">
                  <CategoryCards />
                </Box>
              </Grid>
          
            <Grid item xs={12} md={12} lg={12}>
              <Box id="wifihome" className="w-full mx-auto mb-8">
              <WifiHome />
              </Box>
            </Grid>
           
            <Grid item xs={12} md={12} lg={12}>
              <Box id="packageoffers" className="w-full mx-auto">
                <PackageOffers />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box id="home-internet" className="w-full mx-auto">
                <HomeInternet />
              </Box>
            </Grid>
          
           
            <Grid item xs={12} md={12} lg={12}>
              <Banner />
             
            </Grid>

          </Grid>
           

        </Box>
      </MainLayout>
    </>
  );
}
