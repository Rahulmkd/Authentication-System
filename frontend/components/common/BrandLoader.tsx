"use client";
import { motion } from "framer-motion";

export const BrandLoader = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-2"
    >
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-white rotate-45" />
      </div>
      <span className="text-2xl font-black tracking-tighter">BRAND</span>
    </motion.div>
  </div>
);
