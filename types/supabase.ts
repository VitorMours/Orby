export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    createdAt: string | null;
                    updatedAt: string | null;
                };
                Insert: {
                    id?: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                Update: {
                    id?: string;
                    firstName?: string;
                    lastName?: string;
                    email?: string;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                Relationships: [];
            };
            sticks: {
                Row: {
                    id: string;
                    name: string | null;
                    description: string | null;
                    positionX: number | null;
                    positionY: number | null;
                    sizeWidth: number | null;
                    sizeHeight: number | null;
                    createdAt: string | null;
                    updatedAt: string | null;
                    owner: string | null;
                };
                Insert: Omit<Database["public"]["Tables"]["sticks"]["Row"], "id"> & { id?: string };
                Update: Partial<Database["public"]["Tables"]["sticks"]["Insert"]>;
                Relationships: [];
            };
            todo: {
                Row: {
                    id: string;
                    title: string;
                    content: string | null;
                    conclusionStatus: boolean;
                    createdAt: string | null;
                    updatedAt: string | null;
                    archivedAt: string | null;
                    owner: string | null;
                };
                Insert: Omit<Database["public"]["Tables"]["todo"]["Row"], "id" | "content" | "conclusionStatus" | "createdAt" | "updatedAt" | "archivedAt" | "owner"> & {
                    id?: string;
                    content?: string | null;
                    conclusionStatus?: boolean;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                    archivedAt?: string | null;
                    owner?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["todo"]["Insert"]>;
                Relationships: [];
            };
            notes: {
                Row: {
                    id: string;
                    title: string;
                    content: string | null;
                    createdAt: string | null;
                    updatedAt: string | null;
                    owner: string | null;
                };
                Insert: Omit<Database["public"]["Tables"]["notes"]["Row"], "id" | "content" | "createdAt" | "updatedAt" | "owner"> & {
                    id?: string;
                    content?: string | null;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                    owner?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};