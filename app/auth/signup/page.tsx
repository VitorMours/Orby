"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components";
import { RegisterSchema } from "@/schemas/auth.schema";

export default function SigninPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

        event.preventDefault();
        setLoading(true);
        if(formData.password !== formData.confirmPassword){
            alert("Password does not match");
            setLoading(false);
            return;
        }
        
        const result = RegisterSchema.safeParse(formData);
        if(!result.success){
            console.log(result.error.flatten());
            setLoading(false);
            return;
        }

        const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            alert("Houve um problema durante o login. Por favor, tente novamente.");
            setLoading(false);
            return;
        }
        router.push("/dashboard");
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="card w-1/4 h-1/2 shadow-sm rounded-lg bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-4">Sign in</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Primeiro Nome"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Sobrenome"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="john.doe@email.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="podam1*2-másd!"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Confirm the password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <Link href="/auth/login" className="text-sm text-primary hover:underline self-end">
                                Already have an account? Log in
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                            >
                                {loading ? <span className="loading loading-spinner"></span>: "Sign up"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>

    );

}