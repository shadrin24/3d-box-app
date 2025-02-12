import { createContext, useState, useContext } from "react";

const ThemeContext = createContext({ darkMode: false, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
