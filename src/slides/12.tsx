"use client";

import { motion } from "framer-motion";

export const Slide12 = () => (
    <div className="w-full h-full flex flex-col">
        <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            API Routes
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
                <h3 className="font-semibold mb-2">Authentication API</h3>
                <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                    <code>{`// app/api/auth/route.ts
export async function POST(request) {
const { key } = await request.json();

if (key === ADMIN_KEY) {
return Response.json({ success: true });
} else {
return Response.json(
  { success: false },
  { status: 401 }
);
}
}`}</code>
                </pre>
            </motion.div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
                <h3 className="font-semibold mb-2">Socket.io API</h3>
                <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                    <code>{`// app/api/socketio/route.ts
import { Server } from "socket.io";

export function GET() {
if (res.socket.server.io) {
// Socket.io server already running
return Response.json({ success: true });
}

// Set up Socket.io server
const io = new Server(res.socket.server);
res.socket.server.io = io;

return Response.json({ success: true });
}`}</code>
                </pre>
            </motion.div>
        </div>
    </div>
);
