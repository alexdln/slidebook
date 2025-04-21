import { createContext } from "react";

export const SyncContext = createContext<React.RefObject<boolean>>({ current: true });
