import type { LinkTarget, SiteSettings } from "@/lib/content/schema";
import { defaultTheme } from "@/lib/content/theme";

import { t } from "./catalog/helpers";

const page = (path: string, hash?: string): LinkTarget => (hash ? { kind: "page", path, hash } : { kind: "page", path });

// Contact details come from the old footer, service page and package buttons.
// The old site used two LINE links: package buttons opened lineSales and the
// service page opened lineService. Which account is @341tmfte is unconfirmed.
export const site: SiteSettings = {
  brand: {
    name: t("เทเลมาร์ท อุบล", "Telemart Ubon"),
    legalName: t("บริษัท เทเลมาร์ท คอมมิวนิเคชั่น จำกัด", "Telemart Communication Co., Ltd."),
    logo: "telemart-logo",
  },
  contact: {
    lineSales: "https://lin.ee/blqnOJow",
    lineService: "https://lin.ee/eMhqQpj",
    lineId: "@341tmfte",
    lineQr: "line-qr",
    phones: [
      { number: "0910192552", label: t("ฝ่ายขาย", "Sales") },
      { number: "0902518964", label: t("ฝ่ายขาย", "Sales") },
      { number: "0841041506", label: t("ฝ่ายขาย", "Sales") },
    ],
    email: "Truetelemart@hotmail.com",
    facebook: "https://www.facebook.com/profile.php?id=61571963492436",
  },
  navigation: [
    {
      id: "home-internet",
      label: t("เน็ตบ้าน", "Home internet"),
      children: [
        { id: "broadband-new", label: t("ลูกค้าใหม่", "New customers"), target: page("/broadband") },
        { id: "broadband-existing", label: t("ลูกค้าปัจจุบัน", "Current customers"), target: page("/broadband-old") },
        { id: "apply-with-agent", label: t("สมัครผ่านเจ้าหน้าที่", "Apply through our team"), target: page("/wifiService") },
      ],
    },
    {
      id: "mobile",
      label: t("เน็ตมือถือ", "Mobile"),
      children: [
        { id: "mobile-monthly", label: t("รายเดือน", "Postpaid"), target: page("/monthy") },
        { id: "mobile-prepaid", label: t("เติมเงิน", "Prepaid"), target: page("/topup") },
      ],
    },
    { id: "solar", label: t("โซลาร์เซลล์", "Solar"), target: page("/wEnergy") },
    { id: "contact", label: t("ติดต่อเรา", "Contact"), target: page("/service") },
  ],
  headerCta: {
    id: "header-contact",
    label: t("ติดต่อเจ้าหน้าที่", "Talk to our team"),
    target: page("/service"),
    style: "primary",
  },
  footer: {
    about: t(
      "แพ็กเกจเน็ตบ้านทรู เน็ตมือถือ และโซลาร์เซลล์ W&W Energy เจ้าหน้าที่ช่วยเลือกและติดต่อกลับ รับเรื่องจากทุกจังหวัด",
      "True home internet, mobile packages and W&W Energy solar. Our team helps you choose and calls you back, wherever you are in Thailand.",
    ),
    groups: [
      {
        id: "services",
        heading: t("บริการ", "Services"),
        links: [
          { id: "footer-broadband-new", label: t("เน็ตบ้านลูกค้าใหม่", "Home internet for new customers"), target: page("/broadband") },
          { id: "footer-broadband-existing", label: t("เน็ตบ้านลูกค้าปัจจุบัน", "Home internet for current customers"), target: page("/broadband-old") },
          { id: "footer-mobile-monthly", label: t("เน็ตมือถือรายเดือน", "Postpaid mobile"), target: page("/monthy") },
          { id: "footer-mobile-prepaid", label: t("เน็ตมือถือเติมเงิน", "Prepaid mobile"), target: page("/topup") },
          { id: "footer-solar", label: t("โซลาร์เซลล์ W&W Energy", "W&W Energy solar"), target: page("/wEnergy") },
        ],
      },
      {
        id: "help",
        heading: t("ช่วยเหลือ", "Help"),
        links: [
          { id: "footer-contact", label: t("ติดต่อเรา", "Contact us"), target: page("/service") },
          { id: "footer-apply-with-agent", label: t("สมัครผ่านเจ้าหน้าที่", "Apply through our team"), target: page("/wifiService") },
          { id: "footer-terms", label: t("ข้อตกลงและนโยบายความเป็นส่วนตัว", "Terms and privacy policy"), target: page("/termsAndPrivacy") },
          {
            id: "footer-staff-system",
            label: t("ระบบจัดการสำหรับเจ้าหน้าที่", "Staff management system"),
            target: { kind: "external", url: "https://www.telemartmanagement.com/" },
          },
        ],
      },
    ],
    copyright: t("บริษัท เทเลมาร์ท คอมมิวนิเคชั่น จำกัด สงวนลิขสิทธิ์", "Telemart Communication Co., Ltd. All rights reserved."),
  },
  contactBand: {
    heading: t("คุยกับเจ้าหน้าที่", "Talk to our team"),
    description: t(
      "ถามเรื่องแพ็กเกจหรือให้ช่วยเลือกได้ทาง LINE และโทรศัพท์ รับเรื่องจากทุกจังหวัด เจ้าหน้าที่ตรวจพื้นที่ติดตั้งตามที่อยู่ของคุณก่อนยืนยัน",
      "Ask about packages or get help choosing on LINE or by phone. We take requests from every province and check installation at your address before confirming.",
    ),
    tone: "surface",
  },
  ui: {
    skipToContent: t("ข้ามไปยังเนื้อหา", "Skip to content"),
    menu: t("เมนู", "Menu"),
    closeMenu: t("ปิดเมนู", "Close menu"),
    mainNavigation: t("เมนูหลัก", "Main"),
    languageSwitch: t("เปลี่ยนภาษา", "Change language"),
    speed: t("ความเร็ว ดาวน์โหลด/อัปโหลด", "Speed, download/upload"),
    audience: t("เหมาะกับ", "For"),
    allowance: t("การใช้งาน", "Includes"),
    validity: t("ระยะเวลา", "Valid for"),
    contract: t("สัญญา", "Contract"),
    benefits: t("สิทธิประโยชน์", "Benefits"),
    details: t("รายละเอียด", "Details"),
    conditions: t("เงื่อนไข", "Conditions"),
    dialCode: t("กดสมัคร", "Dial to subscribe"),
    perMonth: t("บาท/เดือน", "THB a month"),
    baht: t("บาท", "THB"),
    vatExcluded: t("ไม่รวม VAT", "Excludes VAT"),
    vatIncluded: t("รวม VAT แล้ว", "Includes VAT"),
    regularPrice: t("ราคาปกติ", "Regular price"),
    offerPrice: t("ราคาเสนอ", "Offer price"),
    emptyGroup: t(
      "หมวดนี้ยังไม่มีแพ็กเกจที่ตรวจข้อมูลแล้ว สอบถามแพ็กเกจล่าสุดกับเจ้าหน้าที่ได้",
      "No checked packages in this category yet. Ask our team for the latest offers.",
    ),
    jumpTo: t("ไปยังหมวด", "Jump to"),
    contents: t("หัวข้อในหน้านี้", "On this page"),
    call: t("โทร", "Call"),
    email: t("อีเมล", "Email"),
    chatOnLine: t("แชตทาง LINE", "Chat on LINE"),
    lineId: t("ไลน์ไอดี", "LINE ID"),
    facebook: t("เฟซบุ๊ก", "Facebook"),
    opensInNewTab: t("เปิดในแท็บใหม่", "opens in a new tab"),
    footerContact: t("ติดต่อ", "Contact"),
    filmScenes: t("ฉากในหนังเปิดหน้า", "Scenes of the opening film"),
    filmSkip: t("ข้ามไปเนื้อหาถัดไป", "Skip to the next section"),
    packageDetails: t("ดูรายละเอียด", "See details"),
    scrollPrevious: t("เลื่อนไปการ์ดก่อนหน้า", "Scroll to the previous cards"),
    scrollNext: t("เลื่อนไปการ์ดถัดไป", "Scroll to the next cards"),
    findPackage: t("ค้นหาแพ็กเกจ", "Find a package"),
    filterSpeed: t("ความเร็ว", "Speed"),
    filterPrice: t("ราคาไม่เกิน", "Price up to"),
    filterBenefit: t("มีสิทธิประโยชน์", "With"),
    filterAny: t("ทั้งหมด", "Any"),
    sortBy: t("เรียงตาม", "Sort by"),
    sortRecommended: t("แนะนำ", "Recommended"),
    sortPriceLow: t("ราคาต่ำไปสูง", "Price, low to high"),
    sortPriceHigh: t("ราคาสูงไปต่ำ", "Price, high to low"),
    sortSpeed: t("เร็วที่สุดก่อน", "Fastest first"),
    resultCount: t("แสดง {shown} จาก {total} แพ็กเกจ", "Showing {shown} of {total} packages"),
    clearFilters: t("ล้างตัวกรอง", "Clear filters"),
    noMatches: t("ไม่มีแพ็กเกจในหมวดนี้ที่ตรงกับตัวกรอง", "No package in this section matches your filters."),
    compareAdd: t("เปรียบเทียบ", "Compare"),
    compareChosen: t("เลือกเปรียบเทียบ {count} จาก 3", "{count} of 3 chosen to compare"),
    compareOpen: t("เปรียบเทียบแพ็กเกจ", "Compare packages"),
    compareMore: t("เลือกอีกอย่างน้อย 1 แพ็กเกจเพื่อเปรียบเทียบ", "Choose at least one more package to compare"),
    compareLimit: t("เปรียบเทียบได้ครั้งละไม่เกิน 3 แพ็กเกจ", "You can compare up to 3 packages at a time"),
    compareClear: t("ล้างที่เลือก", "Clear"),
    close: t("ปิด", "Close"),
    breadcrumb: t("ตำแหน่งของหน้านี้", "You are here"),
    homeLink: t("หน้าแรก", "Home"),
    unverifiedNote: t("ราคาและเงื่อนไขมาจากข้อมูลเดิมของร้าน อาจไม่ใช่ข้อมูลล่าสุด กรุณายืนยันกับเจ้าหน้าที่ก่อนสมัคร", "This price and these terms come from our earlier listings and may not be current. Please confirm with our team before you sign up."),
    packageContactNote: t("ทัก LINE หรือโทรหาเรา เจ้าหน้าที่จะตรวจพื้นที่และติดต่อกลับเพื่อยืนยันการสมัคร", "Message us on LINE or call. We check your area and get back to you to confirm."),
    callSales: t("โทรหาฝ่ายขาย", "Call our sales team"),
  },
  seo: {
    siteName: t("เทเลมาร์ท อุบล", "Telemart Ubon"),
    description: t(
      "แพ็กเกจเน็ตบ้านทรู เน็ตมือถือ และโซลาร์เซลล์ W&W Energy คุยกับเจ้าหน้าที่ทาง LINE หรือโทรได้จากทุกจังหวัด",
      "True home internet, mobile packages and W&W Energy solar. Talk to our team on LINE or by phone from any province in Thailand.",
    ),
    // Shown when a page is shared on LINE or Facebook; pages can set their own.
    image: "og-image",
  },
  theme: defaultTheme,
  integrations: {
    googleAdsId: "AW-18007307609",
    googleAdsHomeConversion: "AW-18007307609/51JQCLqnuIYcENnqxopD",
    tawkSrc: "https://embed.tawk.to/67c0738b25eb41190eae9189/1il3s6mmf",
  },
};
