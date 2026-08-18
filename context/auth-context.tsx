"use client";

import { Login } from "@/features/auth/auth.schema";
import { User } from "@supabase/supabase-js";
import {
    useContext,
    createContext,
    useState,
    useEffect,
} from "react";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (body: Login) => Promise<void>;
    logout: () => Promise<void>;
    validate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Realiza o login através da API do Next.js.
     *
     * O Supabase não é acessado diretamente pelo cliente.
     */
    const login = async (body: Login) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        const data = await response.json();


        if (!response.ok || data == null) {
            setUser(null);
            throw new Error(data?.error ?? "Erro ao realizar login.");
        }

        await validate();
    };

    /**
     * Realiza o logout através da API do Next.js.
     */
    const logout = async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);

            throw new Error(
                data?.error ?? "Erro ao realizar logout."
            );
        }

        setUser(null);
    };

    /**
     * Verifica no servidor se existe uma sessão autenticada.
     */
    const validate = async () => {
        try {
            const response = await fetch("/api/auth/session", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok || !data?.user) {
                setUser(null);
                return;
            }


            setUser(data.user);
        } catch (error) {
            console.error("Erro ao validar autenticação:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validate();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        validate,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider"
        );
    }

    return context;
}