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
            Keyboard Navigation
        </motion.h2>
        <div className="flex-1 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-3 gap-4"
            >
                <div className="col-start-2">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-2xl">↑</span>
                    </div>
                </div>
                <div className="col-start-1 col-end-4 flex justify-center space-x-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-2xl">←</span>
                    </div>
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-2xl">↓</span>
                    </div>
                    <div className="w-16 h-16 bg-blue-500 text-slate-50 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-2xl">→</span>
                    </div>
                </div>
                <div className="col-span-3 mt-8 text-center">
                    <p className="text-lg">
                        Use <span className="font-bold">arrow keys</span> to navigate between slides
                    </p>
                    <p className="text-slate-600 mt-2">
                        Press <span className="font-mono bg-slate-100 px-2 py-1 rounded">Space</span> to advance to the
                        next slide
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Keyboard Navigation
        <br />
        <br />
        <ul>
            <li>Use arrow keys to navigate between slides</li>
            <li>Press Space to advance to the next slide</li>
        </ul>
    </div>
);
