'use client';

import { motion } from "framer-motion";

export const Slide11 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Dynamic Routing
        </motion.h2>
        <div className="flex-1 flex items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full space-y-6"
            >
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">File Structure</h3>
                    <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                        <code>{`app/
├── slides/
│   └── [slideId]/
│       └── page.tsx
├── admin/
│   └── page.tsx
└── page.tsx (redirects to /1)`}</code>
                    </pre>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">URL Pattern</h3>
                    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                        <span className="text-gray-500">/</span>
                        <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono">[slideId]</span>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
)
