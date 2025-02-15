import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';

export default function SolarInstallationSteps() {
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
            {/* Left Section - Image */}
            <Box>
                <Image
                    src="/assets/wEnergy/stepinstall.webp"
                    alt="Solar Installation Process"
                    width={600}
                    height={400}
                    layout="intrinsic"
                    style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                />
            </Box>

            {/* Right Section - Steps */}
            <Box>
                <Typography
                    fontWeight="semi-bold"
                    gutterBottom
                    sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' },fontFamily: 'Prompt' }}
                >
                    ขั้นตอนติดตั้งโซล่าเซลล์
                </Typography>
                <Typography
                    fontWeight="medium"
                    gutterBottom
                    sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } ,fontFamily: 'Prompt'}}
                >
                    Werwind Energy Solar เป็นบริษัทผู้ให้บริการเรื่องโซล่าเซลล์แบบครบวงจร พร้อมให้คำปรึกษา สำรวจ คำนวณ และออกแบบการติดตั้งโซล่าเซลล์ทุกจังหวัดทั่วประเทศ
                </Typography>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {/* คอลัมน์ซ้าย */}
                    <Grid item xs={12} sm={6}>
                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center' ,fontFamily: 'Prompt'}}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/caht.webp"
                                alt="Chat Icon"
                                sx={{ width: 35, height: 35, mr: 1 }}
                            />
                            ปรึกษา
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' } ,fontFamily: 'Prompt'}}>
                            ทีมขายผู้เชี่ยวชาญพร้อมบริการคำแนะนำส่วนตัว
                        </Typography>
                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center',fontFamily: 'Prompt' }}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/pic.webp"
                                alt="Chat Icon"
                                sx={{ width: 35, height: 35, mr: 1 }}
                            /> สำรวจ
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' },fontFamily: 'Prompt' }}>
                            ตรวจสอบเก็บข้อมูลสถานที่ พร้อมรูปถ่ายทางอากาศ
                        </Typography>

                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center',fontFamily: 'Prompt' }}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/design.webp"
                                alt="Chat Icon"
                                sx={{ width: 36, height: 35, mr: 1 }}
                            /> ออกแบบ
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' } ,fontFamily: 'Prompt'}}>
                            คำนวณออกแบบโครงสร้างโดยวิศวกรไฟฟ้า และ โยธา
                        </Typography>
                    </Grid>

                    {/* คอลัมน์ขวา */}
                    <Grid item xs={12} sm={6}>
                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center' ,fontFamily: 'Prompt'}}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/home.webp"
                                alt="Chat Icon"
                                sx={{ width: 36, height: 35, mr: 1 }}
                            /> ติดตั้ง
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' ,fontFamily: 'Prompt'} }}>
                            ควบคุมงานติดตั้งโซล่าเซลล์ ด้วยทีมงานที่มีประสบการณ์
                        </Typography>

                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center' ,fontFamily: 'Prompt'}}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/document.webp"
                                alt="Chat Icon"
                                sx={{ width: 30, height: 35, mr: 1 }}
                            />ขออนุญาต
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' } , fontFamily: 'Prompt' }}>
                            ประสานงานเป็นตัวแทนยื่นขออนุญาตกับการไฟฟ้า
                        </Typography>

                        <Typography fontWeight="semi-bold" sx={{ fontSize: { xs: '18px', sm: '20px' }, display: 'flex', alignItems: 'center', fontFamily: 'Prompt' }}>
                            <Box
                                component="img"
                                src="/assets/wEnergy/icon/service.webp"
                                alt="Chat Icon"
                                sx={{ width: 35, height: 35, mr: 1 }}
                            /> บริการหลังการขาย
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px', fontFamily: 'Prompt' } }}>
                            ทีมงาน Call Center และทีมวิศวกร ที่พร้อมให้บริการทั่วประเทศ
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}
