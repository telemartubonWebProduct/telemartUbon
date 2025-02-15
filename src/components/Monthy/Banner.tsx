import { bannerMonthy, bannerMonthyMobile } from "@/datas/Monthy/Monthy.data";

export default function BannerMonthy() {
    return (
        <div className="relative w-full h-full">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet={
                        bannerMonthyMobile.find(
                            (bannerMonthyMobile) => bannerMonthyMobile.id === bannerMonthyMobile.id
                        )?.image
                    }
                />
                <img
                    src={bannerMonthy[0]?.image}
                    alt={`bannerMonthy 1`}
                    className="w-full object-cover h-full"
                />
            </picture>
        </div>
    );
}
