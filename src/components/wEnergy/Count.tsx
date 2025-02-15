import { Count } from "@/datas/wEnergy/solar.data";
import { Box, Typography } from "@mui/material";

export default function Countshow() {
  return (
    <Box sx={{ backgroundColor: "#fff", padding: "20px" }}>
      <Box sx={{ mt: "15px", mb: "15px" }}>
        {Count.map((count, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px 0",
              gap: { xs: "10px", sm: "0" },
            }}
          >
            <Typography
              sx={{
                color: "#002549",
                textAlign: "center",
                fontSize: { xs: "32px", sm: "48px" },
                fontWeight: "bold",
                fontFamily: "Prompt",
              }}
            >
              {count.province} <br />
              <Typography
                component="p"
                className="text-[14px]"
                sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: "5px" }}
              >
                จังหวัด
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: "#002549",
                textAlign: "center",
                fontSize: { xs: "32px", sm: "48px" },
                fontWeight: "bold",
                fontFamily: "Prompt",
              }}
            >
              {count.team} <br />
              <Typography
                component="p"
                className="text-[14px]"
                sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: "5px" }}
              >
                ทีมติดตั้ง
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: "#002549",
                textAlign: "center",
                fontSize: { xs: "32px", sm: "48px" },
                fontWeight: "bold",
                fontFamily: "Prompt",
              }}
            >
              {count.project} <br />
              <Typography
                component="p"
                className="text-[14px]"
                sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: "5px" }}
              >
                โครงการ
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: "#002549",
                textAlign: "center",
                fontSize: { xs: "32px", sm: "48px" },
                fontWeight: "bold",
                fontFamily: "Prompt",
              }}
            >
              {count.solarcell} <br />
              <Typography
                component="p"
                className="text-[14px]"
                sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: "5px" }}
              >
                พลังงานโซล่าเซลล์ (kW)
              </Typography>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
