import type { MediaAsset } from "@/lib/content/schema";

// Every image the public pages use, with its origin. Files come from the old
// site's /public folder (commit 87c70d2); product, brand and photo assets are
// the business's own or its partners', and none is AI-generated. Rights for
// partner logos and True campaign artwork are to be confirmed by the owner.
const legacy = "เว็บเดิม public/";

function asset(
  src: string,
  width: number,
  height: number,
  kind: MediaAsset["kind"],
  th: string,
  en: string,
): MediaAsset {
  return { src, width, height, kind, alt: { th, en }, source: `${legacy}${src.slice(1)}` };
}

export const media = {
  // Brand
  "telemart-logo": asset("/logo.webp", 258, 92, "brand", "เทเลมาร์ท คอมมิวนิเคชั่น", "Telemart Communication"),
  "true-online-logo": asset("/assets/wEnergy/trueonline.png", 744, 117, "brand", "ทรูออนไลน์", "True Online"),
  "line-logo": asset("/assets/IcoSocialMedia/LINE_APP_iOS.png", 1001, 1000, "brand", "LINE", "LINE"),
  "facebook-logo": asset("/assets/IcoSocialMedia/facebook.png", 512, 512, "brand", "Facebook", "Facebook"),
  "line-qr": asset(
    "/assets/etc/lineScanAddFriend.webp",
    540,
    540,
    "brand",
    "คิวอาร์โค้ดเพิ่มเพื่อน LINE @341tmfte",
    "QR code to add LINE @341tmfte",
  ),

  // Home internet benefits (icons from the old package cards)
  "icon-wifi-router": asset("/assets/tol-ico/tol-icon-1.png", 106, 106, "product", "เราเตอร์ Wi-Fi", "Wi-Fi router"),
  "icon-wifi-router-pair": asset("/assets/tol-ico/Router.png", 200, 200, "product", "เราเตอร์ Wi-Fi 2 ตัว", "Two Wi-Fi routers"),
  "icon-wifi-tower": asset("/assets/tol-ico/tol-icon-2.png", 106, 106, "product", "อุปกรณ์ Wi-Fi ทรู ทรงตั้ง", "True Wi-Fi tower unit"),
  "icon-camera-indoor": asset("/assets/tol-ico/tol-icon-3.png", 106, 106, "product", "กล้องวงจรปิดในบ้าน", "Indoor security camera"),
  "icon-camera-outdoor": asset("/assets/tol-ico/Camera.png", 200, 200, "product", "กล้องวงจรปิดนอกบ้าน", "Outdoor security camera"),
  "icon-trueid-tv-box": asset("/assets/tol-ico/tol-icon-4.png", 106, 106, "product", "กล่อง TrueID TV และรีโมต", "TrueID TV box and remote"),
  "icon-dhipaya": asset("/assets/tol-ico/tol-icon-5.png", 106, 106, "brand", "ทิพยประกันภัย", "Dhipaya Insurance"),
  "icon-fwd": asset("/assets/tol-ico/ico-fwd.jpg", 212, 192, "brand", "FWD ประกันภัย", "FWD Insurance"),
  "icon-sim-10gb": asset("/assets/tol-ico/sim 10GB.png", 200, 200, "product", "ซิมทรู 5G เน็ต 10GB", "true 5G SIM with 10 GB"),
  "icon-sim-20gb": asset("/assets/tol-ico/sim 20GB.png", 200, 200, "product", "ซิมทรู 5G เน็ต 20GB", "true 5G SIM with 20 GB"),
  "icon-truevisions-now-joy": asset(
    "/assets/tol-ico/true-visions-now-joy.png",
    298,
    298,
    "brand",
    "ทรูวิชั่นส์ นาว จอย",
    "TrueVisions NOW JOY",
  ),
  "icon-iqiyi-24m": asset("/assets/tol-ico/iQIYI.png", 200, 200, "brand", "iQIYI ดูฟรี 24 เดือน", "iQIYI free for 24 months"),
  "icon-viu-24m": asset("/assets/tol-ico/viu.png", 200, 200, "brand", "Viu ดูฟรี 24 เดือน", "Viu free for 24 months"),
  "icon-netflix": asset("/assets/tol-ico/icon-netflix.png", 181, 180, "brand", "Netflix", "Netflix"),
  "icon-gaming-nation": asset("/assets/tol-ico/ico-gaming-nation.png", 180, 150, "brand", "Gaming Nation", "Gaming Nation"),
  "icon-ihavecpu": asset("/assets/tol-ico/image 352.png", 49, 49, "brand", "iHAVECPU", "iHAVECPU"),
  "icon-gaming-partner": asset(
    "/assets/tol-ico/image 354.png",
    141,
    136,
    "brand",
    "โลโก้พันธมิตรด้านเกม",
    "Gaming partner logo",
  ),

  // Existing-customer add-ons
  "cctv-offer": asset(
    "/assets/HomeInternet/oldcustomer/cctv_pro.webp",
    500,
    500,
    "promo",
    "กล้องวงจรปิดทรูสำหรับลูกค้าทรูออนไลน์",
    "True security camera for True Online customers",
  ),
  "trueid-tv-offer": asset(
    "/assets/HomeInternet/oldcustomer/TrueIDTV_pro.webp",
    500,
    500,
    "promo",
    "กล่อง TrueID TV พร้อมแพ็กเกจ TrueID",
    "TrueID TV box with a TrueID package",
  ),

  // Mobile partners
  "logo-iqiyi": asset("/assets/package-ico/icon-iQIYI-01.png", 124, 124, "brand", "iQIYI", "iQIYI"),
  "logo-viu": asset("/assets/package-ico/icon-viu-01.png", 124, 124, "brand", "Viu", "Viu"),
  "logo-wetv": asset("/assets/package-ico/icon-Wetv.png", 124, 124, "brand", "WeTV", "WeTV"),
  "logo-trueid": asset("/assets/monthy/icons/ico-trueID.webp", 180, 65, "brand", "TrueID", "TrueID"),
  "logo-all-cafe": asset("/assets/monthy/icons/lifestyleIcon/All_Cafe.webp", 150, 152, "brand", "ออล คาเฟ่", "All Café"),
  "logo-true-coffee": asset("/assets/monthy/icons/lifestyleIcon/True_Coffee.webp", 150, 152, "brand", "ทรูคอฟฟี่", "True Coffee"),
  "logo-sf": asset("/assets/monthy/icons/lifestyleIcon/SF.webp", 150, 152, "brand", "เอส เอฟ ซีเนม่า", "SF Cinema"),
  "logo-mcdonalds": asset("/assets/monthy/icons/lifestyleIcon/McDonalds (1).webp", 150, 150, "brand", "แมคโดนัลด์", "McDonald's"),
  "logo-au-bon-pain": asset("/assets/monthy/icons/lifestyleIcon/Au_Bon_Pain.webp", 150, 152, "brand", "โอ ปอง แปง", "Au Bon Pain"),
  "logo-starbucks": asset(
    "/assets/monthy/icons/starbucks-card-e-coupon.webp",
    500,
    281,
    "brand",
    "สตาร์บัคส์ อี-คูปอง",
    "Starbucks e-coupon",
  ),

  // W&W Energy solar
  "solar-rooftop": asset(
    "/assets/solar/wwenergy_bg1-scaled-e1729143100746.webp",
    2560,
    1220,
    "photo",
    "แผงโซลาร์เซลล์บนหลังคาบ้าน",
    "Solar panels on a house roof",
  ),
  "solar-products": asset(
    "/assets/solar/wwenergy_product-scaled.webp",
    2560,
    1440,
    "promo",
    "แผงโซลาร์เซลล์ LONGi และอินเวอร์เตอร์ Huawei",
    "LONGi solar panels and a Huawei inverter",
  ),
  "solar-aerial": asset(
    "/assets/wEnergy/stepinstall.webp",
    768,
    464,
    "photo",
    "ภาพมุมสูงหลังคาที่ติดตั้งโซลาร์เซลล์ของ WERWIND Energy",
    "Aerial view of a roof with a WERWIND Energy solar installation",
  ),
  "solar-knowledge-1": asset("/assets/wEnergy/knowledge/install1.webp", 300, 169, "photo", "บ้านที่ติดตั้งแผงโซลาร์เซลล์บนหลังคา", "House with rooftop solar panels"),
  "solar-knowledge-2": asset("/assets/wEnergy/knowledge/install2.webp", 300, 169, "photo", "แผงโซลาร์เซลล์บนหลังคากระเบื้อง", "Solar panels on a tiled roof"),
  "solar-knowledge-3": asset("/assets/wEnergy/knowledge/install3.webp", 300, 169, "photo", "ภาพมุมสูงสำรวจหลังคาบ้าน", "Aerial survey of house roofs"),
  "solar-knowledge-4": asset("/assets/wEnergy/knowledge/install4.webp", 300, 247, "photo", "แบบติดตั้งโครงสร้างแผงโซลาร์เซลล์", "Mounting drawing for solar panels"),
  "solar-knowledge-5": asset("/assets/wEnergy/knowledge/install5.webp", 300, 266, "photo", "แผงโซลาร์เซลล์บนหลังคาเมทัลชีท", "Solar panels on a metal-sheet roof"),
  "solar-knowledge-6": asset("/assets/wEnergy/knowledge/install6.webp", 300, 195, "photo", "อินเวอร์เตอร์ที่ติดตั้งบนผนัง", "Inverter mounted on a wall"),
  "solar-knowledge-7": asset("/assets/wEnergy/knowledge/install7.webp", 300, 236, "photo", "หน้าจอแอปติดตามการผลิตไฟฟ้า", "Monitoring app showing power production"),
  "solar-knowledge-8": asset("/assets/wEnergy/knowledge/install8.webp", 300, 170, "photo", "การล้างทำความสะอาดแผงโซลาร์เซลล์", "Cleaning solar panels"),

  // Apply with an agent
  "agent-support": asset(
    "/assets/HomeInternet/home-tol-Applywithagent.webp",
    720,
    404,
    "photo",
    "เจ้าหน้าที่ใส่ชุดหูฟังพร้อมให้คำปรึกษา",
    "Staff member with a headset ready to help",
  ),
} satisfies Record<string, MediaAsset>;

export type MediaId = keyof typeof media;
