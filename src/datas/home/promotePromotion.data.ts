import Slide1 from "/src/assets/promoteProduct/1.webp";
import Slide2 from "/src/assets/promoteProduct/2.webp";
import Slide3 from "/src/assets/promoteProduct/3.webp";
import Slide4 from "/src/assets/promoteProduct/4.webp";
import Slide5 from "/src/assets/promoteProduct/5.webp";
import Slide6 from "/src/assets/promoteProduct/6.webp";
import Slide7 from "/src/assets/promoteProduct/7.webp";
import Slide8 from "/src/assets/promoteProduct/8.webp";
import Slide9 from "/src/assets/promoteProduct/9.webp";
import Slide10 from "/src/assets/promoteProduct/10.webp";
import Slide11 from "/src/assets/promoteProduct/11.webp";
import Slide12 from "/src/assets/promoteProduct/12.webp";
import Slide13 from "/src/assets/promoteProduct/13.webp";

import { StaticImageData } from "next/image";

interface PromotePromotoinData {
    id: number;
    imageSrc: string | StaticImageData; // Allow both
    alt: string;
    title: string;
    description: string;
  }
  
 export const slides: PromotePromotoinData[] = [
    {
      id: 1,
      imageSrc: Slide1,
      alt: "Slide 1",
      title: "Promo Slide 1",
      description: "Description for slide 1",
    },
    {
      id: 2,
      imageSrc: Slide2,
      alt: "Slide 2",
      title: "Promo Slide 2",
      description: "Description for slide 2",
    },
    {
      id: 3,
      imageSrc: Slide3,
      alt: "Slide 3",
      title: "Promo Slide 3",
      description: "Description for slide 3",
    },
    {
      id: 4,
      imageSrc: Slide4,
      alt: "Slide 4",
      title: "Promo Slide 4",
      description: "Description for slide 4",
    },
    {
      id: 5,
      imageSrc: Slide5,
      alt: "Slide 5",
      title: "Promo Slide 5",
      description: "Description for slide 5",
    },
    {
      id: 6,
      imageSrc: Slide6,
      alt: "Slide 6",
      title: "Promo Slide 6",
      description: "Description for slide 6",
    },
    {
      id: 7,
      imageSrc: Slide7,
      alt: "Slide 7",
      title: "Promo Slide 7",
      description: "Description for slide 7",
    },
    {
      id: 8,
      imageSrc: Slide8,
      alt: "Slide 8",
      title: "Promo Slide 8",
      description: "Description for slide 8",
    },
    {
      id: 9,
      imageSrc: Slide9,
      alt: "Slide 9",
      title: "Promo Slide 9",
      description: "Description for slide 9",
    },
    {
      id: 10,
      imageSrc: Slide10,
      alt: "Slide 10",
      title: "Promo Slide 10",
      description: "Description for slide 10",
    },
    {
      id: 11,
      imageSrc: Slide11,
      alt: "Slide 11",
      title: "Promo Slide 11",
      description: "Description for slide 11",
    },
    {
      id: 12,
      imageSrc: Slide12,
      alt: "Slide 12",
      title: "Promo Slide 12",
      description: "Description for slide 12",
    },
    {
      id: 13,
      imageSrc: Slide13,
      alt: "Slide 13",
      title: "Promo Slide 13",
      description: "Description for slide 13",
    },
    // Add as many slides as you want, or fetch them dynamically
  ];