import React from 'react';
import { Box, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
export default function Productnservice() {
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
      {/* Left Section */}
      <Box>
        <Typography 
          fontWeight="bold" 
          gutterBottom 
          sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' } }}
        >
          สินค้าและบริการ
        </Typography>
        <Typography 
          fontWeight="medium" 
          gutterBottom 
          sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}
        >
          Solar Rooftop System
        </Typography>
        <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
          <strong>บริการติดตั้งระบบโซล่าเซลล์ (Solar Cell)</strong> สำหรับบ้านพักอาศัย และกลุ่มธุรกิจโรงงานอุตสาหกรรม
          ด้วยสินค้าจากผู้ผลิตชั้นนำของโลก เช่น ระบบแผง <strong>Mono Crystalline Tier1</strong>
          รับประกันประสิทธิภาพยาวนานกว่า 30 ปี และบริหารควบคุมด้วยระบบ <strong>Inverter จาก Huawei</strong>
          ที่มียอดขายในตลาดเป็นอันดับ 1 ของโลก
        </Typography>
        <Box 
          borderTop={1} 
          borderColor="grey.300" 
          pt={4} 
          mt={4}
        >
          <Typography 
            variant="h6" 
            fontWeight="medium" 
            display="flex" 
            alignItems="center" 
            gutterBottom
            sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}
          >
            <span role="img" aria-label="phone" style={{ marginRight: '8px' }}><CallIcon/></span> ติดต่อสอบถาม
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ fontSize: { xs: '20px', sm: '22px', md: '24px' } }}
          >
            091-710-1605
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Image */}
      <Box>
        <img
          src="/assets/solar/wwenergy_product-scaled.webp"
          alt="Solar Rooftop System"
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
          }}
        />
      </Box>
    </Box>
  );
}
