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
            Resources & Documentation
        </motion.h2>
        <div className="grid grid-cols-3 gap-4">
            {[
                { title: "Next.js", url: "https://nextjs.org/docs" },
                { title: "Socket.io", url: "https://socket.io/docs/v4/" },
                { title: "Framer Motion", url: "https://www.framer.com/motion/" },
                { title: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
                { title: "TypeScript", url: "https://www.typescriptlang.org/docs/" },
                { title: "React", url: "https://reactjs.org/docs/getting-started.html" },
            ].map((item, index) => (
                <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="bg-slate-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center h-32"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-slate-500">Documentation</p>
                </motion.a>
            ))}
        </div>
    </div>
);

export const Notes = () => (
    <p>
        Resources & Documentation
        <br />
        <br />
        <ul>
            <li>Next.js</li>
            <li>Socket.io</li>
            <li>Framer Motion</li>
            <li>Tailwind CSS</li>
            <li>TypeScript</li>
            <li>React</li>
        </ul>
    </p>
);
