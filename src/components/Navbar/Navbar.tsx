"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHideOnScroll } from "@/hooks/useScrollDirection";
import { mockData } from "@/datas/Navbar.data";



const containerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const hidden = useHideOnScroll(50);

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <motion.div
        className="hidden overflow-hidden md:block"
        animate={{
          height: hidden ? 0 : "auto",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full bg-white py-2 flex justify-between">
          <div className="mx-auto flex max-w-7xl items-center justify-start px-4">
            <Link href="#" className="px-4 text-lg text-black hover:text-red-600">
              บริษัทของเรา
            </Link>
            <span className="text-black">|</span>
            <Link href="/termsAndPrivacy" className="px-4 text-lg text-black hover:text-red-600">
            termsAndPrivacy
            </Link>
          </div>
          <div className="mx-auto flex max-w-7xl items-center justify-end px-4">
            <Link href="https://www.telemartmanagement.com/" className="px-4 text-lg text-black hover:text-red-600">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </motion.div>

      <nav className="relative w-full bg-white text-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="True Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end space-x-8 md:flex">
            {mockData.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="font-semibold text-gray-700 hover:text-red-600">
                  {item.title}
                </button>
                {activeDropdown === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                    className="absolute left-0 flex w-48 flex-col rounded-md bg-white py-2 shadow-lg"
                  >
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.link}
                        className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isOpen ? (
                <ClearIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex h-screen w-full flex-col bg-white px-4 py-6 md:hidden"
          >
            {mockData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 py-3">
                <button
                  className="flex w-full items-center justify-between font-semibold text-gray-700"
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{item.title}</span>
                  <ExpandMoreIcon
                    className={`transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mt-2 flex flex-col space-y-2 pl-4"
                  >
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.link}
                        className="text-sm text-gray-600 hover:text-red-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
