"use client";

import { motion } from "framer-motion";

export const Slide5 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            User Experience
        </motion.h2>
        <div className="flex flex-col space-y-6">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
            >
                <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                <p className="text-gray-600">Optimized for all screen sizes and devices</p>
            </motion.div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500"
            >
                <h3 className="text-xl font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-gray-600">Use arrow keys to navigate between slides</p>
            </motion.div>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"
            >
                <h3 className="text-xl font-semibold mb-2">Smooth Transitions</h3>
                <p className="text-gray-600">Elegant animations between slides and elements</p>
            </motion.div>
        </div>
    </div>
);
