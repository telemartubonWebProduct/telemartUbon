// import { useState } from "react";

// export default function HeaderBoardband() {
//     const [activeTab, setActiveTab] = useState("แพ็กเสริม");

//     const tabs = ["แพ็กเสริม", "อุปกรณ์แนะนำ", "อุปกรณ์เสริม", "รับสิทธิ์/ปรับสปีด", "สิทธิพิเศษ", "จ่ายบิล/แก้ปัญหาเน็ต"];

//     return (
//         <div className="flex items-center justify-center bg-white px-4">
//             <div className="flex flex-wrap justify-center gap-2 md:gap-4">
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab}
//                         className={`px-4 py-2 rounded-full transition-all duration-500 ease-in-out ${
//                             activeTab === tab
//                                 ? "bg-gray-500 text-white scale-110"
//                                 : "bg-transparent text-gray-700 hover:text-gray-900"
//                         }`}
//                         onClick={() => setActiveTab(tab)}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }
