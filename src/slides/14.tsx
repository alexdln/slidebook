"use client";

import { motion } from "framer-motion";

export const Slide14 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Responsive Design
        </motion.h2>
        <div className="flex-1 grid grid-cols-3 gap-6">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-16 h-32 border-4 border-slate-300 rounded-lg mb-4"></div>
                <h3 className="font-semibold">Mobile</h3>
                <p className="text-sm text-slate-600 text-center">Optimized for small screens</p>
            </motion.div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-32 h-24 border-4 border-slate-300 rounded-lg mb-4"></div>
                <h3 className="font-semibold">Tablet</h3>
                <p className="text-sm text-slate-600 text-center">Adjusted for medium screens</p>
            </motion.div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-48 h-32 border-4 border-slate-300 rounded-lg mb-4"></div>
                <h3 className="font-semibold">Desktop</h3>
                <p className="text-sm text-slate-600 text-center">Full experience on large screens</p>
            </motion.div>
        </div>
    </div>
);
