"use client";

import { Fragment } from "@/components/fragment";
import { motion } from "framer-motion";

export const Slide = () => (
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
                <Fragment key={index} index={index + 1}>
                    <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                    >
                        <h3 className="text-lg font-semibold text-blue-700">{tech.name}</h3>
                        <p className="text-sm text-slate-600">{tech.desc}</p>
                    </motion.div>
                </Fragment>
            ))}
        </div>
    </div>
);

export const Notes = () => (
    <div>
        We use the following technologies to create our presentation tool:
        <br />
        <br />
        <ul>
            <li>Next.js</li>
            <li>Socket.io</li>
            <li>Framer Motion</li>
            <li>Tailwind CSS</li>
            <li>TypeScript</li>
            <li>API Routes</li>
        </ul>
    </div>
);
