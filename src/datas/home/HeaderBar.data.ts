interface  IMenuItem {
  src: string
  alt: string
  text: string
  path: string
}

export const menuItems : IMenuItem[] = [
    { src: "/assets/Icon/ico-package.svg", alt: "แพ็กเกจมือถือ", text: "แพ็กเกจมือถือ", path: "/topup" },
    { src: "/assets/Icon/ico-true-online.svg", alt: "แพ็กเกจเน็ตบ้าน", text: "แพ็กเกจเน็ตบ้าน", path: "/broadband" },
    { src: "/assets/Icon/ico-mobile-accessories.svg", alt: "มือถือและอุปกรณ์", text: "มือถือและอุปกรณ์", path: "/broadband-old#cctv" },
    { src: "/assets/Icon/ico-entertainment.svg", alt: "แพ็กเกจความบันเทิง", text: "แพ็กเกจความบันเทิง", path: "/monthy#entertainment" },
    { src: "/assets/Icon/ico-lifestyle.svg", alt: "ไลฟ์สไตล์", text: "ไลฟ์สไตล์", path: "/monthy#game" },
    { src: "/assets/Icon/ico-smart-living.svg", alt: "พลังงานทางเลือก", text: "พลังงานทางเลือก", path: "/wEnergy" },
  ];