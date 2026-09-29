"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MainLayout from "@/layouts/MainLayout";

const TermsAndPrivacy: React.FC = () => {
  return (
    <MainLayout>
      <Container className="my-8 mx-auto p-4 bg-white shadow-sm rounded">
        <Box className="mb-8 text-center">
          <Typography
            fontFamily={"Prompt"}
            color="primary"
            variant="h4"
            className="font-bold mb-2"
          >
            ข้อตกลงและเงื่อนไขการให้บริการ (Terms of Service)
          </Typography>
          <Typography
            fontFamily={"Prompt"}
            variant="subtitle1"
            color="textSecondary"
          >
            และ นโยบายความเป็นส่วนตัว (Privacy Policy)
          </Typography>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนที่ 1: ข้อตกลงและเงื่อนไขการให้บริการ (Term of Service) */}
        {/* ----------------------------------------------------------- */}
        <Box className="mb-10">
          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            1. การยอมรับเงื่อนไข
          </Typography>
          <Typography
            fontFamily={"Prompt"}
            color="textSecondary"
            variant="body1"
            className="mb-4"
          >
            ยินดีต้อนรับสู่เว็บไซต์ของเรา
            เว็บไซต์นี้เป็นแพลตฟอร์มสำหรับการแนะนำสินค้าและบริการ
            ที่เกี่ยวข้องกับอินเทอร์เน็ตและโซล่าเซลล์
            เมื่อท่านเข้ามาใช้งานหรือเยี่ยมชมเว็บไซต์
            ถือว่าท่านได้อ่านและยอมรับเงื่อนไขทั้งหมดในหน้านี้
            หากท่านไม่ยอมรับเงื่อนไขใด ๆ โปรดหยุดการใช้งานเว็บไซต์โดยทันที
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            2. ขอบเขตบริการ
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            ข้อมูลหรือคำแนะนำบนเว็บไซต์จัดทำขึ้นเพื่อสนับสนุนการตัดสินใจในการเลือกใช้สินค้า
            หรือบริการด้านอินเทอร์เน็ตและโซล่าเซลล์เท่านั้น
            เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงเนื้อหา ปรับปรุงหรือยกเลิกข้อมูลใด ๆ
            บนเว็บไซต์ได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            3. ความรับผิดชอบของผู้ใช้
          </Typography>
          <List className="mb-4">
            <ListItem>
              <ListItemText
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                }}
                primary="3.1 ผู้ใช้ต้องรับผิดชอบในการตรวจสอบและยืนยันความถูกต้องของข้อมูลก่อนตัดสินใจ"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                }}
                primary="3.2 ผู้ใช้ต้องไม่ละเมิดกฎหมาย หรือกระทำการใด ๆ ที่อาจก่อให้เกิดความเสียหายต่อเว็บไซต์หรือบุคคลอื่น"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                }}
                primary="3.3 หากผู้ใช้พบปัญหาในการใช้งาน ควรติดต่อผู้ดูแลเว็บไซต์ทันที"
              />
            </ListItem>
          </List>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            4. ลิขสิทธิ์และทรัพย์สินทางปัญญา
          </Typography>

          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            เว็บไซต์นี้เป็นลูกข่ายและ/หรือพันธมิตรของ True ทำให้เนื้อหา ข้อความ
            รูปภาพ โลโก้ หรือสื่ออื่น ๆ บนเว็บไซต์
            อาจเป็นทรัพย์สินทางปัญญาที่ได้รับอนุญาตให้ใช้อย่างถูกต้อง
            ทั้งจากบริษัทเราเอง หรือจาก True และ/หรือพันธมิตรอื่นตามสัญญา
            ห้ามทำซ้ำ ดัดแปลง หรือเผยแพร่เนื้อหาดังกล่าว
            ไม่ว่าจะทั้งหมดหรือบางส่วน
            โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากเจ้าของสิทธิ์หรือผู้ที่ได้รับสิทธิ์อย่างถูกต้อง
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            5. การปฏิเสธความรับผิด
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            ข้อมูลและบริการทั้งหมดบนเว็บไซต์นี้มีการให้ “ตามสภาพที่เป็น” (as is)
            เราไม่รับประกันความถูกต้อง ครบถ้วน หรือความพร้อมใช้งานได้ตลอดเวลา
            และขอปฏิเสธความรับผิดชอบใด ๆ
            ที่เกิดจากการใช้ข้อมูลหรือบริการบนเว็บไซต์นี้
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            6. การเปลี่ยนแปลงเงื่อนไข
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            เราขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงเงื่อนไขการให้บริการได้ทุกเมื่อ
            โดยจะแจ้งให้ทราบผ่านทางเว็บไซต์
            การใช้งานเว็บไซต์หลังมีการเปลี่ยนแปลง
            ถือเป็นการยอมรับเงื่อนไขที่แก้ไขเพิ่มเติมแล้ว
          </Typography>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนที่ 2: นโยบายความเป็นส่วนตัว (Privacy Policy) */}
        {/* ----------------------------------------------------------- */}
        <Box className="mb-10">
          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            7. การเก็บรวบรวมข้อมูล
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            เราอาจเก็บข้อมูลส่วนบุคคลของท่าน เช่น ชื่อ อีเมล หมายเลขโทรศัพท์
            หรือข้อมูลอื่น ๆ ที่ท่านให้ไว้โดยสมัครใจผ่านแบบฟอร์มลงทะเบียน
            หรือการติดต่อสอบถาม
            เพื่อใช้ในการติดต่อกลับหรือให้บริการตามที่ท่านร้องขอ
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            8. การเก็บและใช้งานคุกกี้ (Cookies)
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-2"
          >
            เราอาจใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อ:
          </Typography>
          <List className="mb-4">
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="8.1 จดจำการตั้งค่าหรือ session ของผู้ใช้"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="8.2 วิเคราะห์สถิติการใช้งาน (เช่น ผ่าน Google Analytics)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="8.3 รองรับการทำงานของปลั๊กอินหรือบริการจากบุคคลภายนอก (เช่น Meta Messenger)"
              />
            </ListItem>
          </List>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            หากคุกกี้เหล่านี้มีการเก็บข้อมูลที่อาจระบุตัวตน
            หรือใช้ในเชิงการตลาด/โฆษณา เราจะแจ้งให้ท่านทราบ
            และขอความยินยอมตามที่กฎหมายกำหนด
            ท่านสามารถปฏิเสธหรือลบคุกกี้ได้จากการตั้งค่าเบราว์เซอร์ของท่าน
          </Typography>

          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
            color="primary"
          >
            9. การเชื่อมต่อกับ Tawk Live Chat
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            เว็บไซต์ของเราอาจใช้ปลั๊กอินหรือ API ของ Tawk Live Chat
            เพื่อให้ท่านสามารถสื่อสารและติดต่อสอบถามได้สะดวกยิ่งขึ้น
            เมื่อท่านใช้ฟีเจอร์ดังกล่าว ข้อมูลบางส่วนอาจถูกส่งไปยัง Tawk.to เช่น
            ข้อความหรือรหัสผู้ใช้ โดยเป็นไปตามเงื่อนไขการใช้บริการ
            และนโยบายความเป็นส่วนตัวของ Tawk.to โปรดตรวจสอบข้อมูลเพิ่มเติมได้ที่{" "}
            <a
              href="https://www.tawk.to/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Tawk.to Privacy Policy
            </a>
            . หากท่านไม่ต้องการให้มีการประมวลผลข้อมูลผ่าน Tawk Live Chat
            กรุณาไม่ใช้บริการหรือปลั๊กอินดังกล่าว
          </Typography>

          <Typography
            color="primary"
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
          >
            10. การเปิดเผยข้อมูลให้บุคคลภายนอก
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก เว้นแต่:
          </Typography>
          <List className="mb-4">
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="10.1 ได้รับความยินยอมจากท่าน"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="10.2 เป็นคำสั่งหรือข้อบังคับทางกฎหมาย"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                primary="10.3 จำเป็นต่อการดำเนินงานของบริการภายนอกที่เกี่ยวข้อง (เช่น บริการชำระเงิน, ผู้ให้บริการ Messenger)"
              />
            </ListItem>
          </List>

          <Typography
            color="primary"
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
          >
            11. สิทธิ์ของท่านเกี่ยวกับข้อมูลส่วนบุคคล
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            ท่านมีสิทธิ์ขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่าน
            หากกฎหมายในเขตอำนาจของท่านรองรับ หากท่านต้องการใช้สิทธิ์ดังกล่าว
            กรุณาติดต่อเราผ่านช่องทางที่ระบุในเว็บไซต์
          </Typography>

          <Typography
            color="primary"
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-4"
          >
            12. การติดต่อ
          </Typography>
          <Typography
            color="textSecondary"
            fontFamily={"Prompt"}
            variant="body1"
            className="mb-4"
          >
            หากท่านมีคำถามเกี่ยวกับเงื่อนไขการให้บริการ
            หรือนโยบายความเป็นส่วนตัวของเรา สามารถติดต่อได้ที่อีเมล{" "}
            <strong>Truetelemart@hotmail.com</strong>
            หรือโทรศัพท์ <strong>66+ 910192552</strong> ในเวลาทำการ
          </Typography>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนท้าย */}
        {/* ----------------------------------------------------------- */}
        <Box className="text-center mt-8">
          <Typography
            fontFamily={"Prompt"}
            variant="body2"
            color="textSecondary"
          >
            เอกสารนี้เป็นเพียงตัวอย่างเบื้องต้น มิใช่คำแนะนำทางกฎหมาย
            ควรปรึกษาผู้เชี่ยวชาญเพื่อจัดทำข้อตกลงและนโยบายที่เหมาะสมกับธุรกิจของคุณ
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default TermsAndPrivacy;
