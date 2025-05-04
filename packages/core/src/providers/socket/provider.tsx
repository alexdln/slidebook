"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

import { SocketContext } from "./context";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Initialize socket connection to our external Socket.io server
        const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL || window.location.origin);

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
