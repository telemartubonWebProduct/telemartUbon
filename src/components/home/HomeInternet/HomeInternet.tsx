import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { items } from "@/datas/home/homeInternet.data";
import Link from "next/link";



export default function HomeInternet() {
  return (
    <Box>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
        <Typography fontFamily={"Prompt"} variant="h5" color="initial">
          เน็ตบ้าน
        </Typography>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {items.map((item, index) => (
            <motion.div
            
              key={index}
              className="flex flex-col rounded-3xl border border-gray-200 bg-white shadow-md"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2), 0px 5px 15px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href={item.path}>
              <div className="h-68 mb-4 bg-gray-100 rounded-t-3xl overflow-hidden relative">
                <motion.img
                  src={item.img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  />
              </div>
              <h3 className="text-lg text-black font-semibold mb-2 px-4">
                {item.title}
              </h3>
              <p className="mb-4 text-gray-600 px-4">{item.description}</p>
              <div className="flex space-x-2 mt-auto px-4 mb-4">
                {item.promotion.map((promo, pIndex) => (
                  <motion.img
                  key={pIndex}
                    src={promo.icon}
                    alt={`Promotion icon ${pIndex}`}
                    className="w-14 h-14"
                    />
                  ))}
              </div>
                  </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Box>
  );
}