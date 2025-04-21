import { type Socket } from "socket.io-client";
import { createContext } from "react";

export const SocketContext: React.Context<Socket | null> = createContext<Socket | null>(null);
