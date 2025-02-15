
import { bannerEnergy } from "@/datas/wEnergy/solar.data";

export default function BannerTop() {
    return (
        <div className="relative w-full h-full">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet={
                        bannerEnergy.find(
                            (bannerEnergy) => bannerEnergy.id === bannerEnergy.id
                        )?.image
                    }
                />
                <img
                    src={bannerEnergy[0]?.image}
                    alt={`bannerEnergy 1`}
                    className="w-full object-cover h-full"
                />
            </picture>
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end items-start pl-6 pb-6 md:justify-center md:items-start md:pl-20 md:pb-0 lg:pl-32">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                    W&W Energy - Solar Cell<br />
                    บริการติดตั้งโซล่าเซลล์
                </h1>
                <p className="text-white text-base md:text-xl mt-2 md:mt-4 drop-shadow-lg">
                    บริการรติดตั้งโซล่าเซลล์ (Solar Cell) ดำเนินกิจการตามมาตรฐานสากล<br />
                    ISO9001:2015 บริการสำรวจ ออกแบบติดตั้งระบบโซล่าเซลล์<br />
                    และการบำรุงรักษาระบบโซล่าเซลล์<br />
                </p>
            </div>
        </div>
    );
}
