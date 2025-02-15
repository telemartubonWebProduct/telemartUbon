import React from "react";

export default function Sectiontwo() {
    return (
        <div className="relative w-full h-auto flex flex-col items-center bg-gradient-to-b from-blue-900 to-black py-8">
            <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[600px] text-center px-4 sm:px-6 md:px-12 lg:px-32 mt-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-lg">
                    กดเพื่อเช็กและรับสิทธิพิเศษของคุณ
                </h3>
                <ul className="text-white text-sm sm:text-base md:text-lg mt-4 space-y-3 drop-shadow-lg list-none text-left">
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 text-lg">✔</span>
                        <span>
                            สิทธิพิเศษลูกค้าสมัครใหม่ สุดคุ้มทั้งสายเกม สายซีรีส์ หรือสายกีฬา
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 text-lg">✔</span>
                        <span>
                            แพ็กเกจเน็ตบ้าน พร้อมสิทธิประโยชน์สุดคุ้มทั้งสายเกม สายซีรีส์ หรือสายกีฬา
                        </span>
                    </li>
                </ul>
                <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm sm:text-base font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:opacity-90">
                    กดเพื่อเช็กสิทธิ
                </button>
            </div>
        </div>
    );
}
