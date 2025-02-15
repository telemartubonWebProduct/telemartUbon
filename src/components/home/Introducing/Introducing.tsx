import Image from "next/image";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

export default function SectionBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={`bg-black pt-8 flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center items-center`}>
      <div className={isMobile ? 'mb-6' : ''}>
        <Image
          src="/assets/imgAiPromote/ai-sectionBanner.webp"
          alt="Banner"
          width={isMobile ? 250 : 350}
          height={isMobile ? 250 : 350}
        />
      </div>
      <div className={isMobile ? 'text-center' : 'ml-6'}>
        <Typography variant={isMobile ? "h5" : "h4"} color="#ffffff">ยินดีต้อนรับเข้าสู่</Typography>
        <motion.div
          animate={{
            color: ["#FF0000", "#00FF00", "#0000FF", "#FF0000"],
            textShadow: [
              "0px 0px 10px rgb(255,0,0)",
              "0px 0px 10px rgb(0,255,0)",
              "0px 0px 10px rgb(0,0,255)",
              "0px 0px 10px rgb(255,0,0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
          }}
        >
          <Typography fontFamily={"Prompt"} variant={isMobile ? "h5" : "h4"}>
            Telemart communication
          </Typography>
        </motion.div>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="my-2"
        >
          <Typography fontFamily={"Prompt"} variant={isMobile ? "h6" : "h5"}>
          เชื่อมต่อทุกไลฟ์สไตล์ ด้วยอินเทอร์เน็ตและพลังงานทางเลือก
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}
