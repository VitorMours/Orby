"use client";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            role="checkbox"
            aria-label="Alternar tema"
        >
            {theme === "light" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
}