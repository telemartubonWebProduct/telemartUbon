import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import BasicSpeedDial from "@/components/SpeedDial/BasicSpeedDial";
import Facebook from "@/components/Facebook";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Navbar />
      <main>{children}</main>

      <BasicSpeedDial />

      <ScrollToTop />
      <Footer />
      <Facebook />
    </Box>
  );
}
