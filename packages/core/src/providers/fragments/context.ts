import { createContext } from "react";

import { type FragmentsStore } from "./types";

export const FragmentsContext = createContext<FragmentsStore>({ fragments: [] });

export const SetFragmentsContext = createContext<React.Dispatch<React.SetStateAction<FragmentsStore>>>(() => ({}));
