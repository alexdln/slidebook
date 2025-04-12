"use client";

import { motion } from "framer-motion";

export const Slide1 = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
    >
        <motion.h1
            className="text-4xl font-bold mb-8"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            Welcome to the Slidebook
        </motion.h1>
        <motion.p
            className="text-xl text-slate-600"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
        >
            A real-time Advanced Presentation Tool
        </motion.p>
    </motion.div>
);
