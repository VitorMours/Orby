"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/auth/auth.schema";
import useAuth from "@/context/auth-context";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const schemaResult = LoginSchema.safeParse(formData);

        if (!schemaResult.success) {
            return;
        }

        try {
            setLoading(true);

            await login(schemaResult.data);

            const nextPath = new URLSearchParams(window.location.search).get("next");
            router.push(nextPath?.startsWith("/") ? nextPath : "/dashboard");
        } catch (error) {
            console.error("Erro ao realizar login:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen px-4">
            <div className="card w-3/4 md:w-1/2 lg:w-1/3 shadow-sm rounded-lg bg-base-100">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">
                        Login
                    </h2>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
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

                        <Link
                            href="/auth/signup"
                            className="text-sm text-primary hover:underline self-end"
                        >
                            Don't have an account? Sign up
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-4"
                        >
                            {loading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}