"use client";
import BannerEnergy from "@/components/wEnergy/Banner";
import Countshow from "@/components/wEnergy/Count";
import SolarInstallationSteps from "@/components/wEnergy/InstallationStep";
import Productnservice from "@/components/wEnergy/product";
import PromotionSolarcell from "@/components/wEnergy/Solarcell";
import Knowledge from "@/components/wEnergy/SolarcellKnowledge";
import SolarPackge from "@/components/wEnergy/SolarPackge";
import MainLayout from "@/layouts/MainLayout";
import { Box} from "@mui/material";

export default function WAndWEnergy() {
  return (
    <MainLayout>
      <Box sx={{bgcolor:"white"}}>
      
      <BannerEnergy/>
      <Countshow/>
      <Productnservice/>
      <PromotionSolarcell/>
      <SolarPackge/>
      <SolarInstallationSteps/>
      <Knowledge/>
      </Box>
    </MainLayout>
  );
}
