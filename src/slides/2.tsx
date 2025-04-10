"use client";

import { motion } from "framer-motion";

export const Slide2 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Our Objectives
        </motion.h2>
        <div className="space-y-4">
            {[
                "Create engaging presentations",
                "Synchronize across devices",
                "Simple admin controls",
                "Smooth animations",
            ].map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="flex items-center"
                >
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                    <p className="text-xl">{item}</p>
                </motion.div>
            ))}
        </div>
    </div>
);
