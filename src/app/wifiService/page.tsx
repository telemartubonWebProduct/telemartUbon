"use client";

import { lineSupport } from "@/globals/buttonActionPath";
import MainLayout from "@/layouts/MainLayout";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";


export default function WifiService() {
  return (
    <MainLayout>
      <Box className="bg-white min-h-screen w-full mx-auto">
       
        <Box
          className="relative w-full h-[550px]
                    bg-no-repeat bg-center bg-cover
                    sm:bg-[url('/assets/WifiService/banner01.webp')] bg-[url('/assets/WifiService/banner02.webp')]"
        >
          <Box className="absolute inset-0 flex flex-col justify-center items-start pl-16 w-full h-full text-white">
            <Typography fontFamily={"Prompt"} variant="h3" className="font-bold">
              สมัครเน็ตบ้านผ่านเจ้าหน้าที่
            </Typography>
            <Typography fontFamily={"Prompt"} variant="h5" className="mt-4">
              ติดตั้งเน็ตบ้านไฟเบอร์ง่ายๆ เพียงกรอกข้อมูล เจ้าหน้าที่พร้อมให้บริการ
            </Typography>
          </Box>
        </Box>

        
        <Box
          className="relative w-full h-[700px]
                    bg-no-repeat bg-center bg-cover
                    bg-[url('/assets/WifiService/banner03.webp')]"  
        >
             <Box className="absolute inset-0 flex flex-col justify-center items-start pl-16 w-full h-full text-black">
            <Typography fontFamily={"Prompt"} variant="h3" className="font-bold">
              สมัครเน็ตบ้านผ่านเจ้าหน้าที่
            </Typography>
            <Typography fontFamily={"Prompt"} variant="h5" className="mt-4">
              ติดตั้งเน็ตบ้านไฟเบอร์ง่ายๆ เพียงกรอกข้อมูล เจ้าหน้าที่พร้อมให้บริการ
            </Typography>
            <Box className=" flex justify-end items-end">
            <Link  href={lineSupport}>
            <Button variant="contained"  className="mt-4 justify-end rounded-lg font-['Prompt',serif] bg-[#FB4141] hover:bg-[#FB4141]" >
                ติดต่อเจ้าหน้าที่กดเลย
            </Button>
            </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
