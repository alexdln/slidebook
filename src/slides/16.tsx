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
            Security Considerations
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            {[
                { title: "Authentication", desc: "Secure admin access with key verification" },
                { title: "API Protection", desc: "Validate requests to prevent unauthorized access" },
                { title: "Data Validation", desc: "Sanitize inputs to prevent injection attacks" },
                { title: "Environment Variables", desc: "Store sensitive data securely" },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="bg-slate-100 p-4 rounded-lg border border-slate-200 flex"
                >
                    <div className="mr-4 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

export const Notes = () => (
    <p>
        Security Considerations
        <br />
        <br />
        <ul>
            <li>Authentication - Secure admin access with key verification</li>
            <li>API Protection - Validate requests to prevent unauthorized access</li>
            <li>Data Validation - Sanitize inputs to prevent injection attacks</li>
            <li>Environment Variables - Store sensitive data securely</li>
        </ul>
    </p>
);
