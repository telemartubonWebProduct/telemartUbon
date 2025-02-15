export default function Bannertwo() {
    return (
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <picture>
                <source 
                    srcSet="/assets/HomeInternet/newCustomer/truebannermobile.webp" 
                    media="(max-width: 768px)" 
                    type="image/webp" 
                />
                <source 
                    srcSet="/assets/HomeInternet/newCustomer/truebanner.webp" 
                    media="(min-width: 769px)" 
                    type="image/webp" 
                />
                <img
                    src="/assets/HomeInternet/newCustomer/truebanner.webp"
                    alt="Banner"
                    className="w-full rounded-xl shadow-lg object-cover h-[300px] md:h-auto md:max-h-[500px] sm:aspect-square md:aspect-auto transition-transform duration-500 ease-in-out hover:scale-105"
                />
            </picture>
        </div>
    );
}
