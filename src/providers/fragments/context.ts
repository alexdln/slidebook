import { createContext } from "react";

type Store = {
    slide?: number;
    lastIndex?: number | null;
};

export const FragmentsContext = createContext<Store>({});

export const SetFragmentsContext = createContext<React.Dispatch<React.SetStateAction<Store>>>(() => ({}));
