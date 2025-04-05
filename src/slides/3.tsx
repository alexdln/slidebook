'use client';

import { motion } from "framer-motion";

export const Slide3 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Key Features
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            {[
                { title: "Real-time Sync", desc: "All viewers see the same slide" },
                { title: "Admin Controls", desc: "Simple authentication system" },
                { title: "Animations", desc: "Smooth transitions between elements" },
                { title: "Progress Tracking", desc: "Clear indication of presentation progress" },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="bg-gray-100 p-4 rounded-lg"
                >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
)
