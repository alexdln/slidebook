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
            Architecture Overview
        </motion.h2>
        <div className="flex-1 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full max-w-2xl aspect-video bg-slate-50 rounded-lg p-4"
            >
                {/* Simple architecture diagram */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-blue-500 border border-blue-300 rounded flex items-center justify-center">
                    <p className="text-center font-medium">Client</p>
                </div>
                <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-green-500 border border-green-300 rounded flex items-center justify-center">
                    <p className="text-center font-medium">Next.js Server</p>
                </div>
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-20 bg-purple-500 border border-purple-300 rounded flex items-center justify-center">
                    <p className="text-center font-medium">Socket.io</p>
                </div>

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="25%" y1="25%" x2="50%" y2="75%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="75%" y1="25%" x2="50%" y2="75%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
            </motion.div>
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Architecture Overview
        <br />
        <br />
        <ul>
            <li>Client</li>
            <li>Next.js Server</li>
            <li>Socket.io</li>
        </ul>
    </div>
);
