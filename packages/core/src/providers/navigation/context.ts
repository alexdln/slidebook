import { createContext } from "react";

export const SyncContext = createContext<React.RefObject<HTMLInputElement | null> | null>(null);
