import type { Cta, HomePage, LinkTarget } from "@/lib/content/schema";

import { t } from "../catalog/helpers";
import type { MediaId } from "../media";

const page = (path: string, hash?: string): LinkTarget => (hash ? { kind: "page", path, hash } : { kind: "page", path });

const promo = (packageId: string, image: MediaId) => ({ id: packageId, packageId, image });

const interested = (id: string): Cta => ({
  id,
  label: t("สนใจแพ็กเกจนี้", "I'm interested"),
  target: { kind: "contact", channel: "line-sales" },
  style: "primary",
});

// Copy follows docs/renovation/FREE-DESIGN-BRIEF.md (hero heading and CTAs)
// and the old site's section texts; it is draft copy for the owner to edit.
export const home: HomePage = {
  id: "home",
  path: "/",
  seo: {
    title: t("เน็ตบ้านทรู เน็ตมือถือ และโซลาร์เซลล์", "True home internet, mobile and solar"),
    description: t(
      "เทียบแพ็กเกจเน็ตบ้านทรูสำหรับลูกค้าใหม่และลูกค้าปัจจุบัน แพ็กเสริมมือถือ และโซลาร์เซลล์ W&W Energy เจ้าหน้าที่ช่วยเลือกและตรวจพื้นที่ติดตั้งให้",
      "Compare True home internet for new and current customers, mobile add-ons and W&W Energy solar. Our team helps you choose and checks installation at your address.",
    ),
  },
  hero: {
    film: "film-home-v1",
    filmNote: t("ภาพประกอบ ไม่ใช่ภาพเครือข่ายจริง", "Illustration, not the actual network"),
    beats: [
      {
        id: "choose",
        heading: t("เลือกเน็ตบ้านที่เหมาะกับทุกวันของคุณ", "Home internet that fits your every day"),
        body: t(
          "เทียบแพ็กเกจเน็ตบ้านทรูไฟเบอร์ทั้งความเร็ว ราคา และสิทธิประโยชน์ในที่เดียว แล้วให้เจ้าหน้าที่ช่วยตรวจพื้นที่และนัดติดตั้ง",
          "Compare True fibre packages by speed, price and benefits in one place, then let our team check your area and book the installation.",
        ),
        align: "start",
        // The film opens at dusk above the clouds: white words over the dark side gradient.
        textColor: "light",
      },
      {
        id: "network",
        heading: t("ไฟเบอร์จากเครือข่ายทรู ตรงถึงบ้านคุณ", "Fibre from the True network, all the way to your home"),
        body: t(
          "เลือกความเร็วตามการใช้งานของบ้าน ทั้งดูซีรีส์ ทำงาน และเล่นเกม",
          "Pick the speed your home needs for streaming, working and gaming.",
        ),
        align: "center",
        textColor: "light",
      },
      {
        id: "at-home",
        heading: t("ให้เราช่วยเลือก แล้วนัดติดตั้งถึงบ้าน", "We help you choose, then book the installation"),
        body: t(
          "ทักทาง LINE หรือโทรหาเรา เจ้าหน้าที่ตรวจพื้นที่ตามที่อยู่ของคุณ แล้วติดต่อกลับเพื่อยืนยัน",
          "Message us on LINE or call. We check installation at your address, then contact you to confirm.",
        ),
        align: "start",
        textColor: "light",
      },
    ],
    primaryCta: {
      id: "hero-broadband",
      label: t("ดูแพ็กเกจเน็ตบ้าน", "See home internet packages"),
      target: page("/broadband"),
      style: "primary",
    },
    secondaryCta: {
      id: "hero-contact",
      label: t("ติดต่อเจ้าหน้าที่", "Talk to our team"),
      target: page("/service"),
      style: "secondary",
    },
    note: t(
      "รับเรื่องจากทุกจังหวัด การติดตั้งขึ้นกับผลตรวจพื้นที่ตามที่อยู่",
      "We take requests from every province. Installation depends on a check of your address.",
    ),
  },
  equipment: {
    heading: t("อุปกรณ์ Wi-Fi ตามแพ็กเกจ", "Wi-Fi equipment with your package"),
    description: t(
      "การ์ดของแต่ละแพ็กเกจระบุอุปกรณ์ที่ได้รับ เช่น Router Wi-Fi, Mesh หรือกล่องทีวี เทียบได้ก่อนตัดสินใจ",
      "Each package card lists the equipment it includes, such as a Wi-Fi router, mesh units or a TV box, so you can compare before you decide.",
    ),
    points: [
      {
        id: "listed",
        title: t("รู้ก่อนว่าได้อุปกรณ์อะไร", "Know what equipment you get"),
        description: t("อุปกรณ์และสิทธิประโยชน์ของทุกแพ็กเกจเรียงไว้ในรูปแบบเดียวกัน", "Every package lists its equipment and benefits in the same order."),
      },
      {
        id: "installation",
        title: t("นัดติดตั้งถึงบ้าน", "Installation booked at your home"),
        description: t("เจ้าหน้าที่ตรวจพื้นที่ตามที่อยู่ แล้วนัดวันติดตั้งกับคุณ", "We check your address, then book an installation date with you."),
      },
      {
        id: "questions",
        title: t("ถามเรื่องอุปกรณ์ได้", "Ask us about the equipment"),
        description: t("ทักเจ้าหน้าที่ทาง LINE หรือโทรหาฝ่ายขาย", "Message our team on LINE or call our sales line."),
      },
    ],
    visual: "router-concept",
    visualNote: t("ภาพประกอบ ไม่ใช่รุ่นที่ติดตั้งจริง", "Illustration, not the exact model you receive"),
    tone: "canvas",
  },
  services: {
    heading: t("เลือกบริการที่ต้องการ", "What are you looking for?"),
    items: [
      {
        id: "broadband-new",
        icon: "router",
        title: t("เน็ตบ้าน ลูกค้าใหม่", "Home internet, new customers"),
        description: t("แพ็กเกจทรูไฟเบอร์พร้อมอุปกรณ์และสิทธิประโยชน์", "True fibre packages with equipment and benefits"),
        image: "flow-s1-family-streaming",
        target: page("/broadband"),
      },
      {
        id: "broadband-existing",
        icon: "router-upgrade",
        title: t("เน็ตบ้าน ลูกค้าปัจจุบัน", "Home internet, current customers"),
        description: t("เพิ่มสปีด กล้องวงจรปิด และบริการเสริม", "Speed boosts, security cameras and add-ons"),
        image: "flow-s6-technician",
        target: page("/broadband-old"),
      },
      {
        id: "mobile",
        icon: "phone",
        title: t("เน็ตมือถือ", "Mobile packages"),
        description: t("แพ็กเสริมรายเดือนและเติมเงิน ทั้งเน็ต โทร และความบันเทิง", "Postpaid and prepaid add-ons for data, calls and entertainment"),
        image: "flow-s4-mobile-city",
        target: page("/monthy"),
      },
      {
        id: "solar",
        icon: "solar",
        title: t("โซลาร์เซลล์", "Rooftop solar"),
        description: t("สำรวจ ออกแบบ และติดตั้งโซลาร์เซลล์บนหลังคา", "Survey, design and rooftop installation"),
        provider: t("บริการของ W&W Energy", "A W&W Energy service"),
        image: "solar-aerial",
        target: page("/wEnergy"),
      },
    ],
    tone: "canvas",
  },
  promos: {
    heading: t("โปรแนะนำ", "Recommended packages"),
    description: t(
      "เลือกหมวด แล้วเลื่อนดูแพ็กเกจที่เราแนะนำ ทักเจ้าหน้าที่เพื่อยืนยันราคาและเงื่อนไขล่าสุดก่อนสมัคร",
      "Pick a category and scroll through the packages we recommend. Message our team to confirm the latest price and terms before you sign up.",
    ),
    // Packages straight from the catalog; the cards show their price and terms as the catalog has them.
    tabs: [
      {
        id: "broadband",
        title: t("เน็ตบ้าน", "Home internet"),
        items: [
          promo("fiber-500-499", "flow-s2-work-from-home"),
          promo("fiber-700-599", "flow-s1-family-streaming"),
          promo("fiber-1g-799", "flow-s3-gamer"),
          promo("fiber-500-650-cctv", "flow-s6-technician"),
          promo("fiber-500-999-netflix", "flow-s5-friends-phone"),
          promo("fiber-1500-1199", "flow-s8-fibre"),
        ],
        packageCta: interested("home-package-interest"),
        viewAll: {
          id: "home-all-broadband",
          label: t("ดูแพ็กเกจเน็ตบ้านทั้งหมด", "See all home internet packages"),
          target: page("/broadband"),
          style: "secondary",
        },
      },
      {
        id: "monthly",
        title: t("มือถือรายเดือน", "Postpaid mobile"),
        items: [
          promo("m-boost-60gb", "flow-s4-mobile-city"),
          promo("m-unlimited-7d", "flow-s8-fibre"),
          promo("m-social-4-apps", "flow-s5-friends-phone"),
          promo("m-asian-combo-179", "flow-s1-family-streaming"),
          promo("m-up2u-true-coffee", "flow-s2-work-from-home"),
          promo("m-call-200", "flow-s7-support"),
        ],
        remark: t("แพ็กเสริมสำหรับลูกค้ามือถือรายเดือน", "Add-ons for postpaid mobile customers"),
        packageCta: interested("home-monthly-interest"),
        viewAll: {
          id: "home-all-monthly",
          label: t("ดูแพ็กเสริมรายเดือนทั้งหมด", "See all postpaid add-ons"),
          target: page("/monthy"),
          style: "secondary",
        },
      },
      {
        id: "prepaid",
        title: t("เติมเงิน", "Prepaid"),
        items: [
          promo("p-net-20mbps", "flow-s4-mobile-city"),
          promo("p-net-10mbps", "flow-s8-fibre"),
          promo("p-net-call-6mbps", "flow-s5-friends-phone"),
          promo("p-call-200", "flow-s7-support"),
          promo("p-game-prohub", "flow-s3-gamer"),
        ],
        remark: t("แพ็กเสริมสำหรับลูกค้ามือถือเติมเงิน", "Add-ons for prepaid mobile customers"),
        packageCta: interested("home-prepaid-interest"),
        viewAll: {
          id: "home-all-prepaid",
          label: t("ดูแพ็กเสริมเติมเงินทั้งหมด", "See all prepaid add-ons"),
          target: page("/topup"),
          style: "secondary",
        },
      },
      {
        id: "solar",
        title: t("โซลาร์เซลล์", "Solar"),
        items: [
          promo("solar-3kwp", "solar-rooftop"),
          promo("solar-5kwp", "solar-aerial"),
          promo("solar-10kwp", "solar-rooftop"),
        ],
        remark: t("บริการของ W&W Energy แยกจากแพ็กเกจของทรู", "A W&W Energy service, separate from True's packages"),
        packageCta: {
          id: "home-solar-interest",
          label: t("สอบถามแพ็กเกจนี้", "Ask about this package"),
          target: { kind: "contact", channel: "line-sales" },
          style: "primary",
        },
        viewAll: {
          id: "home-all-solar",
          label: t("ดูรายละเอียดโซลาร์เซลล์", "See solar details"),
          target: page("/wEnergy", "solar"),
          style: "secondary",
        },
      },
    ],
    tone: "ink",
  },
  mobile: {
    heading: t("แพ็กเสริมเน็ตมือถือ", "Mobile add-ons"),
    description: t("เลือกตามการใช้งาน ทั้งเน็ต โทร โซเชียล และความบันเทิง", "Pick by how you use your phone: data, calls, social apps or entertainment."),
    columns: [
      {
        id: "monthly",
        heading: t("รายเดือน", "Postpaid"),
        overview: { id: "home-mobile-monthly", label: t("ดูแพ็กเสริมรายเดือนทั้งหมด", "All postpaid add-ons"), target: page("/monthy") },
        links: [
          { id: "home-monthly-boost", label: t("เน็ตเพิ่มสปีด", "Speed boosts"), target: page("/monthy", "internetpure") },
          { id: "home-monthly-social", label: t("เน็ตเล่นโซเชียล", "Social and app data"), target: page("/monthy", "socialInternet") },
          { id: "home-monthly-entertainment", label: t("ซีรีส์และความบันเทิง", "Series and entertainment"), target: page("/monthy", "entertainment") },
          { id: "home-monthly-game", label: t("เกมและไลฟ์สไตล์", "Games and lifestyle"), target: page("/monthy", "game") },
        ],
      },
      {
        id: "prepaid",
        heading: t("เติมเงิน", "Prepaid"),
        overview: { id: "home-mobile-prepaid", label: t("ดูแพ็กเสริมเติมเงินทั้งหมด", "All prepaid add-ons"), target: page("/topup") },
        links: [
          { id: "home-prepaid-internet", label: t("เน็ต", "Data"), target: page("/topup", "internet") },
          { id: "home-prepaid-internet-call", label: t("เน็ตและโทร", "Data and calls"), target: page("/topup", "internetcall") },
          { id: "home-prepaid-call", label: t("โทร", "Calls"), target: page("/topup", "call") },
          { id: "home-prepaid-game", label: t("เกม", "Games"), target: page("/topup", "game") },
        ],
      },
    ],
    tone: "canvas",
  },
  steps: {
    heading: t("สมัครง่ายใน 3 ขั้นตอน", "Three steps to get connected"),
    items: [
      {
        id: "choose",
        title: t("เลือกบริการ", "Choose a service"),
        description: t("เทียบแพ็กเกจแล้วเลือกแบบที่ตรงกับการใช้งาน", "Compare the packages and pick the one that fits."),
      },
      {
        id: "get-in-touch",
        title: t("ฝากข้อมูล", "Get in touch"),
        description: t(
          "ส่งข้อความทาง LINE หรือโทรหาเจ้าหน้าที่ พร้อมบอกพื้นที่ที่ต้องการติดตั้ง",
          "Message us on LINE or call, and tell us where you need the service.",
        ),
      },
      {
        id: "check-and-call-back",
        title: t("ตรวจพื้นที่และติดต่อกลับ", "We check and call back"),
        description: t(
          "เจ้าหน้าที่ตรวจพื้นที่ติดตั้งตามที่อยู่ของคุณ แล้วติดต่อกลับเพื่อยืนยัน",
          "Our team checks installation at your address, then contacts you to confirm.",
        ),
      },
    ],
    tone: "canvas",
  },
  solar: {
    heading: t("โซลาร์เซลล์บนหลังคาบ้าน", "Rooftop solar"),
    description: t(
      "สำรวจหน้างาน ออกแบบโดยวิศวกร ติดตั้ง และยื่นขออนุญาตการไฟฟ้าให้ครบในที่เดียว",
      "Site survey, an engineer-designed layout, installation and the utility permit, handled in one place.",
    ),
    provider: t("บริการของ W&W Energy", "A W&W Energy service"),
    image: "solar-rooftop",
    cta: {
      id: "home-solar",
      label: t("ดูแพ็กเกจโซลาร์เซลล์", "See solar packages"),
      target: page("/wEnergy"),
      style: "secondary",
    },
    tone: "canvas",
  },
  faq: {
    heading: t("คำถามที่พบบ่อย", "Common questions"),
    items: [
      {
        id: "how-to-apply",
        question: t("สมัครเน็ตบ้านผ่านเว็บไซต์นี้อย่างไร", "How do I apply for home internet here?"),
        answer: t(
          "เลือกแพ็กเกจแล้วกด “สนใจแพ็กเกจนี้” เพื่อคุยกับเจ้าหน้าที่ทาง LINE หรือโทรหาฝ่ายขาย เจ้าหน้าที่จะสอบถามที่อยู่ ตรวจพื้นที่ติดตั้ง และนัดวันติดตั้งกับคุณ",
          "Pick a package and select “I'm interested” to chat with our team on LINE, or call our sales line. We'll ask for your address, check installation there and book a date with you.",
        ),
      },
      {
        id: "nationwide",
        question: t("รับติดตั้งทุกจังหวัดหรือไม่", "Do you install in every province?"),
        answer: t(
          "รับเรื่องจากทุกจังหวัด แต่การติดตั้งเน็ตบ้านและโซลาร์เซลล์ขึ้นกับผลตรวจพื้นที่และเงื่อนไขของแต่ละที่อยู่ เจ้าหน้าที่จะแจ้งผลก่อนยืนยันทุกครั้ง",
          "We take requests from every province, but home internet and solar installation depend on a check of each address and its conditions. We always tell you the result before confirming.",
        ),
      },
      {
        id: "existing-customers",
        question: t("เป็นลูกค้าทรูออนไลน์อยู่แล้ว เพิ่มสปีดได้ไหม", "I already have True Online. Can I get more speed?"),
        answer: t(
          "ได้ ดูแพ็กเกจเพิ่มสปีดและบริการเสริมได้ในหน้าลูกค้าปัจจุบัน บางแพ็กเกจสำหรับลูกค้าที่ใช้แพ็กเกจ 599 บาทขึ้นไป",
          "Yes. Speed boosts and add-ons are on the current-customers page. Some boosts are for customers on a 599-baht package or higher.",
        ),
      },
      {
        id: "solar-provider",
        question: t("โซลาร์เซลล์เป็นบริการของใคร", "Who provides the solar service?"),
        answer: t(
          "โซลาร์เซลล์เป็นบริการของ W&W Energy ซึ่งสำรวจ ออกแบบ และติดตั้งระบบ ราคาและเงื่อนไขแยกจากแพ็กเกจเน็ตบ้านและมือถือของทรู",
          "Solar is provided by W&W Energy, who survey, design and install the system. Its prices and terms are separate from True home internet and mobile packages.",
        ),
      },
    ],
    tone: "canvas",
  },
};
