import L1 from "/src/assets/promoteProduct/L1.webp";
import L2 from "/src/assets/promoteProduct/L2.webp";
import L3 from "/src/assets/promoteProduct/L3.webp";

import { StaticImageData } from "next/image";

interface PromotePromotoinData {
    id: number;
    imageSrc: string | StaticImageData; // Allow both
    alt: string;
    title: string;
    description: string; //asdsadasdsd


  }
  
 export const slides: PromotePromotoinData[] = [
    {
      id: 1,
      imageSrc: L1,
      alt: "Slide 1",
      title: "Promo Slide 1",
      description: "Description for slide 1",
    },
    {
      id: 2,
      imageSrc: L2,
      alt: "Slide 2",
      title: "Promo Slide 2",
      description: "Description for slide 2",
    },
    {
      id: 3,
      imageSrc: L3,
      alt: "Slide 3",
      title: "Promo Slide 3",
      description: "Description for slide 3",
    },
    {
      id: 4,
      imageSrc: L1,
      alt: "Slide 4",
      title: "Promo Slide 4",
      description: "Description for slide 4",
    },
    {
      id: 5,
      imageSrc: L2,
      alt: "Slide 5",
      title: "Promo Slide 5",
      description: "Description for slide 5",
    },
    {
      id: 6,
      imageSrc: L3,
      alt: "Slide 6",
      title: "Promo Slide 6",
      description: "Description for slide 6",
    },
    
    // Add as many slides as you want, or fetch them dynamically
  ];