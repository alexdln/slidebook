"use client";

import { motion } from "framer-motion";

export const Slide4 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Technology Stack
        </motion.h2>
        <div className="grid grid-cols-3 gap-4">
            {[
                { name: "Next.js", desc: "React framework" },
                { name: "Socket.io", desc: "Real-time communication" },
                { name: "Framer Motion", desc: "Animation library" },
                { name: "Tailwind CSS", desc: "Utility-first CSS" },
                { name: "TypeScript", desc: "Type-safe JavaScript" },
                { name: "API Routes", desc: "Backend functionality" },
            ].map((tech, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                >
                    <h3 className="text-lg font-semibold text-blue-700">{tech.name}</h3>
                    <p className="text-sm text-gray-600">{tech.desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
);
