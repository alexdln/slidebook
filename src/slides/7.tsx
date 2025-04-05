'use client';

import { motion } from "framer-motion";

export const Slide7 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Admin Features
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
                <h3 className="text-xl font-semibold mb-3">Secure Access</h3>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Simple key-based authentication</li>
                    <li>Protected admin route</li>
                    <li>Session management</li>
                </ul>
            </motion.div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
                <h3 className="text-xl font-semibold mb-3">Presentation Control</h3>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Navigate between slides</li>
                    <li>Real-time synchronization</li>
                    <li>Slide preview</li>
                </ul>
            </motion.div>
        </div>
    </div>
)
