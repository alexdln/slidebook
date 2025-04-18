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
            Future Enhancements
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            {[
                { title: "User Authentication", desc: "Multiple host accounts with different permissions" },
                { title: "Slide Editor", desc: "Visual editor for creating and modifying slides" },
                { title: "Analytics", desc: "Track viewer engagement and interactions" },
                { title: "Export Options", desc: "Export presentations to PDF or other formats" },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="bg-blue-50 p-6 rounded-lg border border-blue-100"
                >
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h3>
                    <p className="text-slate-700">{item.desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

export const Notes = () => (
    <div>
        Future Enhancements
        <br />
        <br />
        <ul>
            <li>User Authentication - Multiple host accounts with different permissions</li>
            <li>Slide Editor - Visual editor for creating and modifying slides</li>
            <li>Analytics - Track viewer engagement and interactions</li>
            <li>Export Options - Export presentations to PDF or other formats</li>
        </ul>
    </div>
);
