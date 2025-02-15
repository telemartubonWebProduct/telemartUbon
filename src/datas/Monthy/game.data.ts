export interface GamePromotionItem {
    id: number;  // Use `number` instead of `string` if the ID is numeric
    title: string;
    speed?: string;
    validity: string;
    price: number;  // Change `price` to `number` since it's a numeric value
    vat: string;
    coupon?: string;
    iconCoupon?: { icon: string }[];
    note?: string;
}

// Fix PromotionGame to be an array of GamePromotionItem
export const PromotionGame: GamePromotionItem[] = [
    {
        id: 1,
        title: "เน็ตเต็มสปีด 10GB+PROHUB 30วัน ต่ออายุอัตโนมัติ",
        validity: "30 วัน",
        speed: "Max Speed 10 GB",
        price: 200,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 2,
        title: "เน็ต 10GB 30วัน + ประกันชีวิต 7,500บ. (ต่ออัตโนมัติ)",
        validity: "30 วัน",
        speed: "Max Speed 10 GB",
        price: 150,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 3,
        title: "เน็ตไม่อั้น 5Mbps (15GB) FUP 512Kbps 5วัน",
        validity: "5 วัน",
        speed: "5 Mbps ใช้ได้ 15GB",
        price: 50,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 4,
        title: "เน็ตไม่อั้น 20Mbps (Unlimited) FUP 5Mbps 30วัน",
        validity: "30 วัน",
        speed: "20 Mbps ใช้งานได้ไม่จำกัด",
        price: 300,
        vat: "ไม่รวม VAT",
        note: ""
    }
];

// Define the correct type for PromotionCouponLiftstyle
export const PromotionCouponLiftstyle: GamePromotionItem[] = [
    {
        id: 1,
        title: "Up2U All Cafe 119บาท เน็ตเต็มสปีด 5GB + รับฟรีคูปองเครื่องดื่ม All Café (16oz)",
        validity: "นาน 15 วัน",
        speed: "5 GB",
        coupon: "รับฟรีคูปองเครื่องดื่ม All Café 3 คูปอง",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/All_Cafe.webp",
            }
        ],
        price: 119,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 2,
        title: "Up2U All Cafe 210บาท เน็ตเต็มสปีด 10GB + รับฟรีคูปองเครื่องดื่ม All Café (16oz)",
        validity: "นาน 30 วัน ( ต่ออายุอัตโนมัติ)",
        speed: "10 GB",
        coupon: "รับฟรีคูปองเครื่องดื่ม All Café 6 คูปอง",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/All_Cafe.webp",
            }
        ],
        price: 210,
        vat: "รวม VAT",
        note: ""
    },
    {
        id: 3,
        title: "Up2U True Coffee 200บาท เน็ตเต็มสปีด 10GB + รับฟรีคูปองทรูคอฟฟี่ 200.-",
        validity: "นาน 30 วัน ( ต่ออายุอัตโนมัติ)",
        speed: "10 GB",
        coupon: "รับฟรีคูปองทรูคอฟฟี่ 200.-",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/True_Coffee.webp",
            }
        ],
        price: 200,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 4,
        title: "Up2U SF Cinema 200บาท เน็ตเต็มสปีด 10GB + รับฟรีคูปองตั๋วหนัง SF Cinema",
        validity: "นาน 30 วัน ( ต่ออายุอัตโนมัติ)",
        speed: "10 GB",
        coupon: "รับฟรีคูปองตั๋วหนัง SF Cinema",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/SF.webp",
            }
        ],
        price: 200,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 5,
        title: "Up2U McDonald's 200บาท เน็ตเต็มสปีด 10GB + รับฟรีคูปองแมคโดนัลด์ 200.-",
        validity: "นาน 30 วัน ( ต่ออายุอัตโนมัติ)",
        speed: "10 GB",
        coupon: "รับฟรีคูปองแมคโดนัลด์ 200.-",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/McDonalds (1).webp",
            }
        ],
        price: 200,
        vat: "ไม่รวม VAT",
        note: ""
    },
    {
        id: 6,
        title: "Up2U Au Bon Pain 79 บาท เน็ตเต็มสปีด 5GB + รับคูปองเงินสด Au Bon Pain 50 บ.",
        validity: "นาน 30 วัน",
        speed: "3 GB",
        coupon: "รับคูปองเงินสด Au Bon Pain 50 บ.",
        iconCoupon: [
            {
                icon: "/assets/monthy/icons/lifestyleIcon/Au_Bon_Pain.webp",
            }
        ],
        price: 200,
        vat: "ไม่รวม VAT",
        note: ""
    }
];
