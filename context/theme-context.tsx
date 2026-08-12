"use client";
import { useContext, createContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme,
    toggleTheme: () => void
    setTheme: (theme: Theme) => void,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode}) {

    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = stored ?? (prefersDark ? "dark" : "light");

        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        setMounted(true);
    }, []);

    function setTheme(newTheme: Theme) {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    if(!mounted) return null; 
    
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