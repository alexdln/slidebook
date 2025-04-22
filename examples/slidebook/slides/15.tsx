"use client";

import { motion } from "framer-motion";

export const Slide = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
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
                className="relative w-full max-w-lg aspect-video bg-slate-50 rounded-lg p-4"
            >
                <div className="absolute top-16 left-16 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-300">
                    <span className="font-bold">A</span>
                </div>
                <div className="absolute top-8 right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-300">
                    <span className="font-bold">B</span>
                </div>
                <div className="absolute bottom-12 left-40 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center border-2 border-purple-300">
                    <span className="font-bold">C</span>
                </div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-300">
                    <span className="font-bold">D</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="font-medium">All viewers see the same slide</p>
                        <p className="text-sm text-slate-600">in real-time</p>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Real-time Collaboration
        <br />
        <br />
        <ul>
            <li>All viewers see the same slide in real-time</li>
            <li>Multiple viewers can interact with the same slide</li>
        </ul>
    </div>
);
