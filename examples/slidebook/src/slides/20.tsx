"use client";

import { motion } from "framer-motion";

import { useNavigations } from "@slidebook/core/lib/providers/navigation/hooks";

export const Slide = () => {
    const { navigate, push } = useNavigations();

    return (
        <div className="w-full h-full flex flex-col">
            <motion.h2
                className="text-3xl font-bold mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Thank You!
            </motion.h2>
            <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-12 h-12 text-green-600"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Presentation Complete</h3>
                    <p className="text-slate-600 mb-6">You&apos;ve reached the end of the presentation</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate(1, "f")}
                            className="cursor-pointer px-4 py-2 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Restart
                        </button>
                        <button
                            onClick={() => push("/list")}
                            className="cursor-pointer px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
                        >
                            List View
                        </button>
                        <button
                            onClick={() => push("/host")}
                            className="cursor-pointer px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
                        >
                            Host Panel
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const Notes = () => <div>Thank You!</div>;
