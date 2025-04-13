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
            Performance Optimization
        </motion.h2>
        <div className="flex-1 flex items-center">
            <div className="w-full space-y-6">
                {[
                    { title: "Code Splitting", desc: "Load only what's needed for each slide", value: 90 },
                    { title: "Lazy Loading", desc: "Defer loading of non-critical resources", value: 85 },
                    { title: "Caching", desc: "Store and reuse previously fetched resources", value: 75 },
                    {
                        title: "Optimized Animations",
                        desc: "Use hardware acceleration for smooth animations",
                        value: 95,
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                        className="space-y-2"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                            <span className="font-bold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <motion.div
                                className="bg-blue-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Performance Optimization
        <br />
        <br />
        <ul>
            <li>Code Splitting - Load only what&apos;s needed for each slide</li>
            <li>Lazy Loading - Defer loading of non-critical resources</li>
            <li>Caching - Store and reuse previously fetched resources</li>
            <li>Optimized Animations - Use hardware acceleration for smooth animations</li>
        </ul>
    </div>
);
