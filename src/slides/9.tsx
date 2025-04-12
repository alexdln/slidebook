"use client";

import { motion } from "framer-motion";

export const Slide9 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Animation Techniques
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-blue-500/50 p-4 rounded-lg"
                >
                    <h3 className="font-semibold mb-2">Fade In</h3>
                    <div className="h-16 bg-blue-500 rounded flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        >
                            Fade Animation
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-green-500/50 p-4 rounded-lg"
                >
                    <h3 className="font-semibold mb-2">Scale</h3>
                    <div className="h-16 bg-green-500 rounded flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        >
                            Scale Animation
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <div className="space-y-4">
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-purple-500/50 p-4 rounded-lg"
                >
                    <h3 className="font-semibold mb-2">Slide</h3>
                    <div className="h-16 bg-purple-500 rounded flex items-center justify-center overflow-hidden">
                        <motion.div
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        >
                            Slide Animation
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="bg-orange-500/50 p-4 rounded-lg"
                >
                    <h3 className="font-semibold mb-2">Rotate</h3>
                    <div className="h-16 bg-orange-500 rounded flex items-center justify-center">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-8 h-8 bg-orange-300 rounded"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);
