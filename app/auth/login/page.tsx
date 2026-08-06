"use client";

import { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/auth.schema";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData(previousData => ({...previousData, [name]: value}));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const schemaResult = LoginSchema.safeParse(formData);
        if(!schemaResult.success) {
            setLoading(false);
            return;
        }

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setLoading(false);
            router.push("/dashboard");
        }

        setLoading(false);      
        return;
    }

    return(
        <>
            <Navbar />
        
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="card w-1/4 h-1/2 shadow-sm rounded-lg bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} 
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange} 
                                className="input input-bordered w-full"
                            />
                            <Link href="/auth/signup" className="text-sm text-primary hover:underline self-end">
                                Don't have an account? Sign up
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Log in"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        
        </>

    );

}