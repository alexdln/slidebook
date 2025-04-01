"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/settings"

export interface SlideContentProps {
  slideNumber: number
}

export const SlideContent: React.FC<SlideContentProps> = ({ slideNumber }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    // Generate slide content based on slide number
    const slideContent = getSlideContent(slideNumber)
    setContent(slideContent)
  }, [slideNumber])

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
      <div className="flex items-center justify-center p-8">{content}</div>
    </div>
  )
}

function getSlideContent(slideNumber: number): React.ReactNode {
  // Define content for each slide
  switch (slideNumber) {
    case 1:
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to the Presentation
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            A real-time synchronized presentation
          </motion.p>
        </motion.div>
      )

    case 2:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Objectives
          </motion.h2>
          <div className="space-y-4">
            {[
              "Create engaging presentations",
              "Synchronize across devices",
              "Simple admin controls",
              "Smooth animations",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                className="flex items-center"
              >
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                <p className="text-xl">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 3:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "Real-time Sync", desc: "All viewers see the same slide" },
              { title: "Admin Controls", desc: "Simple authentication system" },
              { title: "Animations", desc: "Smooth transitions between elements" },
              { title: "Progress Tracking", desc: "Clear indication of presentation progress" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 4:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h3 className="text-lg font-semibold text-blue-700">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 5:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            User Experience
          </motion.h2>
          <div className="flex flex-col space-y-6">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">Optimized for all screen sizes and devices</p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500"
            >
              <h3 className="text-xl font-semibold mb-2">Keyboard Navigation</h3>
              <p className="text-gray-600">Use arrow keys to navigate between slides</p>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"
            >
              <h3 className="text-xl font-semibold mb-2">Smooth Transitions</h3>
              <p className="text-gray-600">Elegant animations between slides and elements</p>
            </motion.div>
          </div>
        </div>
      )

    case 6:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Architecture Overview
          </motion.h2>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative w-full max-w-2xl aspect-video bg-gray-50 rounded-lg p-4"
            >
              {/* Simple architecture diagram */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                <p className="text-center font-medium">Client</p>
              </div>
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-green-100 border border-green-300 rounded flex items-center justify-center">
                <p className="text-center font-medium">Next.js Server</p>
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-20 bg-purple-100 border border-purple-300 rounded flex items-center justify-center">
                <p className="text-center font-medium">Socket.io</p>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="25%" y1="25%" x2="50%" y2="75%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="75%" y1="25%" x2="50%" y2="75%" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </motion.div>
          </div>
        </div>
      )

    case 7:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Admin Features
          </motion.h2>
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">Secure Access</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Simple key-based authentication</li>
                <li>Protected admin route</li>
                <li>Session management</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">Presentation Control</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Navigate between slides</li>
                <li>Real-time synchronization</li>
                <li>Slide preview</li>
              </ul>
            </motion.div>
          </div>
        </div>
      )

    case 8:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4"
            >
              <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
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
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
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
      )

    case 9:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
                className="bg-blue-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Fade In</h3>
                <div className="h-16 bg-blue-100 rounded flex items-center justify-center">
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
                className="bg-green-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Scale</h3>
                <div className="h-16 bg-green-100 rounded flex items-center justify-center">
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
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Slide</h3>
                <div className="h-16 bg-purple-100 rounded flex items-center justify-center overflow-hidden">
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
                className="bg-orange-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Rotate</h3>
                <div className="h-16 bg-orange-100 rounded flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-8 h-8 bg-orange-500 rounded"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )

    case 10:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Keyboard Navigation
          </motion.h2>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="col-start-2">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-2xl">↑</span>
                </div>
              </div>
              <div className="col-start-1 col-end-4 flex justify-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-2xl">←</span>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-2xl">↓</span>
                </div>
                <div className="w-16 h-16 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-2xl">→</span>
                </div>
              </div>
              <div className="col-span-3 mt-8 text-center">
                <p className="text-lg">
                  Use <span className="font-bold">arrow keys</span> to navigate between slides
                </p>
                <p className="text-gray-600 mt-2">
                  Press <span className="font-mono bg-gray-100 px-2 py-1 rounded">Space</span> to advance to the next
                  slide
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )

    case 11:
      return (
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

    case 12:
      return (
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
      )

    case 13:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Progress Tracking
          </motion.h2>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="h-8 bg-blue-500 rounded-full"
            />
            <div className="flex justify-between">
              <span className="font-medium">Slide 13 of 20</span>
              <span className="font-medium">65% Complete</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center text-gray-600"
            >
              <p>Progress is automatically tracked and displayed</p>
              <p>All viewers see the same progress in real-time</p>
            </motion.div>
          </div>
        </div>
      )

    case 14:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Responsive Design
          </motion.h2>
          <div className="flex-1 grid grid-cols-3 gap-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-32 border-4 border-gray-300 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Mobile</h3>
              <p className="text-sm text-gray-600 text-center">Optimized for small screens</p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-24 border-4 border-gray-300 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Tablet</h3>
              <p className="text-sm text-gray-600 text-center">Adjusted for medium screens</p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-32 border-4 border-gray-300 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Desktop</h3>
              <p className="text-sm text-gray-600 text-center">Full experience on large screens</p>
            </motion.div>
          </div>
        </div>
      )

    case 15:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Real-time Collaboration
          </motion.h2>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative w-full max-w-lg aspect-video bg-gray-50 rounded-lg p-4"
            >
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                <span className="font-bold">A</span>
              </div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                <span className="font-bold">B</span>
              </div>
              <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-300">
                <span className="font-bold">C</span>
              </div>
              <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-300">
                <span className="font-bold">D</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-medium">All viewers see the same slide</p>
                  <p className="text-sm text-gray-600">in real-time</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )

    case 16:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex"
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
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 17:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
                { title: "Optimized Animations", desc: "Use hardware acceleration for smooth animations", value: 95 },
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
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
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
      )

    case 18:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Future Enhancements
          </motion.h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "User Authentication", desc: "Multiple admin accounts with different permissions" },
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
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 19:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center h-32"
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
                <p className="text-xs text-gray-500">Documentation</p>
              </motion.a>
            ))}
          </div>
        </div>
      )

    case 20:
      return (
        <div className="w-full h-full flex flex-col">
          <motion.h2
            className="text-3xl font-bold mb-6"
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
              <p className="text-gray-600 mb-6">You&apos;ve reached the end of the presentation</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => (window.location.href = "/1")}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Restart
                </button>
                <button
                  onClick={() => (window.location.href = "/admin")}
                  className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Admin Panel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )

    default:
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Slide {slideNumber}
          </motion.h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-5xl font-bold"
          >
            {slideNumber}
          </motion.div>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            This is example content for slide {slideNumber}
          </motion.p>
        </motion.div>
      )
  }
}

