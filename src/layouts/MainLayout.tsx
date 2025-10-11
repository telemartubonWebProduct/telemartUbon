import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import TawkScript from "@/app/TawkScript";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Navbar />
      <main>{children}</main>
      <TawkScript />
      <ScrollToTop />
      <Footer />
     
    </Box>
  );
}
