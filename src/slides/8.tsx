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
            Socket.io Integration
        </motion.h2>
        <div className="flex-1 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-slate-200 p-4 rounded-lg border border-slate-200 mb-4"
            >
                <pre className="text-sm overflow-x-auto p-2 bg-slate-100 rounded">
                    <code>{`// Server-side
io.on("connection", (socket) => {
socket.on("changeSlide", (slideNumber) => {
currentSlide = slideNumber;
io.emit("slideChange", slideNumber);
});
});`}</code>
                </pre>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-slate-200 p-4 rounded-lg border border-slate-200"
            >
                <pre className="text-sm overflow-x-auto p-2 bg-slate-100 rounded">
                    <code>{`// Client-side
useEffect(() => {
socket.on("slideChange", (slideNumber) => {
router.push(\`/\${slideNumber}\`);
});
}, [socket]);`}</code>
                </pre>
            </motion.div>
        </div>
    </div>
);

export const Notes = () => (
    <p>
        Socket.io Integration
        <br />
        <br />
        <ul>
            <li>Server-side</li>
            <li>Client-side</li>
        </ul>
    </p>
);
