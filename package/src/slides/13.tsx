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
            Progress Tracking
        </motion.h2>
        <div className="flex-1 flex flex-col justify-center space-y-8">
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="h-8 bg-blue-500 rounded-full"
            />
            <div className="flex justify-between">
                <span className="font-medium">Slide 13 of 20</span>
                <span className="font-medium">65% Complete</span>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center text-slate-600"
            >
                <p>Progress is automatically tracked and displayed</p>
                <p>All viewers see the same progress in real-time</p>
            </motion.div>
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Progress Tracking
        <br />
        <br />
        <ul>
            <li>Progress is automatically tracked and displayed</li>
            <li>All viewers see the same progress in real-time</li>
        </ul>
    </div>
);
