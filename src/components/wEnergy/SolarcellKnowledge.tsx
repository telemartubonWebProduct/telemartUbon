import React from 'react';
import { Box,  Typography } from '@mui/material';

import Image from 'next/image';

export default function Knowledge() {
    return (
        <Box>
            <Box className="w-full text-center mt-10 mb-8">
                <Typography className="text-[35px] font-semi-bold text-black" sx={{ fontFamily: 'Prompt' }}>
                    ความรู้พื้นฐานโซล่าเซลล์
                </Typography>
            </Box>
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
                {/* กล่องข้อความ */}
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        โซล่าเซลล์คืออะไร
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        ระบบโซล่าเซลล์ (Solar Cell System) เป็นการแปลงแสงอาทิตย์เป็นพลังงานไฟฟ้า ซึ่งประกอบด้วย แผงโซล่าเซลล์ (Solar Cell Panel), อินเวอร์เตอร์ (Inverter) และสายไฟเชื่อมต่อกันเป็นระบบพลังงานไฟฟ้าโซล่าเซลล์ ซึ่งตัวแผงโซล่าเซลล์จะรับพลังงานแสงอาทิตย์ในรูปแบบความเข้มแสง เพื่อสร้างไฟฟ้ากระแสตรง (DC) โดยมีอินเวอร์เตอร์(Inverter) เป็นอุปกรณ์ที่แปลงไฟฟ้ากระแสตรง(DC) เป็นไฟฟ้ากระแสสลับ (AC) จ่ายไฟฟ้าให้กับบ้านของคุณ ร่วมกับไฟฟ้าที่มาจากมิเตอร์ของการไฟฟ้า ซึ่งเราจะเรียกระบบโซล่าเซลล์ (Solar Cell System) นี้ว่าแบบออนกริด (On grid) ซึ่งเป็นระบบโซล่าเซลล์ที่นิยมอย่างมากสำหรับบ้านเรือน และ โรงงาน เพราะสามารถสลับใช้ไฟฟ้าในช่วงกลางวันจากระบบโซล่าเซลล์ และเปลี่ยนไปใช้ไฟฟ้าจากมิเตอร์การไฟฟ้าในช่วงกลางคืน
                    </Typography>
                </Box>

                {/* กล่องรูปภาพ */}
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install1.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
            </Box>


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
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install2.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        ติดตั้งโซล่าเซลล์อย่างไร
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        การติดตั้งระบบโซล่าเซลล์บนหลังคาบ้าน (Solar Rooftop) จำเป็นต้องมีการวางแผนและการเตรียมการ ในการเริ่มต้นอย่างรอบครอบ ควรประเมินสภาพหลังคา ทั้งความแข็งแรงและขนาด ทิศของหลังคา เพื่อให้การติดตั้งแผงโซล่าเซลล์ (Solar Cell Panel) นั้นสามารถผลิตกระแสไฟได้มากที่สุด การเลือกอุปกรณ์ในการติดตั้งก็เป็นสิ่งจำเป็นว่าไม่ว่าจะเป็นตัวแผงโซล่าเซลล์ อินเวอร์เตอร์ และสุดท้ายการหาบริษัทที่เป็นมืออาชีพและน่าเชื่อถืออย่างบริษัท WERWIND Energy ในการติดตั้งโซล่าเซลล์ (Solar Cell) จึงเป็นสิ่งสำคัญที่สุด
                    </Typography>

                </Box>
            </Box>

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
                {/* กล่องข้อความ */}
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การสำรวจพื้นที่ติดตั้งโซล่าเซลล์
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        ทีมวิศวกร WERWIND Energy ที่ผ่านการรับรองจะใช้เวลาในการสำรวจพื้นที่เพื่อเตรียมการติดตั้งประมาณ 1-3 ชั่วโมง โดยจะเริ่มจากการบินโดรนถ่ายภาพทางอากาศ เพื่อสำรวจชนิดของหลังคา อุปสรรคต่างๆที่ส่งผลต่อการขึ้นบนหลังคาเพื่อติดตั้ง รวมถึงทิศหลังคาที่จะติดตั้งแผ่นโซล่าเซลล์ (Solar Cell Panel) พร้อมกับการประเมินโครงสร้างรากฐานของหลังคาในการรับน้ำหนักของแผ่นโซล่าเซลล์ (Solar Cell Panel) จากนั้นจะสำรวจจุดที่จะติดตั้ง Inverter และตู้ AC/DC สำหรับการแปลงไฟฟ้า เพื่อเชื่อมต่อเข้ากับระบบไฟฟ้าของตัวบ้าน สุดท้ายสำรวจแนวเดินสายไฟต่างๆ เพื่อชี้แจงและสอบถามลูกค้าก่อนการติดตั้งจริง ว่าจุดไหนที่ลูกค้าต้องการให้ติดตั้งและมีความสวยงามตามที่ลูกค้าต้องการ และเกิดประสิทธิภาพการทำงานของระบบโซล่าเซลล์ได้สูงที่สุด จึงเป็นอันเสร็จสิ้นขั้นตอนการสำรวจพื้นที่ติดตั้งโซล่าเซลล์ (Solar Cell)
                    </Typography>
                </Box>

                {/* กล่องรูปภาพ */}
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install3.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
            </Box>

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
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install4.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การเขียนแบบโซล่าเซลล์
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        หลังจากสำรวจเสร็จสิ้น ทีมสำรวจจะส่งข้อมูลที่ได้รับให้กับทางทีมวิศวกรระบบโซล่าเซลล์ของ WERWIND Energy เพื่อทำการออกแบบด้วยโปรแกรมที่ได้รับการรับรองมาตรฐานระดับโลก โดยจะคำนวณน้ำหนักและความแข็งแรงของหลังคา ทิศทางการติดตั้งที่ดีที่สุดเพื่อให้สามารถผลิตกระแสไฟฟ้าได้มากที่สุด ซึ่งทิศที่เหมาะสมในการติดตั้งแผงโซล่าเซลล์ (Solar Cell Panel) ในประเทศไทยคือทิศใต้ เพราะเป็นทิศที่สามารถรับแสงอาทิตย์รวมทั้งวันได้มากที่สุด เนื่องจากประเทศไทยมีการเคลื่อนตัวของดวงอาทิตย์ โดยเริ่มขึ้นทางทิศตะวันออก ตกในทิศตะวันตก และมีลักษณะเส้นทางวิ่งอ้อมไปทิศใต้ในระหว่างวัน นอกจากนั้นเราจำเป็นต้องคัดเลือกอุปกรณ์จัดยึดที่ได้มาตรฐาน มีคุณภาพและเหมาะสมกับหลังคาของลูกค้ามากที่สุด เพื่อเตรียมการติดตั้งให้กับทางลูกค้า โดยขั้นตอนออกแบบระบบโซล่าเซลล์หลังคาบ้าน (Solar Rooftop) จะใช้เวลา 1-2 วันเพื่อเตรียมพร้อมก่อนกระบวนการติดตั้งระบบโซล่าเซลล์บนหลังคาบ้าน (Solar Rooftop)
                    </Typography>

                </Box>
            </Box>

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
                {/* กล่องข้อความ */}
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การติดตั้งแผงโซล่าเซลล์บนหลังคา
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        โดยขั้นตอนในการติดตั้งโซล่าเซลล์บนหลังคา (Solar Rooftop) จะเริ่มจากการเตรียมนั่งร้านหรือบันไดเพื่อขึ้นบนหลังคา โดยทีมปฏิบัติงานติดตั้งของ WERWIND Energyต้องผ่านการอบรมการทำงานบนที่สูงทุกคน (Working at height) และต้องใส่อุปกรณ์ป้องกัน เช่น เข็มขัดนิรภัยชนิดเต็มตัว ก่อนขึ้นทำการติดตั้งอุปกรณ์ยึดจับแผงบนหลังคา เพื่อเตรียมที่จะติดตั้งแผงโซล่าเซลล์ (Solar Cell Panel) ตามการออกแบบที่วางแผนไว้ ในกรณีของการติดตั้งโซล่าเซลล์ระบบ String Inverter จะเชื่อต่อแผงโซล่าเซลล์ (Solar Cell Panel) เข้าด้วยกันผ่านสายไฟด้วยหัวเชื่อมต่อ MC4 ที่มีมาตรฐานรองรับอย่างถูกต้อง ก่อนทำการร้อยท่อสายไฟลงเข้าสู่ด้างล่างของตัวบ้านเพื่อเตรียมเชื่อมต่อเข้ากับระบบ String Inverter ส่วนการติดตั้งโซล่าเซลล์ระบบ Microinverter ทีมปฏิบัติงานจะต้องติดตั้ง Microinverter ข้างใต้แผงโซล่าเซลล์บนหลังคาก่อน และเชื่อต่อสายไฟเข้าโดยตรงที่ Microinverter ได้เลย
                    </Typography>
                </Box>

                {/* กล่องรูปภาพ */}
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install5.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
            </Box>

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
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install6.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การติดตั้งระบบอินเวอร์เตอร์
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        ระบบอินเวอร์เตอร์ (Inverter) คือ ระบบการแปลงไฟฟ้าจากกระแสตรง (DC) ที่ถูกผลิตจากแผ่นโซล่าเซลล์บนหลังคา เปลี่ยนเป็นกระแสนไฟฟ้าแบบสลับ (AC) ซึ่งเป็นกระแสไฟฟ้ารูปแบบที่ใช้กันในบ้านเราขนาด 220V โดยทำการเชื่อมต่อเข้ากับระบบไฟฟ้าที่มาจากตัวมิเตอร์ของการไฟฟ้าด้วยตู้ AC/DC Combiner ที่เราจะติดตั้งในบริเวณเดียวกันกับตัวเครื่องอินเวอร์เตอร์ ซึ่งภายในจะมีการเชื่อมต่อกับเบรกเกอร์และระบบกราว เพื่อป้องกันเรื่องไฟฟ้าลัดวงจร และเป็นการเสร็จสิ้นขั้นตอนติดตั้งโซล่าเซลล์ (Solar Cell)
                    </Typography>

                </Box>
            </Box>


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
                {/* กล่องข้อความ */}
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การตรวจสอบระบบโซล่าเซลล์
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        มาถึงขั้นตอนสุดท้ายก่อนการเริ่มใช้งานระบบไฟฟ้าโซล่าเซลล์ (Solar Cell) เราเรียกกระบวนการนี้ว่า Commissioning Process คือการทดสอบระบบก่อนการใช้งาน ซึ่งเราจะตรวจสอบและทำการตั้งค่าบนแอปพลิเคชันของอินเวอร์เตอร์ ซึ่งปัจจุบันระบบอินเวอร์เตอร์ของ Huawei จะใช้แอปชื่อว่า FusionSolar ซึ่งถือว่าได้รับความนิยมสูงสุด เนื่องจากสามารถตรวจสอบข้อมูลการผลิตไฟฟ้าทั้งระบบได้แบบ Realtime ไม่ว่าจะเป็นปริมาณการผลิตไฟฟ้าจากแผงโซล่าเซลล์ (Solar Cell Panel) หรือ การใช้ไฟฟ้าของเครื่องใช้ไฟฟ้าในตัวบ้าน รวมถึงสามารถตรวจสอบความผิดปกติใด้ โดยจะแจ้งเตือนในรูปแบบ Alarm บนแอปพลิเคชัน ทำให้เราสามารถตรวจสอบแก้ไขปัญหาได้ทันที
                    </Typography>
                </Box>

                {/* กล่องรูปภาพ */}
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install7.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
            </Box>


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
                <Box>
                    <Image
                        src="/assets/wEnergy/knowledge/install8.webp"
                        alt="Solar Installation Process"
                        width={600}
                        height={400}
                        layout="intrinsic"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </Box>
                <Box>
                    <Typography
                        fontWeight="semi-bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                    >
                        การบำรุงรักษาระบบโซล่าเซลล์
                    </Typography>
                    <Typography
                        fontWeight="regular"
                        gutterBottom
                        sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt' }}
                    >
                        การบำรุงรักษาระบบโซล่าเซลล์บนหลังคา (Solar Rooftop) นั้นค่อนข้างง่าย และราคาไม่แพงอย่างที่คนส่วนใหญ่คิด โดยคุณควรทำความสะอาดแผงโซล่าเซลล์เป็นประจำ ขั้นต่ำปีละ 1 ครั้ง เนื่องจากฝุ่น สิ่งสกปรก ใบไม้ อาจทำให้การผลิตพลังงานไฟฟ้าจากแผงโซล่าเซลล์ (Solar Cell Panel) ลดลงโดยการถูกบดบังจากแสงแดด คุณสามารถใช้ผ้าสะอาด และสายยางเพื่อฉีดน้ำ เพื่อนำเศษสิ่งสกปรกออก แต่ควรหลีกเลี่ยงการใช้สารเคมีที่มีฤทธิ์กัดกร่อนหรือรุนแรงที่อาจทำลายพื้นผิวของแผงโซล่าเซลล์ได้  และควรมีวิศวกรผู้เชี่ยวชาญในการตรวจสอบสายไฟและการเชื่อมต่อเป็นระยะๆ เนื่องจากสายไฟและการเชื่อมต่อที่สึกกร่อนอาจทำให้เกิดอันตรายจากไฟฟ้าหรือทำงานผิดปกติได้ โดยทาง WERWIND Energy เองก็มีการรับประกันดูแลในส่วนนี้ยาวนานถึง 2 ปี รวมถึงการดูแลตรวจสอบความผิดปกติในการใช้งาน โดยวิศวกรที่มีความเชี่ยวชาญจากทาง WERWIND Energy
                    </Typography>

                </Box>


            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  
                    p: { xs: 3, sm: 4, md: 6 },
                }}
            >
                <Box sx={{ maxWidth: "1200px" }}>
                    <Typography
                        fontWeight="regular"
                        sx={{
                            fontSize: { xs: "16px", sm: "18px", md: "20px" },
                            fontFamily: "Prompt",
                            textAlign: "left",
                            whiteSpace: "pre-line",
                            color: "black",
                        }}
                    >
                        {`ในการทำความสะอาดและตรวจเช็คระบบโซล่าเซลล์บนหลังคาบ้าน (Solar Rooftop) มีขั้นตอนดังต่อไปนี้:
                        1. ตรวจสอบความแตกร้าวของแผงโซล่าเซลล์ (สายตา/รูปถ่าย) : ช่วยตรวจสอบความเสียหายที่เกิดขึ้นที่ส่งผลต่อประสิทธิภาพการทำงาน หากต้องทำการเปลี่ยน จะอยู่ในเงื่อนไขการรับประกันของบริษัทผู้ผลิต
                        2. ตรวจสอบสภาพโครงสร้างแผงโซล่าเซลล์ทั้งหมด (สายตา/รูปถ่าย) : ตรวจสอบทางกายภาพของอุปกรณ์จับยึดแผง
                        3. ตรวจสอบสภาพสายไฟทั้งหมดเพื่อให้แน่ใจว่า สายไม่ย้อย หรือหย่อนลง (สายตา/รูปถ่าย) : ตรวจสอบสายไฟให้อยู่ในสถานะที่พร้อมใช้งาน และจัดเก็บให้อยู่ในตำแหน่งที่ถูกต้อง
                        4. ตรวจสอบความหนาแน่นของขั้วสายไฟ (สัมผัส/จับโยก) : ป้องกันการเกิดการอาร์คของกระแสไฟฟ้า
                        5. ตรวจสอบ Inverter และอุปกรณ์ไฟฟ้าอื่นๆ (มัลติมิเตอร์วัดกระแส/แรงดัน) : ตรวจสอบสถานะการทำงานและทำความสะอาด
                        6. ตรวจสอบอุปกรณ์ป้องกันไฟฟ้า เบรคเกอร์ ฟิวส์ (มัลติมิเตอร์วัดกระแส/แรงดัน) : ตรวจสอบสถานะการทำงานและทำความสะอาด
                        7. ตรวจสอบค่าทอร์คของน๊อตที่จับยึด Mounting และขันแน่นให้ได้มาตรฐานที่ 13-15 นิวตัน : ตรวจสอบทางกายภาพของอุปกรณ์จับยึดแผง และดำเนินการให้เป็นไปดังค่ามาตรฐาน
                        8. ตรวจสอบระบบเซ็นเซอร์อุณหภูมิ (Meteorological Station), ระบบมอนิเตอร์, ระบบควบคุม : ตรวจสอบสถานะการทำงานและทำความสะอาด
                        9. ตรวจสอบระบบการเชื่อมต่อสายดินด้วย Earth Tester : ป้องกันแรงดันไฟฟ้าเกินที่สามารถสร้างความเสียหายให้กับอุปกรณ์
                        10. ตรวจสอบความร้อนของแผงโซล่าเซลล์ (Solar Cell Panel) และระบบโซล่าเซลล์ด้วย Thermoscan : วัดอุณหภูมิของอุปกรณ์ที่ติดตั้งในระบบ
                        11. ทดสอบความผิดปกติของแผงโซล่าเซลล์ (Solar Cell Panel) ด้วยเครื่องมือโซล่าเซลล์เฉพาะทางอย่าง I-V CURVE Test : วิเคราะห์สาเหตุหากพบว่าประสิทธิภาพของการผลิตพลังงานลดลง`}
                    </Typography>
                    </Box>
                </Box>

            </Box >
            );
}
