import { bannerBoardband, bannerBoardbandMobile } from "@/datas/Boardband/boardband.data";

export default function BannerBoardbandoldcus() {
    return (
        <div className="relative w-full h-full">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet={
                        bannerBoardbandMobile.find(
                            (bannerBoardbandMobile) => bannerBoardbandMobile.id === bannerBoardbandMobile.id
                        )?.image
                    }
                />
                <img
                    src={bannerBoardband[0]?.image}
                    alt={`bannerBoardband 1`}
                    className="w-full object-cover h-full"
                />
            </picture>
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end items-start pl-6 pb-6 md:justify-center md:items-start md:pl-20 md:pb-0 lg:pl-32">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                    แพ็กเกจ และ<br />
                    สิทธิพิเศษสำหรับ<br/>
                    ลูกค้าปัจจุบัน
                </h1>
                <p className="text-white text-base md:text-xl mt-2 md:mt-4 drop-shadow-lg">
                    อุปกรณ์ และแพ็กเกจเสริม<br />
                    ตอบโจทย์ไลฟ์สไตล์คุณ
                </p>
            </div>
        </div>
    );
}