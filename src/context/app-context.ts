import { createContext } from "react";
import type { AppContextValue } from "./AppProvider";

export const AppContext = createContext<AppContextValue | null>(null);
