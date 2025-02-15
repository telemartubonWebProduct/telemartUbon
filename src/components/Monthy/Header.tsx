import { useState } from "react";

interface HeaderTopupProps {
    onTabClick: (tab: string) => void;
}

export default function HeaderMonthy({ onTabClick }: HeaderTopupProps) {
    const [activeTab, setActiveTab] = useState<string>("ทั้งหมด");

    const tabs = ["ทั้งหมด", "เน็ตเพิ่มสปีด", "เน็ตไม่จำกัด", "เน็ตเล่นโซเซียล", "โทร", "ซีรีส์ & เอนเตอร์เทนเมนท์","ความคุ้มครอง", "เกม & ไลฟ์สไตล์",];

    return (
        <div className="flex items-center justify-center bg-white px-4 mt-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-full transition-all duration-500 ease-in-out ${
                            activeTab === tab
                                ? "bg-gray-500 text-white scale-110"
                                : "bg-transparent text-gray-700 hover:text-gray-900"
                        }`}
                        onClick={() => {
                            setActiveTab(tab);
                            onTabClick(tab);
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
