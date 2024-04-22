import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(false)

    return <ThemeContext.Provider value={mode}> {children} </ThemeContext.Provider>
}