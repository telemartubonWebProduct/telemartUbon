import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';

export default function SolarPackage() {
  return (
    <Box 
      sx={{ 
        p: { xs: 3, sm: 4, md: 6 }, 
        maxWidth: '1200px', 
        mx: 'auto', 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: { xs: 4, md: 6 }, 
        bgcolor: 'white', 
        color: 'black', 
        fontFamily: 'Prompt' 
      }}
    >
      {/* Left Section - Text & Benefits */}
      <Box>
        <Typography 
          fontWeight="bold" 
          gutterBottom 
          sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' } }}
        >
          ติดตั้งโซล่าเซลล์วันนี้ แถมฟรี!
        </Typography>
        <Typography 
          fontWeight="medium" 
          gutterBottom 
          sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}
        >
          เน็ตบ้านทรูออนไลน์ นาน 36 เดือน
        </Typography>

        {/* True Online Logo */}
        <Image 
          src="/assets/wEnergy/trueonline.png"
          alt="TrueOnline Promotion"
          width={300}
          height={60}
          layout="intrinsic"
        />

        {/* Benefits List */}
        <Box sx={{ mt: 3 }}>
          {[
            "ฟรี! เน็ตบ้านทรูออนไลน์ (มูลค่า 47,000 บาท)",
            "ฟรี! ค่าประกันและค่าติดตั้ง (มูลค่า 2,600 บาท)",
            "ฟรี! ค่าแรกเข้า (มูลค่า 2,000 บาท)"
          ].map((text, index) => (
            <Typography 
              key={index} 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                fontSize: { xs: "14px", sm: "16px", md: "18px" }, 
                mt: 1 
              }}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1, color: "green" }} /> {text}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Right Section - Image */}
      <Box>
        <Image 
          src="/assets/wEnergy/solar_packge.webp"
          alt="Solar Package Promotion"
          width={600}
          height={350}
          layout="intrinsic"
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
          }}
        />
      </Box>
    </Box>
  );
}
