import { motion } from "framer-motion";

export default function BannerproMonthy() {
    return (
        <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            src="/assets/monthy/monthybannertwo.webp"
            alt="Banner"
            className="w-full rounded-lg shadow-lg"
            />
        </motion.div>
        </>
    );
}