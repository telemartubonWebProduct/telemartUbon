import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";
import BasicSpeedDial from "@/components/SpeedDial/BasicSpeedDial";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box >
      <Navbar />
      <main>{children}</main>

      <BasicSpeedDial />

      <ScrollToTop />
      <Footer />

    </Box>
  );
}