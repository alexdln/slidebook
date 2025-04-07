"use client";

import { motion } from "framer-motion";

export const Slide15 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Real-time Collaboration
        </motion.h2>
        <div className="flex-1 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative w-full max-w-lg aspect-video bg-gray-50 rounded-lg p-4"
            >
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                    <span className="font-bold">A</span>
                </div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                    <span className="font-bold">B</span>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-300">
                    <span className="font-bold">C</span>
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-300">
                    <span className="font-bold">D</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="font-medium">All viewers see the same slide</p>
                        <p className="text-sm text-gray-600">in real-time</p>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);
