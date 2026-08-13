"use client";
import { useContext, createContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme,
    initialTheme?: Theme,
    toggleTheme: () => void
    setTheme: (theme: Theme) => void,
}
interface ThemeProviderProps {
    children: React.ReactNode,
    initialTheme?: Theme
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps ) {

    const [theme, setThemeState] = useState<Theme>(initialTheme ?? "light");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = stored ?? (prefersDark ? "dark" : "light");

        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    function setTheme(newTheme: Theme) {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    
    return(
        <ThemeContext.Provider  value={{ theme, toggleTheme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
}