'use client'

import { useContext } from "react"

import { SocketContext } from "./context"

export const useSocket = () => {
    return useContext(SocketContext)
}