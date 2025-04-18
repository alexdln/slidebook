import { createContext } from "react";

type Store = {
    active: boolean;
    slideNumber: number;
};

export const SlideContext = createContext<Store>({ active: false, slideNumber: 0 });
