import { useContext, createContext, useState, ReactNode } from "react"; 

interface AuthContextType {
    login: (email:string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    validate: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {


    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  
  return context;
}


