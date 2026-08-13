"use client";
import { Login } from "@/features/auth/auth.schema";
import AuthService from "@/features/auth/auth.service";
import { User } from "@supabase/supabase-js";
import { useContext, createContext, useState, ReactNode, useEffect } from "react"; 

interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean,
    login: (body: Login) => Promise<void>,
    logout: () => Promise<void>,
    validate: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    console.log("AUTH PROVIDER RENDER", {
        user,
        isAuthenticated: !!user,
        loading,
    });

    const login = async (body: Login) => {
        const result = await AuthService.login(body);
        setUser(result.user);
    }

    const logout = async () => {
        const result = await AuthService.logout();
        setUser(null);
    };

    const validate = async () => {
        try {
            const user = await AuthService.validate();
            setUser(user);
        } catch (error) {
            console.error("Erro ao validar autenticação:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validate();

        const unsubscribe = AuthService.onAuthStateChange(
            (user) => {
                setUser(user);
            }
        );
        return unsubscribe;
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
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  
  return context;
}


