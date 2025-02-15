import React from "react";
import { Box, Typography } from "@mui/material";
import { solarcellData } from "@/datas/wEnergy/solar.data";
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import TableChartIcon from '@mui/icons-material/TableChart';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { lineSupport } from "@/globals/buttonActionPath";

export default function PromotionSolarcell() {
  return (
    <Box id="solar" className="flex flex-col items-center p-6">
      {/* Header Title Section */}
      <Box className="w-full text-center mt-10 mb-8">
        <Typography className="text-[40px] font-semi-bold text-black">
          ราคาติดตั้งโซล่าเซลล์
        </Typography>
      </Box>

      {/* Grid สำหรับการ์ด */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solarcellData.map((solar) => (
          <Box
            key={solar.id}
            className="relative flex flex-col justify-between bg-white rounded-2xl shadow-lg w-[300px] h-[560px] overflow-hidden transition hover:shadow-2xl hover:scale-105"
          >
            {/* Header Section */}
            <Box className="bg-blue-900 text-white text-center p-4 rounded-t-2xl w-full relative">
              <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
                {solar.title}
              </Typography>
              <Typography className="text-sm">{solar.description}</Typography>
              <Box className="absolute top-2 right-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
                {solar.pack}
              </Box>
            </Box>

            {/* Main Content Section */}
            <Box className="p-4 text-center">
              <Typography className="line-through text-gray-400" sx={{ fontSize: "20px" }}>
                {solar.discount_price}
              </Typography>
              <Typography className="font-bold text-blue-900" sx={{ fontSize: "60px" }}>
                {solar.price}
              </Typography>
              <Typography className="text-gray-500" sx={{ fontSize: "20px" }}>
                บาท
              </Typography>

              {/* รายละเอียด ชิดซ้าย */}
              <Box className="mt-4 space-y-2 text-left">
                <Typography className="text-sm text-gray-600 flex items-center">
                  <SolarPowerIcon className="mr-1" />
                  {solar.solarcell}
                </Typography>
                <Typography className="text-sm text-gray-600 flex items-center">
                  <TableChartIcon className="mr-1" />
                  {solar.arae}
                </Typography>
                <Typography className="text-sm text-gray-600 flex items-center">
                  <NightShelterIcon className="mr-1" />
                  {solar.scope}
                </Typography>
                <Typography className="text-sm text-gray-600 flex items-center">
                  <SettingsBackupRestoreIcon className="mr-1" />
                  {solar.karantee}
                </Typography>
              </Box>
            </Box>

            {/* Footer Section */}
            <Box className="text-center mt-3 mb-3">
              <button onClick={() => window.location.href = lineSupport}  className="bg-blue-900 text-white py-2 px-6 rounded-full text-[14px]">
                สอบถามข้อมูล
              </button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* หมายเหตุ */}
      <Box className="mt-8 p-4rounded-md max-w-2xl">
        <Typography variant="h6" className="font-bold mb-2" sx={{ color: "black" }}>
          หมายเหตุ
        </Typography>
        <Typography variant="body2" className="mb-1" sx={{ color: "black" }}>
          <FiberManualRecordIcon sx={{ width: "10px", marginRight: "2px" }} />
          คำนวณราคาค่าไฟฟ้า 4.7 บาท / หน่วย และใช้งานช่วงกลางวันเฉลี่ย 5 ชั่วโมง ต่อวัน
        </Typography>
        <Typography variant="body2" className="mb-1" sx={{ color: "black" }}>
          <FiberManualRecordIcon sx={{ width: "10px", marginRight: "2px" }} />
          เครื่องใช้ไฟฟ้าคำนวณจาก แอร์ 9000 BTU / ทีวี 55 นิ้ว / ตู้เย็น 12 คิว
        </Typography>
        <Typography variant="body2" className="mb-1" sx={{ color: "black" }}>
          <FiberManualRecordIcon sx={{ width: "10px", marginRight: "2px" }} />
          ราคาสินค้ารวมค่าบริการติดตั้ง และค่าขออนุญาตจากการไฟฟ้า (ไม่รวม Vat 7%), ราคาอาจมีการเปลี่ยนแปลง ขึ้นอยู่กับพื้นที่ในการติดตั้งและสภาพหน้างาน
        </Typography>
        <Typography variant="body2" sx={{ color: "black" }}>
          <FiberManualRecordIcon sx={{ width: "10px", marginRight: "2px" }} />
          ฟรี !! รับประกันการบำรุงรักษาระบบโซล่าเซลล์ และล้างทำความสะอาดแผงโซล่าเซลล์นาน 2ปี
        </Typography>
      </Box>
    </Box>
  );
}
