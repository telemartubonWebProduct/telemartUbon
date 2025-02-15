import { bannerTopup, bannerTopupMobile } from "@/datas/Topup/Topup.data";

export default function BannerTop() {
    return (
        <div className="relative w-full h-full">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet={
                        bannerTopupMobile.find(
                            (bannerTopupMobile) => bannerTopupMobile.id === bannerTopupMobile.id
                        )?.image
                    }
                />
                <img
                    src={bannerTopup[0]?.image}
                    alt={`bannerTopup 1`}
                    className="w-full object-cover h-full"
                />
            </picture>
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end items-start pl-6 pb-6 md:justify-center md:items-start md:pl-20 md:pb-0 lg:pl-32">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                    แพ็กเกจเสริม<br />
                    มือถือแบบเติมเงิน
                </h1>
                <p className="text-white text-base md:text-xl mt-2 md:mt-4 drop-shadow-lg">
                    คุ้ม ครบ ทุกไลฟ์สไตล์<br />
                    ไม่ว่าจะเน็ต โทร โซเชียล บันเทิง
                </p>
            </div>
        </div>
    );
}
